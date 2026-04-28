import { MOCK_REWRITE_DELAY_MS, MOCK_REWRITE_FAIL_RATE } from "@/lib/env";

/**
 * Simulated network + AI rewrite round-trip. Replace with `fetch` when wiring a real API.
 * Rejects on simulated failure so callers can use try/catch and show retry UI.
 */
export async function requestMockResumeRewrite(): Promise<void> {
  await new Promise<void>((resolve, reject) => {
    globalThis.setTimeout(() => {
      if (MOCK_REWRITE_FAIL_RATE > 0 && Math.random() < MOCK_REWRITE_FAIL_RATE) {
        reject(
          new Error(
            "We couldn’t complete the rewrite right now. Your work wasn’t saved—please try again."
          )
        );
        return;
      }
      resolve();
    }, MOCK_REWRITE_DELAY_MS);
  });
}
