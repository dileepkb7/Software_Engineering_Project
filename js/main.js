import { initGame, rollDice, holdScore, newGame } from "./game.js";
import { setupUI, generatePlayerInputs } from "./ui.js";

document.addEventListener("DOMContentLoaded", setupUI);

document
  .querySelector(".btn--generate")
  .addEventListener("click", generatePlayerInputs);
document.querySelector(".btn--start").addEventListener("click", initGame);
document.querySelector(".btn--roll").addEventListener("click", rollDice);
document.querySelector(".btn--hold").addEventListener("click", holdScore);
document.querySelector(".btn--new").addEventListener("click", newGame);
