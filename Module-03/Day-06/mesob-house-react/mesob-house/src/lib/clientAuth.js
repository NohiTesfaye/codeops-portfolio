"use client";

/**
 * Browser-only auth for the capstone (no server, no database).
 *
 * Everything lives in localStorage:
 *   mesob_users    -> [{ id, name, email, salt, passwordHash, createdAt, sessionToken }]
 *   mesob_session  -> { uid, token, exp }
 *   mesob_attempts -> { "e:<email>": [timestamps of recent failed logins] }
 *
 * Passwords are never stored in plain text (PBKDF2-SHA256, random salt).
 * LIMIT: anyone with DevTools can read or edit localStorage, so this is
 * demo-grade protection, not real security. Say so in AUTH.md.
 */

import { useMemo, useSyncExternalStore } from "react";

const USERS_KEY = "mesob_users";
const SESSION_KEY = "mesob_session";
const ATTEMPTS_KEY = "mesob_attempts";
const CHANGE_EVENT = "mesob-auth-change";

const SESSION_HOURS = 8;
const MAX_FAILURES = 5;
const LOCK_MINUTES = 15;
const PBKDF2_ITERATIONS = 150000;

const STORAGE_ERROR =
  "Couldn't use browser storage. Turn off private mode or allow site data, then try again.";

/* ---------- storage helpers ---------- */

