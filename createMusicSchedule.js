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
  // The title of the new doc is the month of this year of the Sundays given
  // TODO: function that creates the document
  const firstSundayofMonth = new Date(sundays[0]);
  const month = firstSundayofMonth.toLocaleString("en-CA", { month: "long" });
  const year = firstSundayofMonth.getFullYear();
  const doc = DocumentApp.create(`Music Schedule - ${month} ${year}`);

  const body = doc.getBody();

  // For every Sunday, copy the template and replace the placeholders
  const numSundays = sundays.length;
  for (let i = 0; i < numSundays; i++) {
    // storringtonParts is a list of all the parts for the month; {name, value}
    // name will include a substring at the end of the form "-i"
    let thisWeekStorrington = storringtonParts.filter((el) =>
      el.name.endsWith(`-${i}`)
    );
    // once this week's parts have been filtered based on i value, strip this suffix for convenience
    thisWeekStorrington = thisWeekStorrington.map((el) => {
      // also strip the "thisMonth-" / "nextMonth-" prefix
      const start = 10;
      return {
        name: el.name.substring(start, el.name.length - 2),
        value: el.value,
      };
    });

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

    if (i % 2 === 0) {
      // At the start of a new page, remove the extra paragraph whose index will have been saved from the previous iteration
      // This needs to be after the next week's template has been appended
      if (i !== 0) body.removeChild(body.getChild(newParagraphChildIndex));
      // Two weeks can fit on a page; put a rule between the two unless it's the last
      if (i !== numSundays) body.appendHorizontalRule();
    }
    // The horizontal rule adds a paragraph; remove paragraph after the table
    var newParagraphChildIndex = body.getNumChildren() - 2;
    body.removeChild(body.getChild(newParagraphChildIndex));
  }

  // Remove blank paragraph generated with new doc
  body.removeChild(body.getChild(0));
}
