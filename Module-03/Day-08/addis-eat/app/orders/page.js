import Link from "next/link";
import OrderTable from "./OrderTable.jsx";
import { normalizeOrder, readOrders } from "../dashboard/dashboard-data.js";
import styles from "./orders.module.css";

const VALID_SORTS = new Set(["id", "customer", "date", "total", "status"]);
const PAGE_SIZE = 5;

function getSingle(value) {
  return Array.isArray(value) ? value[0] : value;
}

function compareValues(a, b, sort) {
  if (sort === "total") return a.total - b.total;
  if (sort === "date") return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
  if (sort === "customer") return a.customerName.localeCompare(b.customerName, "en");
  if (sort === "status") return a.status.localeCompare(b.status, "en");
  return a.id.localeCompare(b.id, "en", { numeric: true, sensitivity: "base" });
}

export default async function OrdersPage({ searchParams }) {
  const query = await searchParams;
  const requestedSort = getSingle(query?.sort);
  const sort = VALID_SORTS.has(requestedSort) ? requestedSort : "date";
  const requestedDir = getSingle(query?.dir);
  const dir = requestedDir === "asc" ? "asc" : "desc";
  const requestedPage = Number.parseInt(getSingle(query?.page) || "1", 10);
  const pageNumber = Number.isFinite(requestedPage) && requestedPage > 0 ? requestedPage : 1;
  const demo = ["empty", "error", "loading", "data"].includes(getSingle(query?.demo)) ? getSingle(query?.demo) : undefined;

  const allOrders = (await readOrders(demo)).map(normalizeOrder);
  const sortedOrders = [...allOrders].sort((a, b) => {
    const result = compareValues(a, b, sort);
    return (dir === "asc" ? result : -result) || a.id.localeCompare(b.id);
  });
  const totalPages = Math.max(1, Math.ceil(sortedOrders.length / PAGE_SIZE));
  const page = Math.min(pageNumber, totalPages);
  const pageOrders = sortedOrders.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  return (
    <main className={styles.ordersPage}>
      <header className={styles.pageHeader}>
        <div>
          <p className={styles.eyebrow}>Addis Eats · Operations</p>
          <h1>Orders</h1>
          <p>Review recent orders, change the sort order, and move between pages.</p>
        </div>
        <Link href="/dashboard" className={styles.headerLink}>Back to dashboard</Link>
      </header>

      <OrderTable
        orders={pageOrders}
        page={page}
        totalPages={totalPages}
        totalOrders={sortedOrders.length}
        sort={sort}
        dir={dir}
        demo={demo}
      />
    </main>
  );
}
