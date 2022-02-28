const express = require("express");

const router = express.Router();

const { sayHi, signUp, login } = require("../controllers/user");

router.get("/", sayHi);

router.post("/signup", signUp);

router.post("/login", login);

module.exports = router;
