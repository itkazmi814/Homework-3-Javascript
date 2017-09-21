


    //Displayed in the HTML
    var startFlag = false;

    var targetWordElem
    var userInputElem
    var sendMessageElem
    var failedGuessesElem
    var livesElem
    var numWinsElem
    var numLossesElem

    var numWins = 0;
    var numLosses = 0;
    var lives = 10;
    var userInput = "";
    var failedGuesses = [];
    var possibleWords = ["apple","apricot","avocado","banana","bilberry","blackberry","blackcurrent","blueberry","boysenberry","currant","cherry","cherimoya","cloudberry","coconut","elderberry","goodberry","durian","dragonfruit","goergegoobeise","gooseberry","fig","grape","guava","mangosteen","kumquat","kiwifruit","kiwano","jujube","mulberry","nectarine","pomegranate","soursop"];
    var targetWord = [];
    var chosenWord = "";
    var alphabet = ["a","b","c","d","e","f","g",
    "h","i","j","k","l","m","n",
    "o","p","q","r","s","t","u",
    "v","w","x","y","z"];


    var html = 
    "<h3> <strong>Let's Eat Some Fruit!</strong> </p>" +
    "<h4> <span id='target-word'>none</span></h4>" +
    "<p> <span id='send-message'></span></p>" +
    "<p> Last Letter Pressed: <span id='user-input'>none</span></p>" + 
    "<p> Letters Guessed: <span id='fail-guesses'>none</span></p>" + 
    "<p> Lives : <span id='remaining-lives'>none</span></p>" +
    "<p> Wins: <span id='num-wins'>0</span></p>" + 
    "<p> Losses: <span id='num-losses'>0</span></p>" ;

    game = {
      randomlyChooseWord: function () {
    //randomly chooses a word to be targetWord  
    console.log("**Entering function randomlyChooseWord**");
    chosenWord = possibleWords[Math.floor(Math.random()*possibleWords.length)]  
    console.log("Setting random chosenWord to: " + chosenWord);
    console.log("Exiting function randomlyChooseWord");
    console.log("-------------------------------");
}, //end randomlyChosenWord

createBlankTargetWord: function () {
    //populates targetWord to have the proper number of underscores
    console.log("**Entering function createBlankWord**");
    
    for(var i = 0; i < chosenWord.length; i++){
      targetWord.push(" __"); //creates the blank array
    } 

    console.log("Setting targetWord to: " + targetWord);
    targetWordElem.innerText = targetWord.join(" "); //pushes the blank array to HTML
    
    console.log("Exiting function createBlankWord");
    console.log("-------------------------------");
  }, // end createBlankTargetWord

  isInArray: function (input,array) {
    //Validation - returns true if input exists in the Array
    if (array.indexOf(input) > -1)  {
      return true;
    }else{
      return false;
    }  
  }, //end isInArray 

  replaceUnderscore: function () {
  //populates targetWord with the user input
  console.log("**Entering function replaceUnderscore**");

  for (var j = 0; j < chosenWord.length; j++){ 
    if(chosenWord[j] === userInput){
     targetWord[j] = userInput;
     targetWordElem.innerText = targetWord.join(" ");
     console.log("targetWord updated to: " + targetWord);
   }
    } // end for loop j

    console.log("Exiting function replaceUnderscore");
    console.log("-------------------------------");
  }, //end function replaceUnderscore

  addToFailedGuesses: function (input) {
    console.log("**Entering function addToFailedGuesses**");

    failedGuesses.push(input);
    console.log("Adding to failedGuesses: " + failedGuesses);
    
    lives--;    
    console.log("Reducing lives to: " + lives);
    
    livesElem.innerText = lives;
    failedGuessesElem.innerText = failedGuesses.join(", ");
    
    console.log("Exiting function addToFailedGuesses");
    console.log("-------------------------------");
  }, //end function addToFailedGuesses

  checkForWin: function () {
    if(chosenWord === targetWord.join("")) { //checks if you have solved the puzzle
        this.gameResult(true); // reset and win game code here
      } else if (lives === 0){
        this.gameResult(false); // reset and lose game code here
      } 
  }, //end function check

  sendMessage: function (string) {
    sendMessageElem.innerText = string; 
  },

  gameResult: function (boolean) {
    console.log("**Entering function gameReset**");

    if (boolean) {
      console.log("Game has been won");
      numWins++;
      numWinsElem.innerText = numWins; 
      this.sendMessage("You correctly guessed the fruit!");
      console.log("Wins: " + numWins);
    } else { 
      console.log("Game has been lost");
      numLosses++;
      numLossesElem.innerText = numLosses;
      this.sendMessage("You lose :( Your word was " + chosenWord);
      
    }

    this.resetPage();

    console.log("Exiting function gameReset");
    console.log("-------------------------------");
    console.log("##### GAME HAS BEEN RESET #####");

  }, // end function gameResult

  validateKeyPress: function (input) {
    console.log("******* User pressed a button *******");
    
    if(this.isInArray(input,alphabet) === true){
      this.sendMessage("Keep guessing!");
      console.log("ENTERED A LETTER")
      userInputElem.innerText = userInput;
      console.log("New userInput: " + userInput);
    }else{
      this.sendMessage("You did not enter a letter.");
      console.log("DID NOT ENTER A LETTER")
      return false;
    }
    
  }, //end function validateKeyPress

  initializeGame: function (event) {
    targetWordElem = document.getElementById("target-word")
    userInputElem = document.getElementById("user-input");
    sendMessageElem = document.getElementById("send-message");
    failedGuessesElem = document.getElementById("fail-guesses");
    livesElem = document.getElementById("remaining-lives");
    numWinsElem = document.getElementById("num-wins");
    numLossesElem = document.getElementById("num-losses");

    this.resetPage();
    document.onkeyup = guessLetter;
  },

  resetPage: function ()  {
    console.log("**Entering function resetPage**");

    targetWord = [];
    this.randomlyChooseWord();
    this.createBlankTargetWord();
    
    lives = 10;
    livesElem.innerText = lives;

    failedGuesses = [];
    failedGuessesElem.innerText = failedGuesses;

    userInputElem.innerText = "Press a letter to guess the fruit!";

    console.log("Exiting function resetPage");
    console.log("-------------------------------");
  } // end function resetPage

} //End Game Object


