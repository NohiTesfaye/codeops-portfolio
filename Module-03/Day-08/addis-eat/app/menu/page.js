import Link from "next/link";
import { Suspense } from "react";
import { db } from "../../db";

export const revalidate = 60;

async function DishList() {
  const dishes = await db.dish.findMany();

  // Simulate a slow database response so the Suspense fallback can stream first.
  await new Promise((resolve) => setTimeout(resolve, 1000));

  return (
    <ul>
      {dishes
        .filter((dish) => dish.available)
        .map((dish) => (
          <li key={dish.id}>
            <Link href={`/menu/${dish.id}`}>
              {dish.name} - {dish.price} {dish.currency}
            </Link>
          </li>
        ))}
    </ul>
  );
}

function DishSkeleton() {
  return <p>Loading dishes...</p>;
}

export default function MenuPage() {
  return (
    <main>
      <h1>Addis Eats Menu</h1>

      <Suspense fallback={<DishSkeleton />}>
        <DishList />
      </Suspense>
    </main>
  );
}