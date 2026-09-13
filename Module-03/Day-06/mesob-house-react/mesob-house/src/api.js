const BASE_URL = "https://addis-eats-backend.onrender.com";

async function getJson(path) {
  const res = await fetch(`${BASE_URL}${path}`);
  if (!res.ok) {
    throw new Error(`Request failed: ${res.status}`);
  }
  const json = await res.json();
  return json.data;
}

export function fetchMenu() {
  return getJson("/menu/");
}

export function fetchSpecials() {
  return getJson("/menu/specials");
}
