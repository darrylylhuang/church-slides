TEMPLATE_ID = "1NF0pdUpADSXyh8a6m4alZyViMKz1h4LJ04TP4yyLqJo";

function copyMusicScheudleTemplate(currentDoc) {
  const sourceDocId = TEMPLATE_ID;

  // Open the source document
  var sourceDoc = DocumentApp.openById(sourceDocId);
  var sourceBody = sourceDoc.getBody();

  // Copy into current docuemnt
  var newBody = currentDoc.getBody();

  // Copy each element from the source document to the new document
  var numChildren = sourceBody.getNumChildren();
  for (var i = 0; i < numChildren; i++) {
    var element = sourceBody.getChild(i).copy();
    newBody.appendParagraph("").appendInlineImage(element.getImages());
    newBody.appendParagraph("").appendText(element.getText());
    newBody.appendPageBreak();
    newBody.appendParagraph(element);
  }
}
