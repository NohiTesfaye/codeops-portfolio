import Link from "next/link";

export default function MenuLayout({ children }) {
  return (
    <div className="menu-layout">
      <aside>
        <h2>Categories</h2>

        <nav>
          <ul>
            <li>
              <Link href="/menu">All Dishes</Link>
            </li>
            <li>
              <Link href="/menu?category=breakfast">Breakfast</Link>
            </li>
            <li>
              <Link href="/menu?category=lunch">Lunch</Link>
            </li>
            <li>
              <Link href="/menu?category=dinner">Dinner</Link>
            </li>
          </ul>
        </nav>
      </aside>

      <section>{children}</section>
    </div>
  );
}