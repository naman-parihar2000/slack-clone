require("dotenv").config();
const express = require("express");
const passport = require("passport");
const connectAndStartServer = require("./server");
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
// const AWS = require("./utils/AWS.js");
const mongoose = require("mongoose");
const session = require("express-session");
const MongoDBStore = require("connect-mongodb-session")(session);
const cors = require("cors");

const app = express();

const corsOptions = {
  origin: "http://localhost:3000",
  credentials: true,
};
app.use(cors(corsOptions));

const store = new MongoDBStore({
  uri: "mongodb://127.0.0.1:27017/slack-clone",
  collection: "sessions",
  expires: 1000 * 60 * 60 * 24,
});

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    name: "slack-clone",
    resave: false,
    saveUninitialized: false,
    store: store,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24,
    },
  })
);

app.use(passport.initialize());
app.use(passport.session());
app.use(express.json());
app.use("/auth", authRoutes);
app.use("/user", userRoutes);

// app.post("/put_entry", async (req, res) => {
//   const dynamodb = new AWS.DynamoDB.DocumentClient();
//   const params = {
//     TableName: "Sessions",
//     Item: {
//       session_id: "123321",
//       user_id: "N",
//       created_at: Date.now(),
//     },
//   };

//   try {
//     await dynamodb.put(params).promise();
//     res.send("DATA ENTERED!");
//   } catch (err) {
//     console.log(err);
//     res.send("SOMETHINGS GONE WRONG!");
//   }
// });

connectAndStartServer(app);
