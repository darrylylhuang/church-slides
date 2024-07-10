var SHEET_ID = '1f5dM3ppCNISYl6EgvFoC6irO-UwpIvJc_hoDnkEb6wQ'; // Open GoogleSheets with all info
var SPREADSHEET = SpreadsheetApp.openById(SHEET_ID);
var GATHER_COMPREHENSIVE = SPREADSHEET.getSheetByName('Gather Comprehensive'); // Open specific sheet with Gather Comprehensive hymn info
var STORRINGTON_MASS = SPREADSHEET.getSheetByName('Storrington Mass'); // Open the sheet that has Storrington mass settings
var BINDER = SPREADSHEET.getSheetByName('Binder');
var OTHER_SLIDES = SPREADSHEET.getSheetByName('Other Slides'); // Open the sheet that has transitions + additional slides
var SCHEDULE = SPREADSHEET.getSheetByName('Current Month'); // Open the sheet that has the information on what we're playing each month

function createMonthlySlides() {  
  // ************* TO UPDATE AN EXISTING PRESENTATION *************
  // var PRESENTATION_ID = '1tzUskJ8-7IvJikkIX2gEHdH0NDN65OYbu_2AYGOZPXM';
  // var presentation = SlidesApp.openById(PRESENTATION_ID);
  // var newPresentation = SlidesApp.create('Sunday, July 7, 2024');

  var gatherData = GATHER_COMPREHENSIVE.getRange('A2:C').getValues(); // Contains hymn number, name, and GoogleSlides ID
  var storringtonData = STORRINGTON_MASS.getRange('A2:B10').getValues(); // Contains part of the mass, and GoogleSlidesID
  // ************* THESE ARE LAZY; UPDATE THEM WHEN MORE HYMNS ARE ADDDED *************
  var binderData = BINDER.getRange('A2:B100').getValues(); // Contains hymn name, and GoogleSlides ID
  var otherSlideData = OTHER_SLIDES.getRange('A2:B10').getValues(); // Contains slide type + GoogleSlides ID

  // ************* CHANGE THIS RANGE AS NEEDED *************
  var scheduleData = SCHEDULE.getRange('A2:M6').getValues();

  // Create an object for quick lookup of presentation IDs by hymn number
  this.gatherPresentationIds = {};
  gatherData.forEach(function(column) {
    gatherPresentationIds[column[0]] = column[2]; // column[0] is hymn number, column[2] is presentation ID
  });
  
  // Storrington mass setting slides
  const storringtonSlidesPresentationIds = {};
  storringtonData.forEach(function(column) {
    storringtonSlidesPresentationIds[column[0]] = column[1]; // column[0] is slide type, column[1] is presentation ID
  });

  // presentation ID by hymn name for binder hymns
  this.binderPresentationIds = {};
  binderData.forEach(function(column) {
    binderPresentationIds[column[0]] = column[1]; // column[0] is slide type, column[1] is presentation ID
  });

  // Other slides e.g. transition, opening slide, etc.
  this.otherSlidesPresentationIds = {};
  otherSlideData.forEach(function(column) {
    otherSlidesPresentationIds[column[0]] = column[1]; // column[0] is slide type, column[1] is presentation ID
  });

  // consts so that conditional slides aren't searched every time
  const gloriaId = storringtonSlidesPresentationIds["Gloria"];
  const gospelId = storringtonSlidesPresentationIds["Gospel Acclamation"];
  const lentenId = storringtonSlidesPresentationIds["Lenten Gospel Acclamation"];
  const sanctusId = storringtonSlidesPresentationIds["Sanctus"];
  const memorial1Id = storringtonSlidesPresentationIds["Memorial Acclamation 1"]; // When We Eat This Bread...
  const memorial2Id = storringtonSlidesPresentationIds["Memorial Acclamation 2"]; // We Proclaim Your Death...
  const memorial3Id = storringtonSlidesPresentationIds["Memorial Acclamation 3"]; // Save Us, Saviour of the World...
  const amenId = storringtonSlidesPresentationIds["Amen"];
  const lambId = storringtonSlidesPresentationIds["Lamb of God"];

  // Test with one week
  var nextSunday = scheduleData[0];
  createSlidesForOneWeek(nextSunday);

  // // Make the slides for the whole month
  // var nextSunday = null;
  // for (let i = 0;  i < scheduleData.length; i++) {
  //   nextSunday = scheduleData[i];
  //   createSlidesForOneWeek(nextSunday);
  // }
}

