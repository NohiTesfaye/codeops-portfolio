import { getOrders } from "../../db.js";

const DAY_MS = 24 * 60 * 60 * 1000;

function firstDefined(...values) {
  return values.find((value) => value !== undefined && value !== null && value !== "");
}

function makeDemoOrders() {
  const today = new Date();
  today.setHours(12, 0, 0, 0);

  const examples = [
    [0, "Bole", "Mekdes Alemu", 720, "Completed"],
    [0, "Kazanchis", "Yonas Bekele", 460, "Completed"],
    [1, "Bole", "Sara Tadesse", 540, "Preparing"],
    [1, "Piassa", "Dawit Girma", 390, "Completed"],
    [2, "Yeka", "Hana Gemechu", 680, "Completed"],
    [2, "Kazanchis", "Mulugeta Abebe", 510, "Preparing"],
    [3, "Bole", "Rahel Worku", 430, "Completed"],
    [3, "Lideta", "Abel Fikru", 350, "Cancelled"],
    [4, "Piassa", "Saba Getachew", 620, "Completed"],
    [5, "Yeka", "Biruk Assefa", 490, "Preparing"],
    [6, "Bole", "Liya Kebede", 810, "Completed"],
    [6, "Kazanchis", "Samuel Kebede", 560, "Completed"],
  ];

  return examples.map(([daysAgo, neighborhood, customerName, total, status], index) => {
    const date = new Date(today.getTime() - daysAgo * DAY_MS);
    date.setHours(10 + (index % 8), (index * 7) % 60, 0, 0);

    return {
      id: `demo-${String(index + 1).padStart(3, "0")}`,
      customerName,
      neighborhood,
      total,
      status,
      createdAt: date.toISOString(),
      items: [],
    };
  });
}

export function normalizeOrder(order, index = 0) {
  const createdAt = firstDefined(
    order?.createdAt,
    order?.created_at,
    order?.orderedAt,
    order?.orderDate,
    order?.date,
    order?.timestamp,
  );
  const customer = firstDefined(
    order?.customerName,
    order?.customer_name,
    order?.customer?.name,
    order?.name,
    typeof order?.customer === "string" ? order.customer : undefined,
    "Guest customer",
  );
  const neighborhood = firstDefined(
    order?.neighborhood,
    order?.deliveryNeighborhood,
    order?.delivery_neighborhood,
    order?.deliveryArea,
    order?.area,
    order?.address?.neighborhood,
    order?.deliveryAddress?.neighborhood,
    typeof order?.deliveryAddress === "string" ? order.deliveryAddress : undefined,
    "Not recorded",
  );
  const totalValue = firstDefined(
    order?.total,
    order?.totalETB,
    order?.totalAmount,
    order?.amount,
    order?.grandTotal,
    order?.totalPrice,
    0,
  );
  const date = createdAt ? new Date(createdAt) : null;

  return {
    ...order,
    id: String(firstDefined(order?.id, order?.orderId, order?.order_id, order?.reference, `order-${index + 1}`)),
    customerName: String(customer),
    neighborhood: String(neighborhood),
    total: Number.isFinite(Number(totalValue)) ? Number(totalValue) : 0,
    status: String(firstDefined(order?.status, "Received")),
    createdAt: date && !Number.isNaN(date.getTime()) ? date.toISOString() : null,
    items: Array.isArray(order?.items) ? order.items : [],
  };
}

/**
 * The demo query modes make each page state straightforward to review.
 * Normal requests always read the order store from db.js.
 */
export async function readOrders(demoMode) {
  if (demoMode === "error") {
    throw new Error("Dashboard demo: simulated order-data failure.");
  }

  if (demoMode === "loading") {
    // This deliberate delay lets the route's loading.js skeleton be observed.
    await new Promise((resolve) => setTimeout(resolve, 1400));
  }

  if (demoMode === "empty") {
    return [];
  }

  if (demoMode === "data") {
    return makeDemoOrders().map(normalizeOrder);
  }

  const orders = await getOrders();
  return (Array.isArray(orders) ? orders : []).map(normalizeOrder);
}

function dayKey(value) {
  return new Date(value).toISOString().slice(0, 10);
}

function dateKeyForOffset(offset) {
  const date = new Date();
  date.setHours(12, 0, 0, 0);
  date.setDate(date.getDate() - offset);
  return dayKey(date);
}

export function summarizeOrders(orders) {
  const revenueByArea = new Map();
  const ordersByDay = new Map();

  for (let offset = 6; offset >= 0; offset -= 1) {
    ordersByDay.set(dateKeyForOffset(offset), 0);
  }

  for (const order of orders) {
    const neighborhood = order.neighborhood || "Not recorded";
    revenueByArea.set(neighborhood, (revenueByArea.get(neighborhood) || 0) + order.total);

    const date = new Date(order.createdAt);
    if (!Number.isNaN(date.getTime())) {
      const key = dayKey(date);
      if (ordersByDay.has(key)) {
        ordersByDay.set(key, ordersByDay.get(key) + 1);
      }
    }
  }

  const revenueByNeighborhood = [...revenueByArea.entries()]
    .map(([neighborhood, revenue]) => ({ neighborhood, revenue }))
    .sort((a, b) => b.revenue - a.revenue || a.neighborhood.localeCompare(b.neighborhood));

  const dailyOrders = [...ordersByDay.entries()].map(([date, count]) => ({ date, orders: count }));
  const totalRevenue = orders.reduce((sum, order) => sum + order.total, 0);

  return {
    totalOrders: orders.length,
    totalRevenue,
    averageOrderValue: orders.length ? totalRevenue / orders.length : 0,
    revenueByNeighborhood,
    ordersByDay: dailyOrders,
  };
}
