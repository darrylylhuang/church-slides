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
  createMusicSchedule(
    sundays,
    gatherings,
    psalms,
    offertories,
    communions,
    recessionals,
    gospelVerses,
    storringtonParts
  );

  var response = `Success`;
  return response;
}
