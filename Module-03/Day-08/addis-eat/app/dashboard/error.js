"use client";

import { useEffect } from "react";
import Link from "next/link";
import styles from "./dashboard.module.css";

export default function DashboardError({ error, reset }) {
  useEffect(() => {
    console.error("Dashboard failed to load:", error);
  }, [error]);

  return (
    <main className={styles.dashboardPage}>
      <section className={styles.emptyState} role="alert" aria-labelledby="dashboard-error-heading">
        <h1 id="dashboard-error-heading">We couldn’t load the dashboard</h1>
        <p>The order summary is temporarily unavailable. Please try again.</p>
        <button type="button" className={styles.primaryLink} onClick={() => reset()}>Try again</button>
        <p><Link href="/orders">Open the orders page</Link></p>
      </section>
    </main>
  );
}
