// Browser-local demo accounts. A production shop should use a server-side auth provider.
const ACCOUNT_KEY = "belle-accounts";
const SESSION_KEY = "belle-session";

function readAccounts() {
  // Recover safely if browser storage is empty, malformed, or edited by hand.
  try {
    const value = JSON.parse(localStorage.getItem(ACCOUNT_KEY) || "{}");
    return value && typeof value === "object" && !Array.isArray(value) ? value : {};
  } catch {
    return {};
  }
}

function normalizeEmail(email) {
  return String(email || "").trim().toLowerCase();
}

function bytesToHex(bytes) {
  return Array.from(bytes, (byte) => byte.toString(16).padStart(2, "0")).join("");
}

async function hashPassword(password, saltHex) {
  // PBKDF2 keeps the raw password out of localStorage; Web Crypto requires localhost or HTTPS.
  if (!globalThis.crypto?.subtle || !globalThis.crypto?.getRandomValues) {
    throw new Error("auth.secureUnavailable");
  }
  const salt = saltHex
    ? Uint8Array.from(saltHex.match(/.{1,2}/g), (byte) => parseInt(byte, 16))
    : crypto.getRandomValues(new Uint8Array(16));
  const key = await crypto.subtle.importKey("raw", new TextEncoder().encode(password), "PBKDF2", false, ["deriveBits"]);
  const bits = await crypto.subtle.deriveBits({ name: "PBKDF2", salt, iterations: 150000, hash: "SHA-256" }, key, 256);
  return { salt: bytesToHex(salt), hash: bytesToHex(new Uint8Array(bits)) };
}

async function createAccount(name, email, password) {
  const normalizedEmail = normalizeEmail(email);
  const accounts = readAccounts();
  if (accounts[normalizedEmail]) throw new Error("auth.duplicate");
  const credential = await hashPassword(password);
  accounts[normalizedEmail] = { name: String(name).trim(), email: normalizedEmail, ...credential, createdAt: new Date().toISOString() };
  localStorage.setItem(ACCOUNT_KEY, JSON.stringify(accounts));
  // Newly registered users are signed in immediately.
  setAccountSession(normalizedEmail);
  return accounts[normalizedEmail];
}

async function signIn(email, password) {
  const normalizedEmail = normalizeEmail(email);
  const account = readAccounts()[normalizedEmail];
  if (!account) throw new Error("auth.noAccount");
  const credential = await hashPassword(password, account.salt);
  if (credential.hash !== account.hash) throw new Error("auth.incorrectPassword");
  setAccountSession(normalizedEmail);
  return account;
}

function setAccountSession(email) {
  localStorage.setItem(SESSION_KEY, JSON.stringify({ email, signedInAt: new Date().toISOString() }));
}

function getCurrentAccount() {
  // The session stores only an email; look up the profile record for this browser.
  try {
    const session = JSON.parse(localStorage.getItem(SESSION_KEY) || "null");
    return session?.email ? readAccounts()[normalizeEmail(session.email)] || null : null;
  } catch {
    return null;
  }
}

function saveCurrentAccountAddress(address) {
  const account = getCurrentAccount();
  if (!account) throw new Error("auth.noAccount");
  const accounts = readAccounts();
  const updatedAccount = { ...account, address };
  accounts[account.email] = updatedAccount;
  localStorage.setItem(ACCOUNT_KEY, JSON.stringify(accounts));
  return updatedAccount;
}

function signOut() {
  localStorage.removeItem(SESSION_KEY);
}
