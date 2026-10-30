import Account from "../../src/screens/Account";
import RequireAuth from "../../src/components/RequireAuth";

export const metadata = { title: "Account · Mesob House" };

export default function AccountPage() {
  return (
    <RequireAuth>
      <Account />
    </RequireAuth>
  );
}