//Do this when a user presses a key
function guessLetter (event) {

  userInput = event.key.toLowerCase();

  if(game.validateKeyPress(userInput) === false){
    return; //ends the function if you did not enter a letter
  }

  //validation - checks if userInput is in chosenWord
  if(game.isInArray(userInput,chosenWord) === true) {
    //run if the userInput is the chosenWord
    game.replaceUnderscore();
    //if so, reveal the letter
  } 
  else if (game.isInArray(userInput,failedGuesses) === true){
      //check if the userInput has already been incorrectly guessed
      game.sendMessage("You already tried that letter.");
    } 
    else { 
    //add the letter to failedGuesses
    game.addToFailedGuesses(userInput);   
    game.sendMessage("That letter is not in the fruit!")    
  } 

  game.checkForWin();
  // console.log("Current status of the game: ")
  // console.log("chosenWord: " +chosenWord);
  // console.log("targetWord: " + targetWord.join(""));

} //end function guessLetter

document.onkeyup = function(event) {
  if(startFlag === false && event.key === "\u0020" ){
    document.getElementById("game").innerHTML = html;
    startFlag = true;
  }    
  game.initializeGame();
}
















    // document.querySelector("#game").innerHTML = html;




    // <p> <strong> Target Word: </strong><span id="target-word">none</span></p>
    // <p> <span id="send-message">test</span>
    // <p> <strong> User Input: </strong><span id="user-input">none</span></p>
    // <p> <strong> Failed Guesses: </strong><span id="fail-guesses">none</span></p> 
    // <p> <strong> Lives Remaining: </strong><span id="remaining-lives">none</span></p>
    // <p> <strong> Wins: </strong><span id="num-wins">0</span></p>
    // <p> <strong> Losses: </strong><span id="num-losses">0</span></p>


    