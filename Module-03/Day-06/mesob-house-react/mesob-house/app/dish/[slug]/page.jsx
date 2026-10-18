import { notFound } from "next/navigation";
import { fetchMenu } from "../../../src/api";
import DishDetail from "../../../src/screens/DishDetail";

export const dynamic = "force-dynamic";

export default async function DishPage({ params }) {
  const { slug } = await params;

  let dishes;

  try {
    dishes = await fetchMenu();
  } catch {
    throw new Error("The menu service is temporarily unavailable.");
  }

  const dish = dishes.find((item) => item.slug === slug);

  if (!dish) {
    notFound();
  }

  return <DishDetail dish={dish} />;
}