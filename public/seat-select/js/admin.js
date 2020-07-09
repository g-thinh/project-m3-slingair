const table = document.getElementById('table-content');
const flightInput = document.getElementById('flight');


//this promise returns seat availabilities based on the selected Flight
const getSeats = async (flightNum) => {
  return await fetch(`/flights/${flightNum}`, {method: 'GET'});
}

//this promise returns all current reservations
const getReservations = async(flightNum) => {
  return await fetch('/users', {method: 'GET'});
}


//This function will fire whenever the user selects a flight from the dropdown
//select
const displayTable = (event) => {
  //console.log("This Fires", flightInput.value);

  //create a function scope empty array to hold all reservations
  let reservations = [];

  //obtain all current reservations and store them
  getReservations()
  .then(res => res.json())
  .then(data => data.forEach(res => {
    if(res.flight === flightInput.value) {
      reservations.push(res);
    }
    //console.log(`These seats from flight ${flightInput.value} are taken:`,reservations);
  }));

  //obtain all seating info based on the selected flight
  getSeats(flightInput.value)
  .then(res => res.json())
  .then(seats => {
    //destroy the table body first!!
    table.innerHTML ='';

    //loop over every single seating object for the current flight
    //to create the appropriate table rows
    seats.forEach(seat => {

      //this will create the initial row element required
      let tableRow = document.createElement('tr');

      //if the seat is has a reservation, we want to be able to display and link
      //that person's confirmation page
      if(!seat.isAvailable) {

        //find the user whose reserved seat matches the current seat
        let user = reservations.find(res => res.seat === seat.id);

        //this is the HTML that will be inserted, includes an anchor tag link
        //to the users confirmation page
        let seatOccupied = `<tr><td>${seat.id}</td><td>NO</td><td><a href="/seat-select/confirmed/${user.id}">${user.givenName + " " + user.surname}</a></td></tr>`;

        //set the HTML and append the row to the table body
        tableRow.innerHTML = seatOccupied;
        table.appendChild(tableRow);
        
      //if the seat is free, then create the row with that info
      } else {
        let seatAvailable = `<tr><td>${seat.id}</td><td>YES</td><td> - </td></tr>`;
        tableRow.innerHTML = seatAvailable;
        table.appendChild(tableRow);
      }
    })
  })
}

//this will render the table for the chosen flight
flightInput.addEventListener('blur', displayTable);
