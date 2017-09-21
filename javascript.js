


    //Displayed in the HTML
var startFlag = false;

var html = 
    "<p> Target Word: <span id='target-word'>none</span></p>" +
    "<p> <span id='send-message'>test</span></p>" +
    "<p> User Input: <span id='user-input'>none</span></p>" + 
    "<p> Failed Guesses: <span id='fail-guesses'>none</span></p>" + 
    "<p> Lives Remaining: <span id='remaining-lives'>none</span></p>" +
    "<p> Wins: <span id='num-wins'>0</span></p>" + 
    "<p> Losses: <span id='num-losses'></span></p>" ;


var targetWordElem
var userInputElem
var sendMessageElem
var failedGuessesElem
var livesElem
var numWinsElem
var numLossesElem




var numWins = 0;
var numLosses = 0;
var lives = 5;
var userInput = "";
var failedGuesses = [];
var possibleWords = ["apple","banana","pear"];
var targetWord = [];
var chosenWord = "";
var alphabet = ["a","b","c","d","e","f","g",
                "h","i","j","k","l","m","n",
                "o","p","q","r","s","t","u",
                "v","w","x","y","z"];


function randomlyChooseWord ()  {
  //randomly chooses a word to be targetWord  
  console.log("**Entering function randomlyChooseWord**");
  chosenWord = possibleWords[Math.floor(Math.random()*possibleWords.length)]  
  console.log("Setting random chosenWord to: " + chosenWord);
  console.log("Exiting function randomlyChooseWord");
  console.log("-------------------------------");
} //end randomlyChosenWord


function createBlankTargetWord () {
  //populates targetWord to have the proper number of underscores
  console.log("**Entering function createBlankWord**");
  
  for(var i = 0; i < chosenWord.length; i++){
    targetWord.push(" __"); //creates the blank array
  } 

  console.log("Setting targetWord to: " + targetWord);
  targetWordElem.innerText = targetWord.join(" "); //pushes the blank array to HTML
  
  console.log("Exiting function createBlankWord");
  console.log("-------------------------------");
} // end createBlankTargetWord
    
function isInArray (input,array) {
  //Validation - returns true if input exists in the Array
  if (array.indexOf(input) > -1)  {
    return true;
  }else{
    return false;
  }
} //end isInChosen Word

function replaceUnderscore() {
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
} //end function replaceUnderscore

function addToFailedGuesses (input) {
  console.log("**Entering function addToFailedGuesses**");

  failedGuesses.push(input);
  console.log("Adding to failedGuesses: " + failedGuesses);
  
  lives--;    
  console.log("Reducing lives to: " + lives);
  
  livesElem.innerText = lives;
  failedGuessesElem.innerText = failedGuesses.join(", ");
  
  console.log("Exiting function addToFailedGuesses");
  console.log("-------------------------------");
}

function gameResult (boolean) {
  console.log("**Entering function gameReset**");

  if (boolean) {
    console.log("Game has been won");
    numWins++;
    numWinsElem.innerText = numWins; 
    sendMessage("You correctly guessed the word!");
    console.log("Wins: " + numWins);
  } else { 
    console.log("Game has been lost");
    numLosses++;
    numLossesElem.innerText = numLosses;
    sendMessage("You lose :(");
    
  }

  resetPage();

  console.log("Exiting function gameReset");
  console.log("-------------------------------");
  console.log("##### GAME HAS BEEN RESET #####");

} // end function gameReset



function checkForWin () {
  if(chosenWord === targetWord.join("")) { //checks if you have solved the puzzle
      gameResult(true); // reset and win game code here
    } else if (lives === 0){
          gameResult(false); // reset and lose game code here
    } 
}

function sendMessage(string) {
  sendMessageElem.innerText = string; 
}

function validateKeyPress (input) {
  console.log("******* User pressed a button *******");
  
  if(isInArray(input,alphabet) === true){
    sendMessage("Keep guessing!");
    console.log("ENTERED A LETTER")
    userInputElem.innerText = userInput;
    console.log("New userInput: " + userInput);
  }else{
    sendMessage("You did not enter a letter.");
    console.log("DID NOT ENTER A LETTER")
    return false;
  }
  
}




  //Do this when a user presses a key
function guessLetter (event) {

  // if(startFlag === true){
  //   document.getElementById("game").innerText = html;
  // }

  userInput = event.key.toLowerCase();

  if(validateKeyPress(userInput) === false){
    return; //ends the function if you did not enter a letter
  }

  //validation - checks if userInput is in chosenWord
  if(isInArray(userInput,chosenWord) === true) {
    //run if the userInput is the chosenWord
    replaceUnderscore();
    //if so, reveal the letter
  } 
  else if (isInArray(userInput,failedGuesses) === true){
      //check if the userInput has already been incorrectly guessed
      sendMessage("You already tried that letter.");
    } 
  else { 
    //add the letter to failedGuesses
    addToFailedGuesses(userInput);   
    sendMessage("That letter is not in the word!")    
    } 

  checkForWin();
  // console.log("Current status of the game: ")
  // console.log("chosenWord: " +chosenWord);
  // console.log("targetWord: " + targetWord.join(""));

  
} //end function guessLetter


function initializeGame (event) {

    


  targetWordElem = document.getElementById("target-word")
  userInputElem = document.getElementById("user-input");
  sendMessageElem = document.getElementById("send-message");
  failedGuessesElem = document.getElementById("fail-guesses");
  livesElem = document.getElementById("remaining-lives");
  numWinsElem = document.getElementById("num-wins");
  numLossesElem = document.getElementById("num-losses");


  resetPage();
  document.onkeyup = guessLetter;
}

function resetPage ()  {
  console.log("**Entering function resetPage**");

  targetWord = [];
  randomlyChooseWord();
  createBlankTargetWord();
  
  lives = 5;
  livesElem.innerText = lives;

  failedGuesses = [];
  failedGuessesElem.innerText = failedGuesses;

  userInputElem.innerText = "Press a letter to guess the word!";

  console.log("Exiting function resetPage");
  console.log("-------------------------------");
} // end function resetPage

  document.onkeyup = function() {
    if(startFlag === false){
      document.getElementById("game").innerHTML = html;
      startFlag = true;
    }    
    
    initializeGame();
  }





    
 





    // document.querySelector("#game").innerHTML = html;

   


    // <p> <strong> Target Word: </strong><span id="target-word">none</span></p>
    // <p> <span id="send-message">test</span>
    // <p> <strong> User Input: </strong><span id="user-input">none</span></p>
    // <p> <strong> Failed Guesses: </strong><span id="fail-guesses">none</span></p> 
    // <p> <strong> Lives Remaining: </strong><span id="remaining-lives">none</span></p>
    // <p> <strong> Wins: </strong><span id="num-wins">0</span></p>
    // <p> <strong> Losses: </strong><span id="num-losses">0</span></p>


    