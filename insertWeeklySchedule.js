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
        _handleGloria(body, value);
        break;
      case "gospel":
        _handleGospel(body, value);
        break;
      case "sanctus":
        _handleSanctus(body, value);
        break;
      case "memorial":
        _handleMemorial(body, value);
        break;
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

function _removeStorringtonPart(body, pageTemplate, labelTemplate, part) {
  const page = "\\(page ";
  const label = "Storrington Mass\\) ";

  body.replaceText(page + pageTemplate, "NONE");
  body.replaceText(label + labelTemplate, `NO ${part}`);
}

function _insertStorringtonPart(
  body,
  pageTemplate,
  labelTemplate,
  page = "INVALID PAGE NUMBER",
  label = "INVALID VALUE ENTERED"
) {
  body.replaceText(pageTemplate, page);
  body.replaceText(labelTemplate, label);
}

function _handleGloria(body, value) {
  const pageTemplate = "{gloria-page}";
  const labelTemplate = "{gloria}";

  if (!value) {
    _removeStorringtonPart(body, pageTemplate, labelTemplate, "GLORIA");
  } else {
    _insertStorringtonPart(body, pageTemplate, labelTemplate, "6", "");
  }
}

function _handleGospel(body, value) {
  const pageTemplate = "{gospel-page}";
  const labelTemplate = "{gospel-acclamation}";
  const lentenTemplate = "{lenten} ";

  let lenten = "";

  if (value === "0") {
    _removeStorringtonPart(
      body,
      pageTemplate,
      labelTemplate,
      "GOSPEL ACCLAMATION"
    );
  } else if (value === "1") {
    _insertStorringtonPart(body, pageTemplate, labelTemplate, "14", "");
  } else if (value === "2") {
    _insertStorringtonPart(body, pageTemplate, labelTemplate, "17", "");
    lenten = "Lenten ";
  }

  body.replaceText(lentenTemplate, lenten);
}

function _handleSanctus(body, value) {
  const pageTemplate = "{sanctus-page}";
  const labelTemplate = "{sanctus}";

  if (!value) {
    _removeStorringtonPart(body, pageTemplate, labelTemplate, "SANCTUS");
  } else {
    _insertStorringtonPart(body, pageTemplate, labelTemplate, "21", "");
  }
}

function _handleMemorial(body, value) {
  const memorialLabelTemplate = "{memorial-acclamation}";
  const memorialPageTemplate = "{memorial-page}";

  const memorial1Label = "When We Eat This Bread...";
  const memorial2Label = "We Proclaim Your Death...";
  const memorial3Label = "Save us, Savior of the World...";

  const memorial1Page = "25";
  const memorial2Page = "24";
  const memorial3Page = "27";

  let memorialLabel = "";
  let memorialPage = "";

  switch (value) {
    case "0":
      body.replaceText("\\(page {memorial-page}", "NONE");
      body.replaceText("Storrington Mass\\) ", "");
      body.replaceText("{memorial-acclamation}", "NO MEMORIAL ACCLAMATION");
      break;
    case "1":
      memorialLabel = memorial1Label;
      memorialPage = memorial1Page;
      break;
    case "2":
      memorialLabel = memorial2Label;
      memorialPage = memorial2Page;
      break;
    case "3":
      memorialLabel = memorial3Label;
      memorialPage = memorial3Page;
      break;
    default:
      break;
  }

  body.replaceText(memorialLabelTemplate, memorialLabel);
  body.replaceText(memorialPageTemplate, memorialPage);
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
