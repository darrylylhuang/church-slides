const memorial1Label = "When We Eat This Bread...";
const memorial2Label = "We Proclaim Your Death...";
const memorial3Label = "Save us, Savior of the World...";

function insertWeeklySchedule(doc, week) {
  const body = doc.getBody();

  body.replaceText("{date}", week.sunday);
  body.replaceText("{gathering-hymn}", week.gathering);
  body.replaceText("{psalm}", week.psalm);
  body.replaceText("{offertory-hymn}", week.offertory);
  body.replaceText("{communion-hymn}", week.offertory);
  body.replaceText("{recessional-hymn}", week.offertory);
  body.replaceText("{line1}", week.gospelVerse.line1);
  body.replaceText("{line2}", week.gospelVerse.line2);

  const storringtonParts = week.storrington;
  storringtonParts.forEach((element) => {
    let name = element.name;
    let value = element.value;
    // TODO: include / remove Storrington mass parts
    switch (name) {
      case "gloria":
        break;
      case "gospel":
        break;
      case "memorial":
        insertMemorialLabel(body, value);
      case "amen":
        break;
      case "lamb":
        break;
      default:
        break;
    }
  });
}

function insertMemorialLabel(body, value) {
  if (value === "1") {
    body.replaceText("{memorial-acclamation}", memorial1Label);
  } else if (value === "2") {
    body.replaceText("{memorial-acclamation}", memorial2Label);
  } else if (value === "3") {
    body.replaceText("{memorial-acclamation}", memorial3Label);
  } else {
    // TODO: delete Memorial Acclamation
  }
}
