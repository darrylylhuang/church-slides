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

  // For every Sunday, copy the template and replace the placeholders
  const numSundays = sundays.length;

  for (let i = 0; i < numSundays; i++) {
    copyMusicScheudleTemplate(doc);

    // storringtonParts is a list of all the parts for the month; {name, value}
    // storringtonParts.filter((el) => el.name === );

    let week = {
      sunday: sundays[i],
      gathering: gatherings[i],
      psalm: psalms[i],
      offertory: offertories[i],
      communion: communions[i],
      recessional: recessionals[i],
      gospelVerse: gospelVerses[i],
      storrington: storringtonParts,
    };
    insertWeeklySchedule(doc, week);
  }

  // Remove blank paragraph generated with new doc
  const body = doc.getBody();
  body.removeChild(body.getChild(0));
}
