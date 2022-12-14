const mongoose = require("mongoose");
const bcrypt = require('bcrypt');

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


userSchema.pre(
  'save',
  async function (next) {
      const user = this;
      const hash = await bcrypt.hash(this.password, 12);

      this.password = hash;
      next();
  }
);


userSchema.methods.isValidPassword = async function(password) {
  const user = this;
  const compare = await bcrypt.compare(password, user.password);

  return compare;
}


module.exports = mongoose.model("User", userSchema);
