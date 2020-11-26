const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const passport = require("passport");

const Detail = require("../models/Detail");
const User = require("../models/User");
const ensureAuthenticated = require("../config/auth");

// get methods
router.get("/login", (req, res) => {
  res.render("login");
});

router.get("/signup", (req, res) => {
  res.render("signup");
});

// post methods
router.post("/signup", (req, res) => {
  const { name, email, phone, password, password2 } = req.body;
  let errors = [];

  if (!name || !email || !phone || !password || !password2) {
    req.flash("error", "All fields are required");
    return res.redirect("/users/signup");
  }
  if (phone.length < 10 || phone.length > 10) {
    req.flash("error", "Incorrect phone number.");
    return res.redirect("/users/signup");
  }
  if (password.length < 6) {
    req.flash("error", "Password must be atleast of 6 length.");
    return res.redirect("/users/signup");
  } else {
    User.findOne({ email: email })
      .then((user) => {
        if (user) {
          req.flash("error", "Email already exists");
          return res.redirect("/users/signup");
        } else {
          const newUser = new User({
            name,
            email,
            phone,
            password,
          });

          bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(newUser.password, salt, (err, hash) => {
              if (err) throw err;
              newUser.password = hash;
              newUser
                .save()
                .then((user) => {
                  res.redirect("/users/login");
                })
                .catch((err) => console.log(err));
            });
          });
        }
      })
      .catch((err) => console.log(err));
  }
});

// Login
router.post("/login", async (req, res, next) => {
  const { email, password } = req.body;

  if (email === "admin@gmail.com" && password === "admin") {
    const users = await User.findOne();
    const details = await Detail.find();
    res.render("admin", { details: details, users: users });
  } else {
    User.findOne({ email: email }).then((user) => {
      if (!user) {
        req.flash("error", "No such user found.");
        return res.redirect("/users/login");
      }
    });

    passport.authenticate("local", (err, user, info) => {
      if (err) {
        req.flash("error", "Something went wrong.");
        return next(err);
      }
      if (!user) {
        req.flash("error", "User not registered.");
        return res.redirect("/users/login");
      }
      req.logIn(user, (err) => {
        if (err) {
          req.flash("error", "Something went wrong.");
          return next(err);
        }

        return res.redirect("/");
      });
    })(req, res, next);
  }
});

// Logout Handle
router.get("/logout", (req, res) => {
  req.logout();
  req.flash("success_msg", "You are logged out.");
  res.redirect("/users/login");
});

module.exports = router;
