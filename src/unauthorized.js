export function unauthorized(req, res, next) {
  if (!req.user) {
    res.sendStatus(401).end();
    return;
  }
  next();
}
