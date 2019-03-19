export function unauthorized(req, res, next) {
  if (!req.user) {
    res.sendStatus(401).end();
    console.log(`unauthoried request to ${req.path}`);
    return;
  }
  next();
}
