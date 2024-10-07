function insertWeeklySchedule(doc, week) {
  const body = doc.getBody();

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

  let hymns = [gathering, psalm, offertory, communion, recessional];
  [gathering, psalm, offertory, communion, recessional] =
    hymns.map(_getHymnTitles);

  body.replaceText("{date}", sunday);
  body.replaceText("{gathering-hymn}", gathering);
  body.replaceText("{psalm}", psalm);
  body.replaceText("{offertory-hymn}", offertory);
  body.replaceText("{communion-hymn}", communion);
  body.replaceText("{recessional-hymn}", recessional);
  body.replaceText("{line1}", line1);
  body.replaceText("{line2}", line2);

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
      case "sanctus":
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

function _getHymnTitles(key) {
  const gatherTitles = GlobalConstants.gatherComprehensiveTitles;
  const binderTitles = GlobalConstants.binderTitles;

  let title;
  if (isNaN(key)) {
    title = binderTitles.find((el) => ciEquals(key, el));
    if (title === undefined) {
      GlobalConstants.missingTitles.push(key);
      title = key;
    }
    title += " (Binder)";
  } else {
    title = gatherTitles[key] ? `${gatherTitles[key]} (${key})` : "";
    if (title === "") GlobalConstants.missingTitles.push(key);
  }

  return title;
}

function insertMemorialLabel(body, value) {
  const memorial1Label = "When We Eat This Bread...";
  const memorial2Label = "We Proclaim Your Death...";
  const memorial3Label = "Save us, Savior of the World...";

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

/**
 * Case insensitive equals
 * @param {string} a
 * @param {string} b
 * @returns {boolean} a === b (case insensitive)
 */
function ciEquals(a, b) {
  return typeof a === "string" && typeof b === "string"
    ? a.localeCompare(b, undefined, { sensitivity: "accent" }) === 0
    : a === b;
}
