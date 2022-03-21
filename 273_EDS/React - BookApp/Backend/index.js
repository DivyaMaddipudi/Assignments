//import the require dependencies
var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var session = require("express-session");
var cookieParser = require("cookie-parser");
var cors = require("cors");
app.set("view engine", "ejs");

//use cors to allow cross origin resource sharing
app.use(cors({ origin: "http://localhost:3000", credentials: true }));

//use express session to maintain session data
app.use(
  session({
    secret: "cmpe273_kafka_passport_mongo",
    resave: false, // Forces the session to be saved back to the session store, even if the session was never modified during the request
    saveUninitialized: false, // Force to save uninitialized session to db. A session is uninitialized when it is new but not modified.
    duration: 60 * 60 * 1000, // Overall duration of Session : 30 minutes : 1800 seconds
    activeDuration: 5 * 60 * 1000,
  })
);

// app.use(bodyParser.urlencoded({
//     extended: true
//   }));
app.use(bodyParser.json());

//Allow Access Control
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

var Users = [
  {
    username: "admin",
    password: "admin",
  },
];

var books = [
  { BookID: "1", Title: "Book 1", Author: "Author 1" },
  { BookID: "2", Title: "Book 2", Author: "Author 2" },
  { BookID: "3", Title: "Book 3", Author: "Author 3" },
];

//Route to handle Post Request Call
app.post("/login", function (req, res) {
  // Object.keys(req.body).forEach(function(key){
  //     req.body = JSON.parse(key);
  // });
  // var username = req.body.username;
  // var password = req.body.password;
  console.log("Inside Login Post Request");
  //console.log("Req Body : ", username + "password : ",password);
  console.log("Req Body : ", req.body);
  Users.filter((user) => {
    if (
      user.username === req.body.username &&
      user.password === req.body.password
    ) {
      res.cookie("cookie", "admin", {
        maxAge: 900000,
        httpOnly: false,
        path: "/",
      });
      req.session.user = user;
      res.writeHead(200, {
        "Content-Type": "text/plain",
      });
      res.end("Successful Login");
    } else {
      res.status(400).send("Invalid User Credentials");
    }
  });
});

//Route to get All Books when user visits the Home Page
app.get("/home", function (req, res) {
  console.log("Inside Home Login");
  res.writeHead(200, {
    "Content-Type": "application/json",
  });
  console.log("Books : ", JSON.stringify(books));
  res.end(JSON.stringify(books));
});

app.post("/create", function (req, res) {
  console.log("Inside create");
  console.log(req.body);
  let isIdExist = books.some((book) => book.BookID === req.body.BookID);
  console.log(isIdExist + "-------------");
  if (isIdExist) {
    res.status(400).send(`Book with Id ${req.body.BookID} exists`);
    console.log(`Book with Id ${req.body.BookID} exists`);
  } else {
    console.log("Adding book");
    books.push(req.body);
  }
});

app.post("/delete", function (req, res) {
  console.log("Inside delete");
  console.log(req.body.id);
  let isIdExist = books.some((book) => book.BookID === req.body.id);
  console.log(isIdExist);
  if (isIdExist) {
    for (let i = 0; i < books.length; i++) {
      console.log(books[i].BookID + " " + i);
      if (books[i].BookID === req.body.id) {
        books.splice(i, 1);
        console.log(books + "after deleting");
      }
    }
  } else {
    res.status(400).send(`Book with Id ${req.body.id} doesn't exist`);
    console.log(`Book with Id ${req.body.id} doesn't exist`);
    // let deleteErrorMsg = `Book with Id ${req.body.BookID} doesn't exist`;
    // res.render("delete", { error: deleteErrorMsg });
  }
});
//start your server on port 3001
app.listen(3001);
console.log("Server Listening on port 3001");
