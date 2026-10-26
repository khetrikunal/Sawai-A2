// Script to create the first admin user in Supabase.
// Run: bun scripts/create-admin.mjs --email admin@example.com --password yourpassword
//
// Requires: SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, ADMIN_PASSWORD_SALT in environment or .env

import { createClient } from "@supabase/supabase-js";
import { createHash } from "node:crypto";

// Parse CLI args
const args = process.argv.slice(2);
const emailIdx = args.indexOf("--email");
const passIdx = args.indexOf("--password");
if (emailIdx === -1 || passIdx === -1) {
  console.error("Usage: bun scripts/create-admin.mjs --email ADMIN_EMAIL --password ADMIN_PASSWORD");
  process.exit(1);
}
const email = args[emailIdx + 1];
const password = args[passIdx + 1];
if (!email || !password) {
  console.error("Both --email and --password are required.");
  process.exit(1);
}

// Load env
const url = process.env.SUPABASE_URL;
const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
const salt = process.env.ADMIN_PASSWORD_SALT ?? "";
if (!url || !key) {
  console.error("Set SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY in your environment or .env file.");
  process.exit(1);
}

const supabase = createClient(url, key, { auth: { persistSession: false } });

// Hash password
const passwordHash = createHash("sha256").update(password + salt).digest("hex");

const { error } = await supabase
  .from("admin_users")
  .upsert({ email, password_hash: passwordHash }, { onConflict: "email" });

if (error) {
  console.error("Failed to create admin user:", error.message);
  process.exit(1);
}

console.log(`✓ Admin user created/updated for: ${email}`);
console.log("  You can now log in at /admin with these credentials.");
