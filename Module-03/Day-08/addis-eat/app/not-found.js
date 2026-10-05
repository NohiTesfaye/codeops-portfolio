import Link from "next/link";

export default function NotFound() {
  return (
    <main>
      <h1>Dish Not Found</h1>
      <p>Sorry, the page you are looking for does not exist.</p>
      <Link href="/menu">Back to Menu</Link>
    </main>
  );
}