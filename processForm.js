function processForm(hymnNumber, hymnTitle, parts) {
  // Process the form data as needed
  var response = `Received hymn number: ${hymnNumber}, hymn title: ${hymnTitle}, parts: ${parts.join(
    ", "
  )}`;
  return response;
}
