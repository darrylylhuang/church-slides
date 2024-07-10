// Uses date param as the title of the new presentation
function createPresentationInFolder(date) {
  var folderId = "19YeqGE3HIkvtLS5nUO2wbWfA1zcicSX4"; // Replace with your specific folder ID

  // Create a new presentation
  var presentation = SlidesApp.create(createPresentationTitle(date));
  var presentationId = presentation.getId();

  // Move the presentation to the specified folder using the advanced Drive service
  Drive.Files.update({}, presentationId, null, {
    addParents: folderId,
    removeParents: DriveApp.getRootFolder().getId(),
  });

  Logger.log("Presentation created in folder: " + folderId);
  return presentation;
}

function createPresentationTitle(date) {
  var options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  var thisSunday = new Date(date);
  var presentationTitle = thisSunday.toLocaleDateString("en-US", options);
  return presentationTitle;
}
