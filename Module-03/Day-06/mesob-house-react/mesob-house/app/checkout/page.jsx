import Checkout from "../../src/screens/Checkout";
import RequireAuth from "../../src/components/RequireAuth";

export const metadata = { title: "Checkout · Mesob House" };

export default function CheckoutPage() {
  return (
    <RequireAuth>
      <Checkout />
    </RequireAuth>
  );
}
