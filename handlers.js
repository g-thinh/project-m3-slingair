const { flights } = require("./test-data/flightSeating");
const { reservations } = require("./test-data/reservations");
const { v4: uuidv4 } = require('uuid');

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
    pageTitle: 'Seat Selection'
  });
};

//this handle confirmation pages needs to get the user flight id
const handleConfirmation = (req,res) => {
  let userId = req.params.id;

  let userInfo = reservations.find(user => user.id === userId);

  console.log(userInfo);
  res.status(200).render("./pages/confirmed", {
    pageTitle: "Confirm Reservation",
    user: userInfo,
  })
}

const handleUsers = (req,res) => {
  //This will update the reservations
  let info = req.body;
  //console.log(info);
  let newId = {id: uuidv4()};
  //console.log("this user now has confirmation id:", newId);
  let newData = {...newId, ...info}
  //console.log(newData);
  reservations.push(newData);
  //console.log(reservations);

  //time to udpate the flight availabilities
  flights[info.flight].find(seat => seat.id === info.seat)
    .isAvailable = false;
  //console.log(newSeat);
  //console.log(flights[info.flight]);
  let body = {status: 200, flightId: newId}
  res.status(200).send(body);
}

const SendUsersInfo = (req,res) => {
  res.status(200).send(reservations);
}

const handleReservations = (req,res) => {
  res.status(200).render('./pages/view-reservation', {
    pageTitle: 'View reservations',
  })
}

const viewReservations = (req,res) => {
  res.status(200).render('./pages/admin', {
    pageTitle: 'Admin',
    flightNames: Object.keys(flights),
    flights: flights,
  })
}

module.exports = {
  handleFlight: handleFlight,
  handleSeats: handleSeats,
  handleUsers: handleUsers,
  handleConfirmation: handleConfirmation,
  SendUsersInfo: SendUsersInfo,
  handleReservations: handleReservations,
  viewReservations: viewReservations,
};
