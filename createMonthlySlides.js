var SHEET_ID = "1f5dM3ppCNISYl6EgvFoC6irO-UwpIvJc_hoDnkEb6wQ"; // Open GoogleSheets with all info
var GlobalConstants = {};

function createMonthlySlides() {
  // ************* TO UPDATE AN EXISTING PRESENTATION *************
  // var PRESENTATION_ID = '1tzUskJ8-7IvJikkIX2gEHdH0NDN65OYbu_2AYGOZPXM';
  // var presentation = SlidesApp.openById(PRESENTATION_ID);
  // var newPresentation = SlidesApp.create('Sunday, July 7, 2024');
  initializeData();

  const scheduleData = GlobalConstants.scheduleData;

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
