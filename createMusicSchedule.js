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
  // Open the template and get its body
  const fileId = TEMPLATE_ID;
  const template = DocumentApp.openById(fileId);
  const templateBody = template.getBody();

  // The title of the new doc is this month of this year
  const today = new Date();
  const month = today.getMonth();
  const year = today.getFullYear();
  const doc = DocumentApp.create(`Music Schedule - ${month} ${year}`);

  copyMusicScheudleTemplate(doc);
}
