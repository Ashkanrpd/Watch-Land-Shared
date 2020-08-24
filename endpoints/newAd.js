const express = require("express");
const router = express.Router();
const multer = require("multer");
const upload = multer({ dest: "./uploads/" });
const getDb = require("../database/db.js").getDb;
const sessions = require("../server.js");

router.post("/", upload.single("img"), async (req, res) => {
  let sessionId = req.cookies.sid;
  let username = sessions[sessionId];
  if (username) {
    let owner = username;
    let brand = req.body.brand;
    let des = req.body.description;
    let image = req.file;
    let imagePath = "/uploads/" + image.filename;
    let price = req.body.price;
    let year = req.body.year;
    let gender = req.body.gender;

    await getDb("items").insertOne({
      username: owner,
      brand: brand,
      description: des,
      price: price,
      year: year,
      imagePath: imagePath,
      gender: gender,
    });
    res.send(JSON.stringify({ success: true }));
    return;
  }
  res.send(JSON.stringify({ success: false }));
});

module.exports = router;
