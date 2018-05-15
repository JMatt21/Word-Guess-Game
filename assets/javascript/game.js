// Constants
const maxGuesses = 13;
const wordList = ["bender bending rodriguez", "fry", "leela", "zoidberg", "amy", "flexo", "slurm", "planet express", "professor farnsworth",
                  "zap brannigan", "new new york", "mom", "nibbler", "hermes", "kif kroker", "charleston chew", "hypno toad",
                  "bite my shiny metal ass", "executive delivery boy", "enslaved by a girrafe", "seymour"];
// const wordList = ["new new new new new york"];

// Variables
var GuessesRemaining = maxGuesses;
var currentWord = [], guessList = [];
var answer = "";

// Variables ID Links
var winsID = document.getElementById("wins");
var currentWordID = document.getElementById("currentWord");
var remainingID = document.getElementById("remaining");
var listID = document.getElementById("list");

// Functions
function generateAnswer() {
    return wordList[Math.floor(Math.random() * wordList.length)];
}

function wordToUnderscore(word) {
    var ret = [];
    for (var i = 0; i < word.length; i++) {
        if (word[i] != " "){
            ret.push("_");
        }
        else {
            ret.push(" ")
        }
    }
    console.log("Current Word: ", ret);
    return ret;
    
}

function updateCurrentWord() {
    currentWordID.textContent = "";
    for (var j = 0; j < currentWord.length; j++) {
        currentWordID.textContent += currentWord[j];
    }
}

function addToList(key) {
    guessList.push(key);
    listID.textContent += key + " ";
    remainingID.textContent = --GuessesRemaining;
}
function revealAnswerLetter(letter) {
    for (var k = 0; k < answer.length; k++) {
        if (answer[k] === letter) {
            currentWord[k] = answer[k];
        }
    }
    updateCurrentWord();
}

// Reseting Functions
function emptyList() {
    guessList = [];
    listID.textContent = "";
}

function resetGuesses() {
    GuessesRemaining = maxGuesses;
    remainingID.textContent = maxGuesses;
}

function resetWord() {
    answer = generateAnswer();
    currentWord = wordToUnderscore(answer);
    updateCurrentWord();
    console.log(currentWord.join(""), answer, currentWord.join("") == answer);
}
function hardReset() {
    emptyList();
    resetGuesses();
    resetWord();
}


//Main Function
document.onkeydown = function () {
    if (event.key >= 'a' && event.key <= 'z') {
        if (!guessList.includes(event.key)) {

            if (answer.includes(event.key)) {
                // addToList(event.key);
                revealAnswerLetter(event.key);
                console.log(currentWord.join(""), answer, currentWord.join("") == answer);

                if (currentWord.join("") == answer) {
                    winsID.textContent++;
                    hardReset();
                }
            }
            else {
                addToList(event.key);
                if (GuessesRemaining == 0) {
                    hardReset();
                }
            }
        }
    }
}

// On Startup
remainingID.textContent = maxGuesses;
answer = generateAnswer();
currentWord = wordToUnderscore(answer);
updateCurrentWord();
console.log(currentWord.join(""), answer, currentWord.join("") == answer);