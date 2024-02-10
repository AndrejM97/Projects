'use strict';

const paperEl = document.querySelector('.paper');
const scissorsEl = document.querySelector('.scissors');
const rockEl = document.querySelector('.rock');

const gameContainer = document.querySelector('.center__container');
const winnerContainer = document.querySelector('.winner__panel');
const winnerMessage = document.querySelector('.winner__message');
const scoreEl = document.querySelector('.score');

const playerChoiceImage = document.querySelector('.players__choice img');
const playersChoiceEl = document.querySelector('.players__choice');
const computersChoiceEl = document.querySelector('.computers__choice');


const playAgainBtn = document.querySelector('.play__again');
const rulesBtn = document.querySelector('.rules');
const rulesWindow = document.querySelector('.modal');
const closeRulesWindow = document.querySelector('.close');

let playersChoice, computerChoice, score;
score = 0;

paperEl.addEventListener('click', () => usersChoice('paper'));
scissorsEl.addEventListener('click', () => usersChoice('scissors'));
rockEl.addEventListener('click', () => usersChoice('rock'));
playAgainBtn.addEventListener('click', resetGame );

function getWinner() {
    const choices = ['paper', 'scissors', 'rock'];
    const random = Math.floor(Math.random() * 3);
    computerChoice = choices[random];

    updateChoiceDisplay(playersChoiceEl, playersChoice);
    updateChoiceDisplay(computersChoiceEl, computerChoice);

    const computerChoiceImage = document.querySelector('.computers__choice img');
    computerChoiceImage.src = `images/icon-${computerChoice}.svg`;


    if (playersChoice === computerChoice) {
        setTimeout(() => {
            computersChoiceEl.classList.remove('hidden');
        },1000);
        setTimeout(() => {
            displayMessage("IT'S A TIE");
            showPlayAgainButton();
        }, 1500);
    } else if (
        (playersChoice === 'rock' && computerChoice === 'paper') ||
        (playersChoice === 'paper' && computerChoice === 'scissors') ||
        (playersChoice === 'scissors' && computerChoice === 'rock')
    ) {

        setTimeout(() => {
            displayComputersChoice();
        },1000);
        setTimeout(() => {
            displayMessage("YOU LOSE");
            showPlayAgainButton();
            updateScore(-1)
            computersChoiceEl.classList.add('winner');
        }, 1500);



    } else {
        setTimeout(() => {
          displayComputersChoice();
        },1000);
        setTimeout(() => {
            displayMessage("YOU WIN");
            showPlayAgainButton();
           updateScore(+1)
            playersChoiceEl.classList.add('winner');
        }, 1500);
    }
}

function showWinner() {
    winnerContainer.classList.remove('hidden');
    gameContainer.classList.add('hidden');

}
function displayMessage(message){
    winnerMessage.textContent = message;
}

function updateChoiceDisplay(element, choice) {
    element.classList.remove('paper', 'scissors', 'rock');
    element.classList.add(choice);
}

rulesBtn.addEventListener('click',function(){
    rulesWindow.classList.remove('hidden');
});

closeRulesWindow.addEventListener('click',function(){
    rulesWindow.classList.add('hidden');
});

function usersChoice(choice){
    playersChoice = choice;
    playerChoiceImage.src = `images/icon-${choice}.svg`;
    getWinner();
    showWinner();
}

function displayComputersChoice(){
    computersChoiceEl.classList.remove('hidden');
}

function resetGame() {
    winnerContainer.classList.add('hidden');
    gameContainer.classList.remove('hidden');
    computersChoiceEl.classList.remove('winner');
    playersChoiceEl.classList.remove('winner');
    displayMessage("");
    computersChoiceEl.classList.add('hidden');
    playAgainBtn.classList.add('hidden');
}

function showPlayAgainButton() {
    playAgainBtn.classList.remove('hidden');
}

function updateScore(change) {
    score += change;
    scoreEl.textContent = score;
}
