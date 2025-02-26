export const setupUI = () => {
    document.querySelector('.btn--new').classList.add('hidden');
};
  
export const generatePlayerInputs = () => {
    const playerNamesContainer = document.getElementById(
        'player-names-container'
    );
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