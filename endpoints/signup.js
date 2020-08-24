const express = require("express");
const router = express.Router();
const multer = require("multer");
const upload = multer({ dest: "./uploads/" });
const sha1 = require("sha1");
const getDb = require("../database/db.js").getDb;

router.post("/", upload.none(), async (req, res) => {
  let name = req.body.username;
  let pwd = req.body.password;
  try {
    let user = await getDb("users").findOne({ username: name });
    if (user) {
      res.send(JSON.stringify({ success: false }));
      return;
    }
    await getDb("users").insertOne({
      username: name,
      password: sha1(pwd),
    });
    res.send(JSON.stringify({ success: true }));
    return;
  } catch (err) {
    res.send(JSON.stringify({ success: false }));
  }
});

module.exports = router;
