"use strict";

// Selecting elements
const player0El = document.querySelector(".player--0");
const player1El = document.querySelector(".player--1");
const score0El = document.getElementById("score--0");
const score1El = document.getElementById("score--1");
const current0El = document.getElementById("current--0");
const current1El = document.getElementById("current--1");
const diceEl = document.querySelector(".dice");
const btnNew = document.querySelector(".btn--new");

// Function to initialize the game
const init = function () {
  // Reset scores
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;

  // Display scores
  score0El.textContent = 0;
  score1El.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;

  // Hide dice at start
  diceEl.classList.add("hidden");

  // Set active player
  player0El.classList.add("player--active");
  player1El.classList.remove("player--active");
};

// Initialize the game on page load
init();

// Event listener for starting a new game
btnNew.addEventListener("click", init);
