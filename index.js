const guessInput = document.getElementById("guess");
const submitButton = document.getElementById("submit");
const resetButton = document.getElementById("reset");
const messages = document.getElementsByClassName("message");
const tooHighMessage = document.getElementById("too-high");
const tooLowMessage = document.getElementById("too-low");
const maxGuessesMessage = document.getElementById("max-guesses");
const numberOfGuessesMessage = document.getElementById("number-of-guesses"); // Bug: "num-of-guesses" need to be "number-of-guesses" (in html: <p class="message" id="number-of-guesses"></p>)
const correctMessage = document.getElementById("correct");

let targetNumber;
let attempts = 0; // Bug: change const to let
const maxNumberOfAttempts = 5;

// Returns a random number from min (inclusive) to max (exclusive)
// Usage:
// > getRandomNumber(1, 50)
// <- 32
// > getRandomNumber(1, 50)
// <- 11
function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

function checkGuess() {
  // Get value from guess input element
  const guess = parseInt(guessInput.value, 10);
  //attempts = attempts + 1;

  hideAllMessages();

  if (isNaN(guess) || !Number.isInteger(guess)) {
    displayErrorMessage(
      numberOfGuessesMessage,
      "Please enter a valid integer.",
      true
    );
    return;
  }
  if (guess <= 0) {
    displayErrorMessage(
      numberOfGuessesMessage,
      "Number need to be greater than 0",
      true
    );
    return;
  }
  if (guess > 99) {
    displayErrorMessage(
      numberOfGuessesMessage,
      "Number need to be less than 100",
      true
    );
    return;
  }

  attempts = attempts + 1; // Increment attempts here

  if (guess === targetNumber) {
    numberOfGuessesMessage.style.display = "";
    numberOfGuessesMessage.innerHTML = `You made ${attempts} guesses`;

    correctMessage.style.display = "";

    submitButton.disabled = true;
    guessInput.disabled = true;
  } else {
    if (guess < targetNumber) {
      tooLowMessage.style.display = "";
    } else {
      tooHighMessage.style.display = ""; // Bug: tooLowMessage need to be tooHighMessage
    }

    const remainingAttempts = maxNumberOfAttempts - attempts;

    numberOfGuessesMessage.style.display = "";
    numberOfGuessesMessage.innerHTML = `You guessed ${guess}. <br> ${remainingAttempts} guesses remaining`;

    if (attempts === maxNumberOfAttempts) {
      // Bug: delete 4th extra "="
      submitButton.disabled = true;
      guessInput.disabled = true;
    }
  }
  guessInput.value = "";

  resetButton.style.display = "";
}

function displayErrorMessage(element, message, isVisible) {
  element.style.display = isVisible ? "block" : "none";
  element.innerHTML = message;
}

function hideAllMessages() {
  for (let elementIndex = 0; elementIndex < messages.length; elementIndex++) {
    // Bug: delete "=" in elementIndex <= messages.length
    messages[elementIndex].style.display = "none";
  }
}

function setup() {
  // Bug: fixed the spelling of function.
  // Get random number
  targetNumber = getRandomNumber(1, 100);
  console.log(`target number: ${targetNumber}`);

  // Reset number of attempts
  attempts = 0; // Bug: instead of maxNumberOfAttempts write attempts

  // Enable the input and submit button
  submitButton.disabled = false; //Bug: correct the spell of "disabled".
  guessInput.disabled = false;

  hideAllMessages();
  resetButton.style.display = "none";
}

submitButton.addEventListener("click", checkGuess);
resetButton.addEventListener("click", setup);

setup();
