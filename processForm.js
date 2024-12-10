function processForm(
  sundays,
  gatherings,
  psalms,
  offertories,
  communions,
  recessionals,
  gospelVerses,
  storringtonParts,
  liturgicalDayTitles
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
    storringtonParts,
    liturgicalDayTitles
  );

  pushGoogleSheets(weeks);
  const response = createMusicSchedule(weeks);
  return response;
}
