// Uses date param as the title of the new presentation
function createPresentationInFolder(date) {
  // St. Bartholomew Church folder ID
  const folderId = "19YeqGE3HIkvtLS5nUO2wbWfA1zcicSX4";

  // Create a new presentation
  const presentation = SlidesApp.create(formatDate(date));
  const presentationId = presentation.getId();

  moveFileToFolder(presentationId, folderId);

  Logger.log(`Presentation ${presentationId} created in folder: ${folderId}`);
  return presentation;
}
