export function enforceSsl(req, res, next) {
  if (req.headers['x-forwarded-proto'] !== 'https') {
    console.log('request not https');
    return res.redirect(`https://${req.get('host')}${req.url}`);
  }
  return next();
}
