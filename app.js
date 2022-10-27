const express = require("express");
require("dotenv").config();

const PORT = process.env.PORT;

const app = express();


const blogRoute = require('./routes/blog')
const userRoute = require('./routes/user')
const errorController = require('./controller/error')

app.use('/user', userRoute)

app.use('/', blogRoute)


app.use('/', errorController)


app.listen(PORT, () => {
  console.log(`server running on  htttp://localhost:${PORT}`);
});
