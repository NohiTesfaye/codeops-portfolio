 Addis Eats (Mesob House) — Capstone Brief

 1. The problem

Ordering traditional Ethiopian food can still be a bit inconvenient. Customers may need to call the restaurant, ask what is available, and try to keep track of their order without seeing everything in one place.

Addis Eats, built for Mesob House, brings the process into one simple application. Customers can browse the menu, see the chef's specials for the day, view details about each dish, add items to their cart, and provide their delivery information before placing an order. The menu information comes from a live API.

 2. The user

The main user is someone in Addis Ababa who wants to order Ethiopian food easily. This could be a busy professional, someone visiting Addis from abroad, or a regular customer of the restaurant.

The user should be able to:

-> Sign in using phone/email, Google, or Telebirr.
-> Browse the full menu by category.
-> Filter the menu without having to reload the page.
-> See today's chef-selected specials separately.
-> Open a dish to see its ingredients, spice level, and price.
-> Add items to a cart and change quantities.
-> Enter delivery or pickup information and complete the checkout process.

 3. The five core screens and their data

|  | Screen           | Route                | Data source          | Description                                                                                                                                                                                               |
| - | ---------------- | -------------------- | -------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1 | Sign In          | `/login`             | Local form state     | The user can sign in using either phone or email and a PIN. The form uses react-hook-form and Zod for validation. After a successful login, the authentication information is saved in the Zustand store. |
| 2 | Full Menu        | `/`                  | `GET /menu/`         | The menu is loaded from the API and grouped by category on the client side. Category filters work locally without making another API request.                                                             |
| 3 | Today's Specials | `/specials`          | `GET /menu/specials` | Shows the dishes currently marked as specials by the restaurant.                                                                                                                                          |
| 4 | Dish Detail      | `/dish/:slug`        | `GET /menu/`         | The application gets the dish slug from the URL and finds the matching dish from the menu data. There is currently no separate API endpoint for one dish.                                                 |
| 5 | Cart → Checkout  | `/cart`, `/checkout` | Zustand cart store   | The cart is managed on the client side. At checkout, the customer enters their contact and delivery information, and the cart is cleared after submitting the order.                                      |

An additional `/account` screen is included for signing out, but it is not part of the five required screens.

 4. Route map

```text
/login              Login          Public
/                   Menu           Protected
/specials           Specials       Protected
/dish/:slug         DishDetail     Protected
/cart               Cart           Protected
/checkout           Checkout       Protected
/account            Account        Protected
```

The login page is the only public page. If the user is not authenticated, the application takes them back to the login screen even if they try to access another route directly.

 5. Component tree

```text
App
├─ ErrorBoundary
│  └─ Suspense
│     ├─ Login
│     │  ├─ Social sign-in buttons
│     │  └─ Phone/email + PIN form
│     │
│     └─ Authenticated pages
│        ├─ Menu
│        │  ├─ Category filter
│        │  └─ DishCard[]
│        │
│        ├─ Specials
│        │  ├─ Special hero banner
│        │  └─ DishCard[]
│        │
│        ├─ DishDetail
│        │  └─ Add to basket
│        │
│        ├─ Cart
│        │  └─ Cart items + quantity controls
│        │
│        ├─ Checkout
│        │  └─ Delivery form
│        │
│        └─ Account
│           └─ Sign out
│
└─ BottomNav
   ├─ Specials
   ├─ Menu
   ├─ Cart
   └─ Account
```

`DishCard` is reused in the Menu and Specials pages and for the cart item display. It receives the dish information and add-to-cart action from the parent component instead of managing that data itself.

 6. Where the state lives

| State                     | Owner                               | Reason                                                                                                                         |
| ------------------------- | ----------------------------------- | ------------------------------------------------------------------------------------------------------------------------------ |
| `isAuthenticated`, `user` | `useAuthStore` (Zustand)            | Authentication is needed by several parts of the application, including route protection, navigation, and the Account page.    |
| `items` (cart contents)   | `useCartStore` (Zustand)            | The cart is used by the menu, dish details, cart, checkout, and navigation badge, so it needs to be shared between components. |
| Menu data                 | Local state in `Menu.jsx`           | Only the Menu page needs the complete menu list.                                                                               |
| Specials data             | Local state in `Specials.jsx`       | The data is only needed by the Specials page.                                                                                  |
| Active category           | Local state in `Menu.jsx`           | This is only a UI filter and does not need to be shared.                                                                       |
| Current dish              | URL parameter in `DishDetail.jsx`   | The dish slug comes directly from the URL, so there is no need to store it separately.                                         |
| Login fields              | `react-hook-form` in `Login.jsx`    | The form data is only needed while the user is signing in.                                                                     |
| Checkout fields           | `react-hook-form` in `Checkout.jsx` | These fields are only needed during checkout.                                                                                  |

 7. Known follow-ups

There are a few things that could be improved in a future version, but they do not prevent the current project from working.

-> ->->Single-dish API:->-> The current Dish Detail page loads the full menu and finds the dish by its slug. If the backend adds a `/menu/:slug` endpoint later, the page can use that instead.
-> ->->Google and Telebirr login:->-> These are currently demo implementations because real OAuth and Telebirr credentials are not available for the project.
-> ->->Real checkout:->-> The current checkout does not connect to a real payment or order-processing system. It clears the cart locally and displays a confirmation message.
