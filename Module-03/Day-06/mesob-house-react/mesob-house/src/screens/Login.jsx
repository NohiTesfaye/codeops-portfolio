
"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
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

const HERO_IMAGE =
  "https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=1200&q=85";

export default function Login() {
  const router = useRouter();
  const [authError, setAuthError] = useState("");

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

  async function onSubmit(data) {
    setAuthError("");

    if (data.channel !== "email") {
      setAuthError(
        "Email login is available in this demo. Choose Email Address to continue."
      );
      return;
    }

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "same-origin",
        body: JSON.stringify({
          email: data.email,
          password: data.pin,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        setAuthError(result.error || "Unable to sign in. Please try again.");
        return;
      }

      router.push("/");
      router.refresh();
    } catch {
      setAuthError(
        "Couldn't connect to the server. Please check your connection and try again."
      );
    }
  }

  return (
    <main className="login-page">
      <section className="login-layout">
        <div className="login-visual">
          <img
            className="login-visual-image"
            src={HERO_IMAGE}
            alt="A colourful meal prepared for sharing"
            onError={(event) => {
              event.currentTarget.style.display = "none";
            }}
          />

          <div className="login-visual-shade" />

          <a href="/" className="login-brand">
            <span className="login-brand-mark">M</span>
            <span>
              Mesob <em>House</em>
            </span>
          </a>

          <div className="login-visual-copy">
            <span className="login-kicker">WELCOME TO OUR TABLE</span>
            <h1>
              Good food.
              <br />
              <em>Good company.</em>
            </h1>
            <p>
              Come together over the flavours, warmth, and traditions of
              Ethiopian dining.
            </p>
            <div className="login-image-note">
              <span className="login-note-dot" />
              Made for sharing, made with care
            </div>
          </div>

          <div className="login-visual-footer">
            <span>ENKUAN DEHNA METAHU</span>
            <span>ETHIOPIAN HOSPITALITY, EVERY DAY</span>
          </div>
        </div>

        <div className="login-panel">
          <div className="login-panel-top">
            <span className="login-mobile-brand">
              <span className="login-brand-mark">M</span>
              Mesob <em>House</em>
            </span>
            <span className="login-secure-label">
              <LockIcon size={14} />
              Secure sign in
            </span>
          </div>

          <div className="login-heading">
            <span className="login-kicker">YOUR TABLE AWAITS</span>
            <h2>Welcome back.</h2>
            <p>Sign in to continue to Mesob House.</p>
          </div>

          {authError && (
            <div className="login-alert" role="alert">
              <span className="login-alert-icon">!</span>
              <span>{authError}</span>
            </div>
          )}

          <div className="login-social-stack">
            <button
              type="button"
              className="login-social-btn login-telebirr"
              onClick={() =>
                setAuthError(
                  "Telebirr sign-in is not configured in this demo yet."
                )
              }
            >
              <span className="login-social-icon">
                <TelebirrMark size={24} />
              </span>
              <span className="login-social-copy">
                <strong>Continue with Telebirr</strong>
                <small>Mobile payment integration coming later</small>
              </span>
              <ArrowRightIcon size={17} />
            </button>

            <button
              type="button"
              className="login-social-btn login-google"
              onClick={() =>
                setAuthError(
                  "Google sign-in is not configured in this demo yet."
                )
              }
            >
              <span className="login-social-icon">
                <GoogleMark size={21} />
              </span>
              <span className="login-social-copy">
                <strong>Continue with Google</strong>
                <small>Google authentication not connected</small>
              </span>
              <ArrowRightIcon size={17} />
            </button>
          </div>

          <div className="login-divider">
            <span />
            <p>OR SIGN IN WITH EMAIL</p>
            <span />
          </div>

          <div className="login-tabs" role="group" aria-label="Sign-in method">
            <button
              type="button"
              className={channel === "email" ? "active" : ""}
              aria-pressed={channel === "email"}
              onClick={() => {
                setAuthError("");
                setValue("channel", "email", { shouldValidate: true });
              }}
            >
              <MailIcon size={16} />
              Email
            </button>
            <button
              type="button"
              className={channel === "phone" ? "active" : ""}
              aria-pressed={channel === "phone"}
              onClick={() => {
                setAuthError("");
                setValue("channel", "phone", { shouldValidate: true });
              }}
            >
              <PhoneIcon size={16} />
              Mobile
            </button>
          </div>

          <form className="login-form" onSubmit={handleSubmit(onSubmit)} noValidate>
            {channel === "email" ? (
              <div className="login-field">
                <label htmlFor="login-email">Email address</label>
                <div className={`login-input-wrap ${errors.email ? "has-error" : ""}`}>
                  <MailIcon size={18} />
                  <input
                    id="login-email"
                    type="email"
                    autoComplete="email"
                    placeholder="you@example.com"
                    {...register("email")}
                  />
                </div>
                {errors.email && (
                  <p className="login-field-error">{errors.email.message}</p>
                )}
              </div>
            ) : (
              <div className="login-field">
                <label htmlFor="login-phone">Mobile number</label>
                <div className={`login-input-wrap ${errors.phone ? "has-error" : ""}`}>
                  <span className="login-country-code">ET +251</span>
                  <input
                    id="login-phone"
                    type="tel"
                    autoComplete="tel"
                    placeholder="91 123 4567"
                    {...register("phone")}
                  />
                </div>
                <p className="login-field-hint">
                  Phone-number sign-in is not enabled in this demo.
                </p>
                {errors.phone && (
                  <p className="login-field-error">{errors.phone.message}</p>
                )}
              </div>
            )}

            <div className="login-field">
              <label htmlFor="login-password">Password</label>
              <div className={`login-input-wrap ${errors.pin ? "has-error" : ""}`}>
                <LockIcon size={18} />
                <input
                  id="login-password"
                  type="password"
                  autoComplete="current-password"
                  placeholder="Enter your password"
                  {...register("pin")}
                />
              </div>
              {errors.pin && (
                <p className="login-field-error">{errors.pin.message}</p>
              )}
            </div>

            <label className="login-remember">
              <input type="checkbox" {...register("remember")} />
              <span className="login-custom-check" />
              <span>Remember me</span>
            </label>

            <button
              type="submit"
              className="login-submit"
              disabled={isSubmitting}
            >
              <span>{isSubmitting ? "Signing in..." : "Sign in to Mesob House"}</span>
              <ArrowRightIcon size={18} />
            </button>
          </form>

          <button
            type="button"
            className="login-guest"
            onClick={() => router.push("/")}
          >
            Continue as guest
          </button>

          <div className="login-member-note">
            <span className="login-member-icon">
              <AwardIcon size={20} />
            </span>
            <div>
              <strong>A little more to enjoy</strong>
              <p>
                Member rewards and online registration can be added when those
                features are connected.
              </p>
            </div>
          </div>

          <p className="login-legal">
            By continuing, you agree to use Mesob House responsibly.
          </p>
        </div>
      </section>
    </main>
  );
}
