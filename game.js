var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var hasTheGameStarted = false;
var level = 0;

//Adding Event listener to all the buttons
$(".game-button").click(buttonClicked);

$(".start-button").click(function() {
  if (!hasTheGameStarted) {
    updateHeadlineAccordingToLevel();
    nextSequence();
    $(".start-button").text("Restart");
    hasTheGameStarted = true;
  }
  else
  {
    whenGameIsOver();
  }
})

function nextSequence() {
  // Resting the user pattern for the new round
  userClickedPattern = []
  level++;
  updateHeadlineAccordingToLevel();

  // Genarate a random number between 0 and 3
  var randomNumber = Math.random() * 4;
  randomNumber = Math.floor(randomNumber);
  // The random number defines the color
  var randomChosenColour = buttonColours[randomNumber];
  //Adding the move to our pattarn
  gamePattern.push(randomChosenColour);
  // Use jQuery to select the button with the same id as the randomChosenColour
  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
  // Playing the sound of the button
  playSound(randomChosenColour);


}

function updateHeadlineAccordingToLevel() {
  $("h1").text("Level " + level);
}

function buttonClicked() {
  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);
  // Playing the sound of the button
  playSound(userChosenColour);
  animatePress(userChosenColour);

  checkAnswer(userClickedPattern.length - 1);



}

function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function animatePress(currentColour) {
  $("#" + currentColour).addClass("pressed");
  setTimeout(function() {
    $("#" + currentColour).removeClass("pressed");
  }, 100);
}

function checkAnswer(currentLevel)
{
  //Checking if the last move matches
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel])
   {
    console.log("success");
    if (userClickedPattern.length === gamePattern.length)
     {
      //5. Call nextSequence() after a 1000 millisecond delay.
      setTimeout(function()
      {
        nextSequence();
      }, 1000);
    }
   }
  else
   {
     console.log("wrong");
     playSound("wrong");
     whenGameIsOver();
   }
}

function whenGameIsOver()
{
  $("body").addClass("game-over");
  setTimeout(function() {
    $("body").removeClass("game-over");
  }, 200);
  $("h1").text("For a new game press start");
  startOver();
}
function startOver() {
  level = 0;
  $(".start-button").text("Start");
  hasTheGameStarted = false;
  gamePattern = [];
}