function createSlidesForOneWeek(nextSunday) {
  // SANDBOX
  // var PRESENTATION_ID = '1tzUskJ8-7IvJikkIX2gEHdH0NDN65OYbu_2AYGOZPXM';
  // var presentation = SlidesApp.openById(PRESENTATION_ID);

  var slidesToAdd = [];

  // HYMNS
  [date, gatheringNum, psalmNum, offertoryNum, communionNum, recessionalNum, gloriaCond, gospelCond, lentenCond, sanctusCond, memorialCond, amenCond, lambCond] = nextSunday.slice();
  var hymnNumList = [gatheringNum, psalmNum, offertoryNum, communionNum, recessionalNum];
  var hymnIdList = []
  for (let j = 0; j < hymnNumList.length; j++) {
    hymnKey = hymnNumList[j]
    if (Number.isNaN(hymnKey)) {
      hymnIdList.push(binderPresentationIds[hymnKey]);
    } else {
      hymnIdList.push(gatherPresentationIds[hymnKey]);
    }
  }

  // needs the date from nextSunday slice
  var newPresentation = createPresentationInFolder(date);
  var presentation = newPresentation;
  presentation.getSlides()[0].remove();

  [gathering, psalm, offertory, communion, recessional] = hymnIdList;

  // **************************************************** SLIDE ORDER ****************************************************
  slidesToAdd.push(gathering);
  if (gloriaCond) slidesToAdd.push(storringtonSlidesPresentationIds["Gloria"]);
  slidesToAdd.push(psalm)
  if (gospelCond) slidesToAdd.push(storringtonSlidesPresentationIds["Gospel Acclamation"]);
  if (lentenCond) slidesToAdd.push(storringtonSlidesPresentationIds["Lenten Gospel Acclamation"]);
  slidesToAdd.push(offertory);
  if (sanctusCond) slidesToAdd.push(storringtonSlidesPresentationIds["Sanctus"]);
  if (memorialCond === 1) slidesToAdd.push(storringtonSlidesPresentationIds["Memorial Acclamation 1"]);
  if (memorialCond === 2) slidesToAdd.push(storringtonSlidesPresentationIds["Memorial Acclamation 2"]);
  if (memorialCond === 3) slidesToAdd.push(storringtonSlidesPresentationIds["Memorial Acclamation 3"]);
  if (amenCond) slidesToAdd.push(storringtonSlidesPresentationIds["Amen"]);
  if (lambCond) slidesToAdd.push(storringtonSlidesPresentationIds["Lamb of God"]);
  slidesToAdd.push(communion);
  slidesToAdd.push(recessional);

  var transitionId = otherSlidesPresentationIds["Transition"];
  var presentationId = null;

  var transitionPresentation = SlidesApp.openById(transitionId);
  var transitionSlide = transitionPresentation.getSlides()[0];

  // i will typically be 10 at the end of the iteration since we usually use 6 parts of the mass and 5 hymns
  for (let j = 0; j < slidesToAdd.length; j++) {
    // Find the presentation ID for nextSundayHymnNumber
    var presentationId = slidesToAdd[j] ? slidesToAdd[j] : null;

    if (presentationId) {
      // Open the existing presentation by ID
      Logger.log(`${j}: Copying exisiting slides for ${date}.`);
      var existingPresentation = SlidesApp.openById(presentationId);
      // Duplicate and append slides from existingPresentation to currentPresentation
      var slides = existingPresentation.getSlides();
      slides.forEach(slide => copySlide(slide, presentation));

      // Add a transition slide after every slide added
      Logger.log(`${j}: Adding a transition slide for ${date}.`);
      presentation.appendSlide(transitionSlide);
    }
  }
}


function copySlide(sourceSlide, targetPresentation) {
    targetPresentation.appendSlide(sourceSlide);
}

function addHymnTypeToTitle(slides) {

}


  // ************* RESIZE THE TITLE *************
  // for (var i = 0; i < slides.length; i++) {
  //   var slide = slides[i];
  //   var hymnNumber = hymnData[i][0]; // Assuming hymn number is in column A
  //   var hymnTitle = hymnData[i][1]; // Assuming hymn title is in column B
    
  //   // Update slide title with hymn number and title
  //   var titleShape = slide.getShapes(SlidesApp.ShapeType.TEXT_BOX)[0]; // Assumes title is first text box
  //   titleShape.getText().setText(hymnNumber + ' - ' + hymnTitle);

  //   // Adjust font size dynamically to fit within the text box width
  //   var fontSize = 24; // Initial font size
  //   var boxWidth = titleShape.getWidth();

  //   // Set initial font size and style
  //   titleShape.getText().getTextStyle().setFontSize(fontSize);
  //   titleShape.getText().getTextStyle().setBold(true); // Example of setting bold

  //   // Check if text exceeds text box width
  //   while (titleShape.getText().getWidth() > boxWidth && fontSize > 10) { // Ensure font size doesn't become too small
  //     fontSize--; // Decrease font size
  //     titleShape.getText().getTextStyle().setFontSize(fontSize);
    // }
  // }