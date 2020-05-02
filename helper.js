const _ = require("lodash");

exports.chackAvalability = (availableseates, bookingseats) => {
  if (
    _.intersection(availableseates, bookingseats).length === bookingseats.length
  ) {
    return true;
  }
  return false;
};
exports.removeAvailableSeats = (availableSeats, bookedSeats) => {
  const result = _.remove(availableSeats, seatNo =>
    bookedSeats.includes(seatNo)
  );
  return availableSeats;
};
