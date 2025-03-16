// Setup UI initially by hiding the "new game" button
export const setupUI = () => {
    document.querySelector('.btn--new').classList.add('hidden');
  };
  
  // Function that generates input fields for player names and appends them to the DOM
  export const generatePlayerInputs = () => {
    const playerNamesContainer = document.getElementById('player-names-container');
    playerNamesContainer.innerHTML = '';
  
    const numPlayers = Number(document.getElementById('num-players').value);
    for (let i = 0; i < numPlayers; i++) {
      const inputField = document.createElement('input');
      inputField.type = 'text';
      inputField.classList.add('player-name-input');
      inputField.placeholder = `Enter Player ${i + 1} Name`;
      playerNamesContainer.appendChild(inputField);
    }
  
    document.querySelector('.btn--start').classList.remove('hidden');
  };
  
  // Function to reset the UI and add player elements dynamically
  export const resetUI = (players, playerNames) => {
    const playerContainer = document.querySelector('.players-container');
    playerContainer.innerHTML = '';
    players.length = 0; // Clear previous players array
  
    playerNames.forEach((name, i) => {
      const playerEl = document.createElement("section");
      playerEl.classList.add("player", `player--${i}`);
      if (i === 0) playerEl.classList.add("player-active"); // First player starts as active
  
      playerEl.innerHTML = `
          <h2 class="name" id="name--${i}">${name}</h2>
          <p class="score" id="score--${i}">0</p>
          <div class="current">
              <p class="current-label">Current</p>
              <p class="current-score" id="current--${i}">0</p>
          </div>
        `;
      playerContainer.appendChild(playerEl);
      players.push(playerEl);
    });  
  
    document.querySelector("main").classList.remove("hidden");
    document.querySelector(".player-selection").classList.add("hidden");
    document.querySelector(".btn--new").classList.remove("hidden");  
  };
  
  // Display the chosen target score
  const targetScore = document.getElementById("target-score").value || 20;
  document.getElementById("target-score-value").textContent = targetScore;
  document.getElementById("display-target-score").classList.remove("hidden");

// Function to update the dice image based on the roll
export const updateScores = (dice) => {
  const diceEl = document.querySelector(".dice");
  if (diceEl) {
    diceEl.classList.remove("hidden");
    diceEl.src = `Assets/dice-${dice}.png`;
  }
};
  
// Function to switch the active player dynamically
export const switchPlayerUI = (prevPlayer, activePlayer) => {
  console.log(`Switching from Player ${prevPlayer} to Player ${activePlayer}`);

  const prevPlayerEl = document.querySelector(`.player--${prevPlayer}`);
  const activePlayerEl = document.querySelector(`.player--${activePlayer}`);

  if (!prevPlayerEl || !activePlayerEl) {
    console.error("Player elements not found in the DOM.");
    return;
  }

  prevPlayerEl.classList.remove("player-active");
  activePlayerEl.classList.add("player-active");
};

  
  // Function to check if the current player has won
  export const checkWinner = (scores, activePlayer) => {
    if (scores[activePlayer] >= 20) {
      document.querySelector('.dice').classList.add('hidden');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      return true;
    }
    return false;
  };
  
  // Function to generate an array of player input elements
export function generatePlayerInputsArray(playerCount) {
  return Array.from({ length: playerCount }, (_, i) => {
    const input = document.createElement("input");
    input.placeholder = `Player ${i + 1}`;
    return input;
  });
}

// Function to handle player switching logic
export let activePlayer = 0;

export function switchPlayer(players) {
  const prevPlayer = activePlayer;
  activePlayer = (activePlayer + 1) % players.length;
  switchPlayerUI(prevPlayer, activePlayer);
}

