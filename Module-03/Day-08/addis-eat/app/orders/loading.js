import styles from "./orders.module.css";

export default function OrdersLoading() {
  return (
    <main className={styles.ordersPage} aria-busy="true" aria-label="Loading orders">
      <header className={styles.pageHeader}>
        <div>
          <p className={styles.eyebrow}>Addis Eats · Operations</p>
          <h1>Orders</h1>
          <p>Loading orders…</p>
        </div>
      </header>
      <div className={styles.tableCard}>
        <div className={styles.tableScroll}>
          <table className={styles.loadingTable} aria-hidden="true">
            <tbody>
              {Array.from({ length: 5 }, (_, row) => (
                <tr key={row}>
                  <td><span className={`${styles.skeleton} ${styles.skeletonShort}`} /></td>
                  <td><span className={`${styles.skeleton} ${styles.skeletonLong}`} /></td>
                  <td><span className={`${styles.skeleton} ${styles.skeletonMedium}`} /></td>
                  <td><span className={`${styles.skeleton} ${styles.skeletonMedium}`} /></td>
                  <td><span className={`${styles.skeleton} ${styles.skeletonShort}`} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
}
