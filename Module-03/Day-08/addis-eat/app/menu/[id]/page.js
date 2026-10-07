import Link from "next/link";
import { notFound } from "next/navigation";
import { db, getDish } from "../../../db";

export async function generateStaticParams() {
  const dishes = await db.dish.findMany();

  return dishes.map((dish) => ({
    id: dish.id,
  }));
}

export default async function DishPage({ params }) {
  const { id } = await params;
  const dish = await getDish(id);

  if (!dish) {
    notFound();
  }

  return (
    <main>
      <h1>{dish.name}</h1>
      <p>{dish.description}</p>
      <p>
        <strong>
          {dish.price} {dish.currency}
        </strong>
      </p>
      <p>Category: {dish.category}</p>

      <Link href="/menu">Back to Menu</Link>
    </main>
  );
}