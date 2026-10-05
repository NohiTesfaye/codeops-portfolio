export const dynamic = "force-dynamic";

export default function CheckoutPage() {
  // Checkout uses request-time data, so this route must be dynamic.
  return (
    <main>
      <h1>Checkout</h1>
      <p>Complete your order here.</p>
    </main>
  );
}