const flightInput = document.getElementById('flight');
const flightName = document.getElementById('flight-name');
const seatsDiv = document.getElementById('seats-section');
const confirmButton = document.getElementById('confirm-button');
const seatSelected = document.getElementById("chosenSeat");


let selection = undefined;

const renderSeats = (data) => {
  
  document.querySelector('.form-container').style.display = 'block';
  const alpha = ['A', 'B', 'C', 'D', 'E', 'F'];
  for (let r = 1; r < 11; r++) {
    const row = document.createElement('ol');
    row.classList.add('row');
    row.classList.add('fuselage');
    seatsDiv.appendChild(row);
    for (let s = 1; s < 7; s++) {
      const seatNumber = `${r}${alpha[s - 1]}`;
      const seat = document.createElement('li');

      // Two types of seats to render
      const seatOccupied = `<li><label class="seat"><span id="${seatNumber}" class="occupied">${seatNumber}</span></label></li>`;
      const seatAvailable = `<li><label class="seat"><input type="radio" name="seat" value="${seatNumber}" /><span id="${seatNumber}" class="avail">${seatNumber}</span></label></li>`;

      // TODO: render the seat availability based on the data...
      let seatData = data.find(item => item.id == seatNumber);
      if(seatData.isAvailable) {
        seat.innerHTML = seatAvailable;
      } else {
        seat.innerHTML = seatOccupied;
      }
      //console.log(seat.id, seat.isAvailable, seatNumber);
      //console.log(seatNumber, seatData);
      
      row.appendChild(seat);
    }
  }

  let seatMap = document.forms['seats'].elements['seat'];
  seatMap.forEach((seat) => {
    seat.onclick = () => {
      selection = seat.value;

      seatSelected.value = selection;

      seatMap.forEach((x) => {
        if (x.value !== seat.value) {
          document.getElementById(x.value).classList.remove('selected');
        }
      });
      document.getElementById(seat.value).classList.add('selected');
      document.getElementById('seat-number').innerText = `(${selection})`;
      confirmButton.disabled = false;
    };
  });
};

const toggleFormContent = flightInput.onchange = (event) => {
  const flightNumber = flightInput.value;
  flightName.innerHTML = `Select your Seat for flight ${flightNumber} and Provide your information`;
  //console.log('toggleFormContent: ', flightNumber);
  fetch(`/flights/${flightNumber}`)
    .then((res) => res.json())
    .then((data) => {
      // TODO: contact the server to get the seating availability
      //      - only contact the server if the flight number is this format 'SA###'.
      //      - Do I need to create an error message if the number is not valid?

      // TODO: Pass the response data to renderSeats to create the appropriate seat-type.
      
      //destroy previous rendering of seats before passing new data to render seats
      document.getElementById("seats-section").innerHTML = '';
      renderSeats(data);
    });
  };

const handleConfirmSeat = (event) => {
  event.preventDefault();
  // TODO: everything in here!
  console.log(seatSelected.value, selection);
  if(selection == undefined) {
    window.alert("you forgot to pick a seat");
  } else {
    fetch('/users', {
      method: 'POST',
      body: JSON.stringify({
        flight: flightInput.value,
        seat: selection,
        givenName: document.getElementById('givenName').value,
        surname: document.getElementById('surname').value,
        email: document.getElementById('email').value,
      }),
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    }).then(res => {
      //console.log(res);
      if(res.status === 200) {
        fetch('/users', {method:'GET'})
        .then(res=> res.json())
        .then(data => {
          let redirectName = data.find(item => item.givenName ==document.getElementById('givenName').value)
          console.log(redirectName.id);
          window.location = `/seat-select/confirmed/${redirectName.id}`;
        })
        .catch(err => {alert(err)});
        
      }
    }).catch(err => {alert(err)});
  }


};

flightInput.addEventListener('blur', toggleFormContent);
