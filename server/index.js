require("dotenv").config();
const express = require("express");
const passport = require("passport");
const connectAndStartServer = require("./server");
const authRoutes = require("./routes/authRoutes");
const mongoose = require("mongoose");
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);
const User = require("./models/UserModel.js");

const app = express();

const store = new MongoDBStore({
    uri: "mongodb://127.0.0.1:27017/slack-clone",
    collection: "sessions",
    expires: 1000 * 60 * 60 * 24,
  });

  app.use(
    session({
      secret: "your_secret_key",
      resave: false,
      saveUninitialized: false,
      store: store,
      cookie: {
        maxAge: 1000 * 60 * 60 * 24,
      },
    })
  );

app.use(passport.initialize());
app.use(express.json());
app.use("/auth", authRoutes);

connectAndStartServer(app);
