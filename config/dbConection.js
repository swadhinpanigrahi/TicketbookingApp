const mongoose = require("mongoose");
mongoose
  .connect(
    "mongodb+srv://swadhin:swadhin@ticketbooking-fpjig.mongodb.net/test?retryWrites=true&w=majority",
    { useNewUrlParser: true }
  )
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log(err));
