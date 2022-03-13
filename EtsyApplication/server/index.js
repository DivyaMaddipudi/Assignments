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
const multer = require("multer");
const path = require("path");

//import routes
const userRoutes = require("./routes/user");
const { count } = require("console");

const app = express();

app.use(
  cors({
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST", "PUT"],
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

// storage

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "../client/src/Images");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + file.originalname);
  },
});

const upload = multer({
  storage: storage,
  limits: { fileSize: "1000000" },
  fileFilter: (req, file, cb) => {
    const fileTypes = /jpeg|jpg|png|gif/;
    const mimType = fileTypes.test(file.mimetype);
    const extname = fileTypes.test(path.extname(file.originalname));

    if (mimType && extname) {
      return cb(null, true);
    }
    cb("Give proper file name");
  },
}).single("itemImage");

//static images folder
app.use("/Images", express.static("./Images"));

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
        res.send({ success: true, result });
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

app.get("/user", (req, res) => {
  console.log("hello" + req.session);
  if (req.session.user) {
    res.send({ loggedIn: true, user: req.session.user });
  } else {
    res.send({ loggedIn: false });
  }
});

app.post("/findShopDuplicates", (req, res) => {
  const shopName = req.body.shopName;
  console.log("In findShopDuplicates " + shopName);
  db.query(
    "SELECT * FROM Users WHERE shopName=?",
    [shopName],
    (err, result) => {
      console.log(result.length);
      if (result.length !== 0) {
        res.send({
          message: "duplicate",
        });
        console.log("In shops db shop name found");
      } else {
        res.send({
          message: "No duplicates",
        });
        console.log("In shops db and no shop name found");
      }
    }
  );
});

app.post("/createShop/:id", (req, res) => {
  const shopName = req.body.shopName;
  const id = req.params.id;
  console.log("In create shop " + id);
  db.query(
    "UPDATE Users SET shopName=? WHERE id=?",
    [shopName, id],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        console.log(result);
        // res.send(result);
        res.send("Shops Value Inserted in user successfully");
      }
    }
  );
});

const addProduct = async (req, res) => {
  const userId = req.params.id;
  const itemImage = req.itemImage;
  const itemName = req.body.itemName;
  const itemDescriprion = req.body.description;
  const itemPrice = req.body.price;
  const itemCount = req.body.count;

  console.log("In add product" + itemImage + " jjjjjjj ");

  db.query(
    "INSERT INTO Items (userId, itemName, itemPrice, itemDescription, itemCount, itemImage) VALUES (?, ?, ?, ?, ?, ?)",
    [userId, itemName, itemPrice, itemDescriprion, itemCount, itemImage],
    (err, result) => {
      if (err) {
        res.send("error" + err);
      } else {
        res.send("Product added successfully");
      }
    }
  );
};
app.post("/addProduct/:id", async (req, res) => {
  try {
    let upload = multer({ storage: storage }).single("itemImage");
    upload(req, res, function (err) {
      if (!req.file) {
        return res.send("Please select an image to upload");
      } else if (err instanceof multer.MulterError) {
        return res.send(err);
      } else if (err) {
        return res.send(err);
      }

      const userId = req.params.id;
      const itemName = req.body.itemName;
      const itemDescriprion = req.body.itemDescription;
      const itemPrice = req.body.itemPrice;
      const itemCount = req.body.itemCount;
      const itemImage = req.file.filename;
      const itemCategory = req.body.itemCategory;

      console.log(itemImage);
      console.log(itemName);
      db.query(
        "INSERT INTO Items (userId, itemName, itemCategory, itemPrice, itemDescription, itemCount, itemImage) VALUES (?, ?, ?, ?, ?, ?, ?)",
        [
          userId,
          itemName,
          itemCategory,
          itemPrice,
          itemDescriprion,
          itemCount,
          itemImage,
        ],
        (err, result) => {
          if (err) {
            console.log(err);
            res.send({ message: "error" });
          } else {
            res.send({ message: "success" });
          }
        }
      );
    });
  } catch (err) {
    console.log(err);
  }
});

