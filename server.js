require("dotenv").config();
let express = require("express");
let app = express();
let MongoClient = require("mongodb").MongoClient;
let ObjectId = require("mongodb").ObjectId;
let multer = require("multer");
let upload = multer({ dest: __dirname + "/uploads/" });
let reloadMagic = require("./reload-magic.js");
let cookieParser = require("cookie-parser");
let sha1 = require("sha1");
reloadMagic(app);
let dbo = undefined;
let url = process.env.SERVER_PATH;
MongoClient.connect(
  url,
  { userNewUrlParser: true, useUnifiedTopology: true },
  (err, client) => {
    dbo = client.db("eCommerce");
  }
);
let sessions = {};

app.use(cookieParser());
app.use("/", express.static("build")); // Needed for the HTML and JS files
app.use("/", express.static("public")); // Needed for local assets
app.use("/uploads", express.static("uploads"));

// Your endpoints go after this line

app.post("/SignUp", upload.none(), async (req, res) => {
  let name = req.body.username;
  let pwd = req.body.password;
  try {
    let user = await dbo.collection("users").findOne({ username: name });
    if (user) {
      console.log("/SignUp Error - Username is already taken!");
      res.send(JSON.stringify({ success: false }));
      return;
    }
    await dbo.collection("users").insertOne({
      username: name,
      password: sha1(pwd),
    });
    console.log("/SignUp - Signed Up Successfully!");
    res.send(JSON.stringify({ success: true }));
    return;
  } catch (err) {
    console.log("/SignUp Error", err);
    res.send(JSON.stringify({ success: false }));
  }
});
app.post("/Login", upload.none(), async (req, res) => {
  let name = req.body.username;
  let pwd = req.body.password;
  await dbo.collection("users").findOne({ username: name }, (err, user) => {
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
app.post("/Logout", (req, res) => {
  const sessionId = req.cookies.sid;
  delete sessions[sessionId];
  res.send(JSON.stringify({ success: true }));
});
app.get("/session", (req, res) => {
  const sessionId = req.cookies.sid;
  console.log(sessionId);
  console.log(sessions[sessionId]);
  sessions[sessionId]
    ? res.send(JSON.stringify({ success: true, username: sessions[sessionId] }))
    : res.send(JSON.stringify({ success: false }));
});
app.get("/getItems", async (req, res) => {
  console.log("request to /all-Items");
  await dbo
    .collection("items")
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
app.post("/findItem", upload.none(), async (req, res) => {
  console.log("request to /findItem");
  console.log(req.body);
  let id = req.body.id;
  try {
    let item = await dbo.collection("items").findOne({ _id: ObjectId(id) });
    if (item) {
      res.send(JSON.stringify(item));
      return;
    }
    console.log("/findItem - item not found");
    res.send(JSON.stringify({ success: false }));
    return;
  } catch (err) {
    console.log("/Find Item Error", err);
    res.send(JSON.stringify({ success: false }));
  }
});
app.post("/newAdv", upload.single("img"), async (req, res) => {
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

    await dbo.collection("items").insertOne({
      username: owner,
      brand: brand,
      description: des,
      price: price,
      year: year,
      imagePath: imagePath,
      gender: gender,
    });
    console.log("Post successfull");
    res.send(JSON.stringify({ success: true }));
    return;
  }
  console.log("Post failed");
  res.send(JSON.stringify({ success: false }));
});
app.post("/deleteAd", upload.none(), async (req, res) => {
  let sessionId = req.cookies.sid;
  let username = sessions[sessionId];
  if (username) {
    let id = req.body.id;
    console.log(id);
    await dbo.collection("items").remove({ _id: ObjectId(id) });
    console.log("item removed successfully");
    res.send(JSON.stringify({ success: true }));
    return;
  }
  ("item remove failed");
  res.send(JSON.stringify({ success: false }));
});

app.all("/*", (req, res) => {
  // needed for react router
  console.log("/*");
  res.sendFile(__dirname + "/build/index.html");
});

app.listen(4000, "0.0.0.0", () => {
  console.log("Server running on port 4000");
});
