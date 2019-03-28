import { init as initConnection, getConnection } from './connection';

async function initSchema(db) {
  await db.any('CREATE SCHEMA IF NOT EXISTS hooks');
}

async function initEventsTable(db) {
  const createEventsTable = `
CREATE TABLE IF NOT EXISTS hooks.events (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) UNIQUE
)`;
  await db.any(createEventsTable);
}

async function initEventHooksTable(db) {
  const createEventHooksTable = `
CREATE TABLE IF NOT EXISTS hooks.event_hooks (
  id SERIAL PRIMARY KEY,
  event INT NOT NULL,
  hook VARCHAR(200) NOT NULL,
  UNIQUE (event, hook)
)`;
  await db.any(createEventHooksTable);
}

export async function init(url) {
  initConnection(url);
  const connection = getConnection();
  await initSchema(connection);
  await initEventsTable(connection);
  await initEventHooksTable(connection);
}
