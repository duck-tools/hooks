import express from 'express';
import jwt from 'express-jwt';
import jwks from 'jwks-rsa';

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

function unauthorized(req, res, next) {
  if (!req.user) {
    res.sendStatus(401).end();
    return;
  }
  next();
}

app.use(jwtCheck);

app.get('/health', (req, res) => {
});

app.get('/authorized', unauthorized, (req, res) => {
  res.send('Secured Resource');
});

function startServer() {
  const port = process.env.PORT || 3031;
  app.listen(port, () => {
    console.log('hooks started');
  });
}

startServer();
