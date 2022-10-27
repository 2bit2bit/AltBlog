const express = require("express");
const path = require('path')
require("dotenv").config();

//VALUES FROM .env
const PORT = process.env.PORT;

//SETUPS AND MIDDLEWARES
const app = express();
app.set('view engine', 'ejs');
app.set('views', 'views');
app.use(express.urlencoded({ extended: false }))
app.use(express.static(path.join(__dirname, 'public')));

//ROUTES
const blogRoute = require('./routes/blog')
const userRoute = require('./routes/user')
const errorController = require('./controllers/error')

app.use('/user', userRoute)
app.use('/', blogRoute)
app.use('/', errorController.error404)

//LISTEN
app.listen(PORT, () => {
  console.log(`server running on  htttp://localhost:${PORT}`);
});
