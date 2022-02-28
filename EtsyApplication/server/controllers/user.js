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

exports.login = (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  db.query(
    "SELECT * FROM users WHERE email =? AND password =?",
    [email, password],
    (err, result) => {
      if (err) {
        res.send({ err: err });
      }
      if (result.length > 0) {
        res.send(result);
      } else {
        res.send({ message: "Wrong Username/Pasword!" });
      }
    }
  );
};
