import express from 'express';
import jwt from 'express-jwt';
import jwks from 'jwks-rsa';
import { init } from './database';
import { unauthorized } from './unauthorized';
import { api } from './api';
import { health } from './health';

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

app.get('/authorized', unauthorized, (req, res) => {
  res.send('Secured Resource');
});

async function startServer() {
  await init();
  const port = process.env.PORT || 3031;
  app.listen(port, () => {
    console.log('hooks started');
  });
}

startServer();
