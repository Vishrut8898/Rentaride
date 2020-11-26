const date_picker_element = document.querySelector(".date-picker");
const selected_date_element = document.querySelector(
  ".date-picker .selected-date"
);
const dates_element = document.querySelector(".date-picker .dates");
const mth_element = document.querySelector(".date-picker .dates .month .mth");
const next_mth_element = document.querySelector(
  ".date-picker .dates .month .next-mth"
);
const prev_mth_element = document.querySelector(
  ".date-picker .dates .month .prev-mth"
);
const days_element = document.querySelector(".date-picker .dates .days");

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

// time picker variables
const time_picker_element = document.querySelector(".time-picker");

const hr_element = document.querySelector(".time-picker .hour .hr");
const min_element = document.querySelector(".time-picker .minute .min");

const hr_up = document.querySelector(".time-picker .hour .hr-up");
const hr_down = document.querySelector(".time-picker .hour .hr-down");

const min_up = document.querySelector(".time-picker .minute .min-up");
const min_down = document.querySelector(".time-picker .minute .min-down");

let date = new Date();
let day = date.getDate();
let month = date.getMonth();
let year = date.getFullYear();

let selectedDate = date;
let selectedDay = day;
let selectedMonth = month;
let selectedYear = year;

mth_element.textContent = months[month] + " " + year;

selected_date_element.textContent = formatDate(date);
selected_date_element.dataset.value = selectedDate;

populateDates();

// EVENT LISTENERS
date_picker_element.addEventListener("click", toggleDatePicker);
next_mth_element.addEventListener("click", goToNextMonth);
prev_mth_element.addEventListener("click", goToPrevMonth);

// FUNCTIONS
function toggleDatePicker(e) {
  if (!checkEventPathForClass(e.path, "dates")) {
    dates_element.classList.toggle("active");
  }
}

function goToNextMonth(e) {
  month++;
  if (month > 11) {
    month = 0;
    year++;
  }
  mth_element.textContent = months[month] + " " + year;
  populateDates();
}

function goToPrevMonth(e) {
  month--;
  if (month < 0) {
    month = 11;
    year--;
  }
  mth_element.textContent = months[month] + " " + year;
  populateDates();
}

function populateDates(e) {
  days_element.innerHTML = "";
  let amount_days = 31;

  if (month == 1) {
    amount_days = 28;
  }
  if (month == 3 || month == 5 || month == 8 || month == 10) {
    amount_days = 30;
  }

  for (let i = 0; i < amount_days; i++) {
    const day_element = document.createElement("div");
    day_element.classList.add("day");
    day_element.textContent = i + 1;

    if (
      selectedDay == i + 1 &&
      selectedYear == year &&
      selectedMonth == month
    ) {
      day_element.classList.add("selected");
    }

    day_element.addEventListener("click", function () {
      selectedDate = new Date(year + "-" + (month + 1) + "-" + (i + 1));
      selectedDay = i + 1;
      selectedMonth = month;
      selectedYear = year;

      selected_date_element.textContent = formatDate(selectedDate);
      selected_date_element.dataset.value = selectedDate;

      populateDates();
    });

    days_element.appendChild(day_element);
  }
  let date_one = selected_date_element.innerHTML;
  localStorage.setItem("pick_date", date_one);
}

// HELPER FUNCTIONS
function checkEventPathForClass(path, selector) {
  for (let i = 0; i < path.length; i++) {
    if (path[i].classList && path[i].classList.contains(selector)) {
      return true;
    }
  }

  return false;
}
function formatDate(d) {
  let day = d.getDate();
  if (day < 10) {
    day = "0" + day;
  }

  let month = d.getMonth() + 1;
  if (month < 10) {
    month = "0" + month;
  }

  let year = d.getFullYear();

  return day + " / " + month + " / " + year;
}

// time picker js
let d = new Date();

let hour = d.getHours();
let minute = d.getMinutes();
setTime();

// EVENT LISTENERS
hr_up.addEventListener("click", hour_up);
hr_down.addEventListener("click", hour_down);

min_up.addEventListener("click", minute_up);
min_down.addEventListener("click", minute_down);

hr_element.addEventListener("change", hour_change);
min_element.addEventListener("change", minute_change);

function hour_change(e) {
  if (e.target.value > 23) {
    e.target.value = 23;
  } else if (e.target.value < 0) {
    e.target.value = "00";
  }

  if (e.target.value == "") {
    e.target.value = formatTime(hour);
  }

  hour = e.target.value;
}

