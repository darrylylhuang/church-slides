var SHEET_ID = "1f5dM3ppCNISYl6EgvFoC6irO-UwpIvJc_hoDnkEb6wQ"; // Open GoogleSheets with all info
var GlobalConstants = {};

function createMonthlySlides() {
  // ************* TO UPDATE AN EXISTING PRESENTATION *************
  // var PRESENTATION_ID = '1tzUskJ8-7IvJikkIX2gEHdH0NDN65OYbu_2AYGOZPXM';
  // var presentation = SlidesApp.openById(PRESENTATION_ID);
  // var newPresentation = SlidesApp.create('Sunday, July 7, 2024');
  initializeData();

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

  const gatherPresentationIds = GlobalConstants.gatherPresentationIds;

  var slidesToAdd = [];

  // HYMNS
  [
    date,
    gatheringNum,
    psalmNum,
    offertoryNum,
    communionNum,
    recessionalNum,
    gloriaCond,
    gospelCond,
    lentenCond,
    sanctusCond,
    memorialCond,
    amenCond,
    lambCond,
  ] = nextSunday.slice();
  var hymnNumList = [
    gatheringNum,
    psalmNum,
    offertoryNum,
    communionNum,
    recessionalNum,
  ];
  var hymnIdList = [];
  for (let j = 0; j < hymnNumList.length; j++) {
    hymnKey = hymnNumList[j];
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
  if (gloriaCond) slidesToAdd.push(GlobalConstants.gloriaId);
  slidesToAdd.push(psalm);
  if (gospelCond) slidesToAdd.push(GlobalConstants.gospelId);
  if (lentenCond) slidesToAdd.push(GlobalConstants.lentenId);
  slidesToAdd.push(offertory);
  if (sanctusCond) slidesToAdd.push(GlobalConstants.sanctusId);
  if (memorialCond === 1) slidesToAdd.push(GlobalConstants.memorial1Id);
  if (memorialCond === 2) slidesToAdd.push(GlobalConstants.memorial2Id);
  if (memorialCond === 3) slidesToAdd.push(GlobalConstants.memorial3Id);
  if (amenCond) slidesToAdd.push(GlobalConstants.amenId);
  if (lambCond) slidesToAdd.push(GlobalConstants.lambId);
  slidesToAdd.push(communion);
  slidesToAdd.push(recessional);

  var transitionId = GlobalConstants.transitionId;
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
      slides.forEach((slide) => copySlide(slide, presentation));

      // Add a transition slide after every slide added
      Logger.log(`${j}: Adding a transition slide for ${date}.`);
      presentation.appendSlide(transitionSlide);
    }
  }
}

function copySlide(sourceSlide, targetPresentation) {
  targetPresentation.appendSlide(sourceSlide);
}

function addHymnTypeToTitle(slides) {}

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
