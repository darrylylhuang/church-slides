function createSlidesForOneWeek(nextSunday) {
  const gatherPresentationIds = GlobalConstants.gatherPresentationIds;
  const binderPresentationIds = GlobalConstants.binderPresentationIds;

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
  ] = nextSunday.slice();

  const hymnNumList = [
    gatheringNum,
    psalmNum,
    offertoryNum,
    communionNum,
    recessionalNum,
  ];

  const hymnIdList = hymnNumList.map((key) =>
    Number.isNaN(key) ? binderPresentationIds[key] : gatherPresentationIds[key]
  );

  const [gatheringId, psalmId, offertoryId, communionId, recessionalId] =
    hymnIdList;

  // **************************************************** SLIDE ORDER ****************************************************
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

  // needs the date from nextSunday slice
  var newPresentation = createPresentationInFolder(date);
  var presentation = newPresentation;
  presentation.getSlides()[0].remove();

  // Transition slide
  var transitionId = GlobalConstants.transitionId;
  var transitionPresentation = SlidesApp.openById(transitionId);
  var transitionSlide = transitionPresentation.getSlides()[0];

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
      // Duplicate and append slides from existingPresentation to currentPresentation
      var slides = existingPresentation.getSlides();
      slides.forEach((slide) => copySlide(slide, presentation));

      // Add a transition slide after every slide added
      Logger.log(`${date}: Adding a transition slide at position ${j}.`);
      presentation.appendSlide(transitionSlide);
    } else {
      Logger.log(`Missing presentation: ${presentationType}`);
    }
  }
}

function copySlide(sourceSlide, targetPresentation) {
  targetPresentation.appendSlide(sourceSlide);
}
