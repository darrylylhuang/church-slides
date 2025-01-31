/**
 * @param {Object[]} entries
 * @returns String
 */
function createMusicSchedule(entries) {
  // The title of the new doc is the month of this year of the Sundays given
  // TODO: function that creates the document
  const firstEntryDay = new Date(entries[0].day);
  const month = firstEntryDay.toLocaleString("en-CA", { month: "long" });
  const year = firstEntryDay.getFullYear();
  const doc = DocumentApp.create(`Music Schedule - ${month} ${year}`);

  const body = doc.getBody();

  const numEntries = entries.length;
  for (let i = 0; i < numEntries; i++) {
    const entry = entries[i];
    copyMusicScheudleTemplate(doc);
    insertWeeklySchedule(doc, entry);

    if (i % 2 === 0) {
      // At the start of a new page, remove the extra paragraph whose index will have been saved from the previous iteration
      // This needs to be after the next entry's template has been appended
      if (i !== 0) body.removeChild(body.getChild(newParagraphChildIndex));
      // Two entries can fit on a page; put a rule between the two unless it's the last
      if (i !== numEntries - 1) body.appendHorizontalRule();
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
