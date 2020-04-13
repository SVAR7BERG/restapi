const authRouter = require('express').Router();
const passport = require('passport');

authRouter.get('/login', (req, res) => {
  res.send('Login');
});

authRouter.get('/logout', (req, res) => {
  res.send('Logout');
});

authRouter.get('/google', passport.authenticate('google', { scope: ['profile'] }));

authRouter.get(
  '/google/redirect',
  passport.authenticate('google', { session: false }),
  (req, res) => res.send(req.user)
);

module.exports = authRouter;