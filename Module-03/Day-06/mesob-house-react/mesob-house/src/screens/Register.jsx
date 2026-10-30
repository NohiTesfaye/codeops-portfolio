"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { registerSchema } from "../schemas/registerSchema";
import { registerUser, safeNextPath, useSession } from "../lib/clientAuth";
import { EyeIcon, LockIcon, MailIcon, UserIcon } from "../Icons";

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

export default function Register() {
  const router = useRouter();
  const { status } = useSession();
  const [formError, setFormError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(registerSchema),
    defaultValues: { name: "", email: "", password: "" },
  });

  useEffect(() => {
    if (status === "authenticated") router.replace(safeNextPath());
  }, [status, router]);

  async function onSubmit(data) {
    setFormError("");
    const result = await registerUser(data);

    if (result.ok) return; // the session change redirects us (see effect above)

    if (result.field) {
      setError(result.field, { message: result.error });
    } else {
      setFormError(result.error);
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

        <h1 className="ui-title">Create your account</h1>
        <p className="ui-sub">Join Mesob House to order, save your details and come back anytime.</p>

        {formError && (
          <div className="ui-notice ui-notice--error" role="alert">
            {formError}
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <div className="ui-field">
            <label className="ui-label" htmlFor="reg-name">
              Full name
            </label>
            <div className={`ui-input ${errors.name ? "has-error" : ""}`}>
              <UserIcon size={18} />
              <input
                id="reg-name"
                autoComplete="name"
                placeholder="Abebe Bekele"
                aria-invalid={Boolean(errors.name)}
                {...register("name")}
              />
            </div>
            {errors.name && <p className="ui-error">{errors.name.message}</p>}
          </div>

          <div className="ui-field">
            <label className="ui-label" htmlFor="reg-email">
              Email
            </label>
            <div className={`ui-input ${errors.email ? "has-error" : ""}`}>
              <MailIcon size={18} />
              <input
                id="reg-email"
                type="email"
                inputMode="email"
                autoComplete="email"
                autoCapitalize="none"
                spellCheck="false"
                placeholder="you@example.com"
                aria-invalid={Boolean(errors.email)}
                {...register("email")}
              />
            </div>
            {errors.email && <p className="ui-error">{errors.email.message}</p>}
          </div>

          <div className="ui-field">
            <label className="ui-label" htmlFor="reg-password">
              Password <span className="ui-label-hint">(at least 8 characters)</span>
            </label>
            <div className={`ui-input ${errors.password ? "has-error" : ""}`}>
              <LockIcon size={18} />
              <input
                id="reg-password"
                type={showPassword ? "text" : "password"}
                autoComplete="new-password"
                placeholder="Create a password"
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
            {errors.password && <p className="ui-error">{errors.password.message}</p>}
          </div>

          <button type="submit" className="ui-btn ui-btn--primary" disabled={isSubmitting}>
            {isSubmitting ? "Creating account…" : "Create account"}
          </button>
        </form>

        <p className="ui-footnote">
          Already have an account?{" "}
          <Link href="/login" className="ui-link">
            Sign in
          </Link>
        </p>
      </div>
    </main>
  );
}
