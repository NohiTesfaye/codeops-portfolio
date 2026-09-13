import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../AuthContext";
import {
  ArrowRightIcon,
  AwardIcon,
  GoogleMark,
  LockIcon,
  MailIcon,
  PhoneIcon,
  TelebirrMark,
} from "../Icons";

export default function Login() {
  const navigate = useNavigate();
  const {
    signInWithGoogle,
    signInWithTelebirr,
    signInWithPhone,
    continueAsGuest,
  } = useAuth();

  const [tab, setTab] = useState("phone"); // phone | email
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [pin, setPin] = useState("");
  const [remember, setRemember] = useState(false);

  function goHome() {
    navigate("/");
  }

  function handleGoogle() {
    signInWithGoogle();
    goHome();
  }

  function handleTelebirr() {
    signInWithTelebirr();
    goHome();
  }

  function handleGuest() {
    continueAsGuest();
    goHome();
  }

  function handleSignIn(e) {
    e.preventDefault();
    signInWithPhone(tab === "phone" ? phone : email);
    goHome();
  }

  return (
    <div className="screen login-screen">
      <div className="login-eyebrow">Enkuan Dehna Metahu</div>

      <div className="login-hero">
        <div className="login-hero-thumb">
          <LockIcon size={26} />
        </div>
        <div>
          <h1 className="login-title">Welcome to the Mesob Table</h1>
          <p className="login-sub">
            Sign in to manage your feasts, Telebirr rewards, and reserved dining
            mesobs.
          </p>
        </div>
      </div>

      <button className="social-btn telebirr-btn" onClick={handleTelebirr}>
        <TelebirrMark size={28} />
        <span>
          <strong>Telebirr SuperApp Fast Login</strong>
          <small>Instant one-tap verification via Ethio Telecom</small>
        </span>
        <ArrowRightIcon size={16} />
      </button>

      <button className="social-btn google-btn" onClick={handleGoogle}>
        <GoogleMark size={22} />
        <span>
          <strong>Continue with Google</strong>
        </span>
      </button>

      <div className="divider">
        <span>OR WITH PHONE / EMAIL</span>
      </div>

      <div className="tab-row">
        <button
          type="button"
          className={`tab-btn ${tab === "phone" ? "active" : ""}`}
          onClick={() => setTab("phone")}
        >
          <PhoneIcon size={16} /> Ethiopian Mobile (+251)
        </button>
        <button
          type="button"
          className={`tab-btn ${tab === "email" ? "active" : ""}`}
          onClick={() => setTab("email")}
        >
          <MailIcon size={16} /> Email Address
        </button>
      </div>

      <form onSubmit={handleSignIn}>
        {tab === "phone" ? (
          <>
            <label className="field-label">
              Mobile Number <span className="field-hint">Ethio Telecom / Safaricom</span>
            </label>
            <div className="phone-field">
              <span className="flag">ET +251</span>
              <input
                type="tel"
                placeholder="91 123 4567"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>
          </>
        ) : (
          <>
            <label className="field-label">Email Address</label>
            <div className="phone-field">
              <input
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </>
        )}

        <label className="field-label" style={{ marginTop: 14 }}>
          Secret Password / PIN
        </label>
        <div className="phone-field">
          <LockIcon size={16} />
          <input
            type="password"
            placeholder="••••••••"
            value={pin}
            onChange={(e) => setPin(e.target.value)}
          />
        </div>

        <div className="remember-row">
          <label>
            <input
              type="checkbox"
              checked={remember}
              onChange={(e) => setRemember(e.target.checked)}
            />
            Remember me on this phone
          </label>
          <a href="#forgot" onClick={(e) => e.preventDefault()}>
            Forgot PIN?
          </a>
        </div>

        <button type="submit" className="primary-btn signin-btn">
          Sign In to Mesob House <ArrowRightIcon size={16} />
        </button>
      </form>

      <button className="guest-btn" onClick={handleGuest}>
        Continue as Guest
      </button>

      <div className="register-banner">
        <div className="register-copy">
          <strong>New to our dining family?</strong>
          <p>Join the Mesob Table and get 50 ETB welcome credit.</p>
        </div>
        <a href="#register" onClick={(e) => e.preventDefault()}>
          Register
        </a>
      </div>

      <div className="benefits-card">
        <div className="benefits-title">
          <AwardIcon size={16} />
          Mesob Member Benefits
          <span className="gursha-tier">GURSHA TIER</span>
        </div>
        <div className="benefits-row">
          <div className="benefit-pill">
            <AwardIcon size={18} />
            <strong>10 Gursha Pts</strong>
            <small>Per ETB 100 spent</small>
          </div>
          <div className="benefit-pill">
            <AwardIcon size={18} />
            <strong>Free Bole Drop</strong>
            <small>Kazanchis &amp; Bole zone</small>
          </div>
          <div className="benefit-pill">
            <AwardIcon size={18} />
            <strong>Jebena Buna</strong>
            <small>Sunday Roasting VIP</small>
          </div>
        </div>
      </div>
    </div>
  );
}
