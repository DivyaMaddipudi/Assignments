const express = require("express");

const router = express.Router();

const { sayHi, signUp, login, getHome } = require("../controllers/user");

router.get("/", sayHi);

router.post("/register", signUp);

router.post("/signin", login);

router.get("/home", getHome);

module.exports = router;
