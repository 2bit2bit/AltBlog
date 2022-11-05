const express = require("express");
const passport = require("passport");
const path = require("path");
require("dotenv").config();

const Database = require("./utils/database");

const PORT = process.env.PORT;
const MONGODB_URI = process.env.MONGODB_URI;

const app = express();
app.set("view engine", "ejs");
app.set("views", "views");
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

require("./controllers/auth");

const blogRoute = require("./routes/blog");
const userRoute = require("./routes/user");
const authRoute = require("./routes/auth");
const errorController = require("./controllers/error");


app.use("/user", passport.authenticate("jwt", { session: false }), userRoute);
app.use("/", authRoute);
app.use("/", blogRoute);
app.use("/", errorController.error404);

Database.connect(MONGODB_URI);

app.listen(PORT, () => {
  console.log(`server running on  http://localhost:${PORT}`);
});

module.exports = app;
