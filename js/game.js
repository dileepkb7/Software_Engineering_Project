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
  let targetScore = 20; // Default target score

export const initGame = () => {
  players = [];
  playerNames = [];

  document.querySelectorAll(".player-name-input").forEach((input, index) => {
    playerNames.push(input.value.trim() || `Player ${index + 1}`);
  });

  // Get target score from the input field
  const targetScoreInput = document.getElementById("target-score").value;
  targetScore = targetScoreInput ? Number(targetScoreInput) : 20;

  scores = new Array(playerNames.length).fill(0);
  currentScore = 0;
  activePlayer = 0;
  playing = true;

  // Update the UI with the initial target score
  document.getElementById(
    "display-target-score"
  ).textContent = `Target Score: ${targetScore}`;

  resetUI(players, playerNames);

  // Play the "New Game" sound when the game starts
  newGameSound.play();
};


// Roll Dice
export const rollDice = () => {
  if (!playing) return;

  diceRollSound.play();

  const dice = Math.trunc(Math.random() * 6) + 1;
  updateScores(dice, activePlayer);

  if (dice !== 1) {
    currentScore += dice;
    const newTotalScore = scores[activePlayer] + currentScore;

    document.getElementById(`current--${activePlayer}`).textContent = currentScore;

    // Check if player wins with this roll
    if (newTotalScore >= targetScore) {
      scores[activePlayer] = newTotalScore; // Update final score
      document.getElementById(`score--${activePlayer}`).textContent = newTotalScore;
      
      playing = false;
      launchConfetti();
      winnerSound.play();
      
      document.querySelector(`.player--${activePlayer}`).classList.add("player--winner");
      return;
    }
  } else {
    switchPlayer();
  }
};

// Switch Player
function switchPlayer() {
  const totalPlayers = document.querySelectorAll(".player").length;

  document
    .querySelector(`.player--${activePlayer}`)
    .classList.remove("player-active");

  currentScore = 0;
  document.getElementById(`current--${activePlayer}`).textContent = 0;

  activePlayer = (activePlayer + 1) % totalPlayers;

  document
    .querySelector(`.player--${activePlayer}`)
    .classList.add("player-active");
}

// Hold Score
export const holdScore = () => {
  if (!playing) return;

  holdSound.play();

  scores[activePlayer] += currentScore;
  document.getElementById(`score--${activePlayer}`).textContent =
    scores[activePlayer];

  if (scores[activePlayer] >= targetScore) {
    playing = false;
    launchConfetti();
    winnerSound.play();
  } else {
    currentScore = 0;
    document.getElementById(`current--${activePlayer}`).textContent =
      currentScore;
    switchPlayer();
  }
};

// Start New Game
export const newGame = () => {
  document.querySelector("main").classList.add("hidden");
  document.querySelector(".player-selection").classList.remove("hidden");
};
