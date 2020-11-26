const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const User = require("../models/User");
const paypal = require("paypal-rest-sdk");
const Price = require("../models/Price");
const Contact = require("../models/Contact");

// bodyparser
const bodyParser = require("body-parser");
const urlencodedParser = bodyParser.urlencoded({ extended: false });

// database schema
const Detail = require("../models/Detail");
const ensureAuthenticated = require("../config/auth");
const ejs = require("ejs");

// get methods --------------------------------------
router.get("/", (req, res) => {
  User.find({}, (err, data) => {
    if (err) throw err;
    res.render("homepage", { user: req.user });
  });
});

router.get("/contact", (req, res) => {
  res.render("contact");
});

router.post("/contact", (req, res) => {
  const { name, email, tel, message } = req.body;
  let errors = [];

  if (!name || !email || !tel || !message) {
    req.flash("error", "All fields are required");
    return res.redirect("/contact");
  }
  if (tel.length < 10 || tel.length > 10) {
    req.flash("error", "Incorrect phone number.");
    return res.redirect("/contact");
  } else {
    var contact = new Contact({
      name,
      email,
      tel,
      message,
    });
    contact.save((err) => {
      if (err) throw err;
      res.render("submitted");
    });
  }
});

router.get("/details", (req, res) => {
  res.render("setting");
});

router.post("/details", ensureAuthenticated, urlencodedParser, (req, res) => {
  const {
    departDate,
    departPlace,
    departTime,
    returnDate,
    returnPlace,
    returnTime,
  } = req.body;
  var detail = Detail(req.body);
  detail.save((err) => {
    if (err) throw err;
  });
});

router.get("/booking", ensureAuthenticated, urlencodedParser, (req, res) => {
  User.find({}, (err, data) => {
    if (err) throw err;
    res.render("booking", { name: req.user.name });
  });
});
router.get("/order", ensureAuthenticated, urlencodedParser, (req, res) => {
  res.render("order", { name: req.user.name });
});

paypal.configure({
  mode: "sandbox", //sandbox or live
  client_id:
    "ATnkDoFDd_CWLKQvnssBiROpksJnewav1K9WEwQYS7FYHwAd0GAdxtxUJmBCMBDiq-NkVZyvysornUf8",
  client_secret:
    "EHzfzGEP7kID-EStLno5o4cA6l8-dKX8oliPaJpavbSYStnEzZ0nABATbLkXkX40LZbThNn2JHRw3vcu",
});

router.post("/pay", (req, res) => {
  const create_payment_json = {
    intent: "sale",
    payer: {
      payment_method: "paypal",
    },
    redirect_urls: {
      return_url: "http://localhost:7070/success",
      cancel_url: "http://localhost:7070/cancel",
    },
    transactions: [
      {
        item_list: {
          items: [
            {
              name: "Red Sox Hat",
              sku: "001",
              price: "9000.00",
              currency: "INR",
              quantity: 1,
            },
          ],
        },
        amount: {
          currency: "INR",
          total: "9000.00",
        },
        description: "Hat for the best team ever",
      },
    ],
  };

  paypal.payment.create(create_payment_json, function (error, payment) {
    if (error) {
      throw error;
    } else {
      for (let i = 0; i < payment.links.length; i++) {
        if (payment.links[i].rel === "approval_url") {
          res.redirect(payment.links[i].href);
        }
      }
    }
  });
});

router.get("/success", (req, res) => {
  const payerId = req.query.PayerID;
  const paymentId = req.query.paymentId;

  const execute_payment_json = {
    payer_id: payerId,
    transactions: [
      {
        amount: {
          currency: "INR",
          total: "300.00",
        },
      },
    ],
  };

  paypal.payment.execute(paymentId, execute_payment_json, function (
    error,
    payment
  ) {
    if (error) {
      console.log(error.response);
      throw error;
    } else {
      console.log(JSON.stringify(payment));
      res.render("success");
    }
  });
});

router.get("/cancel", (req, res) => res.render("cancel"));

module.exports = router;
