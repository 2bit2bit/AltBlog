const express = require("express");
const passport = require('passport');
const path = require("path");
const mongoose = require("mongoose");
require("dotenv").config();

const User = require("./models/user");

//VALUES FROM .env
const PORT = process.env.PORT;
const MONGODB_URI = process.env.MONGODB_URI;

//SETUPS AND MIDDLEWARES
const app = express();
app.set("view engine", "ejs");
app.set("views", "views");
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

// app.use((req, res, next) => {
//   User.findById('635bd70e5547a523459c8f26')
//     .then(user => {
//       req.user = user
//       next()
//     })
//     .catch(err => {
//       console.log(err)
//     })
// })


//ROUTES

require("./controllers/auth")

const blogRoute = require("./routes/blog"); 
const userRoute = require("./routes/user");
const authRoute = require("./routes/auth");
const errorController = require("./controllers/error");

app.use("/user", passport.authenticate('jwt', { session: false }), userRoute);
app.use("/", blogRoute);
app.use("/", authRoute);
app.use("/", errorController.error404);

//LISTEN

mongoose
  .connect(MONGODB_URI)
  .then(() => {
    app.listen(PORT, () => {
      console.log(`server running on  http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });
