const mongoose = require("mongoose");
const user_schema = mongoose.Schema({
  name: String,
  seat_no: Array
});
const busDetails_schema = mongoose.Schema({
  bus_no: String,
  available_seats: Array,
  seat_price: Number
});

module.exports = mongoose.model("Users", user_schema);
module.exports = mongoose.model("busDetails", busDetails_schema);
