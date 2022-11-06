const app = require('./index');
require("dotenv").config();

const Database = require("./utils/database");

const PORT = process.env.PORT;
const MONGODB_URI = process.env.MONGODB_URI;

Database.connect(MONGODB_URI);

app.listen(PORT, () => {
  console.log(`server running on  http://localhost:${PORT}`);
});


