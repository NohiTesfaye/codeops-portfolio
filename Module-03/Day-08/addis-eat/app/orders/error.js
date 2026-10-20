"use client";

import { useEffect } from "react";
import Link from "next/link";
import styles from "./orders.module.css";

export default function OrdersError({ error, reset }) {
  useEffect(() => {
    console.error("Orders page failed to load:", error);
  }, [error]);

  return (
    <main className={styles.ordersPage}>
      <section className={styles.emptyState} role="alert" aria-labelledby="orders-error-heading">
        <h1 id="orders-error-heading">We couldn’t load the orders</h1>
        <p>Order data is temporarily unavailable. Please retry the request.</p>
        <button type="button" className={styles.primaryLink} onClick={() => reset()}>Try again</button>
        <p><Link href="/dashboard">Return to the dashboard</Link></p>
      </section>
    </main>
  );
}
