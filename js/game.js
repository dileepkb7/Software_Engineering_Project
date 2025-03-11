import { updateScores, switchPlayerUI, resetUI, checkWinner } from "./ui.js";
import { launchConfetti } from "./confetti.js";

// Load sound effects
const diceRollSound = new Audio("sounds/roll-dice.mp3");
const newGameSound = new Audio("sounds/new-game.mp3");
const holdSound = new Audio("sounds/hold.mp3");
const winnerSound = new Audio("sounds/winner.mp3");

let scores,
  currentScore,
  activePlayer,
  playing,
  players,
  playerNames = [];

export const initGame = () => {
  players = [];
  playerNames = [];

  document.querySelectorAll(".player-name-input").forEach((input, index) => {
    playerNames.push(input.value.trim() || `Player ${index + 1}`);
  });

  scores = new Array(playerNames.length).fill(0);
  currentScore = 0;
  activePlayer = 0;
  playing = true;

  resetUI(players, playerNames);

  // Play the "New Game" sound when the game starts
  newGameSound.play();
};

export const rollDice = () => {
  if (!playing) return;

  const dice = Math.trunc(Math.random() * 6) + 1;
  updateScores(dice, activePlayer);

  if (dice !== 1) {
    currentScore += dice; // Ensure currentScore is properly updated
    document.getElementById(`current--${activePlayer}`).textContent = currentScore;

    if (scores[activePlayer] + currentScore >= 20) {
      scores[activePlayer] = 20;
      document.getElementById(`score--${activePlayer}`).textContent = scores[activePlayer];

      playing = false;  // End game
      launchConfetti();
      winnerSound.play();
      highlightWinner(activePlayer);
    }
  } else {
    currentScore = 0;
    document.getElementById(`current--${activePlayer}`).textContent = currentScore;
    switchPlayer();
  }
};

export const holdScore = () => {
  if (!playing) return;

  holdSound.play();

  if (scores[activePlayer] + currentScore >= 20) {
    scores[activePlayer] = 20;
    document.getElementById(`score--${activePlayer}`).textContent = scores[activePlayer];

    playing = false;
    launchConfetti();
    winnerSound.play();
    highlightWinner(activePlayer);

  } else {
    scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent = scores[activePlayer];

    currentScore = 0;
    document.getElementById(`current--${activePlayer}`).textContent = currentScore;
    switchPlayer();
  }
};

export const switchPlayer = () => {
  const prevPlayer = activePlayer;

  // Remove the "active" class from the current player
  document.querySelector(`.player--${prevPlayer}`).classList.remove('player--active');

  activePlayer = (activePlayer + 1) % playerNames.length;

  // Add the "active" class to the next player
  document.querySelector(`.player--${activePlayer}`).classList.add('player--active');
  switchPlayerUI(prevPlayer, activePlayer);
};

export const highlightWinner = (playerIndex) => {
  // Add the "winner" class to the winning player's panel
  document.querySelector(`.player--${playerIndex}`).classList.add('player--winner');
};

export const newGame = () => {
  document.querySelector("main").classList.add("hidden");
  document.querySelector(".player-selection").classList.remove("hidden");
};
