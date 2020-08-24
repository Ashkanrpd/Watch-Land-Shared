const express = require("express");
const router = express.Router();
const multer = require("multer");
const upload = multer({ dest: "./uploads/" });
const ObjectId = require("mongodb").ObjectId;
const getDb = require("../database/db.js").getDb;

router.post("/", upload.none(), async (req, res) => {
  let id = req.body.id;
  try {
    let item = await getDb("items").findOne({ _id: ObjectId(id) });
    if (item) {
      res.send(JSON.stringify(item));
      return;
    }
    res.send(JSON.stringify({ success: false }));
    return;
  } catch (err) {
    res.send(JSON.stringify({ success: false }));
  }
});

module.exports = router;