function minute_change(e) {
  if (e.target.value > 59) {
    e.target.value = 59;
  } else if (e.target.value < 0) {
    e.target.value = "00";
  }

  if (e.target.value == "") {
    e.target.value = formatTime(minute);
  }

  minute = e.target.value;
}

function hour_up() {
  hour++;
  if (hour > 23) {
    hour = 0;
  }
  setTime();
}
function hour_down() {
  hour--;
  if (hour < 0) {
    hour = 23;
  }
  setTime();
}

function minute_up() {
  minute++;
  if (minute > 59) {
    minute = 0;
    hour++;
  }
  setTime();
}
function minute_down() {
  minute--;
  if (minute < 0) {
    minute = 59;
    hour--;
  }
  setTime();
}

function setTime() {
  hr_element.value = formatTime(hour);
  min_element.value = formatTime(minute);
  time_picker_element.dataset.time =
    formatTime(hour) + ":" + formatTime(minute);
}

function formatTime(time) {
  if (time < 10) {
    time = "0" + time;
  }
  return time;
}

// drop ------------------------------------------------------------------------------------------------------------------------

const date_picker_element_2 = document.querySelector(".date-picker-2");
const selected_date_element_2 = document.querySelector(
  ".date-picker-2 .selected-date-2"
);
const dates_element_2 = document.querySelector(".date-picker-2 .dates-2");
const mth_element_2 = document.querySelector(
  ".date-picker-2 .dates-2 .month-2 .mth-2"
);
const next_mth_element_2 = document.querySelector(
  ".date-picker-2 .dates-2 .month-2 .next-mth-2"
);
const prev_mth_element_2 = document.querySelector(
  ".date-picker-2 .dates-2 .month-2 .prev-mth-2"
);
const days_element_2 = document.querySelector(
  ".date-picker-2 .dates-2 .days-2"
);

const months_2 = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

// time picker variables
const time_picker_element_2 = document.querySelector(".time-picker-2");

const hr_element_2 = document.querySelector(".time-picker-2 .hour-2 .hr-2");
const min_element_2 = document.querySelector(".time-picker-2 .minute-2 .min-2");

const hr_up_2 = document.querySelector(".time-picker-2 .hour-2 .hr-up-2");
const hr_down_2 = document.querySelector(".time-picker-2 .hour-2 .hr-down-2");

const min_up_2 = document.querySelector(".time-picker-2 .minute-2 .min-up-2");
const min_down_2 = document.querySelector(
  ".time-picker-2 .minute-2 .min-down-2"
);

let date_2 = new Date();
let day_2 = date.getDate();
let month_2 = date.getMonth();
let year_2 = date.getFullYear();

let selectedDate_2 = date_2;
let selectedDay_2 = day_2;
let selectedMonth_2 = month_2;
let selectedYear_2 = year_2;

mth_element_2.textContent = months_2[month_2] + " " + year_2;

selected_date_element_2.textContent = formatDate_2(date_2);
selected_date_element_2.dataset.value = selectedDate_2;

populateDates_2();

// EVENT LISTENERS
date_picker_element_2.addEventListener("click", toggleDatePicker_2);
next_mth_element_2.addEventListener("click", goToNextMonth_2);
prev_mth_element_2.addEventListener("click", goToPrevMonth_2);

// FUNCTIONS
function toggleDatePicker_2(e) {
  if (!checkEventPathForClass(e.path, "dates-2")) {
    dates_element_2.classList.toggle("active-2");
  }
}

function goToNextMonth_2(e) {
  month_2++;
  if (month_2 > 11) {
    month_2 = 0;
    year_2++;
  }
  mth_element_2.textContent = months_2[month_2] + " " + year_2;
  populateDates_2();
}

function goToPrevMonth_2(e) {
  month_2--;
  if (month_2 < 0) {
    month_2 = 11;
    year_2--;
  }
  mth_element_2.textContent = months_2[month_2] + " " + year_2;
  populateDates_2();
}

function populateDates_2(e) {
  days_element_2.innerHTML = "";
  let amount_days_2 = 31;

  if (month_2 == 1) {
    amount_days_2 = 28;
  }
  if (month_2 == 3 || month_2 == 5 || month_2 == 8 || month_2 == 10) {
    amount_days_2 = 30;
  }

  for (let i = 0; i < amount_days_2; i++) {
    const day_element_2 = document.createElement("div");
    day_element_2.classList.add("day-2");
    day_element_2.textContent = i + 1;

    if (
      selectedDay_2 == i + 1 &&
      selectedYear_2 == year_2 &&
      selectedMonth_2 == month_2
    ) {
      day_element_2.classList.add("selected-2");
    }

    day_element_2.addEventListener("click", function () {
      selectedDate_2 = new Date(year_2 + "-" + (month_2 + 1) + "-" + (i + 1));
      selectedDay_2 = i + 1;
      selectedMonth_2 = month_2;
      selectedYear_2 = year_2;

      selected_date_element_2.textContent = formatDate_2(selectedDate_2);
      selected_date_element_2.dataset.value = selectedDate_2;

      populateDates_2();
    });

    days_element_2.appendChild(day_element_2);
  }
  let date_two = selected_date_element_2.innerHTML;
  localStorage.setItem("drop_date", date_two);
}

