import { connection } from '../database';

/*export async function all() {
  
}*/

export async function add(name) {
  const insertQuery = 'INSERT INTO hooks.events (name) VALUES (${name})';
  await connection.none(insertQuery, { name });
}
