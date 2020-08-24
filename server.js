require("dotenv").config();
const express = require("express");
const app = express();
const multer = require("multer");
const upload = multer({ dest: __dirname + "/uploads/" });
const reloadMagic = require("./reload-magic.js");
const cookieParser = require("cookie-parser");
const initMongo = require("./database/db.js").initMongo;
const url = process.env.SERVER_PATH;
const sessions = {};
reloadMagic(app);

app.use(cookieParser());
app.use("/", express.static("build")); // Needed for the HTML and JS files
app.use("/", express.static("public")); // Needed for local assets
app.use("/uploads", express.static("uploads"));

// Importing the endpoints
const login = require("./endpoints/login.js");
const signup = require("./endpoints/signup.js");
const logout = require("./endpoints/logout.js");
const session = require("./endpoints/session.js");
const getItems = require("./endpoints/getItems.js");
const findItem = require("./endpoints/findItem.js");
const newAd = require("./endpoints/newAd.js");
const deleteAd = require("./endpoints/deleteAd.js");

// Endpoints go after this line
app.use("/SignUp", signup);
app.use("/Login", login);
app.use("/Logout", logout);
app.use("/session", session);
app.use("/getItems", getItems);
app.use("/findItem", findItem);
app.use("/newAd", newAd);
app.use("/deleteAd", deleteAd);
app.all("/*", (req, res) => {
  // needed for react router
  res.sendFile(__dirname + "/build/index.html");
});

// Starting the server
const start = async () => {
  await initMongo(url).then(() => {
    app.listen(process.env.PORT || 5000, "0.0.0.0", () => {
      console.log("Server running on port 4000");
    });
  });
};
start();

module.exports = sessions;
