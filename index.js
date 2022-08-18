$(document).on("keydown", game);
var playList = [];
var level = 0;
var levelList = [];

function game() {
  randomChoice(playList);
  $('button').off('click');
  var num = 0;
  playThrowList(playList, num, level);
  check(playList);
}


function playSounds(text) {
  var sound = new Audio("sounds/simon" + text + ".mp3");
  sound.play();
}


function animation(letter) {
  $("." + letter).addClass("press");
  setTimeout(function() {
    $("." + letter).removeClass("press");
  }, 200);
}


function randomChoice(carList) {
  var classList = ["a", "s", "d", "f"];
  var choice = classList[Math.floor(Math.random() * classList.length)];
  carList.push(choice);
}


function check(chosenList) {

  var i = 0;

  $("button").on("click", function() {
    var choiceLetter = this.innerHTML;
    playSounds(choiceLetter);
    animation(choiceLetter);
    if (choiceLetter !== chosenList[i]) {
      $('button').off('click');
      var header = $("h1");
      header.text("Game Over Press A Key To Restart");
      header.css("font-size", "2.5rem");
      $("p").remove();
      $("body").fadeOut("fast").fadeIn("fast");
      levelList.push(level);
      var maxLevel = Math.max(...levelList);
      header.after("<p>Score : " + maxLevel + " </p>");
      playList = [];
      level = 0;
      return header.css("font-size", "2.3rem");

    }
    i++;
    if (i == chosenList.length) {
      level++;
      $("h1").text("Level " + level);
      setTimeout(function() {
        game()
      }, 500);
    }

  })
}


function playThrowList(songList, i) {
  setTimeout(function() {
    playSounds(songList[i]);
    animation(songList[i]);
    i++;
  }, 1000 - (level * 60));

  if (i < songList.length) {
    setTimeout(function() {
      playThrowList(songList, i);

    }, 1000 - (level * 60));
  }
}