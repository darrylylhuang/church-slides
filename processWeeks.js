/**
 * Takes all information submitted from the form and returns them in chunks relevant to a particular week
 * @param {*} sundays
 * @param {*} gatherings
 * @param {*} psalms
 * @param {*} offertories
 * @param {*} communions
 * @param {*} recessionals
 * @param {*} gospelVerses
 * @param {*} storringtonParts
 * @returns {Object[]}
 */
function processWeeks(
  sundays,
  gatherings,
  psalms,
  offertories,
  communions,
  recessionals,
  gospelVerses,
  storringtonParts
) {
  let weeks = [];

  // For every Sunday, filter the Storrington parts for the relevant elements
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

    // consolidate all information relevant to the week
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
    weeks.push(week);
  }

  return weeks;
}
