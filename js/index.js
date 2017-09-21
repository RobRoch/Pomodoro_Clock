$(document).ready(function () {
  var breakValue = $(".break__adjust-value").text();
  var sessionValue = $(".session__adjust-value").text();
  var seriesValue = $(".series__adjust-value").text();

  //substract/add buttons logic.
  $(".break__adjust-minus").click(function () {
    if (breakValue != 1) {
      breakValue--;
    }
    $(".break__adjust-value").text(breakValue);
  });

  $(".break__adjust-plus").click(function () {
    if (breakValue != 5) {
      breakValue++;
    }
    $(".break__adjust-value").text(breakValue);
  });

  $(".session__adjust-minus").click(function () {
    if (sessionValue != 1) {
      sessionValue--;
    }
    $(".session__adjust-value").text(sessionValue);
  });

  $(".session__adjust-plus").click(function () {
    if (sessionValue != 25) {
      sessionValue++;
    }
    $(".session__adjust-value").text(sessionValue);
  });

  $(".series__adjust-minus").click(function () {
    if (seriesValue != 1) {
      seriesValue--;
    }
    $(".series__adjust-value").text(seriesValue);
  });

  $(".series__adjust-plus").click(function () {
    if (seriesValue != 25) {
      seriesValue++;
    }
    $(".series__adjust-value").text(seriesValue);
  });

  var value = 1;
  var isOn = false;
  var isBreak = false;
  var seriesCountDown;

  //start timer
  $(".timer__container").click(function () {
    //timer interval, used later, made it out of scope.
    var timer;
    seriesCountDown = seriesValue * 2 - 1;

    //clearInterval out of scope and set value again to 1.
    var clear = function (timer) {
      clearInterval(timer);
      value = 1;
    };

    //start counting function.
    var start = function () {
      //assigning break time or session time to val.
      var val;
      isBreak ? val = breakValue : val = sessionValue;
      //counting time elapsed.
      var difference = val * 60 - value;
      value++;
      var minutes = Math.floor(difference / 60);
      var seconds = difference % 60;

      $(".timer__container-text").text(
        minutes + ":" + ("0" + seconds).slice(-2)
      );

      //if time 0 toggles new break or session.
      if (difference === 0) {
        isBreak ? (isBreak = false) : (isBreak = true);
        clear(timer);
        new Audio("http://soundbible.com/mp3/Rooster Crowing-SoundBible.com-43612401.mp3").play();
        if (seriesCountDown > 0) {
          timer = setInterval(start, 1000);
          seriesCountDown -= 1;
        }
      }
    };

    //start timer interval, prevent double fire.
    if (!isOn) {
      timer = setInterval(start, 1000);
      isOn = true;
      seriesCountDown--;
    }

    //stop timer, write messages.
    $(".timer__stop").click(function () {
      clear(timer);
      isOn = false;
      isBreak = false;
      $(".timer__container-text").css("color", "red");
      $(".timer__container-text").text("Stop");
      setTimeout(function () {
        $(".timer__container-text").css("color", "#E2DDDD");
        $(".timer__container-text").text("Start");
      }, 2000);
    });
  });
});