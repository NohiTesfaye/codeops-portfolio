import "./globals.css";

export const metadata = {
  title: "Addis Eats",
  description: "Discover delicious Ethiopian dishes",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <header>
          <nav>
            <h1>Addis Eats</h1>
          </nav>
        </header>

        <main>{children}</main>

        <footer>
          <p>© 2026 Addis Eats</p>
        </footer>
      </body>
    </html>
  );
}