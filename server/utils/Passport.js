const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const User = require("../models/UserModel.js");

const credentials = {
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: "/auth/google/callback",
};

const callback_function = (accessToken, refreshToken, profile, done) => {

  console.log(profile);

  User.findOne({ googleId: profile.id })
    .then((existingUser) => {
      if (existingUser) {
        return done(null, existingUser);
      } else {
        const newUser = new User({
          username: profile.displayName,
          email: profile.emails[0].value,
          photo: profile.photos[0].value,
        });
        
        console.log(newUser);

        newUser.save().then((user) => {
          return done(null, user);
        });
      }
    })
    .catch((err) => {
      return done(err, null);
    });
};

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});

passport.use(new GoogleStrategy(credentials, callback_function));

module.exports = passport;
