const { flights } = require("./test-data/flightSeating");

//this function will return all of the flight's seating data
//if the flight exists
const handleFlight = (req, res) => {
  const { flightNumber } = req.params;
  // get all flight numbers
  const allFlights = Object.keys(flights);
  // is flightNumber in the array?
  console.log("REAL FLIGHT: ", allFlights.includes(flightNumber));

  if(allFlights.includes(flightNumber)) {
    //console.log(flights[flightNumber]);
    //send all of the flight's data
    res.status(200).send(flights[flightNumber]);
  } else {
    res.status(400).send({message: "Flight not Found"});
  }
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
