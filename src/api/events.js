export async function all(connection) {
  const events = await connection.any('SELECT * FROM hooks.events');
  return events;
}

export async function add(connection, name) {
  const insertQuery = 'INSERT INTO hooks.events (name) VALUES (${name})';
  await connection.none(insertQuery, { name });
}
