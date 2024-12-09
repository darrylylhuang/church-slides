const SHEET_ID = "1f5dM3ppCNISYl6EgvFoC6irO-UwpIvJc_hoDnkEb6wQ"; // Open GoogleSheets with all info
var GlobalConstants = {};
GlobalConstants.missingTitles = [];

function initializeData() {
  Logger.log("Initializing data.");
  const SPREADSHEET = SpreadsheetApp.openById(SHEET_ID);
  const SPREADSHEET_TIMEZONE = SPREADSHEET.getSpreadsheetTimeZone();
  const GATHER_COMPREHENSIVE = SPREADSHEET.getSheetByName(
    "Gather Comprehensive"
  ); // Open specific sheet with Gather Comprehensive hymn info
  const BINDER = SPREADSHEET.getSheetByName("Binder");
  const STORRINGTON_MASS = SPREADSHEET.getSheetByName("Storrington Mass"); // Open the sheet that has Storrington mass settings
  const OTHER_SLIDES = SPREADSHEET.getSheetByName("Other Slides"); // Open the sheet that has transitions + additional slides
  const CURRENT_MONTH = SPREADSHEET.getSheetByName("Current Month"); // Open the sheet that has the information on what we're playing this month
  const SCHEDULE = SPREADSHEET.getSheetByName("Schedule"); // Open the sheet that has the all time schedule
  const LITURGICAL_DAY_TITLES = SPREADSHEET.getSheetByName("Liturgical Day Titles"); // Open the sheet that contains Liturgical Day Titles

  // ************* HYMN DATA *************
  const gatherData = GATHER_COMPREHENSIVE.getRange("A2:D").getValues(); // Contains hymn number, name, and GoogleSlides ID
  const binderData = BINDER.getRange("A2:B").getValues(); // Contains hymn name, and GoogleSlides ID

  // ************* THESE ARE LAZY; UPDATE THEM WHEN MORE INFO IS ADDDED *************
  const storringtonData = STORRINGTON_MASS.getRange("A2:B10").getValues(); // Contains part of the mass, and GoogleSlidesID
  const otherSlideData = OTHER_SLIDES.getRange("A2:B10").getValues(); // Contains slide type + GoogleSlides ID

  // ************* CHANGE THIS RANGE AS NEEDED *************
  GlobalConstants.schedule = SCHEDULE;
  GlobalConstants.timeZone = SPREADSHEET_TIMEZONE;
  GlobalConstants.scheduleData = CURRENT_MONTH.getRange("A2:N6").getValues();

  // ************* SUNDAY TITLES *************
  const liturgicalDayTitlesData = LITURGICAL_DAY_TITLES.getRange("A2:A60").getValues();
  const liturgicalDayTitles = [];
  liturgicalDayTitlesData.forEach(function (row) {
    liturgicalDayTitles.push(row[0]);
  });
  GlobalConstants.liturgicalDayTitles = liturgicalDayTitles;

  // Create an object for quick lookup of presentation IDs by hymn number
  const gatherPresentationIds = {};
  // And quick lookup for hymn titles
  const gatherComprehensiveTitles = {};
  gatherData.forEach(function (column) {
    gatherPresentationIds[column[0]] = column[1]; // column[0] is hymn number, column[1] is presentation ID
    gatherComprehensiveTitles[column[0]] = column[3]; // # ; name
  });
  GlobalConstants.gatherPresentationIds = gatherPresentationIds;
  GlobalConstants.gatherComprehensiveTitles = gatherComprehensiveTitles;

  // presentation ID by hymn name for binder hymns
  const binderPresentationIds = {};
  // Binder hymns that exist
  const binderTitles = [];
  binderData.forEach(function (column) {
    binderPresentationIds[column[0]] = column[1]; // column[0] is hymn name, column[1] is presentation ID
    binderTitles.push(column[0]);
  });
  GlobalConstants.binderPresentationIds = binderPresentationIds;
  GlobalConstants.binderTitles = binderTitles;

  // Storrington mass setting slides
  const storringtonSlidesPresentationIds = {};
  storringtonData.forEach(function (column) {
    storringtonSlidesPresentationIds[column[0]] = column[1]; // column[0] is part of the mass, column[1] is presentation ID
  });

  // Other slides e.g. transition, opening slide, etc.
  const otherSlidesPresentationIds = {};
  otherSlideData.forEach(function (column) {
    otherSlidesPresentationIds[column[0]] = column[1]; // column[0] is slide type, column[1] is presentation ID
  });

  // consts so that conditional slides aren't searched every time
  GlobalConstants.gloriaId = storringtonSlidesPresentationIds["Gloria"];
  GlobalConstants.gospelId =
    storringtonSlidesPresentationIds["Gospel Acclamation"];
  GlobalConstants.lentenId =
    storringtonSlidesPresentationIds["Lenten Gospel Acclamation"];
  GlobalConstants.sanctusId = storringtonSlidesPresentationIds["Sanctus"];
  GlobalConstants.memorial1Id =
    storringtonSlidesPresentationIds["Memorial Acclamation 1"]; // When We Eat This Bread...
  GlobalConstants.memorial2Id =
    storringtonSlidesPresentationIds["Memorial Acclamation 2"]; // We Proclaim Your Death...
  GlobalConstants.memorial3Id =
    storringtonSlidesPresentationIds["Memorial Acclamation 3"]; // Save Us, Saviour of the World...
  GlobalConstants.amenId = storringtonSlidesPresentationIds["Amen"];
  GlobalConstants.lambId = storringtonSlidesPresentationIds["Lamb of God"];

  GlobalConstants.openingId = otherSlidesPresentationIds["Opening"];
  GlobalConstants.transitionId = otherSlidesPresentationIds["Transition"];
  GlobalConstants.jubileePrayerId =
    otherSlidesPresentationIds["The Jubilee Prayer"];

  Logger.log("Data initilization complete.");
}
