const container = document.querySelector('.container');
const seats = document.querySelectorAll('.row .seat:not(.occupied)');
const count = document.getElementById('count');
const total = document.getElementById('total');
const movieSelect = document.getElementById('movie');

let ticketPrice = +movieSelect.value;

movieSelect.addEventListener('change', e => {
    ticketPrice = +e.target.value;
    updateSelectedCount();
})

function updateSelectedCount() {
    const selectedSeats = document.querySelectorAll('.row .seat.selected');
    const selectSeatsCount = selectedSeats.length;

    count.innerText = selectSeatsCount;
    total.innerText = selectSeatsCount * ticketPrice;

}

container.addEventListener('click', function(e) {
   if (e.target.classList.contains('seat') && !e.target.classList.contains('occupied')) {
     e.target.classList.toggle('selected');

     updateSelectedCount();
   }
})