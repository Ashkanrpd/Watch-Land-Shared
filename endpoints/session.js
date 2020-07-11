const express = require("express");
const router = express.Router();
const sessions = require("../server.js");

router.get("/", (req, res) => {
  const sessionId = req.cookies.sid;
  console.log(sessionId);
  console.log(sessions[sessionId]);
  sessions[sessionId]
    ? res.send(JSON.stringify({ success: true, username: sessions[sessionId] }))
    : res.send(JSON.stringify({ success: false }));
});

module.exports = router;
