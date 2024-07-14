function formatDate(date) {
  var options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  var dateObject = new Date(date);
  var formattedDate = dateObject.toLocaleDateString("en-US", options);
  return formattedDate;
}
