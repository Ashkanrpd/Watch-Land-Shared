const express = require("express");
const router = express.Router();
const getDb = require("../database/db.js").getDb;

router.get("/", async (req, res) => {
  await getDb("items")
    .find({})
    .toArray((err, item) => {
      if (err) {
        res.send("fail");
        return;
      }
      res.send(JSON.stringify(item));
    });
});
module.exports = router;