function read(key, fallback) {
  try {
    const raw = window.localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
}

function readUsers() {
  const users = read(USERS_KEY, []);
  return Array.isArray(users) ? users : [];
}

function write(key, value) {
  window.localStorage.setItem(key, JSON.stringify(value));
}

function notify() {
  window.dispatchEvent(new Event(CHANGE_EVENT));
}

/* ---------- crypto helpers ---------- */

const encoder = new TextEncoder();

const toHex = (buffer) =>
  Array.from(new Uint8Array(buffer), (b) => b.toString(16).padStart(2, "0")).join("");

const randomHex = (bytes) => toHex(crypto.getRandomValues(new Uint8Array(bytes)));

async function hashPassword(password, saltHex) {
  const key = await crypto.subtle.importKey(
    "raw",
    encoder.encode(password),
    "PBKDF2",
    false,
    ["deriveBits"]
  );
  const bits = await crypto.subtle.deriveBits(
    {
      name: "PBKDF2",
      hash: "SHA-256",
      salt: encoder.encode(saltHex),
      iterations: PBKDF2_ITERATIONS,
    },
    key,
    256
  );
  return toHex(bits);
}

const normalizeEmail = (email) => String(email || "").trim().toLowerCase();

/* ---------- login throttling ---------- */

const attemptKey = (email) => `e:${email}`;

function recentFailures(email) {
  const all = read(ATTEMPTS_KEY, {});
  const cutoff = Date.now() - LOCK_MINUTES * 60000;
  const list = Array.isArray(all[attemptKey(email)]) ? all[attemptKey(email)] : [];
  return list.filter((t) => typeof t === "number" && t > cutoff);
}

function recordFailure(email) {
  const all = read(ATTEMPTS_KEY, {});
  all[attemptKey(email)] = [...recentFailures(email), Date.now()];
  write(ATTEMPTS_KEY, all);
}

function clearFailures(email) {
  const all = read(ATTEMPTS_KEY, {});
  delete all[attemptKey(email)];
  write(ATTEMPTS_KEY, all);
}

/* ---------- sessions ---------- */

function startSession(userId) {
  const token = randomHex(32);
  const users = readUsers().map((u) => (u.id === userId ? { ...u, sessionToken: token } : u));
  write(USERS_KEY, users);
  write(SESSION_KEY, { uid: userId, token, exp: Date.now() + SESSION_HOURS * 3600000 });
  notify();
}

/** The signed-in user, or null. A session only counts if its token matches the one on the user record. */
export function getSession() {
  if (typeof window === "undefined") return null;

  const session = read(SESSION_KEY, null);
  if (
    !session ||
    typeof session.uid !== "string" ||
    typeof session.token !== "string" ||
    typeof session.exp !== "number" ||
    session.exp <= Date.now()
  ) {
    return null;
  }

  const user = readUsers().find((u) => u.id === session.uid);
  if (!user || !user.sessionToken || user.sessionToken !== session.token) return null;

  return { userId: user.id, name: user.name, email: user.email, createdAt: user.createdAt };
}

/** Only allow same-site paths ("/orders"), never "//evil.com" or full URLs. */
export function safeNextPath() {
  const next = new URLSearchParams(window.location.search).get("next");
  return next && next.startsWith("/") && !next.startsWith("//") ? next : "/";
}

/* ---------- actions ---------- */

export async function registerUser({ name, email, password }) {
  try {
    const cleanEmail = normalizeEmail(email);

    if (readUsers().some((u) => u.email === cleanEmail)) {
      return { ok: false, field: "email", error: "An account with this email already exists." };
    }

    const salt = randomHex(16);
    const user = {
      id: crypto.randomUUID(),
      name: String(name).trim(),
      email: cleanEmail,
      salt,
      passwordHash: await hashPassword(password, salt),
      createdAt: new Date().toISOString(),
      sessionToken: null,
    };

    // Re-read after the async hash in case another tab registered the same email meanwhile
    const users = readUsers();
    if (users.some((u) => u.email === cleanEmail)) {
      return { ok: false, field: "email", error: "An account with this email already exists." };
    }

    write(USERS_KEY, [...users, user]);
    startSession(user.id);
    return { ok: true };
  } catch {
    return { ok: false, error: STORAGE_ERROR };
  }
}

export async function loginUser({ email, password }) {
  try {
    const cleanEmail = normalizeEmail(email);
    const failures = recentFailures(cleanEmail);

    if (failures.length >= MAX_FAILURES) {
      const minutes = Math.max(
        1,
        Math.ceil((failures[0] + LOCK_MINUTES * 60000 - Date.now()) / 60000)
      );
      return {
        ok: false,
        locked: true,
        error: `Too many failed attempts. Try again in ${minutes} ${minutes === 1 ? "minute" : "minutes"}.`,
      };
    }

    const user = readUsers().find((u) => u.email === cleanEmail);

    // Hash even when the email is unknown so both cases take about the same time
    const candidate = await hashPassword(String(password), user ? user.salt : "0".repeat(32));

    if (!user || candidate !== user.passwordHash) {
      recordFailure(cleanEmail);
      return { ok: false, error: "Invalid email or password." };
    }

    clearFailures(cleanEmail);
    startSession(user.id);
    return { ok: true };
  } catch {
    return { ok: false, error: STORAGE_ERROR };
  }
}

export function logoutUser() {
  try {
    const session = read(SESSION_KEY, null);
    if (session?.uid) {
      write(
        USERS_KEY,
        readUsers().map((u) => (u.id === session.uid ? { ...u, sessionToken: null } : u))
      );
    }
    window.localStorage.removeItem(SESSION_KEY);
  } catch {
    /* nothing to clean up */
  }
  notify();
}

/* ---------- React hook ---------- */

function subscribe(callback) {
  window.addEventListener("storage", callback); // other tabs
  window.addEventListener(CHANGE_EVENT, callback); // this tab
  return () => {
    window.removeEventListener("storage", callback);
    window.removeEventListener(CHANGE_EVENT, callback);
  };
}

/**
 * status: "loading" (server render / first paint) | "authenticated" | "anonymous"
 */
export function useSession() {
  const raw = useSyncExternalStore(
    subscribe,
    () => window.localStorage.getItem(SESSION_KEY) ?? "",
    () => null
  );

  return useMemo(() => {
    if (raw === null) return { status: "loading", user: null };
    const user = getSession();
    return user ? { status: "authenticated", user } : { status: "anonymous", user: null };
  }, [raw]);
}
