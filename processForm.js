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

  createMusicSchedule(weeks);

  var response = `Success`;
  return response;
}
