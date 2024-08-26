function pushGoogleSheets(weeks) {
  const schedule = GlobalConstants.schedule;
  weeks.forEach((week) => {
    Logger.log(week);
    Logger.log(week.sunday);
  });

  // let findThisSunday = schedule.createTextFinder(week.sunday);
  // const thisSundayRange = findThisSunday.getCurrentMatch();
  // const thisSundayRowIndex = thisSundayRange.getRowIndex();
  // Logger.log(thisSundayRowIndex);
  // gathering: gatherings[i],
  // psalm: psalms[i],
  // offertory: offertories[i],
  // communion: communions[i],
  // recessional: recessionals[i],
  // gospelVerse: gospelVerses[i],
  // storrington: thisWeekStorrington,
}
