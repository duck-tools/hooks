import express from 'express';
import bodyParser from 'body-parser';
import { getConnection } from '../database';
import { unauthorized } from '../unauthorized';
import * as events from './events';

const jsonParser = bodyParser.json();
export const api = express.Router();

api.use(unauthorized);
api.use(jsonParser);

api.get('/events', async (req, res) => {
  const connection = getConnection();
  try {
    const results = await events.all(connection);
    res.json(results).status(200);
  } catch (e) {
    res.sendStatus(500);
  }
});

api.post('/event', (req, res) => {
  const connection = getConnection();
  try {
    events.add(connection, req.body.name);
    res.sendStatus(200);
  } catch (e) {
    res.sendStatus(400);
  }
});
