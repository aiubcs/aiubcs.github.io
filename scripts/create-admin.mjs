#!/usr/bin/env node
// Creates an admin user (username + password) in the D1 database.
// Usage: npm run cf:create-admin -- <username> <password> [--remote]
//   Defaults to the local dev database; pass --remote for the production DB.
//   Salt + PBKDF2 hash are identical to the worker's verifyPassword() logic.

import { execSync } from 'node:child_process';

const args = process.argv.slice(2);
const username = args.filter((a) => !a.startsWith('--'))[0];
const password = args.filter((a) => !a.startsWith('--'))[1];
const remote = args.includes('--remote');

if (!username || !password) {
  console.error('Usage: npm run cf:create-admin -- <username> <password> [--remote]');
  process.exit(1);
}

const ITERATIONS = 100000; // must match worker's PBKDF2_ITERATIONS (Workers caps at 100k)

const salt = crypto.getRandomValues(new Uint8Array(16));
const keyMaterial = await crypto.subtle.importKey(
  'raw',
  new TextEncoder().encode(password),
  'PBKDF2',
  false,
  ['deriveBits']
);
const bits = await crypto.subtle.deriveBits(
  { name: 'PBKDF2', salt, iterations: ITERATIONS, hash: 'SHA-256' },
  keyMaterial,
  256
);

const toHex = (bytes) => Array.from(bytes).map((b) => b.toString(16).padStart(2, '0')).join('');
const hashHex = toHex(new Uint8Array(bits));
const saltHex = toHex(salt);
const hash = `pbkdf2$${ITERATIONS}$${saltHex}$${hashHex}`;

const sanitized = username.replace(/[^a-zA-Z0-9_.-]/g, '');
if (sanitized !== username) {
  console.error('Username may only contain letters, numbers, dots, dashes and underscores.');
  process.exit(1);
}

const sql = `DELETE FROM users WHERE username = '${sanitized}'; INSERT INTO users (username, password_hash) VALUES ('${sanitized}', '${hash}');`;
const command = `wrangler d1 execute aiubcs-db ${remote ? '--remote' : '--local'} --command "${sql}"`;

try {
  execSync(command, { stdio: 'inherit', cwd: process.cwd() });
  console.log(`Admin account '${sanitized}' created (${remote ? 'remote' : 'local'} D1).`);
} catch (err) {
  console.error('Failed to create admin account:', err.message);
  process.exit(1);
}