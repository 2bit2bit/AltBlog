const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
require("dotenv").config();

//VALUES FROM .env
const PORT = process.env.PORT;
const MONGODB_URI = process.env.MONGODB_URI;

//SETUPS AND MIDDLEWARES
const app = express();
app.set("view engine", "ejs");
app.set("views", "views");
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

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
  .then(
    app.listen(PORT, () => {
      console.log(`server running on  http://localhost:${PORT}`);
    })
  )
  .catch((err) => {
    console.log(err);
  });
