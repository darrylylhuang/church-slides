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
  const month = today.toLocaleString("en-CA", { month: "long" });
  const year = today.getFullYear();
  // const doc = DocumentApp.create(`Music Schedule - ${month} ${year}`);

  // For every Sunday, copy the template and replace the placeholders
  const numSundays = sundays.length;

  for (let i = 0; i < numSundays; i++) {
    // storringtonParts is a list of all the parts for the month; {name, value}
    // name will include a substring at the end of the form "-i"
    let thisWeekStorrington = storringtonParts.filter((el) => el.name.endsWith(`-${i}`));
    // once this week's parts have been filtered based on i value, strip this suffix for convenience
    thisWeekStorrington = thisWeekStorrington.map((el) => ({name: el.name.substring(0, el.name.length - 2), value: el.value}))
    
    let week = {
      sunday: sundays[i],
      gathering: gatherings[i],
      psalm: psalms[i],
      offertory: offertories[i],
      communion: communions[i],
      recessional: recessionals[i],
      gospelVerse: gospelVerses[i],
      storrington: thisWeekStorrington,
    };
  
    copyMusicScheudleTemplate(doc);
    insertWeeklySchedule(doc, week);
  }

  // Remove blank paragraph generated with new doc
  const body = doc.getBody();
  body.removeChild(body.getChild(0));
}
