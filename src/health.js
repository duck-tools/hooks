import { getConnection } from './database';

export async function health(req, res) {
  const connection = getConnection();
  try {
    await connection.any('SELECT * FROM hooks.events');
    //await connection.any('SELECT * FROM hooks.event_hooks');
    res.sendStatus(200).end();
  } catch(e) {
    res.sendStatus(503).end();
  }
}
