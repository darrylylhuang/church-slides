/**
 * @param {Object[]} entries
 */
function pushGoogleSheets(entries) {
  const schedule = GlobalConstants.schedule;
  const timeZone = GlobalConstants.timeZone;

  const columnAVals = schedule.getRange("A:A").getValues();
  let lastCell = columnAVals.length;

  entries.forEach((entry) => {
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
      entry.day,
      entry.gathering,
      entry.psalm,
      entry.offertory,
      entry.communion,
      entry.recessional,
      entry.gospelVerse.line1,
      entry.gospelVerse.line2,
      entry.liturgicalDayTitle,
    ];

    Logger.log(day);
    const date = Utilities.formatDate(new Date(day), timeZone, "MM/dd/yyyy");
    Logger.log(date);

    schedule.insertRowAfter(lastCell);
    lastCell++;

    const entryRange = schedule.getRange(`A${lastCell}:O${lastCell}`);

    // Hymns
    let rowData = [date, gathering, psalm, offertory, communion, recessional];
    // Storrington parts are input in order on the web form and kept in order on the Google Sheet
    const storringtonValues = entry.storrington.map((part) => part.value);
    rowData = rowData.concat(storringtonValues);
    rowData.push(line1);
    rowData.push(line2);
    rowData.push(liturgicalDayTitle);

    // Data must be entered as a 2D array
    let data = [];
    data.push(rowData);

    entryRange.setValues(data);
  });
}
