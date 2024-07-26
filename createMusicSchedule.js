function createMusicSchedule(
  sundays,
  gatherings,
  psalms,
  offertories,
  communions,
  recessionals,
  gospelVerses,
  storringtonParts
) {
  // The title of the new doc is this month of this year
  const today = new Date();
  const month = date.toLocaleString("en-CA", { month: "long" });
  const year = today.getFullYear();
  const doc = DocumentApp.create(`Music Schedule - ${month} ${year}`);

  copyMusicScheudleTemplate(doc);

  // Remove blank paragraph generated with new doc
  const body = doc.getBody();
  body.removeChild(body.getChild(0));
}
