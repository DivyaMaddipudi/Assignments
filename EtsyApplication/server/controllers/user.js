const { json } = require("body-parser");
const mysql = require("mysql");
const constants = require("../config/config.json");
const Users = require("../models");

const db = mysql.createConnection({
  host: constants.development.host,
  user: constants.development.username,
  password: constants.development.password,
  port: constants.development.port,
  database: constants.development.database,
});

exports.sayHi = async (req, res) => {
  const listOfUsers = db.query("SELECT * FROM Users", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
};

exports.signUp = (req, res) => {
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
};

const setOutput = (result) => {
  output = result[0];
  console.log(output.name);
};

exports.login = (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  console.log(email + " email body");
  // const password = req.body.password;

  console.log("In login post req");
  db.query(
    "SELECT * FROM Users WHERE email=? AND password=?",
    [email, password],
    (err, result) => {
      if (err) {
        res.sendStatus(400).send({ err: err });
        res.end();
      }

      if (result.length > 0) {
        res.cookie("cookie", result[0].name, {
          maxAge: 900000,
          httpOnly: false,
          path: "/",
        });
        setOutput(result);
        res.sendStatus(200).send(result);
        res.end();
      } else {
        res.sendStatus(400).send({ message: "Wrong Username/Pasword!" });
        res.end();
      }
    }
  );
};

exports.getHome = (req, res) => {
  if (req.session.loggedin) {
    console.log(req.session.username + "------------------------");
    res.send("Welcome back, " + req.session.username + "!");
  } else {
    res.send("Please login to view this field");
  }
};
