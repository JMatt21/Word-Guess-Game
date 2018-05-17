// Constants
const maxGuesses = 13;
const wordList = ["bender bending rodriguez", "fry", "leela", "zoidberg", "amy", "flexo", "slurm", "planet express", "professor farnsworth",
                  "zap brannigan", "new new york", "mom", "nibbler", "hermes", "kif kroker", "hypno toad",
                  "bite my shiny metal ass", "enslaved by a girrafe", "seymour"];

// Variables
var GuessesRemaining = maxGuesses;
var currentWord = [], guessList = [];
var answer = "";

// Variables ID Links
var winsID = document.getElementById("wins");
var currentWordID = document.getElementById("currentWord");
var remainingID = document.getElementById("remaining");
var listID = document.getElementById("list");
var leftTextID = document.getElementById("leftText");
var imageID = document.getElementById("image");
var x = document.getElementById("myAudio");

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
function updateLeftSide(answer){
    imageID.setAttribute("src", "assets/images/answerimages/"+ answer +".png");//directory starts where index.html is at
    imageID.setAttribute("width", 200);
    imageID.setAttribute("height", 200);
    imageID.setAttribute("class", "borderBelowImage");
    leftTextID.textContent = answer;
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
        if (!guessList.includes(event.key)) {w

            if (answer.includes(event.key)) {
                revealAnswerLetter(event.key);
                console.log(currentWord.join(""), answer, currentWord.join("") == answer);

                if (currentWord.join("") == answer) {
                    winsID.textContent++;
                    updateLeftSide(answer);
                    hardReset();
                    x.play();
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


