const bcrypt = require("bcryptjs");
const User = require("../models/user");

exports.getLogin = (req, res, next) => {
  res.send("login page");
};

exports.postLogin = (req, res, next) => {
  res.send("user is logged in");
};

exports.getSignup = (req, res, next) => {
  res.send("signUp page");
  i;
};

exports.postSignup = (req, res, next) => {
  const email = req.body.email;
  const first_name = req.body.first_name;
  const last_name = req.body.last_name;
  const password = req.body.password;

  bcrypt
    .hash(password, 12)
    .then((hashedPassword) => {
      const user = new User({
        email,
        first_name,
        last_name,
        password: hashedPassword
      });

      return user.save();
    })
    .then((user) => {
      console.log(user);
      res.send("user Signup");
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.postLogout = (req, res, next) => {
  res.send("user is logout");
};
