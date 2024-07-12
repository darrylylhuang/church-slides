let _countSundaysInCurrentMonth = (function () {
  // Get current date
  var today = new Date();

  // Get the year and month
  var year = today.getFullYear();
  var month = today.getMonth();

  // Initialize counter for Sundays
  var sundaysCount = 0;

  // Loop through each day of the month
  for (var day = 1; day <= new Date(year, month + 1, 0).getDate(); day++) {
    var currentDate = new Date(year, month, day);
    // Check if the current day is a Sunday (day 0 in JavaScript Date object)
    if (currentDate.getDay() === 0) {
      sundaysCount++;
    }
  }

  // Return the number of Sundays found
  return sundaysCount;
})();

(function () {
  "use strict";

  var hymnForm = document.getElementById("hymn-form");
  var numberOfDivs = _countSundaysInCurrentMonth;
  for (let i = 0; i < numberOfDivs; i++) {
    var div = document.createElement("div");
    // TODO: make real divs
    div.textContent = `Div ${i + 1}`;
    hymnForm.appendChild(div);
  }
})();
