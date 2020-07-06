const inputs = document.querySelectorAll('input');
const form = document.querySelector('form');
//console.log(inputs);

const getReservation = (event) => {
  event.preventDefault();
  console.log(event);
  let userInput = [];
  inputs.forEach(input => userInput.push(input.value));
  let inputId = userInput.join('-');
  console.log("User Inputted:", inputId);
  console.log("Fetching data...");
  fetch('/users', {method: 'GET'})
  .then(res => res.json())
  .then(data => {
    console.log(data);
    // debugger;
    data.forEach(res => console.log(res));
    //let reservations = Object.keys(data);
    //console.log(reservations);
    let res = data.find(rsv => rsv.id == inputId);

    //console.log(resId)
    if(res) {
      window.location = `/seat-select/confirmed/${res.id}`;
    } else {
      document.getElementById('warning').style.display = 'block';
      //window.alert("The Reservation ID you entered does not exist!");
    }
  })
  .catch(err => console.log(err));
}

//form.addEventListener('submit', getReservation);