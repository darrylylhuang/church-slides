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
        _handleAmen(body, value);
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

  const normalPage = "14";
  const normalLabel = "Alleluia, Alleluia...";
  const lentenPage = "17";
  const lentenLabel = "Praise to you, Lord Jesus Christ...";

  let lenten = "";

  if (value === "0") {
    _removeStorringtonPart(
      body,
      pageTemplate,
      labelTemplate,
      "GOSPEL ACCLAMATION"
    );
  } else if (value === "1") {
    _insertStorringtonPart(
      body,
      pageTemplate,
      labelTemplate,
      normalPage,
      normalLabel
    );
  } else if (value === "2") {
    _insertStorringtonPart(
      body,
      pageTemplate,
      labelTemplate,
      lentenPage,
      lentenLabel
    );
    lenten = "Lenten ";
  } else {
    _insertStorringtonPart(body, pageTemplate, labelTemplate);
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
  const labelTemplate = "{memorial-acclamation}";
  const pageTemplate = "{memorial-page}";

  const memorial1Label = "When We Eat This Bread...";
  const memorial2Label = "We Proclaim Your Death...";
  const memorial3Label = "Save us, Savior of the World...";

  const memorial1Page = "25";
  const memorial2Page = "24";
  const memorial3Page = "27";

  if (value === "0") {
    _removeStorringtonPart(
      body,
      pageTemplate,
      labelTemplate,
      "MEMORIAL ACCLAMATION"
    );
  } else if (value === "1") {
    _insertStorringtonPart(
      body,
      pageTemplate,
      labelTemplate,
      memorial1Page,
      memorial1Label
    );
  } else if (value === "2") {
    _insertStorringtonPart(
      body,
      pageTemplate,
      labelTemplate,
      memorial2Page,
      memorial2Label
    );
  } else if (value === "3") {
    _insertStorringtonPart(
      body,
      pageTemplate,
      labelTemplate,
      memorial3Page,
      memorial3Label
    );
  } else {
    _insertStorringtonPart(body, pageTemplate, labelTemplate);
  }
}

function _handleAmen(body, value) {
  const pageTemplate = "{amen-page}";
  const labelTemplate = "{amen}";

  if (!value) {
    _removeStorringtonPart(body, "AMEN", pageTemplate, labelTemplate);
  } else {
    _insertStorringtonPart(body, pageTemplate, labelTemplate, "28", "");
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
