
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { UserIcon } from "../Icons";

export default function Account() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [signingOut, setSigningOut] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;

    async function loadUser() {
      try {
        const response = await fetch("/api/auth/me", {
          cache: "no-store",
        });

        const result = await response.json();

        if (!response.ok || !result.user) {
          router.replace("/login");
          return;
        }

        if (active) {
          setUser(result.user);
        }
      } catch {
        if (active) {
          setError("Unable to verify your session. Please try again.");
        }
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    }

    loadUser();

    return () => {
      active = false;
    };
  }, [router]);

  async function handleSignOut() {
    setError("");
    setSigningOut(true);

    try {
      const response = await fetch("/api/auth/logout", {
        method: "POST",
      });

      if (!response.ok) {
        throw new Error("Logout failed");
      }

      router.replace("/login");
      router.refresh();
    } catch {
      setError("Could not sign out. Please try again.");
      setSigningOut(false);
    }
  }

  return (
    <>
      <div className="topbar">
        <div className="brand">Account</div>
        <div className="tagline">
          Manage your Mesob House profile
        </div>
      </div>

      <div className="screen">
        {loading ? (
          <p>Loading your account...</p>
        ) : user ? (
          <>
            <div className="account-card">
              <div className="account-avatar">
                <UserIcon size={26} />
              </div>

              <div>
                <div className="dish-name">
                  {user.email}
                </div>

                <div
                  className="detail-meta"
                  style={{ margin: 0 }}
                >
                  Signed in with demo email
                </div>
              </div>
            </div>

            <button
              className="primary-btn"
              style={{
                background: "#fff",
                color: "var(--maroon)",
                border: "1px solid var(--line)",
              }}
              onClick={handleSignOut}
              disabled={signingOut}
            >
              {signingOut ? "Signing out..." : "Sign out"}
            </button>
          </>
        ) : (
          <p>Unable to load your account.</p>
        )}

        {error && (
          <p className="field-error-msg" role="alert">
            {error}
          </p>
        )}
      </div>
    </>
  );
}
