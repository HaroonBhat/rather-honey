/**
 * Tiny JSON document store.
 *
 * Local development and single-node deployments persist to `/data/.runtime`.
 * Swap the four functions below for a real database (Postgres, MongoDB, KV)
 * without touching any route handler — they share the same async interface.
 */
import { promises as fs } from 'fs';
import path from 'path';

const ROOT = process.cwd();
const DATA_DIR = process.env.RH_DATA_DIR
  ? path.resolve(ROOT, process.env.RH_DATA_DIR)
  : path.join(ROOT, 'data', '.runtime');

/** Serialises writes inside this process so concurrent requests never clobber a file. */
let queue = Promise.resolve();
const enqueue = (job) => {
  const run = queue.then(job, job);
  queue = run.catch(() => {});
  return run;
};

async function ensureDir() {
  await fs.mkdir(DATA_DIR, { recursive: true });
}

async function readJson(name, fallback) {
  try {
    const raw = await fs.readFile(path.join(DATA_DIR, name), 'utf8');
    return JSON.parse(raw);
  } catch (err) {
    if (err.code === 'ENOENT') return fallback;
    throw err;
  }
}

async function writeJson(name, data) {
  await ensureDir();
  const target = path.join(DATA_DIR, name);
  const tmp = `${target}.${process.pid}.${Date.now()}.tmp`;
  await fs.writeFile(tmp, JSON.stringify(data, null, 2), 'utf8');
  await fs.rename(tmp, target);
  return data;
}

/* --------------------------------------------------------------- users */

export async function listUsers() {
  return readJson('users.json', []);
}

export async function findUserByEmail(email) {
  const users = await listUsers();
  const needle = String(email || '').trim().toLowerCase();
  return users.find((u) => u.email === needle) || null;
}

export async function findUserById(id) {
  const users = await listUsers();
  return users.find((u) => u.id === id) || null;
}

export async function insertUser(user) {
  return enqueue(async () => {
    const users = await listUsers();
    if (users.some((u) => u.email === user.email)) {
      const err = new Error('An account with this email already exists.');
      err.code = 'EMAIL_TAKEN';
      throw err;
    }
    users.push(user);
    await writeJson('users.json', users);
    return user;
  });
}

export async function updateUser(id, patch) {
  return enqueue(async () => {
    const users = await listUsers();
    const index = users.findIndex((u) => u.id === id);
    if (index === -1) return null;
    users[index] = { ...users[index], ...patch, updatedAt: new Date().toISOString() };
    await writeJson('users.json', users);
    return users[index];
  });
}

/* -------------------------------------------------------------- orders */

export async function listOrders() {
  return readJson('orders.json', []);
}

export async function insertOrder(order) {
  return enqueue(async () => {
    const orders = await listOrders();
    orders.unshift(order);
    await writeJson('orders.json', orders);
    return order;
  });
}

export async function findOrder(id) {
  const orders = await listOrders();
  return orders.find((o) => o.id === id) || null;
}

export async function findOrdersForUser(userId) {
  const orders = await listOrders();
  return orders.filter((o) => o.userId === userId);
}

export async function findOrderForUser(id, userId) {
  const orders = await listOrders();
  return orders.find((o) => o.id === id && o.userId === userId) || null;
}

/* ---------------------------------------------------------- newsletter */

export async function listSubscribers() {
  return readJson('newsletter.json', []);
}

export async function addSubscriber(email, source = 'footer') {
  return enqueue(async () => {
    const list = await listSubscribers();
    const needle = String(email).trim().toLowerCase();
    if (list.some((s) => s.email === needle)) return { alreadySubscribed: true, email: needle };
    list.push({ email: needle, source, subscribedAt: new Date().toISOString() });
    await writeJson('newsletter.json', list);
    return { alreadySubscribed: false, email: needle };
  });
}

/* -------------------------------------------------------------- messages */

export async function insertMessage(message) {
  return enqueue(async () => {
    const list = await readJson('messages.json', []);
    list.push(message);
    await writeJson('messages.json', list);
    return message;
  });
}
