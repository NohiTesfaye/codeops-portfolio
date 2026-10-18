# Mesob House — Next.js Rendering Strategy

## Folder tree

mesob-house/
├── app/
│   ├── layout.jsx
│   ├── page.jsx
│   ├── error.jsx
│   ├── not-found.jsx
│   ├── specials/page.jsx
│   ├── dish/[slug]/page.jsx
│   ├── cart/page.jsx
│   ├── checkout/page.jsx
│   ├── account/page.jsx
│   └── login/page.jsx
├── src/
│   ├── api.js
│   ├── components/
│   ├── screens/
│   ├── schemas/
│   └── store/
├── STRATEGY.md
├── BOUNDARY.md
└── BUILD_OUTPUT.txt

## Verified route strategies

| Route | Strategy | Reason |
|---|---|---|
| / | Dynamic | Menu data is fetched on the server per request. |
| /specials | Dynamic | Specials data is fetched on the server per request. |
| /dish/[slug] | Dynamic | Server fetch resolves the dish and calls notFound() when absent. |
| /cart | Static shell with client state | Basket controls use Zustand and browser interactions. |
| /checkout | Static shell with client interaction | Checkout uses React Hook Form and displays a mock confirmation. |
| /account | Static shell with client state | Account uses the mock authentication store. |
| /login | Static shell with client interaction | Login uses React Hook Form and mock sign-in actions. |
| Unknown routes | Not-found boundary | app/not-found.jsx renders the fallback. |

## Boundaries and limitations

- Menu and specials content is fetched on the server.
- Client Components handle category filters, basket controls, and login forms.
- API failures display a useful fallback message.
- Zustand state and mock authentication are prototype features.
- Checkout does not process real payments or persist orders.

## Verification

- Production build output is recorded in BUILD_OUTPUT.txt.
- All seven required routes returned HTTP 200.
- An existing dish returned HTTP 200.
- An unknown dish returned HTTP 404.
- API failure behavior was tested for the menu.
- JavaScript-disabled rendering must be checked in the browser.
