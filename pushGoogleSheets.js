/**
 * @param {Object[]} weeks
 */
function pushGoogleSheets(weeks) {
  const schedule = GlobalConstants.schedule;
  const timeZone = GlobalConstants.timeZone;

  const columnAVals = schedule.getRange("A:A").getValues();
  let lastCell = columnAVals.length;

  weeks.forEach((week) => {
    // Extract info
    let [
      day,
      gathering,
      psalm,
      offertory,
      communion,
      recessional,
      line1,
      line2,
      liturgicalDayTitle,
    ] = [
      week.day,
      week.gathering,
      week.psalm,
      week.offertory,
      week.communion,
      week.recessional,
      week.gospelVerse.line1,
      week.gospelVerse.line2,
      week.liturgicalDayTitle,
    ];

    const date = Utilities.formatDate(new Date(day), timeZone, "MM/dd/yyyy");

    schedule.insertRowAfter(lastCell);
    lastCell++;

    const weekRange = schedule.getRange(`A${lastCell}:O${lastCell}`);

    // Hymns
    let rowData = [date, gathering, psalm, offertory, communion, recessional];
    // Storrington parts are input in order on the web form and kept in order on the Google Sheet
    const storringtonValues = week.storrington.map((part) => part.value);
    rowData = rowData.concat(storringtonValues);
    rowData.push(line1);
    rowData.push(line2);
    rowData.push(liturgicalDayTitle);

    // Data must be entered as a 2D array
    let data = [];
    data.push(rowData);

    weekRange.setValues(data);
  });
}
