import {
  createHmac,
  randomBytes,
  scrypt,
  timingSafeEqual,
} from "node:crypto";
import { promisify } from "node:util";

const scryptAsync = promisify(scrypt);

export const SESSION_COOKIE = "mesob_session";
export const SESSION_MAX_AGE = 60 * 60 * 8;

export function isAuthConfigured() {
  return Boolean(
    process.env.MESOB_DEMO_EMAIL &&
    process.env.MESOB_DEMO_PASSWORD_HASH &&
    process.env.MESOB_AUTH_SECRET &&
    process.env.MESOB_AUTH_SECRET.length >= 32
  );
}

export async function hashPassword(password, salt = randomBytes(16).toString("hex")) {
  const derivedKey = await scryptAsync(password, salt, 64);
  return `${salt}:${Buffer.from(derivedKey).toString("hex")}`;
}

export async function verifyPassword(password, storedHash) {
  if (typeof storedHash !== "string") return false;

  const [salt, expectedHex] = storedHash.split(":");

  if (
    !salt ||
    !/^[a-f0-9]{32}$/i.test(salt) ||
    !expectedHex ||
    !/^[a-f0-9]{128}$/i.test(expectedHex)
  ) {
    return false;
  }

  const derivedKey = Buffer.from(
    await scryptAsync(password, salt, 64)
  );
  const expected = Buffer.from(expectedHex, "hex");

  return timingSafeEqual(derivedKey, expected);
}

function sign(value) {
  return createHmac("sha256", process.env.MESOB_AUTH_SECRET)
    .update(value)
    .digest("hex");
}

export function createSession(email) {
  const payload = Buffer.from(
    JSON.stringify({
      email,
      exp: Math.floor(Date.now() / 1000) + SESSION_MAX_AGE,
    })
  ).toString("base64url");

  return `${payload}.${sign(payload)}`;
}

export function verifySession(token) {
  if (typeof token !== "string") return null;

  const parts = token.split(".");
  if (parts.length !== 2) return null;

  const [payload, signature] = parts;
  if (!/^[a-f0-9]{64}$/i.test(signature)) return null;

  const expected = Buffer.from(sign(payload), "hex");
  const received = Buffer.from(signature, "hex");

  if (
    expected.length !== received.length ||
    !timingSafeEqual(expected, received)
  ) {
    return null;
  }

  try {
    const session = JSON.parse(
      Buffer.from(payload, "base64url").toString("utf8")
    );

    if (
      typeof session.email !== "string" ||
      typeof session.exp !== "number" ||
      session.exp <= Math.floor(Date.now() / 1000)
    ) {
      return null;
    }

    return { email: session.email };
  } catch {
    return null;
  }
}
