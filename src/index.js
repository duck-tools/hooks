const express = require('express');
const jwt = require('express-jwt');
const jwks = require('jwks-rsa');

const app = express();

const jwtCheck = jwt({
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

app.get('/health', (req, res) => {
  res.sendStatus(200).end();
});

app.use(jwtCheck);

app.get('/authorized', (req, res) => {
  res.send('Secured Resource');
});

const port = process.env.PORT || 3031;
app.listen(port, () => {
  console.log('hooks started');
});
