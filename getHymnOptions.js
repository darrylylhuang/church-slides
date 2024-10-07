function getHymnOptions() {
  initializeData();

  const response = [];
  // Flatten Gather Comprehensive into a list and concat binder hymns after
  for (let key in GlobalConstants.gatherComprehensiveTitles) {
    response.push(`${key} - ${GlobalConstants.gatherComprehensiveTitles[key]}`);
  }

  return response.concat(GlobalConstants.binderTitles);
}
