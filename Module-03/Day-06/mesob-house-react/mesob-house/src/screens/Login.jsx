"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { loginSchema } from "../schemas/loginSchema";
import { EyeIcon, GoogleMark, LockIcon, MailIcon, TelebirrMark } from "../Icons";

function EyeOffIcon({ size = 18 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M2.5 12S6 5.5 12 5.5 21.5 12 21.5 12 18 18.5 12 18.5 2.5 12 2.5 12Z" />
      <circle cx="12" cy="12" r="2.6" />
      <path d="M4 4l16 16" />
    </svg>
  );
}

export default function Login() {
  const router = useRouter();
  const [notice, setNotice] = useState(null); // { type: "error" | "info", text }
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "" },
  });

  async function onSubmit(data) {
    setNotice(null);

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "same-origin",
        body: JSON.stringify({ email: data.email, password: data.password }),
      });

      const result = await response.json().catch(() => ({}));

      if (!response.ok) {
        setNotice({
          type: "error",
          text: result.error || "Unable to sign in. Please try again.",
        });
        return;
      }

      router.push("/");
      router.refresh();
    } catch {
      setNotice({
        type: "error",
        text: "Couldn't connect to the server. Check your connection and try again.",
      });
    }
  }

  return (
    <main className="auth-page">
      <div className="ui-wrap">
        <a href="/" className="ui-brand">
          <span className="ui-brand-mark">M</span>
          <span>
            Mesob <em>House</em>
          </span>
        </a>

        <h1 className="ui-title">Welcome back!</h1>
        <p className="ui-sub">
          Sign in to order your favourites and track your deliveries.
        </p>

        {notice && (
          <div
            className={`ui-notice ui-notice--${notice.type}`}
            role={notice.type === "error" ? "alert" : "status"}
          >
            {notice.text}
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <div className="ui-field">
            <label className="ui-label" htmlFor="login-email">
              Email
            </label>
            <div className={`ui-input ${errors.email ? "has-error" : ""}`}>
              <MailIcon size={18} />
              <input
                id="login-email"
                type="email"
                inputMode="email"
                autoComplete="email"
                autoCapitalize="none"
                spellCheck="false"
                placeholder="Enter your email"
                aria-invalid={Boolean(errors.email)}
                {...register("email")}
              />
            </div>
            {errors.email && <p className="ui-error">{errors.email.message}</p>}
          </div>

          <div className="ui-field">
            <label className="ui-label" htmlFor="login-password">
              Password
            </label>
            <div className={`ui-input ${errors.password ? "has-error" : ""}`}>
              <LockIcon size={18} />
              <input
                id="login-password"
                type={showPassword ? "text" : "password"}
                autoComplete="current-password"
                placeholder="Enter your password"
                aria-invalid={Boolean(errors.password)}
                {...register("password")}
              />
              <button
                type="button"
                className="ui-icon-btn"
                onClick={() => setShowPassword((v) => !v)}
                aria-label={showPassword ? "Hide password" : "Show password"}
                aria-pressed={showPassword}
              >
                {showPassword ? <EyeOffIcon /> : <EyeIcon size={18} />}
              </button>
            </div>
            {errors.password && (
              <p className="ui-error">{errors.password.message}</p>
            )}
          </div>

          <div className="ui-row-end">
            <button
              type="button"
              className="ui-link"
              onClick={() =>
                setNotice({
                  type: "info",
                  text: "Password reset isn't available yet. Please contact the restaurant for help.",
                })
              }
            >
              Forgot password?
            </button>
          </div>

          <button type="submit" className="ui-btn ui-btn--primary" disabled={isSubmitting}>
            {isSubmitting ? "Signing in…" : "Sign in"}
          </button>
        </form>

        <div className="ui-divider">
          <span>OR</span>
        </div>

        <button type="button" className="ui-btn ui-btn--outline" disabled>
          <GoogleMark size={18} />
          Continue with Google <span className="soon-pill">Soon</span>
        </button>
        <button type="button" className="ui-btn ui-btn--outline" disabled>
          <TelebirrMark size={20} />
          Continue with Telebirr <span className="soon-pill">Soon</span>
        </button>

        <button
          type="button"
          className="ui-btn ui-btn--ghost"
          onClick={() => router.push("/")}
        >
          Continue as guest
        </button>

        <p className="ui-footnote">
          Don&apos;t have an account?{" "}
          <button
            type="button"
            className="ui-link"
            onClick={() =>
              setNotice({
                type: "info",
                text: "Online sign-up isn't available yet. You can continue as a guest to order.",
              })
            }
          >
            Sign up
          </button>
        </p>
      </div>
    </main>
  );
}