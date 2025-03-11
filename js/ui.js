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
  
    playerNames.forEach((name, i) => {
      const playerEl = document.createElement('section');
      playerEl.classList.add('player', `player--${i}`);
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
  
    document.querySelector('main').classList.remove('hidden');
    document.querySelector('.player-selection').classList.add('hidden');
    document.querySelector('.btn--new').classList.remove('hidden');
  };
  
  // Function to update the dice image based on the dice roll
  export const updateScores = (dice, activePlayer) => {
    const diceEl = document.querySelector('.dice');
    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${dice}.png`;
  };
  
  // Function to switch the active player in the UI
  export const switchPlayerUI = (activePlayer) => {
    document.getElementById(`current--${activePlayer}`).textContent = 0;
    document
      .querySelector(`.player--${activePlayer}`)
      .classList.remove('player--active');
    document
      .querySelector(`.player--${(activePlayer + 1) % 2}`)
      .classList.add('player--active');
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
  
  // Function that generates an array of input elements for the given number of players
  export function generatePlayerInputsArray(playerCount) {
    const inputs = [];
  
    // Create input elements for each player
    for (let i = 0; i < playerCount; i++) {
      const input = document.createElement('input');
      input.placeholder = `Player ${i + 1}`;
      inputs.push(input);
    }
  
    return inputs;
  }
