/**
 * Takes all information submitted from the form and returns them in chunks relevant to a particular entry
 * @param {*} days
 * @param {*} gatherings
 * @param {*} psalms
 * @param {*} offertories
 * @param {*} communions
 * @param {*} recessionals
 * @param {*} gospelVerses
 * @param {*} storringtonParts
 * @param {*} liturgicalDayTitles
 * @returns {Object[]}
 */
function processScheduleEntries(
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
  let entries = [];

  // For every day, filter the Storrington parts for the relevant elements
  const numDays = days.length;
  for (let i = 0; i < numDays; i++) {
    // storringtonParts is a list of all the parts for the month; {name, value}
    // name will include a substring at the end of the form "-i"
    let thisEntryStorrington = storringtonParts.filter((el) =>
      el.name.endsWith(`-${i}`)
    );
    // once this week's parts have been filtered based on i value, strip this suffix for convenience
    thisEntryStorrington = thisEntryStorrington.map((el) => {
      // also strip the "thisMonth-" / "nextMonth-" prefix
      const start = 10;
      return {
        name: el.name.substring(start, el.name.length - 2),
        value: el.value,
      };
    });

    const allStorringtonParts = [
      "gloria",
      "gospel",
      "sanctus",
      "memorial",
      "amen",
      "lamb",
    ];

    // Make sure all Storrington Mass Parts have been accounted for
    for (let i = 0; i < allStorringtonParts.length; i++) {
      const part = allStorringtonParts[i];
      // If it wasn't checked as an input, it wouldn't have been sent
      if (!thisEntryStorrington.some((el) => el.name === part))
        // So what we'll do is add an entry with the value false
        thisEntryStorrington.splice(i, 0, { name: part, value: false });
    }

    // consolidate all information relevant to the week
    // frontend now submits data: "{Hymn Number} - {Hymn Name}" for Gather
    // Binder hymns unaffected
    let entry = {
      day: days[i],
      gathering: gatherings[i].split(" - ")[0],
      psalm: psalms[i].split(" - ")[0],
      offertory: offertories[i].split(" - ")[0],
      communion: communions[i].split(" - ")[0],
      recessional: recessionals[i].split(" - ")[0],
      gospelVerse: gospelVerses[i],
      storrington: thisEntryStorrington,
      liturgicalDayTitle: liturgicalDayTitles[i],
    };
    entries.push(entry);
  }

  return entries;
}
