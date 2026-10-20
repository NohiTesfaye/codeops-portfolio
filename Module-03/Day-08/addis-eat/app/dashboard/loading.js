import styles from "./dashboard.module.css";

export default function DashboardLoading() {
  return (
    <main className={styles.dashboardPage} aria-busy="true" aria-label="Loading dashboard">
      <header className={styles.pageHeader}>
        <div>
          <p className={styles.eyebrow}>Addis Eats · Operations</p>
          <h1>Dashboard</h1>
          <p>Loading revenue and order activity…</p>
        </div>
      </header>
      <div className={styles.metricGrid} aria-hidden="true">
        {[1, 2, 3].map((item) => <div key={item} className={styles.skeletonBlock} style={{ height: 92 }} />)}
      </div>
      <div className={styles.skeletonBlock} />
    </main>
  );
}
