# Addis Eats dashboard: verification guide

## 1. Apply and build

Extract the contents of this patch directly into the existing `Module-03/Day-08/addis-eat` folder. From that folder, run:

```powershell
Set-ExecutionPolicy -Scope Process Bypass
.\apply-dashboard.ps1
npm run build
```

The script adds a read-only `getOrders()` export only when `db.js` contains a top-level `orders` array and does not already export that function. If the script stops because your array has another name, it intentionally avoids editing `db.js`; use the snippet in `db-orders-export.txt` and adapt the array identifier to the one used by `createOrder()`.

## 2. Open the app

In one terminal, run `npm run dev`. Open these URLs in the browser using the local port shown in the terminal:

| State | URL |
|---|---|
| Dashboard empty state | `/dashboard?demo=empty` |
| Dashboard charts and totals | `/dashboard?demo=data` |
| Dashboard loading skeleton | `/dashboard?demo=loading` |
| Dashboard error boundary | `/dashboard?demo=error` |
| Orders empty state | `/orders?demo=empty` |
| Orders populated table, sorted by total descending | `/orders?demo=data&sort=total&dir=desc&page=1` |
| Orders page 2 | `/orders?demo=data&sort=total&dir=desc&page=2` |
| Orders loading skeleton (five placeholder rows) | `/orders?demo=loading` |
| Orders error boundary | `/orders?demo=error` |
| Real in-memory orders | `/orders` and `/dashboard` |

The `demo` query is a training/QA switch. `demo=data` uses illustrative sample orders and does not write them to the real order store. Normal requests read the order store. Remove or gate the demo query modes before treating this learning project as a production application.

## 3. Verify behavior

- Revenue is summed on the server by neighbourhood and passed as an aggregate; raw orders/customer details are not passed to the client chart.
- The revenue SVG is inside a fixed-height viewport and formats values in Ethiopian birr (ETB); an HTML table repeats its data.
- The orders-per-day chart names the last-seven-days range and `orders` unit; a data table repeats all seven daily values.
- The orders table uses `<table>`, `<caption>`, `<thead>`, `<tbody>`, column scope, and URL links to sort and paginate at five rows per page.
- Sorting/pagination preserve the demo mode when it is present. Try changing a header, then copy the resulting URL to another tab.
- JavaScript is needed only for the interactive chart and error-boundary retry control; the order table and its navigation are server-rendered links.

## 4. Commit only these changes

From the repository root, review `git status --short`, then stage only the dashboard work. Do not stage `.next/`, `node_modules/`, or unrelated local deletions.

```powershell
git add Module-03/Day-08/addis-eat/app/dashboard Module-03/Day-08/addis-eat/app/orders Module-03/Day-08/addis-eat/db.js Module-03/Day-08/addis-eat/apply-dashboard.ps1 Module-03/Day-08/addis-eat/db-orders-export.txt Module-03/Day-08/addis-eat/DASHBOARD-VERIFICATION.md
git diff --cached --check
git diff --cached --stat
git commit -m "Build Addis Eats analytics dashboard"
git push origin main
```

The application currently uses an in-memory mock order store, so orders can disappear on server restart and are not suitable for production reporting without persistent storage.
