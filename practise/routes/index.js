const express = require("express");
const router = express.Router();
const homeController = require("../controller/homeController");

console.log("router loaded");

router.post("/login", homeController.login);
router.post("/signup", homeController.register);
router.post("/dashboard/post", homeController.post);
router.post("/post/:id", homeController.deletePost);

router.get("/dashboard", homeController.dashboard);

module.exports = router;
