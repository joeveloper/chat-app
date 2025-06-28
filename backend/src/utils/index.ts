export function generateUsernameFromEmail(email: string): string {
  if (!email || !email.includes("@")) {
    throw new Error("Invalid email address");
  }

  const username = email.split("@")[0];

  return username.replace(/[^a-zA-Z0-9._]/g, "").toLowerCase();
}
