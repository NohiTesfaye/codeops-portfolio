import Link from "next/link";

export default function HomePage() {
  return (
    <main>
      <h1>Welcome to Addis Eats</h1>
      <p>Discover delicious Ethiopian dishes.</p>
      <Link href="/menu">View Menu</Link>
    </main>
  );
}