const express = require("express");
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

app.use((req, res, next) => {
  User.findById('635bd70e5547a523459c8f26')
    .then(user => {
      req.user = user
      next()
    })
    .catch(err => {
      console.log(err)
    })
})


//ROUTES
const blogRoute = require("./routes/blog");
const userRoute = require("./routes/user");
const errorController = require("./controllers/error");

app.use("/user", userRoute);
app.use("/", blogRoute);
app.use("/", errorController.error404);

//LISTEN

mongoose
  .connect(MONGODB_URI)
  .then(() => {

    // const user = new User({
    //   email: "2bit2bit@gmail.com",
    //   first_name: "Ephraim",
    //   last_name: "Haruna",
    //   password: "yeayeayea",
    // });

    // user.save()

    app.listen(PORT, () => {
      console.log(`server running on  http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });
