import Link from "next/link";

export default function NotFound() {
  return (
    <main className="screen empty-state">
      <h1>Page not found</h1>
      <p>The page or dish you requested does not exist.</p>
      <Link href="/" className="primary-btn">
        Return to Menu
      </Link>
    </main>
  );
}