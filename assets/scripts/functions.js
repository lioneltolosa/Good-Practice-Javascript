const startGameBtn = document.getElementById('start-game-btn');

const ROCK = 'ROCK';
const PAPER = 'PAPER';
const SCISSORS = 'SCISSORS';
const DEFAULT_USER_CHOISE = ROCK;

const RESULT_DRAW = 'DRAW';
const RESULT_PLAYER_WINS = 'PLAYER_WINS';
const RESULT_COMPUTER_WINS = 'COMPUTER_WINS';

let gameIsRunning = false;

const getPlayerChoise = () => {
    const selection = prompt(`${ROCK}, ${PAPER} or ${SCISSORS}?`, '').toUpperCase();

    if(selection !== ROCK && selection !== PAPER && selection !== SCISSORS) {
        alert(`Invalid Seleccions! We chose ${DEFAULT_USER_CHOISE} for you!`)
        return DEFAULT_USER_CHOISE;
    }
    return selection;
}

const getComputerChoice = () => {
    const randomValue = Math.random();
    if(randomValue < 0.34) {
        return ROCK;
    } else if(randomValue < 0.67) {
        return PAPER;
    } else
        return SCISSORS;
}

/* const getWinner = function (cChoice, pChoice) {
    if(cChoice === pChoice) {
        return RESULT_DRAW;
    } else if (
            cChoice === ROCK && pChoice === PAPER || 
            cChoice === PAPER && pChoice === SCISSORS ||
            cChoice === SCISSORS && pChoice === ROCK
        ) {
            return RESULT_PLAYER_WINS;
        } else {
            return RESULT_COMPUTER_WINS;
    }
} */

const getWinner = (cChoice, pChoice) => 
    cChoice === pChoice 
    ? RESULT_DRAW 
    : ( cChoice === ROCK && pChoice === PAPER || 
        cChoice === PAPER && pChoice === SCISSORS ||
        cChoice === SCISSORS && pChoice === ROCK)
    ? RESULT_PLAYER_WINS 
    : RESULT_COMPUTER_WINS

const add = (a, b) => a + b; 

const add2 = function(a, b) {
    return a + b;
}

startGameBtn.addEventListener('click', () => {
    if(gameIsRunning) {
        return;
    }
    gameIsRunning = true
    console.log('Game is starting...');
    const playerSelection = getPlayerChoise();
    console.log('playerSelection', playerSelection);

    const computerChoice = getComputerChoice();
    console.log('computerChoice', computerChoice);

    const winner = getWinner(computerChoice, playerSelection);
    console.log('Winner', winner);

    let message = `You picked ${playerSelection}, computer picked ${computerChoice}, therefore you`;
    if(winner === RESULT_DRAW) {
        message = message + ' had a draw';
    } else if (winner === RESULT_PLAYER_WINS) {
        message = message + ' win'
    } else {
        message = message + ' lose'
    }
    alert(message);
    gameIsRunning = false;
})