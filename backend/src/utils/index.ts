/**
 * Generates a simple username from an email address.
 * For example, "john.doe@gmail.com" → "john.doe"
 */
export function generateUsernameFromEmail(email: string): string {
  if (!email || !email.includes('@')) {
    throw new Error('Invalid email address');
  }

  const username = email.split('@')[0];

  // Optional: sanitize username (remove special chars except dots and underscores)
  return username.replace(/[^a-zA-Z0-9._]/g, '').toLowerCase();
}
