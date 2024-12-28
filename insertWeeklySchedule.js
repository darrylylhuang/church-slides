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
    liturgicalDayTitle,
  ] = [
    week.sunday,
    week.gathering,
    week.psalm,
    week.offertory,
    week.communion,
    week.recessional,
    week.gospelVerse.line1,
    week.gospelVerse.line2,
    week.liturgicalDayTitle,
  ];

  let hymns = [gathering, psalm, offertory, communion, recessional];
  [
    gatheringTitle,
    psalmTitle,
    offertoryTitle,
    communionTitle,
    recessionalTitle,
  ] = hymns.map(_getHymnTitles);

  body.replaceText("{date}", `${sunday} - ${liturgicalDayTitle}`);
  body.replaceText("{gathering-title}", gatheringTitle);
  body.replaceText("{psalm-title}", psalmTitle);
  body.replaceText("{offertory-title}", offertoryTitle);
  body.replaceText("{communion-title}", communionTitle);
  body.replaceText("{recessional-title}", recessionalTitle);
  body.replaceText("{line1}", line1);
  body.replaceText("{line2}", line2);

  const storringtonParts = week.storrington;
  storringtonParts.forEach((element) => {
    let name = element.name;
    let value = element.value;
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
        _handleLamb(body, value);
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
  } else {
    title = gatherTitles[key] ? gatherTitles[key] : "";
    if (title === "") GlobalConstants.missingTitles.push(key);
  }

  return title;
}

function _getHymnNumbers(key) {
  if (isNaN(key)) {
    return "(Binder)";
  } else {
    return `(${key})`;
  }
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

function _handleLamb(body, value) {
  const pageTemplate = "{lamb-page}";
  const labelTemplate = "{lamb}";

  if (!value) {
    _removeStorringtonPart(body, "LAMB OF GOD", pageTemplate, labelTemplate);
  } else {
    _insertStorringtonPart(body, pageTemplate, labelTemplate, "31", "");
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