// HELPER FUNCTIONS
function checkEventPathForClass_2(path_2, selector_2) {
  for (let i = 0; i < path_2.length; i++) {
    if (path_2[i].classList && path_2[i].classList.contains(selector_2)) {
      return true;
    }
  }

  return false;
}
function formatDate_2(d) {
  let day_2 = d.getDate();
  if (day_2 < 10) {
    day_2 = "0" + day_2;
  }

  let month_2 = d.getMonth() + 1;
  if (month_2 < 10) {
    month_2 = "0" + month_2;
  }

  let year_2 = d.getFullYear();

  return day_2 + " / " + month_2 + " / " + year_2;
}

// time picker js
let d_2 = new Date();

let hour_2 = d_2.getHours();
let minute_2 = d_2.getMinutes();
setTime_2();

// EVENT LISTENERS
hr_up_2.addEventListener("click", hour_up_2);
hr_down_2.addEventListener("click", hour_down_2);

min_up_2.addEventListener("click", minute_up_2);
min_down_2.addEventListener("click", minute_down_2);

hr_element_2.addEventListener("change", hour_change_2);
min_element_2.addEventListener("change", minute_change_2);

function hour_change_2(e) {
  if (e.target.value > 23) {
    e.target.value = 23;
  } else if (e.target.value < 0) {
    e.target.value = "00";
  }

  if (e.target.value == "") {
    e.target.value = formatTime_2(hour_2);
  }

  hour_2 = e.target.value;
}

function minute_change_2(e) {
  if (e.target.value > 59) {
    e.target.value = 59;
  } else if (e.target.value < 0) {
    e.target.value = "00";
  }

  if (e.target.value == "") {
    e.target.value = formatTime_2(minute_2);
  }

  minute_2 = e.target.value;
}

function hour_up_2() {
  hour_2++;
  if (hour_2 > 23) {
    hour_2 = 0;
  }
  setTime_2();
}
function hour_down_2() {
  hour_2--;
  if (hour_2 < 0) {
    hour_2 = 23;
  }
  setTime_2();
}

function minute_up_2() {
  minute_2++;
  if (minute_2 > 59) {
    minute_2 = 0;
    hour_2++;
  }
  setTime_2();
}
function minute_down_2() {
  minute_2--;
  if (minute_2 < 0) {
    minute_2 = 59;
    hour_2--;
  }
  setTime_2();
}

function setTime_2() {
  hr_element_2.value = formatTime_2(hour_2);
  min_element_2.value = formatTime_2(minute_2);
  time_picker_element_2.dataset.time_2 =
    formatTime_2(hour_2) + ":" + formatTime_2(minute_2);
}

function formatTime_2(time_2) {
  if (time_2 < 10) {
    time_2 = "0" + time_2;
  }
  return time_2;
}

// my code -----------------------------------

const departInput = document.querySelector(".depart-place");
const returnInput = document.querySelector(".return-place");
const bookBtn = document.querySelector(".book");
const formy = document.querySelector("form");

function showBookBtn() {
  if (returnInput.value && departInput.value) {
    bookBtn.classList.add("show");
  } else {
    bookBtn.classList.remove("show");
  }
  localStorage.setItem("departPlace", departInput.value);
  localStorage.setItem("returnPlace", returnInput.value);
}

returnInput.addEventListener("input", showBookBtn);
departInput.addEventListener("input", showBookBtn);

$(document).ready(function () {
  $("form").on("submit", function () {
    var details = {
      departPlace: departInput.value,
      departDate: selected_date_element.innerHTML,
      departTime: hr_element.value + ":" + min_element.value,
      returnPlace: returnInput.value,
      returnDate: selected_date_element_2.innerHTML,
      returnTime: hr_element_2.value + ":" + min_element_2.value,
    };

    $.ajax({
      type: "POST",
      url: "/details",
      data: details,
      success: function (data) {},
    });

    function next() {
      document.querySelector(".book").style.display = "none";
      document.querySelector(".next").style.display = "initial";
    }
    next();
    return false;
  });
});
