/**
 * Normalize unknown errors into safe, user-facing copy (no stack traces in UI).
 */
export function getUserFacingMessage(error: unknown): string {
  if (error instanceof Error) {
    const msg = error.message.trim();
    if (msg.length > 0 && msg.length < 400) {
      return msg;
    }
  }
  return "Something went wrong on our side. Please try again in a moment.";
}
