import "server-only";
import { randomBytes, scryptSync, timingSafeEqual, createHmac } from "node:crypto";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import type { AuthUser, UserRole } from "./types";

type StoredUser = AuthUser & { document: string; phone: string; specialty?: string; passwordHash: string; createdAt: string };
const DATA_DIR = path.join(process.cwd(), "..", "backend", "data");
const USERS_FILE = path.join(DATA_DIR, "users.json");
const COOKIE_NAME = "safepass_session";
const SESSION_DAYS = 7;

async function readUsers(): Promise<StoredUser[]> {
  await mkdir(DATA_DIR, { recursive: true });
  try { return JSON.parse(await readFile(USERS_FILE, "utf8")) as StoredUser[]; }
  catch (error) { if ((error as NodeJS.ErrnoException).code === "ENOENT") return []; throw error; }
}
async function writeUsers(users: StoredUser[]) {
  await mkdir(DATA_DIR, { recursive: true });
  await writeFile(USERS_FILE, JSON.stringify(users, null, 2), { encoding: "utf8", mode: 0o600 });
}
function hashPassword(password: string) {
  const salt = randomBytes(16).toString("hex");
  return `${salt}:${scryptSync(password, salt, 64).toString("hex")}`;
}
function verifyPassword(password: string, stored: string) {
  const [salt, key] = stored.split(":");
  if (!salt || !key) return false;
  const actual = scryptSync(password, salt, 64);
  const expected = Buffer.from(key, "hex");
  return actual.length === expected.length && timingSafeEqual(actual, expected);
}
function secret() { return process.env.SAFEPASS_SESSION_SECRET || "local-demo-secret-change-before-deploy-2026"; }
function sign(value: string) { return createHmac("sha256", secret()).update(value).digest("base64url"); }
export function createSession(user: AuthUser) {
  const payload = Buffer.from(JSON.stringify({ sub: user.id, exp: Date.now() + SESSION_DAYS * 86400000 })).toString("base64url");
  return `${payload}.${sign(payload)}`;
}
export async function getSessionUser(token?: string | null): Promise<AuthUser | null> {
  if (!token) return null;
  const [payload, signature] = token.split(".");
  if (!payload || !signature || sign(payload) !== signature) return null;
  try {
    const data = JSON.parse(Buffer.from(payload, "base64url").toString("utf8")) as { sub: string; exp: number };
    if (data.exp < Date.now()) return null;
    const user = (await readUsers()).find((item) => item.id === data.sub);
    return user ? publicUser(user) : null;
  } catch { return null; }
}
function publicUser(user: StoredUser): AuthUser { return { id: user.id, name: user.name, email: user.email, role: user.role }; }
export async function registerUser(input: { name: string; email: string; password: string; role: UserRole; document: string; phone: string; specialty?: string; adminCode?: string }) {
  if (input.role === "admin") {
    const expectedCode = process.env.SAFEPASS_ADMIN_REGISTRATION_CODE;
    if (!expectedCode || !input.adminCode || input.adminCode !== expectedCode) {
      throw new Error("Código de autorização administrativa inválido ou não configurado.");
    }
  }
  const users = await readUsers();
  const email = input.email.trim().toLowerCase();
  if (users.some((user) => user.email === email)) throw new Error("Este e-mail já está cadastrado.");
  const user: StoredUser = { id: randomBytes(16).toString("hex"), name: input.name.trim(), email, role: input.role, document: input.document.trim(), phone: input.phone.trim(), specialty: input.specialty?.trim(), passwordHash: hashPassword(input.password), createdAt: new Date().toISOString() };
  users.push(user);
  await writeUsers(users);
  return publicUser(user);
}
export async function authenticate(email: string, password: string) {
  const user = (await readUsers()).find((item) => item.email === email.trim().toLowerCase());
  if (!user || !verifyPassword(password, user.passwordHash)) return null;
  return publicUser(user);
}
export { COOKIE_NAME };
