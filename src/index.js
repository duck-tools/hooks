import express from 'express';
import jwt from 'express-jwt';
import jwks from 'jwks-rsa';
import { queries } from './queries';

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
app.use('/', queries);

app.get('/authorized', (req, res) => {
  if (!req.user) {
    res.sendStatus(401).end();
    return;
  }
  res.send('Secured Resource');
});

const port = process.env.PORT || 3031;
app.listen(port, () => {
  console.log('hooks started');
});
