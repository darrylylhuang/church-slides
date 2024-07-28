function formatDate(date) {
  var options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  const dateObject = new Date(date);
  const formattedDate = dateObject.toLocaleDateString("en-CA", options);
  return formattedDate;
}
