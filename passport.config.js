const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const passportJWT = require('passport-jwt');
const jwt = require('jsonwebtoken');
const User = require('./models/User');
require('dotenv/config');

passport.use(
  new GoogleStrategy({
    // options for google strategy
    clientID: process.env.GOOGLE_AUTH_CLIENTID,
    clientSecret: process.env.GOOGLE_AUTH_CLIENTSECRET,
    callbackURL: '/auth/google/redirect'
  }, async (accessToken, refreshToken, profile, done) => {
    try {
      let user = null;

      user = await User.findOne({ googleID: profile.id });

      if (!user) {
        try {
          user = await new User({
            username: profile.displayName,
            googleID: profile.id,
          }).save();
        } catch (err) {
          return done(err);
        }
      }

      const token = jwt.sign(user.toJSON(), process.env.JWT_SECRET);
      done(null, token);
    } catch (err) {
      return done(err);
    }
  })
);

passport.use(
  new passportJWT.Strategy({
    jwtFromRequest: passportJWT.ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_SECRET,
  }, async (payload, next) => {
    try {
      const userInDB = await User.findOne({ id: payload.id });
      if (userInDB) return next(null, userInDB);
      console.log('NO USER IN DB :(');
    } catch (err) {
      return next(err);
    }
  })
);