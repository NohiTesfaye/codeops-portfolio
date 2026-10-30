"use client";

import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useCartStore, useCartTotalPrice } from "../store/useCartStore";
import { checkoutSchema } from "../schemas/checkoutSchema";
import { ArrowRightIcon, BackArrowIcon, UserIcon } from "../Icons";

function Svg({ size = 18, children }) {
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
      {children}
    </svg>
  );
}

const PinIcon = () => (
  <Svg>
    <path d="M12 21s7-6.2 7-11.5A7 7 0 0 0 5 9.5C5 14.8 12 21 12 21Z" />
    <circle cx="12" cy="9.5" r="2.4" />
  </Svg>
);

const HomeIcon = () => (
  <Svg>
    <path d="M4 11l8-6.5 8 6.5" />
    <path d="M6 10v9h12v-9" />
  </Svg>
);

const FlagIcon = () => (
  <Svg>
    <path d="M6 21V4" />
    <path d="M6 5h11l-2 4 2 4H6" />
  </Svg>
);

const CheckIcon = () => (
  <Svg size={28}>
    <path d="M5 12.5l4.5 4.5L19 7.5" />
  </Svg>
);

const money = (n) => `ETB ${Number(n || 0).toLocaleString()}`;

export default function Checkout() {
  const items = useCartStore((state) => state.items);
  const clearCart = useCartStore((state) => state.clearCart);
  const totalPrice = useCartTotalPrice();
  const router = useRouter();
  const [placed, setPlaced] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      fullName: "",
      phone: "",
      subCity: "",
      street: "",
      landmark: "",
      deliveryMethod: "delivery",
    },
  });

  const deliveryMethod = watch("deliveryMethod");
  const deliveryFee = deliveryMethod === "pickup" ? 0 : 60;
  const grandTotal = totalPrice + deliveryFee;

  function onSubmit() {
    clearCart();
    setPlaced(true);
  }

  if (placed) {
    return (
      <main className="screen">
        <div className="ui-wrap ui-wrap--center">
          <div className="ui-success-mark">
            <CheckIcon />
          </div>
          <h1 className="ui-title">Order confirmed</h1>
          <p className="ui-sub">
            Your Gursha Basket is on its way. Betam ameseginalehu!
          </p>
          <button
            type="button"
            className="ui-btn ui-btn--primary"
            onClick={() => router.push("/")}
          >
            Back to menu
          </button>
        </div>
      </main>
    );
  }

  if (items.length === 0) {
    return (
      <main className="screen">
        <div className="ui-wrap ui-wrap--center">
          <h1 className="ui-title">Your basket is empty</h1>
          <p className="ui-sub">Add a dish before checking out.</p>
          <button
            type="button"
            className="ui-btn ui-btn--primary"
            onClick={() => router.push("/")}
          >
            Browse the menu
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="screen">
      <div className="ui-wrap ui-wrap--wide">
        <button type="button" className="ui-back" onClick={() => router.back()}>
          <BackArrowIcon size={16} />
          Back to basket
        </button>

        <h1 className="ui-title">Checkout</h1>
        <p className="ui-sub">Step 2 of 3 · Delivery details</p>

        <div className="ui-steps" aria-hidden="true">
          <span className="done" />
          <span className="done" />
          <span />
        </div>

        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <section className="ui-section">
            <h2 className="ui-section-title">Recipient contact</h2>

            <div className="ui-field">
              <label className="ui-label" htmlFor="co-name">Full name</label>
              <div className={`ui-input ${errors.fullName ? "has-error" : ""}`}>
                <UserIcon size={18} />
                <input
                  id="co-name"
                  autoComplete="name"
                  placeholder="Abebe Bekele"
                  aria-invalid={Boolean(errors.fullName)}
                  {...register("fullName")}
                />
              </div>
              {errors.fullName && <p className="ui-error">{errors.fullName.message}</p>}
            </div>

            <div className="ui-field">
              <label className="ui-label" htmlFor="co-phone">
                Phone <span className="ui-label-hint">(calls &amp; SMS confirmation)</span>
              </label>
              <div className={`ui-input ${errors.phone ? "has-error" : ""}`}>
                <span className="ui-prefix">ET +251</span>
                <input
                  id="co-phone"
                  type="tel"
                  inputMode="tel"
                  autoComplete="tel-national"
                  placeholder="91 145 7890"
                  aria-invalid={Boolean(errors.phone)}
                  {...register("phone")}
                />
              </div>
              {errors.phone && <p className="ui-error">{errors.phone.message}</p>}
            </div>
          </section>

          <section className="ui-section">
            <h2 className="ui-section-title">Delivery destination</h2>

            <div className="ui-field">
              <label className="ui-label" htmlFor="co-subcity">Sub-city / neighbourhood</label>
              <div className={`ui-input ${errors.subCity ? "has-error" : ""}`}>
                <PinIcon />
                <input
                  id="co-subcity"
                  placeholder="Bole Sub-city, Edna Mall area"
                  aria-invalid={Boolean(errors.subCity)}
                  {...register("subCity")}
                />
              </div>
              {errors.subCity && <p className="ui-error">{errors.subCity.message}</p>}
            </div>

            <div className="ui-field">
              <label className="ui-label" htmlFor="co-street">House no. / street</label>
              <div className={`ui-input ${errors.street ? "has-error" : ""}`}>
                <HomeIcon />
                <input
                  id="co-street"
                  autoComplete="street-address"
                  placeholder="Behind Edna Mall, House No. 402"
                  aria-invalid={Boolean(errors.street)}
                  {...register("street")}
                />
              </div>
              {errors.street && <p className="ui-error">{errors.street.message}</p>}
            </div>

            <div className="ui-field">
              <label className="ui-label" htmlFor="co-landmark">
                Landmark &amp; gate colour <span className="ui-label-hint">(optional)</span>
              </label>
              <div className={`ui-input ${errors.landmark ? "has-error" : ""}`}>
                <FlagIcon />
                <input
                  id="co-landmark"
                  placeholder="Opposite Boston Day Spa, green entrance"
                  {...register("landmark")}
                />
              </div>
              {errors.landmark && <p className="ui-error">{errors.landmark.message}</p>}
            </div>
          </section>

          <section className="ui-section">
            <h2 className="ui-section-title">Delivery method</h2>

            <div className="ui-choices">
              <label className={`ui-choice ${deliveryMethod === "delivery" ? "active" : ""}`}>
                <input type="radio" value="delivery" className="ui-sr" {...register("deliveryMethod")} />
                <strong>Immediate delivery</strong>
                <small>To your door · {money(60)}</small>
              </label>

              <label className={`ui-choice ${deliveryMethod === "pickup" ? "active" : ""}`}>
                <input type="radio" value="pickup" className="ui-sr" {...register("deliveryMethod")} />
                <strong>Table / pickup</strong>
                <small>Collect at the restaurant · Free</small>
              </label>
            </div>
          </section>

          <section className="ui-section">
            <h2 className="ui-section-title">Order summary</h2>

            <ul className="ui-lines">
              {items.map(({ dish, qty }) => (
                <li key={dish.id}>
                  <span>
                    <b>{qty}×</b> {dish.nameEn}
                  </span>
                  <span>{money(dish.priceETB * qty)}</span>
                </li>
              ))}
            </ul>

            <div className="summary-row">
              <span>Items subtotal</span>
              <span>{money(totalPrice)}</span>
            </div>
            <div className="summary-row">
              <span>Delivery fee</span>
              <span>{deliveryFee === 0 ? "Free" : money(deliveryFee)}</span>
            </div>
            <div className="summary-total">
              <span>Grand total</span>
              <span>{money(grandTotal)}</span>
            </div>
          </section>

          <button
            type="submit"
            className="ui-btn ui-btn--primary"
            disabled={isSubmitting}
          >
            Confirm order &amp; pay · {money(grandTotal)}
            <ArrowRightIcon size={16} />
          </button>
        </form>
      </div>
    </main>
  );
}
