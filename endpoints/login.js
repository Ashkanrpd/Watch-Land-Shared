const express = require("express");
const router = express.Router();
const multer = require("multer");
const upload = multer({ dest: "./uploads/" });
const sha1 = require("sha1");
const getDb = require("../database/db.js").getDb;
const sessions = require("../server.js");

router.post("/", upload.none(), async (req, res) => {
  let name = req.body.username;
  let pwd = req.body.password;
  await getDb("users").findOne({ username: name }, (err, user) => {
    if (err) {
      console.log("login failed", err);
      res.send(JSON.stringify({ success: false }));
      return;
    }
    if (user === null) {
      console.log(" Username not found!");
      res.send(JSON.stringify({ success: false }));
      return;
    }
    if (user.password === sha1(pwd)) {
      console.log("Login successfull");
      let sessionId = "" + Math.floor(Math.random() * 1000000);
      sessions[sessionId] = name;
      res.cookie("sid", sessionId);
      res.send(JSON.stringify({ success: true }));
      return;
    }
    res.send(JSON.stringify({ success: false }));
  });
});

module.exports = router;
