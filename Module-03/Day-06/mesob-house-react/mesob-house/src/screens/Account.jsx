"use client";

import { useRouter } from "next/navigation";
import { logoutUser, useSession } from "../lib/clientAuth";
import { UserIcon } from "../Icons";

export default function Account() {
  const router = useRouter();
  const { user } = useSession();

  function handleSignOut() {
    logoutUser();
    router.replace("/login");
  }

  const memberSince = user?.createdAt
    ? new Date(user.createdAt).toLocaleDateString(undefined, {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : null;

  return (
    <>
      <div className="topbar">
        <div className="brand">Account</div>
        <div className="tagline">Manage your Mesob House profile</div>
      </div>

      <div className="screen">
        {user ? (
          <>
            <div className="account-card">
              <div className="account-avatar">
                <UserIcon size={26} />
              </div>

              <div>
                <div className="dish-name">{user.name}</div>
                <div className="detail-meta" style={{ margin: 0 }}>
                  {user.email}
                  {memberSince ? ` · Member since ${memberSince}` : ""}
                </div>
              </div>
            </div>

            <button
              className="primary-btn"
              style={{
                background: "#fff",
                color: "var(--accent)",
                border: "1px solid var(--line)",
              }}
              onClick={handleSignOut}
            >
              Sign out
            </button>
          </>
        ) : (
          <p className="loading">Loading your account…</p>
        )}
      </div>
    </>
  );
}
