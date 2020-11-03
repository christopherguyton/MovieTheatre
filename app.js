const container = document.querySelector('.container');
const seats = document.querySelectorAll('.row .seat:not(.occupied)');
const count = document.getElementById('count');
const total = document.getElementById('total');
const movieSelect = document.getElementById('movie');

populateUI()

let ticketPrice = +movieSelect.value;



movieSelect.addEventListener('change', e => {
    ticketPrice = +e.target.value;
    setMovieData(e.target.selectedIndex, e.target.value);
    updateSelectedCount();
})

function setMovieData(movieIndex, moviePrice){
  localStorage.setItem('selectedMovieIndex', movieIndex);
  localStorage.setItem('selectedMoviePrice', moviePrice)
}

function updateSelectedCount() {
    const selectedSeats = document.querySelectorAll('.row .seat.selected');
    const selectSeatsCount = selectedSeats.length;

    count.innerText = selectSeatsCount;
    total.innerText = selectSeatsCount * ticketPrice;

    const seatsIndex = [...selectedSeats].map(function(seat){
      return [...seats].indexOf(seat)
    });

    localStorage.setItem('selectedSeats', JSON.stringify(seatsIndex));
   
}

function populateUI() {
  const selectedSeats = JSON.parse(localStorage.getItem('selectedSeats'));
  if (selectedSeats !== null && selectedSeats.length > 0) {
    seats.forEach((seat, index) => {
      if(selectedSeats.indexOf(index) > -1) {
        seat.classList.add('selected');
      }
    });
  }

  const selectedMovieIndex = localStorage.getItem('selectedMovieIndex');
  if (selectedMovieIndex !== null) {
    movieSelect.selectedIndex = selectedMovieIndex;
  }
}

container.addEventListener('click', function(e) {
   if (e.target.classList.contains('seat') && !e.target.classList.contains('occupied')) {
     e.target.classList.toggle('selected');

     updateSelectedCount();
   }
});

updateSelectedCount();