function moveFileToFolder(fileId, folderId) {
  const rootFolderId = DriveApp.getRootFolder().getId();

  // Move the file from root folder to the specified folder using the advanced Drive service
  Drive.Files.update({}, fileId, null, {
    addParents: folderId,
    removeParents: rootFolderId,
  });
}
