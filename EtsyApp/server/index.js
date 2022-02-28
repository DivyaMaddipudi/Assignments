const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const constants = require("./config.json");
const mysql = require("mysql");
const profileRoutes = require("./routes/profile");
const app = express();

app.use("/profile", profileRoutes);

app.use(bodyParser.json({ limit: "20mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "20mb", extended: true }));

app.use(cors());
app.use(express.json());

// db connection
// var connection = mysql.createPool({
//   host: constants.DB.host,
//   user: constants.DB.username,
//   password: constants.DB.password,
//   port: constants.DB.port,
//   database: constants.DB.database,
// });

const db = mysql.createConnection({
  host: constants.DB.host,
  user: constants.DB.username,
  password: constants.DB.password,
  port: constants.DB.port,
  database: constants.DB.database,
});

app.post("/create", (req, res) => {
  const name = req.body.name;
  console.log(req.name);

  const age = req.body.age;
  const country = req.body.country;
  const position = req.body.position;
  const wage = req.body.wage;

  db.query(
    "INSERT INTO employees (name, age, country, position, wage) VALUES (?, ?, ?, ?, ?)",
    [name, age, country, position, wage],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send("Values Inserted");
      }
    }
  );
});

app.get("/employees", (req, res) => {
  db.query("SELECT * FROM employees", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});
// connection.getConnection((err) => {
//   if (err) {
//     throw "Error Occured " + err;
//   }
//   console.log("Pool created");
// });

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log("Serving running on port 4000");
});
