function initializeData() {
  Logger.log("Initializing data.");
  var SPREADSHEET = SpreadsheetApp.openById(SHEET_ID);
  var GATHER_COMPREHENSIVE = SPREADSHEET.getSheetByName("Gather Comprehensive"); // Open specific sheet with Gather Comprehensive hymn info
  var STORRINGTON_MASS = SPREADSHEET.getSheetByName("Storrington Mass"); // Open the sheet that has Storrington mass settings
  var BINDER = SPREADSHEET.getSheetByName("Binder");
  var OTHER_SLIDES = SPREADSHEET.getSheetByName("Other Slides"); // Open the sheet that has transitions + additional slides
  var SCHEDULE = SPREADSHEET.getSheetByName("Current Month"); // Open the sheet that has the information on what we're playing each month

  var gatherData = GATHER_COMPREHENSIVE.getRange("A2:B").getValues(); // Contains hymn number, name, and GoogleSlides ID
  var storringtonData = STORRINGTON_MASS.getRange("A2:B10").getValues(); // Contains part of the mass, and GoogleSlidesID
  // ************* THESE ARE LAZY; UPDATE THEM WHEN MORE HYMNS ARE ADDDED *************
  var binderData = BINDER.getRange("A2:B100").getValues(); // Contains hymn name, and GoogleSlides ID
  var otherSlideData = OTHER_SLIDES.getRange("A2:B10").getValues(); // Contains slide type + GoogleSlides ID

  // ************* CHANGE THIS RANGE AS NEEDED *************
  GlobalConstants.scheduleData = SCHEDULE.getRange("A2:M6").getValues();

  // Create an object for quick lookup of presentation IDs by hymn number
  const gatherPresentationIds = {};
  gatherData.forEach(function (column) {
    gatherPresentationIds[column[0]] = column[1]; // column[0] is hymn number, column[1] is presentation ID
  });
  GlobalConstants.gatherPresentationIds = gatherPresentationIds;

  // Storrington mass setting slides
  const storringtonSlidesPresentationIds = {};
  storringtonData.forEach(function (column) {
    storringtonSlidesPresentationIds[column[0]] = column[1]; // column[0] is part of the mass, column[1] is presentation ID
  });

  // presentation ID by hymn name for binder hymns
  const binderPresentationIds = {};
  binderData.forEach(function (column) {
    binderPresentationIds[column[0]] = column[1]; // column[0] is hymn name, column[1] is presentation ID
  });
  GlobalConstants.binderPresentationIds = binderPresentationIds;

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

  GlobalConstants.transitionId = otherSlidesPresentationIds["Transition"];

  Logger.log("Data initilization complete.");
}
