const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const app = express();
const port = 1414;
const { chackAvalability, removeAvailableSeats } = require("./helper");

app.use(bodyParser.json());
//dbConection
require("./config/dbConection");
//dbModels
require("./config/dbModels");

const Users = mongoose.model("Users");
const busDetails = mongoose.model("busDetails");

//get BOOKED SEAT details
app.get("/posts", async (req, res) => {
  try {
    const user = await Users.find({});
    res.send(user);
  } catch {
    res.status(500);
  }
});
//get AVAILABLE SEAT details
app.get("/available-seatdetails", async (req, res) => {
  const availableseat = await busDetails.find({});
  res.send(availableseat[0].available_seats);
});
//for BOOKING BUSTICKETS
app.post("/posts", async (req, res) => {
  try {
    const seatBooking = req.body.seat_no;
    const busdetails = await busDetails.find({});
    const { available_seats } = busdetails[0];
    const { seat_price } = busdetails[0];

    if (chackAvalability(available_seats, seatBooking)) {
      const user = new Users();
      user.name = req.body.name;
      user.seat_no = seatBooking;
      await user.save();

      const updatedAvailableSeats = removeAvailableSeats(
        available_seats,
        seatBooking
      );
      await busDetails.findByIdAndUpdate(
        { _id: "5e6a5caeb2a8785cb8185d17" },
        { available_seats: updatedAvailableSeats },
        function(err, res) {
          if (err) throw err;
        }
      );
      const numberofSeates = seatBooking.length;
      res.send(
        user +
          "Seates Booked Sucsessfully and your total price is :" +
          seat_price * numberofSeates
      );
    }
    res.send("Seat/Seats not available");
  } catch {
    res.status(500);
  }
});
//for CANCLE BOOKED seates
app.delete("/posts/:postID", async (req, res) => {
  try {
    const user = await Users.findOne({ _id: req.params.postID });
    const seats = user.seat_no;
    const removeSeat = await Users.findByIdAndRemove({
      _id: req.params.postID
    });
    const busdetails = await busDetails.find({});
    const { available_seats } = busdetails[0];
    const updatedseat = available_seats.concat(seats);
    await busDetails.findByIdAndUpdate(
      { _id: "5e6a5caeb2a8785cb8185d17" },
      { available_seats: updatedseat },
      function(err, res) {
        if (err) throw err;
      }
    );
    res.send(removeSeat + "You Secssesfully cancle your seats.");
  } catch {
    res.status(500);
  }
});

//busDetails Information-----------------------------------

app.get("/availablebusdetails", async (req, res) => {
  try {
    const busdetails = await busDetails.find({});
    res.send(busdetails);
  } catch {
    res.status(500);
  }
});

app.post("/availablebusdetails", async (req, res) => {
  try {
    const busdetails = new busDetails();
    busdetails.bus_no = req.body.bus_no;
    busdetails.available_seats = req.body.available_seats;
    busdetails.seat_price = req.body.seat_price;
    await busdetails.save();
    res.send(busdetails);
  } catch {
    res.status(500);
  }
});
app.listen(port, () => {
  console.log("Server is running on port :" + port);
});
