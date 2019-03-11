import express from 'express';
import bodyParser from 'body-parser';
import { unauthorized } from '../unauthorized';
import * as events from './events';

const jsonParser = bodyParser.json();
export const api = express.Router();

api.use(unauthorized);
api.use(jsonParser);

api.get('/events', (req, res) => {
  res.sendStatus(200).end();
});

api.post('/event', (req, res) => {
  try {
    events.add(req.body.name);
    res.sendStatus(200);
  } catch (e) {
    res.sendStatus(400);
  }
});
