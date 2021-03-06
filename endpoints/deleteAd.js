const express = require("express");
const router = express.Router();
const multer = require("multer");
const upload = multer({ dest: "./uploads/" });
const ObjectId = require("mongodb").ObjectId;
const getDb = require("../database/db.js").getDb;
const sessions = require("../server.js");

router.post("/", upload.none(), async (req, res) => {
  let sessionId = req.cookies.sid;
  let username = sessions[sessionId];
  if (username) {
    let id = req.body.id;
    await getDb("items").deleteOne({ _id: ObjectId(id) });
    res.send(JSON.stringify({ success: true }));
    return;
  }
  ("item remove failed");
  res.send(JSON.stringify({ success: false }));
});
module.exports = router;
