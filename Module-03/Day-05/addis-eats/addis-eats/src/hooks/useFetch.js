import { useEffect, useState } from "react";

/**
 * useFetch — a small, reusable data-fetching hook.
 *
 * - Fires a GET request to `url` whenever `url` changes.
 * - Tracks `data`, `loading`, and `error` as separate, explicit states
 *   (never "loading: false, error: null, data: null" ambiguity — data
 *   starts as `null` and only ever gets set on a successful response).
 * - Cleans up after itself: if the component unmounts or `url` changes
 *   again before the request finishes, the in-flight request is aborted
 *   and its result is ignored, so it can never overwrite newer state
 *   ("race condition" / stale-response bug).
 *
 * @param {string} url - the endpoint to fetch. Pass `null`/`undefined` to skip fetching.
 * @returns {{ data: any, loading: boolean, error: Error|null }}
 */
export function useFetch(url) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(Boolean(url));
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!url) {
      setData(null);
      setLoading(false);
      setError(null);
      return;
    }

    const controller = new AbortController();

    async function run() {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(url, { signal: controller.signal });
        if (!res.ok) {
          throw new Error(`Request failed with status ${res.status}`);
        }
        const json = await res.json();
        setData(json);
      } catch (err) {
        // Ignore the "error" that fires when we abort on purpose.
        if (err.name !== "AbortError") {
          setError(err);
        }
      } finally {
        setLoading(false);
      }
    }

    run();

    // Cleanup: abort the request if the effect re-runs or unmounts
    // before it resolves.
    return () => controller.abort();
  }, [url]);

  return { data, loading, error };
}
