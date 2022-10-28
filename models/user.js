const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
      },
    first_name: {
        type: String,
        required: true,
      },
    last_name: {
        type: String,
        required: true,
      },
    password: {
        type: String,
        required: true,
      },
});

module.exports = mongoose.model("User", userSchema);