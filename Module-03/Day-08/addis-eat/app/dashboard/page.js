import Link from "next/link";
import RevenueChart from "./RevenueChart.jsx";
import { readOrders, summarizeOrders } from "./dashboard-data.js";
import styles from "./dashboard.module.css";

function formatETB(value) {
  return new Intl.NumberFormat("en-ET", {
    style: "currency",
    currency: "ETB",
    maximumFractionDigits: 0,
  }).format(value);
}

export default async function DashboardPage({ searchParams }) {
  const query = await searchParams;
  const demo = typeof query?.demo === "string" ? query.demo : undefined;
  const orders = await readOrders(demo);
  const summary = summarizeOrders(orders);

  return (
    <main className={styles.dashboardPage}>
      <header className={styles.pageHeader}>
        <div>
          <p className={styles.eyebrow}>Addis Eats · Operations</p>
          <h1>Dashboard</h1>
          <p>Revenue and order activity at a glance.</p>
        </div>
        <Link href="/orders" className={styles.headerLink}>View all orders</Link>
      </header>

      {orders.length === 0 ? (
        <section className={styles.emptyState} aria-labelledby="dashboard-empty-heading">
          <h2 id="dashboard-empty-heading">No orders yet</h2>
          <p>
            Once customers place orders, revenue by neighbourhood and the daily order trend will appear here.
            You can browse the menu to create a test order.
          </p>
          <Link href="/menu" className={styles.primaryLink}>Browse the menu</Link>
        </section>
      ) : (
        <>
          <section className={styles.metricGrid} aria-label="Order summary">
            <article className={styles.metricCard}>
              <span className={styles.metricLabel}>Total orders</span>
              <strong className={styles.metricValue}>{summary.totalOrders.toLocaleString("en-ET")}</strong>
            </article>
            <article className={styles.metricCard}>
              <span className={styles.metricLabel}>Total revenue</span>
              <strong className={styles.metricValue}>{formatETB(summary.totalRevenue)}</strong>
            </article>
            <article className={styles.metricCard}>
              <span className={styles.metricLabel}>Average order value</span>
              <strong className={styles.metricValue}>{formatETB(summary.averageOrderValue)}</strong>
            </article>
          </section>
          {/* Only aggregated summaries cross the Server/Client Component boundary. */}
          <RevenueChart summary={summary} />
        </>
      )}
    </main>
  );
}
