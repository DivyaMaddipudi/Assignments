const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const models = require("./models");
const session = require("express-session");
const mysql = require("mysql");
const constants = require("./config/config.json");
const Users = require("./models");
// const jwt = require("express-jwt");
const jwt = require("jsonwebtoken");
const cookieParser = express("cocookie-parser");

//import routes
const userRoutes = require("./routes/user");

const app = express();

app.use(
  cors({
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST"],
    credentials: true,
  })
);
app.use(cookieParser);
app.use(bodyParser.json({ limit: "20mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "20mb", extended: true }));

app.use(express.json());

app.use(
  session({
    key: "email",
    secret: "cmpe273_kafka_passport_mongo",
    resave: false, // Forces the session to be saved back to the session store, even if the session was never modified during the request
    saveUninitialized: false, // Force to save uninitialized session to db. A session is uninitialized when it is new but not modified.
    // duration: 60 * 60 * 1000, // Overall duration of Session : 30 minutes : 1800 seconds
    activeDuration: 5 * 60 * 1000,
    cookie: {
      expiresIn: 60 * 60 * 24,
    },
  })
);

app.use(function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET,HEAD,OPTIONS,POST,PUT,DELETE"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers"
  );
  res.setHeader("Cache-Control", "no-cache");
  next();
});

const db = mysql.createConnection({
  host: constants.development.host,
  user: constants.development.username,
  password: constants.development.password,
  port: constants.development.port,
  database: constants.development.database,
});

//routers middleware
// app.use("/", userRoutes);
app.post("/register", (req, res) => {
  const username = req.body.username;
  console.log(username);
  const email = req.body.email;
  const password = req.body.password;

  db.query(
    "INSERT INTO Users (name, email, password) VALUES (?, ?, ?)",
    [username, email, password],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send("Values Inserted");
      }
    }
  );
});

app.get("/signin", (req, res) => {
  if (req.session.user) {
    res.send({ loggedIn: true, user: req.session.user });
  } else {
    res.send({ loggedIn: false });
  }
});

app.post("/signin", (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  console.log("In login post req");
  // console.log(email + " " + password + " email body");
  db.query(
    "SELECT * FROM Users WHERE email = ? AND password = ?",
    [email, password],
    (err, result) => {
      console.log(
        "res length------------" + result[0] + "=======" + result.length
      );
      if (err) {
        res.send({ err: err });
      }
      if (result.length > 0) {
        res.cookie("user", result[0].name, {
          maxAge: 900000,
          httpOnly: false,
          path: "/",
        });
        req.session.user = result;
        res.send(result);
      } else {
        res.send({ message: "Invalid creds" });
      }
    }
  );
});

const PORT = process.env.PORT || 4000;
models.sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log("Serving running on port 4000");
  });
});
