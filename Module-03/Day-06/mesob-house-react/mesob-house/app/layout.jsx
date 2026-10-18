import "../src/index.css";
import AppShell from "../src/components/AppShell";

export const metadata = {
  title: "Mesob House",
  description: "Traditional Ethiopian dining",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <AppShell>{children}</AppShell>
      </body>
    </html>
  );
}
