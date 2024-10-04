/**
 * @param {Object[]} weeks
 */
function pushGoogleSheets(weeks) {
  const schedule = GlobalConstants.schedule;
  const timeZone = GlobalConstants.timeZone;
  weeks.forEach((week) => {
    // Extract info
    let [
      sunday,
      gathering,
      psalm,
      offertory,
      communion,
      recessional,
      line1,
      line2,
    ] = [
      week.sunday,
      week.gathering,
      week.psalm,
      week.offertory,
      week.communion,
      week.recessional,
      week.gospelVerse.line1,
      week.gospelVerse.line2,
    ];

    const thisSunday = Utilities.formatDate(
      new Date(sunday),
      timeZone,
      "MM/dd/yyyy"
    );
    const findThisSunday = schedule.createTextFinder(thisSunday);
    const thisSundayRange = findThisSunday.findNext();
    const thisSundayRowIndex = thisSundayRange.getRowIndex();

    const weekRange = schedule.getRange(
      `B${thisSundayRowIndex}:N${thisSundayRowIndex}`
    );

    // Hymns
    let rowData = [gathering, psalm, offertory, communion, recessional];
    // Storrington parts are input in order on the web form and kept in order on the Google Sheet
    const storringtonValues = week.storrington.map((part) => part.value);
    rowData = rowData.concat(storringtonValues);
    rowData.push(line1);
    rowData.push(line2);

    // Data must be entered as a 2D array
    let data = [];
    data.push(rowData);

    weekRange.setValues(data);
  });
}
