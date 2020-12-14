// ---------------------------
// 1. Game setup
// ---------------------------

// constants
const DEFAULT_IMAGE = "001-face.png"
const POSSIBLE_WORDS = ["TORONTO", "PARIS", "ROME", "MISSISSIPPI"]; // @NOTE: your game must work for any size array!
const MAX_CHANCES = 6

// game variables
let chancesRemaining = MAX_CHANCES;
let selectedWord = ""; 
let dash = new Array();
let count = 0;
let game = [];

const restartGame = function() {
  // 1. reset game logic variables
  chancesRemaining = MAX_CHANCES;
  selectedWord = "";
  count = 0;
  
  // 2. reset letter divs UI
  let letterDivs = document.querySelectorAll("div.letter.already-selected");
  for (let i = 0; i < letterDivs.length; i++) {
    let elem = letterDivs[i];
    elem.classList.remove("already-selected");
  }

  
  document.querySelector("#results").style.backgroundColor= "#ffffff"

  // 3. Reset images
  document.getElementById("img-hangperson-status").src = "img/" + DEFAULT_IMAGE;

  // 4. Reset chances remaining label
  document.querySelector(".chancesLabel").innerText = MAX_CHANCES;

  // 5. Reset messages labels
  let resultsLabel = document.querySelector("#results");
  resultsLabel.innerText = "";
  resultsLabel.classList.remove("highlight");

  // 6. Reset  _ _ _ ui
  document.querySelector("#word").innerText = "";
}

const saveGame = function() {
  alert("SAVING THE GAME!");
  console.log("Save Game button pressed");

  // @TODO: Write the code to save the game to local storage
  // - save the selected word
   localStorage.setItem("Selected Word", selectedWord)
  // - save the number of chances remaining
  localStorage.setItem("chances Remaining", chancesRemaining)
  // You must put these details into a Javascript object, then save it to local storage.

  let score = {"Selected Word": selectedWord, "chances remaining": chancesRemaining}
  game.push(score)
  localStorage.setItem("Game", JSON.stringify(game))
}

const startGame = function(event) {
  alert("game start");
  console.log("game start");

  // 1. @TODO: When player starts the game, you should reset all the UI and game logic variables.
  restartGame();
  
  // 2. @TODO: select a word
  selectedWord = chooseRandomWord();  //@TODO: You will need to update this function to actually pick a random word.
  console.log("Selected word is : "+selectedWord)
  // 3. @TODO: display the word as _ in the UI
  let len = selectedWord.length

  //@TODO: update this to dynamically show the dashes _ _ _ _
  console.log("The selected word length is : " +len)
  
  dash.length = len
  dash.fill("_")
  document.querySelector("#word").innerText = dash;     
  
  // @DEBUG: for debugging purposes, show the actual word in the ui 
  document.querySelector("#debug-actual-word").innerText = "DEBUG: Selected word is: " +selectedWord;
  
}

// Function should return a random word
const chooseRandomWord = function() {
  // @TODO: Write the code to randomly select a word from the word bank
  let randomWordbank = ["TORONTO","PARIS","LONDON","MISSISSIPPI"];
  let l = randomWordbank.length
  randomWord = randomWordbank[Math.floor(Math.random()*l)]
  return randomWord;
}

