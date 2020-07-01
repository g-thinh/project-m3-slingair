const { flights } = require("./test-data/flightSeating");

const handleFlight = (req, res) => {
  const { flightNumber } = req.params;
  // get all flight numbers
  const allFlights = Object.keys(flights);
  // is flightNumber in the array?
  console.log("REAL FLIGHT: ", allFlights.includes(flightNumber));
};

const handleSeats = (req, res) => {

  //have to convert object data into an array of names of the flights
  const flightNames = Object.keys(flights);
  console.log(flightNames)

  res.status(200).render("./pages/seat-select", {
    flights: flightNames,
  });
};

module.exports = {
  handleFlight: handleFlight,
  handleSeats: handleSeats,
};
