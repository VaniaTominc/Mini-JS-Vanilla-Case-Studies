const container = document.querySelector('.container')
const seats = document.querySelectorAll('.row .seat:not(.occupied)')
const count = document.getElementById('count')
const total = document.getElementById('total')
const movieSelect = document.getElementById('movie')

let ticketPrice = +movieSelect.value      // + is equivalent to parseInt

// Save Selected movie index and price
const setMovieData = (movieIndex, moviePrice) => {
  localStorage.setItem('selectedMovieIndex', movieIndex)
  localStorage.setItem('selectedMoviePrice', moviePrice)
}

// Update total and count
const updateSelectedCount = () => {
  // Creates a NodeList
  const selectedSeats = document.querySelectorAll('.row .seat.selected')
  // console.log('selectedSeats >>>>', selectedSeats)

  // Copy selected seats into array
  // Map through array
  // Return a new array indexes
  const seatsIndex = [...selectedSeats].map(item => [...seats].indexOf(item))
  
  // Using JSON.stringy because we have our seats indexes inside [].
  localStorage.setItem('selectedSeats', JSON.stringify(seatsIndex))


  const selectedSeatsCount = selectedSeats.length
  count.innerText = selectedSeatsCount
  total.innerText = selectedSeatsCount * ticketPrice
}

// Getting data from localstorage and populate UI
const populateUI = () => {
  const selectedSeats = JSON.parse(localStorage.getItem('selectedSeats'))
  
  // Check if there are any selected seats in localstorage and array is not empty.
  // If there are any we add the selected class to the UI

  if (selectedSeats !== null && selectedSeats.length > 0) {
    seats.forEach((seat, index) => {
      if (selectedSeats.indexOf(index) > -1) {
        seat.classList.add('selected')
      }
    })
  }

  const selectedMovieIndex = localStorage.getItem('selectedMovieIndex')
  
  if (selectedMovieIndex !== null) {
    movieSelect.selectedIndex = selectedMovieIndex
  }

  
}

// movie addEventListener
movieSelect.addEventListener('change', (event) => {
  ticketPrice = +event.target.value
  // console.log('event.target.selectedIndex, event.target.value >>>>', event.target.selectedIndex, event.target.value)
  setMovieData(event.target.selectedIndex, event.target.value)
  updateSelectedCount()
})

// container addEventListener
container.addEventListener('click', (event) => {
  if (event.target.classList.contains('seat') &&
  !event.target.classList.contains('occupied')
  ) {
    // console.log('event.target >>>', event.target)
    event.target.classList.toggle('selected')

    updateSelectedCount()
  }
})

populateUI()

// Initial count and total set
updateSelectedCount()