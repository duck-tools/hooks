import { connection } from '../database';

export async function all() {
  const events = await connection.any('SELECT * FROM hooks.events');
  return events;
}

export async function add(name) {
  const insertQuery = 'INSERT INTO hooks.events (name) VALUES (${name})';
  await connection.none(insertQuery, { name });
}
