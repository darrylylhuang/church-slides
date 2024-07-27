TEMPLATE_ID = "1NF0pdUpADSXyh8a6m4alZyViMKz1h4LJ04TP4yyLqJo";

function copyMusicScheudleTemplate(currentDoc) {
  const templateDocId = TEMPLATE_ID;

  // Open the source document
  var templateDoc = DocumentApp.openById(templateDocId);
  var templateBody = templateDoc.getBody();

  // Copy into current docuemnt
  const body = currentDoc.getBody();

  // Copy each element from the source document to the new document
  var numChildren = templateBody.getNumChildren();
  for (var i = 0; i < numChildren; i++) {
    let element = templateBody.getChild(i).copy();
    let type = element.getType();
    if (type === DocumentApp.ElementType.PARAGRAPH) {
      body.appendParagraph(element);
    } else if (type === DocumentApp.ElementType.TABLE) {
      body.appendTable(element);
    } else {
      throw new Error(`Unidentified type: ${type}`);
    }
  }
}
