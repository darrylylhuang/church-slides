function processForm(
  days,
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

  let entries = processScheduleEntries(
    days,
    gatherings,
    psalms,
    offertories,
    communions,
    recessionals,
    gospelVerses,
    storringtonParts,
    liturgicalDayTitles
  );

  pushGoogleSheets(entries);
  const response = createMusicSchedule(entries);
  return response;
}
