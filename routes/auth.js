const express = require("express");
const passport = require("passport");
const jwt = require('jsonwebtoken');
require('dotenv').config();

const router = express.Router();

// const authController = require("../controllers/auth");

// router.get('/sign-up', authController.getSignup)
// router.post('/sign-up', authController.postSignup)
router.post(
  "/sign-up",
  passport.authenticate("signup", { session: false }),
  async (req, res, next) => {
    res.json({
      message: "Signup successful",
      user: req.user,
    });
  }
);

// router.get('/login', authController.getLogin)
router.post("/login", async (req, res, next) => {
  passport.authenticate("login", async (err, user, info) => {
    try {
      if (err) {
        return next(err);
      }
      if (!user) {
        const error = new Error("Username or password is incorrect here");
        return next(error);
      }

      req.login(user, { session: false }, async (error) => {
        if (error) return next(error);

        const body = { _id: user._id, email: user.email };
        //You store the id and email in the payload of the JWT.
        // You then sign the token with a secret or key (JWT_SECRET), and send back the token to the user.
        // DO NOT STORE Pemail: "email",
        const token = jwt.sign({ user: body }, process.env.JWT_SECRET, { expiresIn: '1h' });

        return res.json({ token });
      });
    } catch (error) {
      return next(error);
    }
  })(req, res, next);
});

// router.post('/logout', authController.postLogout)
router.post('/logout', (req, res) => {

})


module.exports = router;
