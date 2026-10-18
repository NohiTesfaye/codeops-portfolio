# Addis Eats — Component and Security Boundaries

## Server Components
- app/layout.js owns the document shell and metadata.
- app/menu/layout.js owns the persistent menu sidebar.
- app/menu/page.js reads available dishes from db.js.
- app/menu/[id]/page.js resolves dish details.
- app/checkout/page.js reads request cookies and renders the checkout form.

## Client Components
- app/checkout/OrderForm.js uses useActionState to submit and display feedback.
- app/menu/error.js is a Client Component because it supports retry.
- Browser state and event handlers belong in Client Components.

## Order mutation boundary
- app/checkout/actions.js validates submitted data using schema.js.
- The server verifies that a submitted dish exists and is available.
- The server calculates totals using trusted server-side dish prices.
- Prices, totals, user IDs, and order statuses supplied by the browser are not trusted.
- Invalid names, phones, quantities, and dish IDs must be rejected by the server.

## Data limitations
- db.js contains mock in-memory data; orders are not persistent.
- The mock session is not real authentication.
- Checkout is not a real payment integration.

## Error handling
- app/menu/loading.js provides menu loading UI.
- app/menu/error.js handles menu errors and retries.
- app/not-found.js handles missing routes and dishes.

## Verification evidence
- BUILD_OUTPUT.txt records the production build.
- Required routes were checked with curl.exe.
- Invalid order input and browser price tampering were tested.
- The checkout form was tested with JavaScript disabled.
