belts = ["white", "orange", "blue", "yellow", "green", "brown", "dan1", "dan2", "dan3"]

allKatas = [
  // white
  [
    {name: "Taykyoku Sono Ichi"},
    {name: "Taykyoku Sono Ni"},
    {name: "Sokugi Taykyoku Sono Ichi"},
  ],
  // orange
  [
    {name: "Taykyoku Sono San"},
    {name: "Sokugi Taykyoku Sono Ni"},
    {name: "Sokugi Taykyoku Sono San"},
  ],
  // blue
  [
    {name: "Pinan Sono Ichi"},
    {name: "Pinan Sono Ni"},
    {name: "Sanchin"},
  ],
  // yellow
  [
    {name: "Pinan Sono San"},
    {name: "Pinan Sono Yon"},
    {name: "Yantsu"},
    {name: "Tsukino"},
  ],
  // green
  [
    {name: "Pinan Sono Go"},
    {name: "Taykyoku Sono Inchi Ura"},
    {name: "Taykyoku Sono Ni Ura"},
    {name: "Taykyoku Sono San Ura"},
    {name: "Gekisai Dai"},
    {name: "Teki Sono Ichi"},
  ],
  // brown
  [
    {name: "Pinan Sono Ichi Ura"},
    {name: "Pinan Sono Ni Ura"},
    {name: "Pinan Sono San Ura"},
    {name: "Pinan Sono Yon Ura"},
    {name: "Pinan Sono Go Ura"},
    {name: "Tensho"},
    {name: "Saiha"},
    {name: "Gekisai Sho"},
    {name: "Teki Sono Ni"},
  ],
  // dan 1
  [
    {name: "Seienchin"},
    {name: "Garyu"},
    {name: "Basai Dai"},
    {name: "Teki Sono San"},
  ],
  // dan 2
  [
    {name: "Sepai"},
  ],
  // dan 3
  [
    {name: "Kanku"},
    {name: "Sushiho"},
  ],
];

$( document ).ready(function() {
  handleFromValue = storageLoad("fromKata", 1);
  handleToValue = storageLoad("toKata", 90);

  var slider = $( "#slider" );

  slider.slider({
    // init belts slider for 9 belts, each belt gets a length of 10
    range: true,
    min: 1,
    max: 90,
    step: 1,
    values: [ handleFromValue, handleToValue ],

    // slide event - when one of the handles is moved
    slide: function( event, ui ) {
      // make sure the handles are not to close to each other
      if (Math.abs(ui.values[0] - ui.values[1]) < 5) {
        event.preventDefault();
        return;
      }

      // remove previous belt class
      $.each(belts, function (index, value) {
        $(ui.handle).removeClass(value);
      });

      // set the belt class
      var belt = handleToBelt(ui.value);
      $(ui.handle).addClass(belt);

      // save to  storage
      storageSave("fromKata", ui.values[0]);
      storageSave("toKata", ui.values[1]);
    }
  });

  // set initial class for handles (white and dan3)
  var handles = document.getElementsByClassName("ui-slider-handle");
  handleFrom = $(handles[0]);
  handleTo = $(handles[1]);
  handleFrom.addClass(handleToBelt(handleFromValue));
  handleTo.addClass(handleToBelt(handleToValue));

  // elements
  resultElement = $("#result");
});

// find which belt is represented by the handle location
function handleToBelt(handleValue) {
  var beltIndex = Math.ceil(handleValue / 10) - 1;
  return belts[beltIndex]
}

function start() {
  // get the range of wanted Katas between the 2 belts on the slide.
  // don't use the handle locations, it might not represent the colors of the belt (in some cases the event.preventDefault will not move the handle, but the value of the handle is calculated by the location of the mouse and so the color of the belt will be out of proportions to it's location. you can reproduce this by moving the handle really fast).
  // instead, use the colors that the user sees so there is no surprise for the user.
  var fromBelt, toBelt = 0;

  $.each(belts, function (index, value) {
    if (handleFrom.hasClass(value))
      fromBelt = index;
    if (handleTo.hasClass(value))
      toBelt = index;
  });

  // create a list of Katas in range
  var katas = [];

  for (belt = fromBelt; belt <= toBelt; belt++) {
    for (i = 0; i < allKatas[belt].length; i++ )
    katas.push({belt: belts[belt], kata: allKatas[belt][i]});
  }

  var rnd = Math.floor(Math.random() * katas.length)
  var selected = katas[rnd];
  var kata = selected.kata;
  var belt = selected.belt;

  resultElement.empty();
  resultElement.append("<label type='button' style='height:26px;width:54px' class='" + belt + "'></label><br/>")
  resultElement.append("<label>" + kata.name + "</label><br/>")
}