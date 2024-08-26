function pushGoogleSheets(weeks) {
  const schedule = GlobalConstants.schedule;
  const timeZone = GlobalConstants.timeZone;
  weeks.forEach((week) => {
    const sunday = Utilities.formatDate(
      new Date(week.sunday),
      timeZone,
      "MM/dd/yyyy"
    );
    const findThisSunday = schedule.createTextFinder(sunday);
    const thisSundayRange = findThisSunday.findNext();
    const thisSundayRowIndex = thisSundayRange.getRowIndex();
    
  });
  // gathering: gatherings[i],
  // psalm: psalms[i],
  // offertory: offertories[i],
  // communion: communions[i],
  // recessional: recessionals[i],
  // gospelVerse: gospelVerses[i],
  // storrington: thisWeekStorrington,
}
