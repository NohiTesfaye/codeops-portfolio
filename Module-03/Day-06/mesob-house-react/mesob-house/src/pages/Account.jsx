import { useNavigate } from "react-router-dom";
import { useAuth } from "../AuthContext";
import { UserIcon } from "../Icons";

export default function Account() {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  return (
    <>
      <div className="topbar">
        <div className="brand">Account</div>
        <div className="tagline">Manage your Mesob House profile</div>
      </div>

      <div className="screen">
        <div className="account-card">
          <div className="account-avatar">
            <UserIcon size={26} />
          </div>
          <div>
            <div className="dish-name">{user?.name || "Guest"}</div>
            <div className="detail-meta" style={{ margin: 0 }}>
              Signed in with {user?.method || "Guest access"}
            </div>
          </div>
        </div>

        <button
          className="primary-btn"
          style={{ background: "#fff", color: "var(--maroon)", border: "1px solid var(--line)" }}
          onClick={() => {
            signOut();
            navigate("/login");
          }}
        >
          Sign out
        </button>
      </div>
    </>
  );
}
