const express = require("express");
const cors = require("cors");
const router = require("./routes");
const session = require("express-session");
const passport = require("passport");
const MongoStore = require("connect-mongo");
const errorHandler = require("./middleware/error");
const path = require("path");
require("dotenv").config();
require("./config/passport");

const app = express();

app.use(express.json());
app.use(cors({ credentials: true, origin: true }));

app.use(
  session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({ mongoUrl: process.env.MONGO_URI }),
    cookie: {
      maxAge: 1000 * 60 * 60 * 24 * 7,
    },
    unset: "destroy",
  })
);

app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(path.join(__dirname, "build")));

app.use("/api", router);

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname + "/build/index.html"));
});

app.use(errorHandler);

app.listen(3004, () => {
  console.log("listening on 3004");
});
