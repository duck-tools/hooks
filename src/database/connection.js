import pgpInit from 'pg-promise';

const pgp = pgpInit();

let connection = null;

export function getConnection(url) {
  if (connection === null) {
    connection = pgp(url);
  }
  return connection;
}
