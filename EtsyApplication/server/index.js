const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const db = require("./models");

//import routes
const userRoutes = require("./routes/user");

const app = express();

app.use(bodyParser.json({ limit: "20mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "20mb", extended: true }));

app.use(cors());
app.use(express.json());

//routers middleware
app.use("/", userRoutes);

const PORT = process.env.PORT || 4000;

db.sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log("Serving running on port 4000");
  });
});
