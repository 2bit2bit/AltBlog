const passport = require("passport");
const localStrategy = require("passport-local").Strategy;
const JWTstrategy = require("passport-jwt").Strategy;
const ExtractJWT = require("passport-jwt").ExtractJwt;

const User = require("../models/user");

passport.use(
  new JWTstrategy(
    {
      secretOrKey: process.env.JWT_SECRET,
      jwtFromRequest: ExtractJWT.fromUrlQueryParameter("secret_token"),
      // jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken() // Use this if you are using Bearer token
    },
    async (token, done) => {
      try {
        return done(null, token.user);
      } catch (error) {
        done(error);
      }
    }
  )
);

passport.use(
  "signup",
  new localStrategy(
    {
      usernameField: "email",
      passwordField: "password",
      passReqToCallback: true,
    },
    async (req, email, password, done) => {
      try {
        const first_name = req.body.first_name;
        const last_name = req.body.last_name;

        const user = await User.create({
          email,
          password,
          first_name,
          last_name,
        });

        return done(null, user);
      } catch (error) {
        done(error);
      }
    }
  )
);

passport.use(
  "login",
  new localStrategy(
    {
      usernameField: "email",
      passwordField: "password",
    },
    async (email, password, done) => {
      try {
        console.log(email);
        const user = await User.findOne({ email });

        if (!user) {
          return done(null, false, { message: "User not found" });
        }

        const validate = await user.isValidPassword(password);

        if (!validate) {
          return done(null, false, { message: "Wrong Password" });
        }

        return done(null, user, { message: "Logged in Successfully" });
      } catch (error) {
        console.log(error);
        return done(error);
      }
    }
  )
);

// exports.getLogin = (req, res, next) => {
//   res.send("login page");
// };

// exports.postLogin = (req, res, next) => {
//   const email = req.body.email;
//   const password = req.body.password;

//   User.findOne({ email: email }).then((user) => {
//     if (!user) {
//       console.log("user dosent exist");
//       return;
//     }

//     bcrypt
//       .compare(password, user.password)
//       .then(doMatch => {
//         if(!doMatch) {
//           console.log('wrong psw')
//           return
//         }

//         console.log('correct psw')
//         //set jwt
//       })
//       .catch((err) => {
//         consoel.log(err);
//       });
//   });
// };

// exports.getSignup = (req, res, next) => {
//   res.send("signUp page");
//   i;
// };

// exports.postSignup = (req, res, next) => {
//   const email = req.body.email;
//   const first_name = req.body.first_name;
//   const last_name = req.body.last_name;
//   const password = req.body.password;

//   bcrypt
//     .hash(password, 12)
//     .then((hashedPassword) => {
//       const user = new User({
//         email,
//         first_name,
//         last_name,
//         password: hashedPassword,
//       });

//       return user.save();
//     })
//     .then((user) => {
//       console.log(user);
//       res.send("user Signup");
//     })
//     .catch((err) => {
//       console.log(err);
//     });
// };

// exports.postLogout = (req, res, next) => {
//   res.send("user is logout");
// };
