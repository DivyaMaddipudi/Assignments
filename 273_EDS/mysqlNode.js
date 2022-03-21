var mysql = require("mysql");

var con = mysql.createConnection({
  host: "54.193.95.78",
  user: "root",
  password: "MySQL@123",
});

con.connect(function (err) {
  if (err) throw err;
  console.log("Connected!");
});
