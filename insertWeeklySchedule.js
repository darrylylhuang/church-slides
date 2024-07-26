function insertWeeklySchedule(doc, week) {
  const body = doc.getBody();

  body.replaceText("{date}", week.sunday);
  body.replaceText("{gathering-hymn}", week.gathering);
  body.replaceText("{psalm}", week.psalm);
  body.replaceText("offertory-hymn}", week.offertory);
  body.replaceText("communion-hymn}", week.offertory);
  body.replaceText("recessional-hymn}", week.offertory);
  body.replaceText("{line1}", week.gospelVerse[0]);
  body.replaceText("{line2}", week.gospelVerse[1]);

  const storringtonParts = week.storrington;
}
