import { updateScores, switchPlayerUI, resetUI, checkWinner } from "./ui.js";
import { launchConfetti } from "./confetti.js";

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
};

export const rollDice = () => {
  if (!playing) return;

  const dice = Math.trunc(Math.random() * 6) + 1;
  updateScores(dice, activePlayer);

  if (dice !== 1) {
    currentScore += dice; // Ensure currentScore is properly updated
    document.getElementById(`current--${activePlayer}`).textContent =
      currentScore;
  } else {
    switchPlayer();
  }
};

export const holdScore = () => {
  if (!playing) return;

  // Add the current score to the active player's total score
  scores[activePlayer] += currentScore;
  document.getElementById(`score--${activePlayer}`).textContent =
    scores[activePlayer];

  // Reset currentScore after holding
  currentScore = 0;
  document.getElementById(`current--${activePlayer}`).textContent =
    currentScore;

  if (checkWinner(scores, activePlayer)) {
    playing = false;
    launchConfetti();
  } else {
    switchPlayer();
  }
};

// Refactored switchPlayer function
export const switchPlayer = (currentActivePlayer, numPlayers) => {
  const newActivePlayer = (currentActivePlayer + 1) % numPlayers;
  return newActivePlayer;
};

export const newGame = () => {
  document.querySelector("main").classList.add("hidden");
  document.querySelector(".player-selection").classList.remove("hidden");
};
