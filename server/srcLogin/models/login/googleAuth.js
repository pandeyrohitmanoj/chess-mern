const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const oauthCred = require('../../../oauth-key-cred-client_secre.json')

passport.use(
  new GoogleStrategy(
    {
      clientID: oauthCred.client_id,
      clientSecret: oauthCred.client_secret,
      callbackURL: 'http://localhost:3000/auth/google/callback', // Replace with your callback URL
    },
    (accessToken, refreshToken, profile, done) => {
      // Perform actions with the user profile
      // (e.g., save user details to the database)
      return done(null, profile);
    }
  )
);

passport.serializeUser((user, done) => {
  // Serialize the user ID or relevant information
  done(null, user);
});

passport.deserializeUser((user, done) => {
  // Deserialize the user ID or relevant information
  done(null, user);
});

module.exports = passport;

