const { v4: uuidv4 } = require('uuid');
const random_name = require('node-random-name');
const random_email = require('random-email');

const { flights } = require('./flightSeating');

//this is the default reservation that came with the project...
const reservations = [
  {
    id: '88a33c23-3332-4ef2-bd71-be7a6430485f',
    flight: 'SA666',
    seat: '4D',
    givenName: 'Marty',
    surname: 'McFly',
    email: 'marty@backfuture.com',
  },
];

//this function will fill the empty seats from a given flight with randomized
//reservation info so that the FE will be able to create these users' confirmation
//pages
let fillEmptySeats = (flightNumber) => {
  //filter by only seats that are occupied
  let occupiedSeats = flights[flightNumber].filter(seat => seat.isAvailable === false);

  //create an empty array to hold the newly genereated reservations
  let arr = [];

  //for each of the occupied seats, add in the reservation info
  //this way, i can generate the exact # of reservations for the same number
  //of unavailable seats
  occupiedSeats.forEach(seat => {
    //create an ojbect to hold the info
    let userObj = {};

    //populate with info
    userObj.id = uuidv4();
    userObj.flight = flightNumber;
    userObj.seat = seat.id;
    userObj.givenName = random_name({ random: Math.random, first: true });
    userObj.surname = random_name({ random: Math.random, last: true });
    userObj.email = random_email();

    //push the new object into the array
    arr.push(userObj);
  })

  //return an array object of all reservations
  return arr;
} 

//for now we will fill both flights with actual reservations
const flightSA123 = fillEmptySeats('SA123');
const flightSA231 = fillEmptySeats('SA231');

//and push those reservations into the actual test-data reservations array
flightSA123.forEach(seat => reservations.push(seat));
flightSA231.forEach(seat => reservations.push(seat));


module.exports = { reservations };
