const express = require("express");
const router = express.Router();
const sessions = require("../server.js");

router.post("/", (req, res) => {
  const sessionId = req.cookies.sid;
  delete sessions[sessionId];
  res.send(JSON.stringify({ success: true }));
});

module.exports = router;
