import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";
import { loginSchema } from "../schemas/loginSchema";
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
  const signInWithGoogle = useAuthStore((s) => s.signInWithGoogle);
  const signInWithTelebirr = useAuthStore((s) => s.signInWithTelebirr);
  const signInWithPhone = useAuthStore((s) => s.signInWithPhone);
  const continueAsGuest = useAuthStore((s) => s.continueAsGuest);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      channel: "phone",
      phone: "",
      email: "",
      pin: "",
      remember: false,
    },
  });

  const channel = watch("channel");

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

  function onSubmit(data) {
    signInWithPhone(data.channel === "phone" ? data.phone : data.email);
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
          className={`tab-btn ${channel === "phone" ? "active" : ""}`}
          onClick={() => setValue("channel", "phone", { shouldValidate: true })}
        >
          <PhoneIcon size={16} /> Ethiopian Mobile (+251)
        </button>
        <button
          type="button"
          className={`tab-btn ${channel === "email" ? "active" : ""}`}
          onClick={() => setValue("channel", "email", { shouldValidate: true })}
        >
          <MailIcon size={16} /> Email Address
        </button>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        {channel === "phone" ? (
          <>
            <label className="field-label">
              Mobile Number <span className="field-hint">Ethio Telecom / Safaricom</span>
            </label>
            <div className={`phone-field ${errors.phone ? "field-error" : ""}`}>
              <span className="flag">ET +251</span>
              <input type="tel" placeholder="91 123 4567" {...register("phone")} />
            </div>
            {errors.phone && <p className="field-error-msg">{errors.phone.message}</p>}
          </>
        ) : (
          <>
            <label className="field-label">Email Address</label>
            <div className={`phone-field ${errors.email ? "field-error" : ""}`}>
              <input type="email" placeholder="you@example.com" {...register("email")} />
            </div>
            {errors.email && <p className="field-error-msg">{errors.email.message}</p>}
          </>
        )}

        <label className="field-label" style={{ marginTop: 14 }}>
          Secret Password / PIN
        </label>
        <div className={`phone-field ${errors.pin ? "field-error" : ""}`}>
          <LockIcon size={16} />
          <input type="password" placeholder="••••••••" {...register("pin")} />
        </div>
        {errors.pin && <p className="field-error-msg">{errors.pin.message}</p>}

        <div className="remember-row">
          <label>
            <input type="checkbox" {...register("remember")} />
            Remember me on this phone
          </label>
          <a href="#forgot" onClick={(e) => e.preventDefault()}>
            Forgot PIN?
          </a>
        </div>

        <button type="submit" className="primary-btn signin-btn" disabled={isSubmitting}>
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
