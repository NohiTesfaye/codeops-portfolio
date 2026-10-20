"use client";

import styles from "./dashboard.module.css";

function formatETB(value) {
  return new Intl.NumberFormat("en-ET", {
    style: "currency",
    currency: "ETB",
    maximumFractionDigits: 0,
  }).format(value);
}

function formatCompactETB(value) {
  if (value >= 10000) return `ETB ${(value / 1000).toFixed(0)}k`;
  if (value >= 1000) return `ETB ${(value / 1000).toFixed(1)}k`;
  return `ETB ${Math.round(value)}`;
}

function formatDay(dateValue) {
  const date = new Date(`${dateValue}T12:00:00Z`);
  return new Intl.DateTimeFormat("en-ET", {
    day: "numeric",
    month: "short",
    timeZone: "UTC",
  }).format(date);
}

export default function RevenueChart({ summary }) {
  const areas = summary.revenueByNeighborhood;
  const days = summary.ordersByDay;
  const maxRevenue = Math.max(0, ...areas.map((area) => area.revenue));
  const axisMax = maxRevenue > 0 ? Math.ceil(maxRevenue / 4) * 4 : 4;
  const tickValues = [0, 1, 2, 3, 4].map((tick) => (axisMax / 4) * tick);
  const barChartHeight = 270;
  const barChartWidth = 780;
  const leftPadding = 148;
  const rightPadding = 115;
  const chartWidth = barChartWidth - leftPadding - rightPadding;
  const rowHeight = 39;
  const barTop = 25;
  const lineWidth = 780;
  const lineHeight = 245;
  const linePadding = { top: 25, right: 22, bottom: 40, left: 40 };
  const plotWidth = lineWidth - linePadding.left - linePadding.right;
  const plotHeight = lineHeight - linePadding.top - linePadding.bottom;
  const maxDaily = Math.max(4, ...days.map((day) => day.orders));
  const linePoints = days.map((day, index) => {
    const x = linePadding.left + (days.length <= 1 ? 0 : (index / (days.length - 1)) * plotWidth);
    const y = linePadding.top + plotHeight - (day.orders / maxDaily) * plotHeight;
    return { ...day, x, y };
  });
  const path = linePoints.map((point, index) => `${index === 0 ? "M" : "L"} ${point.x} ${point.y}`).join(" ");

  return (
    <div className={styles.chartStack}>
      <section className={styles.chartCard} aria-labelledby="revenue-heading">
        <div className={styles.chartHeader}>
          <div>
            <h2 id="revenue-heading">Revenue by neighbourhood</h2>
            <p>Order revenue grouped by delivery area</p>
          </div>
          <span className={styles.chartUnit}>Unit: ETB</span>
        </div>

        {areas.length === 0 ? (
          <p className={styles.noChartData}>No revenue data is available for this period.</p>
        ) : (
          <div className={styles.barChartFrame}>
            <svg
              className={styles.chartSvg}
              viewBox={`0 0 ${barChartWidth} ${Math.max(barChartHeight, barTop * 2 + areas.length * rowHeight)}`}
              role="img"
              aria-labelledby="revenue-svg-title revenue-svg-desc"
              preserveAspectRatio="xMinYMin meet"
            >
              <title id="revenue-svg-title">Revenue by neighbourhood</title>
              <desc id="revenue-svg-desc">
                Horizontal bars compare total order revenue in Ethiopian birr for each neighbourhood. A data table follows the chart.
              </desc>
              {tickValues.map((tick, index) => {
                const x = leftPadding + (tick / axisMax) * chartWidth;
                return (
                  <g key={index}>
                    <line x1={x} y1={12} x2={x} y2={Math.max(barChartHeight - 20, barTop + areas.length * rowHeight)} className={styles.gridLine} />
                    <text x={x} y={Math.max(barChartHeight - 4, barTop + areas.length * rowHeight + 16)} textAnchor="middle" className={styles.axisText}>
                      {formatCompactETB(tick)}
                    </text>
                  </g>
                );
              })}
              {areas.map((area, index) => {
                const y = barTop + index * rowHeight;
                const width = (area.revenue / axisMax) * chartWidth;
                const valueX = Math.min(leftPadding + width + 8, barChartWidth - rightPadding + 7);
                return (
                  <g key={area.neighborhood}>
                    <text x={leftPadding - 12} y={y + 16} textAnchor="end" className={styles.areaLabel}>
                      {area.neighborhood.length > 19 ? `${area.neighborhood.slice(0, 18)}…` : area.neighborhood}
                    </text>
                    <rect x={leftPadding} y={y} width={Math.max(width, area.revenue > 0 ? 2 : 0)} height={22} rx={5} className={styles.bar} />
                    <text x={valueX} y={y + 16} className={styles.valueLabel}>{formatETB(area.revenue)}</text>
                  </g>
                );
              })}
            </svg>
          </div>
        )}

        <div className={styles.chartDataTableWrap}>
          <table className={styles.chartDataTable}>
            <caption>Revenue data by neighbourhood (ETB)</caption>
            <thead>
              <tr><th scope="col">Neighbourhood</th><th scope="col">Revenue (ETB)</th></tr>
            </thead>
            <tbody>
              {areas.length ? areas.map((area) => (
                <tr key={area.neighborhood}>
                  <th scope="row">{area.neighborhood}</th>
                  <td>{formatETB(area.revenue)}</td>
                </tr>
              )) : <tr><td colSpan="2">No revenue data available.</td></tr>}
            </tbody>
          </table>
        </div>
      </section>

      <section className={styles.chartCard} aria-labelledby="orders-per-day-heading">
        <div className={styles.chartHeader}>
          <div>
            <h2 id="orders-per-day-heading">Orders per day — last 7 days</h2>
            <p>Daily order count across the most recent seven calendar days</p>
          </div>
          <span className={styles.chartUnit}>Unit: orders</span>
        </div>

        <div className={styles.lineChartFrame}>
          <svg
            className={styles.chartSvg}
            viewBox={`0 0 ${lineWidth} ${lineHeight}`}
            role="img"
            aria-labelledby="orders-svg-title orders-svg-desc"
            preserveAspectRatio="xMinYMin meet"
          >
            <title id="orders-svg-title">Orders per day — last 7 days</title>
            <desc id="orders-svg-desc">
              A line chart showing the number of orders for each of the last seven days. The exact values are repeated in the data table below.
            </desc>
            {[0, 1, 2, 3, 4].map((tick) => {
              const value = (maxDaily / 4) * tick;
              const y = linePadding.top + plotHeight - (value / maxDaily) * plotHeight;
              return (
                <g key={tick}>
                  <line x1={linePadding.left} y1={y} x2={lineWidth - linePadding.right} y2={y} className={styles.gridLine} />
                  <text x={linePadding.left - 12} y={y + 4} textAnchor="end" className={styles.axisText}>{Math.round(value)}</text>
                </g>
              );
            })}
            <path d={path} className={styles.line} />
            {linePoints.map((point) => (
              <g key={point.date}>
                <circle cx={point.x} cy={point.y} r={5} className={styles.point} />
                <text x={point.x} y={point.y - 12} textAnchor="middle" className={styles.valueLabel}>{point.orders}</text>
                <text x={point.x} y={lineHeight - 12} textAnchor="middle" className={styles.axisText}>{formatDay(point.date)}</text>
              </g>
            ))}
          </svg>
        </div>

        <div className={styles.chartDataTableWrap}>
          <table className={styles.chartDataTable}>
            <caption>Orders per day — last 7 days (unit: orders)</caption>
            <thead><tr><th scope="col">Date</th><th scope="col">Orders</th></tr></thead>
            <tbody>
              {days.map((day) => (
                <tr key={day.date}><th scope="row">{formatDay(day.date)}</th><td>{day.orders}</td></tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
