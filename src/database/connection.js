import pgpInit from 'pg-promise';

const pgp = pgpInit();

let connection = null;

export function init(url) {
  connection = pgp(url);
}

export function getConnection() {
  if (connection === null) {
    throw new Error('database connection not initialized');
  }
  return connection;
}
