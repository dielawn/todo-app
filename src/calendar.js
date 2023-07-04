function getFullYear(date) {
    return date.getFullYear();
  }
  
  function getMonth(date) {
    return date.getMonth();
  }
  
  function getDate(date) {
    return date.getDate();
  }
  
  module.exports = {
    getFullYear,
    getMonth,
    getDate,
    populateDates
  };
  
  
const date_picker_element = document.querySelector('.date-picker');
const selected_date_element = document.querySelector('.date-picker .selected-date');
const dates_element = document.querySelector('.date-picker .dates');
const mth_element = document.querySelector('.date-picker .dates .month .mth');
const next_mth_element = document.querySelector('.date-picker .dates .month .next-mth');
const prev_mth_element = document.querySelector('.date-picker .dates .month .prev-mth');
const days_element = document.querySelector('.date-picker .dates .days');

const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

let date = new Date();
let day = date.getDate();
let month = date.getMonth();
let year = date.getFullYear();

let selectedDate = date;
let selectedDay = day;
let selectedMonth = month;
let selectedYear = year;

mth_element.textContent = months[month] + ' ' + year;

selected_date_element.textContent = formatDate(date);
selected_date_element.dataset.value = selectedDate;

populateDates();

// EVENT LISTENERS
selected_date_element.addEventListener('click', toggleDatePicker);
next_mth_element.addEventListener('click', goToNextMonth);
prev_mth_element.addEventListener('click', goToPrevMonth);

// FUNCTIONS
function toggleDatePicker(e) {
  let element = e.target;
  let path = [];
  
  while (element) {
    path.push(element);
    element = element.parentNode;
  }

  console.log(path);
  
  if (!checkEventPathForClass(path, 'dates')) {
    dates_element.classList.toggle('active');
  }
}


function goToNextMonth () {
	month++;
	if (month > 11) {
		month = 0;
		year++;
	}
	mth_element.textContent = months[month] + ' ' + year;
	populateDates();
}

function goToPrevMonth () {
	month--;
	if (month < 0) {
		month = 11;
		year--;
	}
	mth_element.textContent = months[month] + ' ' + year;
	populateDates();
}

function populateDates() {
	days_element.innerHTML = '';
  
	// Get the total number of days in the current month
	const totalDays = new Date(year, month + 1, 0).getDate();
  
	// Get the day of the week for the first day of the month
	const firstDayOfMonth = new Date(year, month, 1).getDay();
  
	// Create an array of day names
	const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    
	// Populate day names
	for (let i = 0; i < 7; i++) {
	  const dayNameElement = document.createElement('div');
	  dayNameElement.textContent = dayNames[i];
	  dayNameElement.classList.add('dayNames')
	  days_element.appendChild(dayNameElement);
	}
    
	// Create an empty slot for days before the first day of the month
	for (let i = 0; i < firstDayOfMonth; i++) {
	  const emptySlot = document.createElement('div');
	  emptySlot.classList.add('day', 'empty');
	  days_element.appendChild(emptySlot);
	}
  
	// Populate the days of the month
	for (let i = 1; i <= totalDays; i++) {
	  const day_element = document.createElement('div');
	  day_element.classList.add('day');
	  day_element.textContent = i;
      const dateString = `${year}-${month + 1}-${i + 1}`;
      day_element.setAttribute('data-date', dateString);
  
	  if (
		selectedDay === i &&
		selectedYear === year &&
		selectedMonth === month
	  ) {
		day_element.classList.add('selected');
	  }
  
	  day_element.addEventListener('click', function () {
		selectedDate = new Date(year, month, i);
		selectedDay = i;
		selectedMonth = month;
		selectedYear = year;
  
		selected_date_element.textContent = formatDate(selectedDate);
		selected_date_element.dataset.value = selectedDate;
  
		populateDates();
		// toggleDatePicker('click');
	  });
  
	  days_element.appendChild(day_element);
	}
  }

// HELPER FUNCTIONS
function checkEventPathForClass (path, selector) {
	for (let i = 0; i < path; i++) {
		if (path[i].classList && path[i].classList.contains(selector)) {
			return true;
		}
	}
	
	return false;
}
function formatDate (date) {
	let day = date.getDate();
	if (day < 10) {
		day = '0' + day;
	}

	let month = date.getMonth() + 1;
	if (month < 10) {
		month = '0' + month;
	}

	let year = date.getFullYear();

	return month + ' / ' + day + ' / ' + year;
}
