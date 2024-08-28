/**
 * @param {Object[]} weeks
 * @returns String
 */
function createMusicSchedule(weeks) {
  // The title of the new doc is the month of this year of the Sundays given
  // TODO: function that creates the document
  const firstSundayofMonth = new Date(weeks[0].sunday);
  const month = firstSundayofMonth.toLocaleString("en-CA", { month: "long" });
  const year = firstSundayofMonth.getFullYear();
  const doc = DocumentApp.create(`Music Schedule - ${month} ${year}`);

  const body = doc.getBody();

  const numWeeks = weeks.length;
  for (let i = 0; i < numWeeks; i++) {
    const week = weeks[i];
    copyMusicScheudleTemplate(doc);
    insertWeeklySchedule(doc, week);

    if (i % 2 === 0) {
      // At the start of a new page, remove the extra paragraph whose index will have been saved from the previous iteration
      // This needs to be after the next week's template has been appended
      if (i !== 0) body.removeChild(body.getChild(newParagraphChildIndex));
      // Two weeks can fit on a page; put a rule between the two unless it's the last
      if (i !== numWeeks - 1) body.appendHorizontalRule();
    }

    // The horizontal rule adds a paragraph; remove paragraph after the table
    var newParagraphChildIndex = body.getNumChildren() - 2;
    body.removeChild(body.getChild(newParagraphChildIndex));
  }

  // Remove blank paragraph generated with new doc
  body.removeChild(body.getChild(0));
  doc.addEditors(["darrylylhuang@gmail.com", "michael.a.cole65@gmail.com"]);
  return doc.getUrl();
}
