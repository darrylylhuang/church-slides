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
