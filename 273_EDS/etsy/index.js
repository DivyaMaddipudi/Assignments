const express = require("express");

const app = express();
var bodyParser = require("body-parser");
//require express session
var session = require("express-session");
var cookieParser = require("cookie-parser");
var mysql = require("mysql");
const req = require("express/lib/request");
var constants = require("./config.json");
const port = 3000;

app.set("view engine", "ejs");
app.set("views", "./views");
app.use(express.static(__dirname + "/public"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
//use cookie parser to parse request headers
app.use(cookieParser());
//use session to store user data between HTTP requests
app.use(
  session({
    secret: "cmpe_273_secure_string",
    resave: false,
    saveUninitialized: true,
  })
);

var connection = mysql.createPool({
  host: constants.DB.host,
  user: constants.DB.username,
  password: constants.DB.password,
  port: constants.DB.port,
  database: constants.DB.database,
});

connection.getConnection((err) => {
  if (err) {
    throw "Error Occured " + err;
  }
  console.log("Pool created");
});

var Users = [
  {
    username: "admin",
    password: "admin",
  },
];

app.get("/", (req, res, next) => {
  //   res.send("Ecommerce appplication");
  res.render("login");
});

app.get("/home", (req, res) => {
  res.render("home");
});

app.post("/login", (req, res, next) => {
  if (req.session.user) {
    res.render("login");
  } else {
    console.log("Req Body : ", req.body);
    Users.filter((user) => {
      if (
        user.username === req.body.username &&
        user.password === req.body.password
      ) {
        req.session.user = user;
        console.log(req.session.user + "checking in login");
        res.redirect("/home");
      } else {
        loginErrorMsg = "Invalid Credentials";
        res.render("login", { error: loginErrorMsg });
      }
    });
  }
});

app.listen(port, () => {
  console.log(`listenig to port ${port}`);
});
