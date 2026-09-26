import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useCartStore, useCartTotalPrice } from "../store/useCartStore";
import { checkoutSchema } from "../schemas/checkoutSchema";
import { ArrowRightIcon } from "../Icons";

export default function Checkout() {
  const items = useCartStore((state) => state.items);
  const clearCart = useCartStore((state) => state.clearCart);
  const totalPrice = useCartTotalPrice();
  const navigate = useNavigate();
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

  if (items.length === 0 && !placed) {
    return (
      <div className="screen empty-state">
        Your basket is empty — add a dish before checking out.
        <div style={{ marginTop: 14 }}>
          <button className="primary-btn" onClick={() => navigate("/")}>
            Browse the menu
          </button>
        </div>
      </div>
    );
  }

  if (placed) {
    return (
      <div className="screen empty-state">
        <h3 style={{ color: "var(--maroon-dark)", marginBottom: 8 }}>
          Order confirmed
        </h3>
        <p>Your Gursha Basket is on its way. Betam ameseginalehu!</p>
        <div style={{ marginTop: 14 }}>
          <button className="primary-btn" onClick={() => navigate("/")}>
            Back to menu
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="topbar">
        <div className="brand">Delivery &amp; Checkout</div>
        <div className="tagline">Step 2 of 3 · Delivery details</div>
      </div>

      <div className="screen">
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <h3 className="section-title" style={{ marginTop: 0 }}>
            Recipient Contact
          </h3>

          <label className="field-label">Full Name</label>
          <div className={`phone-field ${errors.fullName ? "field-error" : ""}`}>
            <input placeholder="Abebe Bekele" {...register("fullName")} />
          </div>
          {errors.fullName && <p className="field-error-msg">{errors.fullName.message}</p>}

          <label className="field-label" style={{ marginTop: 14 }}>
            Phone (Calls &amp; SMS confirmation)
          </label>
          <div className={`phone-field ${errors.phone ? "field-error" : ""}`}>
            <span className="flag">ET +251</span>
            <input type="tel" placeholder="91 145 7890" {...register("phone")} />
          </div>
          {errors.phone && <p className="field-error-msg">{errors.phone.message}</p>}

          <h3 className="section-title">Delivery Destination</h3>

          <label className="field-label">Sub-City / Neighbourhood</label>
          <div className={`phone-field ${errors.subCity ? "field-error" : ""}`}>
            <input placeholder="Bole Sub-city, Edna Mall area" {...register("subCity")} />
          </div>
          {errors.subCity && <p className="field-error-msg">{errors.subCity.message}</p>}

          <label className="field-label" style={{ marginTop: 14 }}>
            House No. / Street
          </label>
          <div className={`phone-field ${errors.street ? "field-error" : ""}`}>
            <input placeholder="Behind Edna Mall, House No. 402" {...register("street")} />
          </div>
          {errors.street && <p className="field-error-msg">{errors.street.message}</p>}

          <label className="field-label" style={{ marginTop: 14 }}>
            Landmark &amp; Gate Color (optional)
          </label>
          <div className="phone-field">
            <input placeholder="Opposite to Boston Day Spa, green entrance" {...register("landmark")} />
          </div>

          <h3 className="section-title">Delivery Method</h3>
          <div className="tab-row">
            <label className={`tab-btn ${deliveryMethod === "delivery" ? "active" : ""}`}>
              <input
                type="radio"
                value="delivery"
                style={{ display: "none" }}
                {...register("deliveryMethod")}
              />
              Immediate Delivery
            </label>
            <label className={`tab-btn ${deliveryMethod === "pickup" ? "active" : ""}`}>
              <input
                type="radio"
                value="pickup"
                style={{ display: "none" }}
                {...register("deliveryMethod")}
              />
              Table / Pickup
            </label>
          </div>

          <div className="summary-row" style={{ marginTop: 16 }}>
            <span>Items subtotal</span>
            <span>ETB {totalPrice}</span>
          </div>
          <div className="summary-row">
            <span>Delivery fee</span>
            <span>ETB {deliveryFee}</span>
          </div>
          <div className="summary-total">
            <span>Grand total</span>
            <span>ETB {grandTotal}</span>
          </div>

          <button
            type="submit"
            className="primary-btn signin-btn"
            style={{ marginTop: 18 }}
            disabled={isSubmitting}
          >
            Confirm Order &amp; Pay — ETB {grandTotal} <ArrowRightIcon size={16} />
          </button>
        </form>
      </div>
    </>
  );
}
