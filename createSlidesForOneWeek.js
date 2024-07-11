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
    { id: gatheringId },
    { id: GlobalConstants.gloriaId, condition: gloriaCond },
    { id: psalmId },
    { id: GlobalConstants.gospelId, condition: gospelCond },
    { id: GlobalConstants.lentenId, condition: lentenCond },
    { id: offertoryId },
    { id: GlobalConstants.sanctusId, condition: sanctusCond },
    { id: GlobalConstants.memorial1Id, condition: memorialCond === 1 },
    { id: GlobalConstants.memorial2Id, condition: memorialCond === 2 },
    { id: GlobalConstants.memorial3Id, condition: memorialCond === 3 },
    { id: GlobalConstants.amenId, condition: amenCond },
    { id: GlobalConstants.lambId, condition: lambCond },
    { id: communionId },
    { id: recessionalId },
  ];

  // Filter the slides array to remove those that have a false condition
  slidesToAdd = slidesToAdd.filter(
    (slide) => slide.condition === undefined || slide.condition
  );

  // Map the array to extract the IDs
  slidesToAdd = slidesToAdd.map((slide) => slide.id);

  // needs the date from nextSunday slice
  var newPresentation = createPresentationInFolder(date);
  var presentation = newPresentation;
  presentation.getSlides()[0].remove();

  var presentationId = null;

  // Transition slide
  var transitionId = GlobalConstants.transitionId;
  var transitionPresentation = SlidesApp.openById(transitionId);
  var transitionSlide = transitionPresentation.getSlides()[0];

  // j will typically be 10 at the end of the iteration since we usually use 6 parts of the mass and 5 hymns
  for (let j = 0; j < slidesToAdd.length; j++) {
    // Find the presentation ID for nextSundayHymnNumber
    presentationId = slidesToAdd[j] ? slidesToAdd[j] : null;

    if (presentationId) {
      // Open the existing presentation by ID
      Logger.log(`${j}: Copying exisiting slides for ${date}.`);
      var existingPresentation = SlidesApp.openById(presentationId);
      // Duplicate and append slides from existingPresentation to currentPresentation
      var slides = existingPresentation.getSlides();
      slides.forEach((slide) => copySlide(slide, presentation));

      // Add a transition slide after every slide added
      Logger.log(`${j}: Adding a transition slide for ${date}.`);
      presentation.appendSlide(transitionSlide);
    } else {
      Logger.log(`Missing presentation: ${j}`);
    }
  }
}

function copySlide(sourceSlide, targetPresentation) {
  targetPresentation.appendSlide(sourceSlide);
}
