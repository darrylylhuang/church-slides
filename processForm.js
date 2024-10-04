function processForm(
  sundays,
  gatherings,
  psalms,
  offertories,
  communions,
  recessionals,
  gospelVerses,
  storringtonParts
) {
  initializeData();

  let weeks = processWeeks(
    sundays,
    gatherings,
    psalms,
    offertories,
    communions,
    recessionals,
    gospelVerses,
    storringtonParts
  );

  pushGoogleSheets(weeks);
  const response = createMusicSchedule(weeks);
  return response;
}
