belts = ["white", "orange", "blue", "yellow", "green", "brown", "dan1", "dan2", "dan3"]

$( document ).ready(function() {
  var slider = $( "#slider" );
  slider.slider({
    range: true,
    min: 0,
    max: 8,
    step: 1,
    values: [ 0, 8 ]
  });

  var handles = document.getElementsByClassName("ui-slider-handle");
  var handleFrom = handles[0];
  var handleTo = handles[1];

  handleFrom.classList.add("white");
  handleTo.classList.add("orange");

  $(".ui-slider-handle").on('move', function(e) {
    $.each(belts, function (index, value) {
      e.target.classList.remove(value);
    });
    
    var handleIndex = 0;
    
    if (e.target == handleTo)
      handleIndex = 1;

    var beltIndex = slider.slider("values", handleIndex);
    e.target.classList.add(belts[beltIndex]);
  })
});