import { cookies } from "next/headers";

export const dynamic = "force-dynamic";

export default async function CheckoutPage() {
  // Reading cookies requires request-time data, so this route must be dynamic.
  const cookieStore = await cookies();
  const cartId = cookieStore.get("cartId")?.value;

  return (
    <main>
      <h1>Checkout</h1>
      <p>Complete your order here.</p>
      {cartId && <p>Cart ID: {cartId}</p>}
    </main>
  );
}