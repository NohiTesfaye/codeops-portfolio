"use client";

import { useEffect } from "react";

export default function Error({ error, reset }) {
  useEffect(() => {
    console.error("Mesob House route error:", error);
  }, [error]);

  return (
    <main className="screen error-state">
      <h2>Something went wrong</h2>
      <p>Please try again. If the problem continues, the menu service may be unavailable.</p>
      <button className="primary-btn" onClick={() => reset()}>
        Try again
      </button>
    </main>
  );
}