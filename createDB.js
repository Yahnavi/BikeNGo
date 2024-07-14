const mongoose = require('mongoose');

mongoose.connect("mongodb://localhost:27017/BikeNGo", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: String,
  pwd: String
});
const User = mongoose.model("Info", userSchema);

module.exports = User;