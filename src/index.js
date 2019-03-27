import express from 'express';
import jwt from 'express-jwt';
import jwks from 'jwks-rsa';
import { init as initDb } from './database';
import { unauthorized } from './unauthorized';
import { api } from './api';
import { health } from './health';

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

const app = express();

const jwtCheck = jwt({
  credentialsRequired: false,
  secret: jwks.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: 'https://qragga-apps.auth0.com/.well-known/jwks.json'
  }),
  audience: 'https://faeron-hooks.herokuapp.com',
  issuer: 'https://qragga-apps.auth0.com',
  algorithms: ['RS256']
});

app.use(jwtCheck);
app.use('/api', api);

app.get('/health', health);

async function startServer() {
  await initDb(process.env.DATABASE_URL);
  const port = process.env.PORT || 3031;
  app.listen(port, () => {
    console.log('hooks started');
  });
}

startServer();