// Helper function to handle game over
// @param didPlayerWin   boolean variable that indicates if the player wins or loses
const doGameOver = function(didPlayerWin) {
  console.log("Game Over")
  // -----------------------------------------------
  // 1. UI: disable all buttons
  // -----------------------------------------------
  // 1a. get all <div class="letter"> elements.
  let letters = document.querySelectorAll("div.letter");
  

  // 1b. For each element, disable the button by adding the .already-selected CSS selector
  for (let i = 0; i < letters.length; i++) {
    let elem = letters[i];
    elem.classList.add("already-selected");
  }
  // -----------------------------------------------
  // 2. @TODO: LOGIC: display a message in the results label
  // -----------------------------------------------
  // The message should change depending on whether the person won or lost the game
  let resultsLabel = document.querySelector("#results");
  if (didPlayerWin === true) {
    // set the resultsLabel to show a winning message
    // add yellow highlighting to the label (see the .highlight CSS style in styles.css)
    document.querySelector("#results").innerText = "Congragulations!!Game over .. you won the game"
    document.querySelector("#results").style.backgroundColor= "yellow"
  }
  else if (didPlayerWin === false) {
    // set the resultsLabel to show a losing message
    // add yellow highlighting to the label (see the .highlight CSS style in styles.css)
    document.querySelector("#results").innerText = "Sorry !!Game Over.... your lose the game"
    document.querySelector("#results").style.backgroundColor= "red"
  }
  
}


const letterPressed = function(event) {
  let img_no = 7
  // get the specific element on the page that the user pressed
  const pushedElement = event.target

  // if the person did NOT press a <div class="letter"> item, then ignore the click and move on
  if (pushedElement.classList.contains("letter") === false) {
    console.log("Ignoring your click. Reason: you didn't click on a <div class='letter'> element")
    return;
  }

  // if the person DID click a <div class="letter"> element, check to see if is a letter they already selected
  if (pushedElement.classList.contains("already-selected")) {
    console.log("You already selected this letter!");
    return;
  }

  // -----------------------------------
  // @TODO: At this point, you have a valid "click". Therefore, start writing your game logic here!
  
  let alphabet  =  pushedElement.innerText

  for(let j = 0; j < randomWord.length; j++)
  {
    if(alphabet == randomWord[j])
    {
       dash[j] = alphabet 
    }
  }
  document.querySelector("#word").innerText = dash
  // -----------------------------------

  // 1. UI: Visually "disable" the <div class="letter"> element that the person clicked on
  pushedElement.classList.add("already-selected");

  // 2. @TODO: LOGIC: Get the letter they clicked on
  let letter = pushedElement.innerText;
  console.log("You clicked on: " + letter);
  document.querySelector("#results").innerText = "You clicked on: " + letter;   // @TODO This should be replaced with a "correct!" or "incorrect!" message. See below.

  // 3. @TODO: LOGIC: If letter is in the word, then:
  //    - output "letter correct!" message
  //    - update the UI so it shows the letter in the correct position of the word
  //    - check if the game is over 
   chancesRemaining = parseInt(document.querySelector(".chancesLabel").innerText)
   
   img_no = img_no - chancesRemaining
  
   document.getElementById("img-hangperson-status").src = "img/" +"00"+ img_no+"-face.png"


    if (randomWord.includes(alphabet)){
      console.log("letter correct!" + alphabet)
    }
    else
    {
      console.log("letter wrong!" + alphabet )
      chancesRemaining -=1
    }

    document.querySelector(".chancesLabel").innerText = chancesRemaining

    for (i=0; i<randomWord.length;i++)
    {
      if (alphabet == randomWord[i])
      {
        count +=1
      }
    }

    if (chancesRemaining > 0 && count == randomWord.length)
    {
      doGameOver(true)
    }
    else if (chancesRemaining == 0)
    {
      document.getElementById("img-hangperson-status").src = "img/" +"00"+7+"-face.png"
      doGameOver(false)
    }

    
  // 4. @TODO: LOGIC: If letter is NOT in word, then:
  //    - output "letter wrong!" message
  //    - update chancesRemaining variable
  //    - update hangperson image
  //    - check if game is over
}

// -------------------
// EVENT LISTENERES
// -------------------

// start button: when clicked, start a new game
document.querySelector(".btn-start-game").addEventListener("click", startGame);

// save button: when clicked, save game to local storage
document.querySelector(".btn-save-game").addEventListener("click", saveGame);

// Letter buttons: detect when person clicks anywhere inside the <div class="letter-bank"> element
// See comments inside letterPressed() function for documentation on how this works
document.querySelector(".letter-bank").addEventListener("click", letterPressed);