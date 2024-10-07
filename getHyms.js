function getHymns() {
  const SPREADSHEET = SpreadsheetApp.openById(SHEET_ID);
  const GATHER_COMPREHENSIVE = SPREADSHEET.getSheetByName(
    "Gather Comprehensive"
  ); // Open specific sheet with Gather Comprehensive hymn info
  const BINDER = SPREADSHEET.getSheetByName("Binder");
  const gatherData = GATHER_COMPREHENSIVE.getRange("A2:D").getValues(); // Contains hymn number, name, and GoogleSlides ID
  const binderData = BINDER.getRange("A2:B100").getValues(); // Contains hymn name, and GoogleSlides ID

  const gatherComprehensiveTitles = {};
  gatherData.forEach(function (column) {
    gatherComprehensiveTitles[column[0]] = column[3]; // # ; name
  });
  GlobalConstants.gatherComprehensiveTitles = gatherComprehensiveTitles;

  const binderTitles = [];
  binderData.forEach(function (column) {
    binderTitles.push(column[0]);
  });
  GlobalConstants.binderTitles = binderTitles;
  // Code before this is necessary for setting up the global constants

  const response = [];
  // Flatten Gather Comprehensive into a list and concat binder hymns after
  for (let key in gatherComprehensiveTitles) {
    response.push(`${key} - ${gatherComprehensiveTitles[key]}`);
  }

  return response.concat(binderTitles);
}
