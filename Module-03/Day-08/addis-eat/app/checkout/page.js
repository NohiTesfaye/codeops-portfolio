import { cookies } from "next/headers";
import OrderForm from "./OrderForm";

export const dynamic = "force-dynamic";

export default async function CheckoutPage() {
  const cookieStore = await cookies();
  const cartId = cookieStore.get("cartId")?.value;

  return (
    <main>
      <h1>Checkout</h1>
      <p>Review your details and place your order.</p>
      {cartId && <p>Cart ID: {cartId}</p>}
      <OrderForm />
    </main>
  );
}