app.post("/getAllProducts/:id", (req, res) => {
  const id = req.params.id;
  const limit = req.body.limit ? parseInt(req.body.limit) : 100;
  const skip = parseInt(req.body.skip);
  const term = req.body.searchTerm;
  // console.log(req.body.skip + "skip");
  // console.log(req.body.limit + "limit");
  console.log("In get all prods");
  console.log(term);

  if (term) {
    console.log("In term");
    db.query(
      // SELECT * FROM test_schema.Items WHERE itemName LIKE "%Rice%" AND userId=1;
      `SELECT * FROM Items WHERE itemName LIKE "%${term}%" AND userId=? LIMIT  ?, ?`,
      [id, skip, limit],
      (err, result) => {
        if (err) {
          // console.log(result + "result in db");

          res.send(err + "err");
          console.log(err);
        } else {
          console.log("Out term");

          console.log(result + "result");
          res
            .status(200)
            .json({ success: true, result, postSize: result.length });
        }
      }
    );
  } else {
    db.query(
      "SELECT * FROM Items WHERE userId=? LIMIT  ?, ?",
      [id, skip, limit],
      (err, result) => {
        console.log(result.length + "result in db");
        if (err) {
          console.log("err");
          res.send(err + "err");
        } else {
          console.log(result + "result");
          res
            .status(200)
            .json({ success: true, result, postSize: result.length });
        }
      }
    );
  }
});

app.get("/getItemById/:itemId", (req, res) => {
  const id = req.params.itemId;
  db.query("SELECT * FROM Items WHERE itemId=?", id, (err, result) => {
    console.log(result);
    if (err) {
      res.send(err);
    } else {
      res.send(result);
    }
  });
});

app.put("/updateItemById/:itemId", (req, res) => {
  const id = req.params.itemId;
  // const userId = req.params.id;
  const itemName = req.body.itemName;
  const itemDescriprion = req.body.itemDescription;
  const itemPrice = req.body.itemPrice;
  const itemCount = req.body.itemCount;
  const itemCategory = req.body.itemCategory;

  console.log("In update item post");
  console.log(itemDescriprion);
  console.log(itemName);
  console.log(id);

  db.query(
    "UPDATE Items SET itemName=?, itemPrice=?, itemDescription=?, itemCount=?, itemCategory=? WHERE itemId=?",
    [itemName, itemPrice, itemDescriprion, itemCount, itemCategory, id],
    (err, result) => {
      console.log(result.itemName);
      if (err) {
        console.log(err);
        res.send(err);
      } else {
        res.send({ success: true, result });
      }
    }
  );
});

app.put("/updateItemImageById/:itemId", (req, res) => {
  try {
    let upload = multer({ storage: storage }).single("itemImage");
    upload(req, res, function (err) {
      if (!req.file) {
        return res.send("Please select an image to upload");
      } else if (err instanceof multer.MulterError) {
        return res.send(err);
      } else if (err) {
        return res.send(err);
      }

      const id = req.params.itemId;
      const itemImage = req.file.filename;
      console.log("In update item post");
      console.log(id);
      console.log(itemImage);
      db.query(
        "UPDATE Items SET itemImage=? WHERE itemId=?",
        [itemImage, id],
        (err, result) => {
          console.log(result);
          if (err) {
            console.log(err);
            res.send(err);
          } else {
            res.send({ success: true, result });
          }
        }
      );
    });
  } catch (err) {
    console.log(err);
  }
});

app.get("/getShopById/:userId", (req, res) => {
  console.log("In get shop by id");
  const userId = req.params.userId;
  db.query("SELECT * FROM Users WHERE id=?", userId, (err, result) => {
    if (err) {
      res.send(err);
      console.log(err);
    } else {
      console.log(result);
      res.send({ success: true, result });
    }
  });
});

app.put("/updateShopImageById/:id", (req, res) => {
  console.log("In edit shop details put method");
  try {
    let upload = multer({ storage: storage }).single("itemImage");
    upload(req, res, function (err) {
      if (!req.file) {
        return res.send("Please select an image to upload");
      } else if (err instanceof multer.MulterError) {
        return res.send(err);
      } else if (err) {
        return res.send(err);
      }

      const userId = req.params.id;
      const shopImage = req.file.filename;

      console.log("In update shop post ----------------------");
      console.log(shopImage);

      db.query(
        "UPDATE Users SET shopImage=? WHERE id=?",
        [shopImage, userId],
        (err, result) => {
          if (err) {
            console.log(err + "err");
            res.send(err);
          } else {
            res.send({ success: true, result });
          }
        }
      );
    });
  } catch (err) {
    console.log(err);
  }
});

const PORT = process.env.PORT || 4000;
models.sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log("Serving running on port 4000");
  });
});
