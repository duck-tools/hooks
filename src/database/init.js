import { connection as db } from './connection';

async function initSchema() {
  await db.any('CREATE SCHEMA IF NOT EXISTS hooks');
}

async function initEventsTable() {
  const createEventsTable = `
CREATE TABLE IF NOT EXISTS hooks.events (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) UNIQUE
)`;
  await db.any(createEventsTable);
}

export async function init() {
  await initSchema();
  await initEventsTable()
}
