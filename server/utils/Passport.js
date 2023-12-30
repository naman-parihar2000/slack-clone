const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const AWS = require("./AWS.js");
const dynamodb = new AWS.DynamoDB.DocumentClient();

const credentials = {
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: "/auth/google/callback",
};

const callback_function = async (accessToken, refreshToken, profile, done) => {
  try {
    const get_params = {
      TableName: "Users",
      Key: { googleId: profile.id },
    };

    let { Item } = await dynamodb.get(get_params).promise();

    if (!Item) {
      const user = {
        username: profile.displayName,
        googleId: profile.id,
        email: profile.emails[0].value,
        photo: profile.photos[0].value,
        workspaces: [],
        workspaces_emails: [],
      };
      const update_params = {
        TableName: "Users",
        Item: user,
      };
      await dynamodb.put(update_params).promise();
      done(null, user);
    } else {
      done(null, Item);
    }
  } catch (error) {
    return done(error, null);
  }
};

passport.serializeUser((user, done) => {
  done(null, user.googleId);
});

passport.deserializeUser(async (googleId, done) => {
  try {
    const get_params = {
      TableName: "Users",
      Key: { googleId },
    };

    let { Item } = await dynamodb.get(get_params).promise();

    return done(null, Item);
  } catch (error) {
    return done(error);
  }
});

passport.use(new GoogleStrategy(credentials, callback_function));

module.exports = passport;
