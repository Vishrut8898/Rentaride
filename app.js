const express = require("express");
const mongoose = require("mongoose");
const passport = require("passport");
const flash = require("connect-flash");
const session = require("express-session");

// app using express
const app = express();

// Passport config
require("./config/passport")(passport);

// Connect to MongoDB
mongoose
  .connect(
    "mongodb+srv://oauth:oauth@cluster0.cbies.mongodb.net/rentaride?retryWrites=true&w=majority",
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

// EJS
app.set("view engine", "ejs");

// middleware
app.use(express.static("./public"));

// Express body parser
app.use(express.urlencoded({ extended: true }));

// Express session middleware
app.use(
  session({
    secret: "secret",
    resave: true,
    saveUninitialized: true,
  })
);

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Connect flash
app.use(flash());

// Global vars
app.use((req, res, next) => {
  res.locals.success_msg = req.flash("success_msg");
  res.locals.error_msg = req.flash("error_msg");
  res.locals.error = req.flash("error");
  next();
});

// Routes
app.use("/", require("./routes/index.js"));
app.use("/users", require("./routes/users.js"));

const PORT = process.env.PORT || 7070;

app.listen(PORT, console.log(`Server started on port ${PORT}`));
