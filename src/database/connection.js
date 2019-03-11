import pgpInit from 'pg-promise';

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

const pgp = pgpInit();

export const connection = pgp(process.env.DATABASE_URL);
