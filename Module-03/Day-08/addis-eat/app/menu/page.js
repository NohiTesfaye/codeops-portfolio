import Link from "next/link";
import { Suspense } from "react";

export const revalidate = 60;

async function DishList() {
  await new Promise((resolve) => setTimeout(resolve, 1000));

  return (
    <ul>
      <li><Link href="/menu/1">Doro Wat</Link></li>
      <li><Link href="/menu/2">Tibs</Link></li>
      <li><Link href="/menu/3">Shiro</Link></li>
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