const express = require("express");
const router = express.Router();
const getDb = require("../database/db.js").getDb;

router.get("/", async (req, res) => {
  console.log("request to /all-Items");
  await getDb("items")
    .find({})
    .toArray((err, item) => {
      if (err) {
        console.log("error", err);
        res.send("fail");
        return;
      }
      res.send(JSON.stringify(item));
    });
});
module.exports = router;
