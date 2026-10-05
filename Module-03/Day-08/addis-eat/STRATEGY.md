# Addis Eats Rendering Strategy

| Route | Strategy | Why |
|---|---|---|
| `/` | Static | Home content does not change frequently. |
| `/menu` | ISR | Menu uses `revalidate = 60` so content can be refreshed periodically. |
| `/menu/[id]` | Static | `generateStaticParams` pre-generates known dish pages. |
| `/cart` | Static | Cart page does not require request-time server data. |
| `/checkout` | Dynamic | Checkout uses request-time data, so it must be rendered dynamically. |
| Not Found | Static | The not-found page is a static error UI. |