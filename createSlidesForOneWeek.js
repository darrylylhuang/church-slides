function createSlidesForOneWeek(nextSunday) {
  const gatherPresentationIds = GlobalConstants.gatherPresentationIds;
  const binderPresentationIds = GlobalConstants.binderPresentationIds;

  const addOpeningSlide = function (date, presentation) {
    let openingId = GlobalConstants.openingId;
    let openingPresentation = SlidesApp.openById(openingId);
    let openingSlide = openingPresentation.getSlides()[0];
    let type = "Opening";

    // Find the title
    let openingSlideShapes = openingSlide.getShapes();
    let openingSlideTextboxes = openingSlideShapes.filter(
      (shape) => shape.getShapeType() === SlidesApp.ShapeType.TEXT_BOX
    );

    // Assumes the title is the first textbox
    let titleShape = openingSlideTextboxes[0];

    // Change the title of the opening slide to be the date
    titleShape.getText().setText(formatDate(date));

    Logger.log(`${date}: Copying exisiting slides for ${type}.`);
    copySlide(openingSlide, presentation);
  };

  const addTheJubileePrayer = function (date, presentation) {
    let prayerId = GlobalConstants.jubileePrayerId;
    let prayerPresentation = SlidesApp.openById(prayerId);
    let slides = prayerPresentation.getSlides();
    let type = "The Jubilee Prayer";

    Logger.log(`${date}: Copying exisiting slides for ${type}.`);
    slides.forEach((slide) => copySlide(slide, presentation));
  };

  const editGospelAcclamationVerse = function (gospelSlide, line1, line2) {
    let gospelSlideShapes = gospelSlide.getShapes();
    let gospelSlideTextboxes = gospelSlideShapes.filter(
      (shape) => shape.getShapeType() === SlidesApp.ShapeType.TEXT_BOX
    );

    // Assumes the verse is in the second textbox
    let gospelVerseShape = gospelSlideTextboxes[1];

    // Text to be added to the shape
    let labelText = `Verse\n`;
    let verseText = `${line1}\n${line2}`;

    let textRange = gospelVerseShape.getText();
    textRange.clear();

    // Add the label at font size 30
    textRange.appendText(labelText);
    let label = textRange.getRange(0, labelText.length);
    label.getTextStyle().setFontSize(30);

    // Add the verse at font size 25
    textRange.appendText(verseText);
    let verse = textRange.getRange(
      labelText.length,
      textRange.asString().length
    );

    // No bold or italics
    let verseTextStyle = verse.getTextStyle();
    verseTextStyle.setBold(false);
    verseTextStyle.setItalic(false);
    verseTextStyle.setFontSize(25);

    Logger.log("Successfully updated Gospel Acclamation verse.");
  };

  // HYMNS
  const [
    date,
    gatheringNum,
    psalmNum,
    offertoryNum,
    communionNum,
    recessionalNum,
    gloriaCond,
    gospelCond,
    lentenCond,
    sanctusCond,
    memorialCond,
    amenCond,
    lambCond,
    gospelLine1,
    gospelLine2,
  ] = nextSunday.slice();

  const hymnNumList = [
    gatheringNum,
    psalmNum,
    offertoryNum,
    communionNum,
    recessionalNum,
  ];

  const hymnIdList = hymnNumList.map((key) =>
    isNaN(key) ? binderPresentationIds[key] : gatherPresentationIds[key]
  );

  const [gatheringId, psalmId, offertoryId, communionId, recessionalId] =
    hymnIdList;

  // Array to store the slides to add in a specific order
  let slidesToAdd = [
    { id: gatheringId, type: "Gathering" },
    { id: GlobalConstants.gloriaId, condition: gloriaCond, type: "Gloria" },
    { id: psalmId, type: "Psalm" },
    {
      id: GlobalConstants.gospelId,
      condition: gospelCond,
      type: "Gospel Acclamation",
    },
    {
      id: GlobalConstants.lentenId,
      condition: lentenCond,
      type: "Lenten Gospel Acclamation",
    },
    { id: offertoryId, type: "Offertory" },
    { id: GlobalConstants.sanctusId, condition: sanctusCond, type: "Sanctus" },
    {
      id: GlobalConstants.memorial1Id,
      condition: memorialCond === 1,
      type: "Memorial Acclamation 1",
    },
    {
      id: GlobalConstants.memorial2Id,
      condition: memorialCond === 2,
      type: "Memorial Acclamation 2",
    },
    {
      id: GlobalConstants.memorial3Id,
      condition: memorialCond === 3,
      type: "Memorial Acclamation 3",
    },
    { id: GlobalConstants.amenId, condition: amenCond, type: "Amen" },
    { id: GlobalConstants.lambId, condition: lambCond, type: "Lamb of God" },
    { id: communionId, type: "Communion" },
    { id: recessionalId, type: "Recesional" },
  ];

  // Filter the slides array to remove those that have a false condition
  slidesToAdd = slidesToAdd.filter(
    (slide) => slide.condition === undefined || slide.condition
  );

  // Map the array to extract the IDs
  slidesToAdd = slidesToAdd.map((slide) => ({
    id: slide.id,
    type: slide.type,
  }));

  // Make a new presentation for a single Sunday; needs the date from nextSunday slice
  const newPresentation = createPresentationInFolder(date);
  const currentPresentation = newPresentation;
  currentPresentation.getSlides()[0].remove();

  // Transition slide
  const transitionId = GlobalConstants.transitionId;
  const transitionPresentation = SlidesApp.openById(transitionId);
  const transitionSlide = transitionPresentation.getSlides()[0];

  // Add opening slide before everything else
  addOpeningSlide(date, currentPresentation);
  // Jubilee prayer comes right after the opening hymn
  addTheJubileePrayer(date, currentPresentation);

  // Gosepl Acclamation is a special case where the verse needs to edited
  let typeIsGospel = function (type) {
    return (
      type === "Gospel Acclamation" || type === "Lenten Gospel Acclamation"
    );
  };

  // j will typically be 10 at the end of the iteration since we usually use 6 parts of the mass and 5 hymns
  for (let j = 0; j < slidesToAdd.length; j++) {
    // Find the presentation ID for nextSundayHymnNumber
    let presentationInfo = slidesToAdd[j];
    let presentationType = presentationInfo.type;
    let presentationId = presentationInfo.id ? presentationInfo.id : null;

    if (presentationId) {
      // Open the existing presentation by ID
      Logger.log(`${date}: Copying exisiting slides for ${presentationType}.`);
      var existingPresentation = SlidesApp.openById(presentationId);

      // Get all slides from existingPresentation
      var slides = existingPresentation.getSlides();

      // Edit the verse if this presentation is a Gospel Acclamation type
      if (typeIsGospel(presentationType))
        editGospelAcclamationVerse(slides[0], gospelLine1, gospelLine2);

      // Copy all slides to currentPresentation
      slides.forEach((slide) => copySlide(slide, currentPresentation));

      // Add a transition slide after every slide added
      Logger.log(`${date}: Adding a transition slide at position ${j}.`);
      copySlide(transitionSlide, currentPresentation);
    } else {
      Logger.log(`Missing presentation: ${presentationType}`);
    }
  }
}

function copySlide(sourceSlide, targetPresentation) {
  targetPresentation.appendSlide(sourceSlide);
}
