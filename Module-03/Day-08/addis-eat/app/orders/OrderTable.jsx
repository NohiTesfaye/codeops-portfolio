import Link from "next/link";
import styles from "./orders.module.css";

const SORT_LABELS = {
  id: "Order ID",
  customer: "Customer",
  date: "Date",
  total: "Total (ETB)",
  status: "Status",
};

function buildUrl({ page, sort, dir, demo }) {
  const params = new URLSearchParams();
  params.set("page", String(page));
  params.set("sort", sort);
  params.set("dir", dir);
  if (demo) params.set("demo", demo);
  return `/orders?${params.toString()}`;
}

function sortHref(key, currentSort, currentDir, demo) {
  const nextDir = key === currentSort && currentDir === "asc" ? "desc" : "asc";
  return buildUrl({ page: 1, sort: key, dir: nextDir, demo });
}

function formatETB(value) {
  return new Intl.NumberFormat("en-ET", {
    style: "currency",
    currency: "ETB",
    maximumFractionDigits: 0,
  }).format(value);
}

function formatDate(value) {
  if (!value) return "Date not recorded";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "Date not recorded";
  return new Intl.DateTimeFormat("en-ET", {
    dateStyle: "medium",
    timeStyle: "short",
    timeZone: "Africa/Addis_Ababa",
  }).format(date);
}

function SortHeading({ sortKey, sort, dir, demo }) {
  const current = sort === sortKey;
  const indicator = current ? (dir === "asc" ? "▲" : "▼") : "↕";
  const ariaSort = current ? (dir === "asc" ? "ascending" : "descending") : "none";

  return (
    <th scope="col" aria-sort={ariaSort} className={sortKey === "total" ? styles.money : undefined}>
      <Link href={sortHref(sortKey, sort, dir, demo)} className={styles.sortLink}>
        {SORT_LABELS[sortKey]} <span className={styles.sortIndicator} aria-hidden="true">{indicator}</span>
      </Link>
    </th>
  );
}

export default function OrderTable({ orders, page, totalPages, totalOrders, sort, dir, demo }) {
  if (orders.length === 0) {
    return (
      <section className={styles.emptyState} aria-labelledby="orders-empty-heading">
        <h2 id="orders-empty-heading">No orders yet</h2>
        <p>Orders will appear here after customers submit checkout. Place a test order to populate this table.</p>
        <Link href="/menu" className={styles.primaryLink}>Browse the menu</Link>
      </section>
    );
  }

  return (
    <section className={styles.tableCard} aria-label="Orders list">
      <div className={styles.tableScroll}>
        <table className={styles.orderTable}>
          <caption>
            {totalOrders} {totalOrders === 1 ? "order" : "orders"}. Select a column heading to sort; sorting and pagination are reflected in the URL.
          </caption>
          <thead>
            <tr>
              <SortHeading sortKey="id" sort={sort} dir={dir} demo={demo} />
              <SortHeading sortKey="customer" sort={sort} dir={dir} demo={demo} />
              <th scope="col">Neighbourhood</th>
              <SortHeading sortKey="date" sort={sort} dir={dir} demo={demo} />
              <SortHeading sortKey="total" sort={sort} dir={dir} demo={demo} />
              <SortHeading sortKey="status" sort={sort} dir={dir} demo={demo} />
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id}>
                <th scope="row" className={styles.orderId}>{order.id}</th>
                <td>{order.customerName}</td>
                <td>{order.neighborhood || "Not recorded"}</td>
                <td>{formatDate(order.createdAt)}</td>
                <td className={styles.money}>{formatETB(order.total)}</td>
                <td><span className={styles.status} data-status={order.status.toLowerCase()}>{order.status}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <nav className={styles.pagination} aria-label="Orders pagination">
        <p className={styles.pageSummary}>
          Page {page} of {totalPages} · Showing {(page - 1) * 5 + 1}–{Math.min(page * 5, totalOrders)} of {totalOrders}
        </p>
        <div className={styles.pageActions}>
          {page > 1 ? (
            <Link className={styles.pageLink} href={buildUrl({ page: page - 1, sort, dir, demo })} rel="prev">Previous</Link>
          ) : (
            <span className={styles.pageLink} aria-disabled="true">Previous</span>
          )}
          {page < totalPages ? (
            <Link className={styles.pageLink} href={buildUrl({ page: page + 1, sort, dir, demo })} rel="next">Next</Link>
          ) : (
            <span className={styles.pageLink} aria-disabled="true">Next</span>
          )}
        </div>
      </nav>
    </section>
  );
}
