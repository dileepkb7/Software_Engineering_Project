import { initGame, rollDice, holdScore, newGame } from "./game.js";
import { setupUI, generatePlayerInputs } from "./ui.js";

jest.mock("./game.js");
jest.mock("./ui.js");

describe("DOM Event Listeners", () => {
  beforeEach(() => {
    document.body.innerHTML = `
      <button class="btn--generate"></button>
      <button class="btn--start"></button>
      <button class="btn--roll"></button>
      <button class="btn--hold"></button>
      <button class="btn--new"></button>
    `;

    require("./script.js");
  });

  test("setupUI is called on DOMContentLoaded", () => {
    expect(setupUI).toHaveBeenCalled();
  });

  test("generatePlayerInputs is called when .btn--generate is clicked", () => {
    document.querySelector(".btn--generate").click();
    expect(generatePlayerInputs).toHaveBeenCalled();
  });

  test("initGame is called when .btn--start is clicked", () => {
    document.querySelector(".btn--start").click();
    expect(initGame).toHaveBeenCalled();
  });

  test("rollDice is called when .btn--roll is clicked", () => {
    document.querySelector(".btn--roll").click();
    expect(rollDice).toHaveBeenCalled();
  });

  test("holdScore is called when .btn--hold is clicked", () => {
    document.querySelector(".btn--hold").click();
    expect(holdScore).toHaveBeenCalled();
  });

  test("newGame is called when .btn--new is clicked", () => {
    document.querySelector(".btn--new").click();
    expect(newGame).toHaveBeenCalled();
  });
});