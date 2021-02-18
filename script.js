'use strict';
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const score0El = document.querySelector('#score--0');
const score1El = document.querySelector('#score--1');
const diceEl = document.querySelector('.dice');
const btnNewGame = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
const current0El = document.querySelector('#current--0');
const current1El = document.querySelector('#current--1')

score0El.textContent = 0;
score1El.textContent = 0;
diceEl.classList.toggle('hidden');

let score, currentScore, activePlayer, ifPlaying;

const init = function () {

    score = [0,0];
    currentScore = 0;
    activePlayer = 0;
    ifPlaying = true;

    score0El.textContent = 0;
    score1El.textContent = 0;
    current0El.textContent = 0;
    current1El.textContent = 0;

    diceEl.classList.add('hidden');
    player0El.classList.remove('player--winner');
    player1El.classList.remove('player--winner');
    player0El.classList.add('player--active');
    player1El.classList.remove('player--active');
}
init();


const switchPlayer = function () {
    document.querySelector(`#current--${activePlayer}`).textContent = 0;
    activePlayer = activePlayer === 0 ? 1 : 0;
    currentScore = 0;
    player0El.classList.toggle('player--active');
    player1El.classList.toggle('player--active');
}


btnRoll.addEventListener('click', function() {
    if(ifPlaying){
    let dice = Math.trunc(Math.random() * 6) + 1;
    
    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${dice}.png`;

    if(dice !== 1){
        currentScore += dice;
        document.querySelector(`#current--${activePlayer}`).textContent = currentScore;
    }else {
        switchPlayer();
    }
}
})

btnHold.addEventListener('click', function() {
    if(ifPlaying){

    score[activePlayer] += currentScore;
    document.querySelector(`#score--${activePlayer}`).textContent = score[activePlayer];

    if(score[activePlayer] >= 20) {
        ifPlaying = false;
        document.querySelector(`.player--${activePlayer}`).classList.add('player--winner');
        document.querySelector(`.player--${activePlayer}`).classList.remove('player--active');
        document.querySelector('.dice').classList.add('hidden');
    }else {
        switchPlayer();
    }
}
})

btnNewGame.addEventListener('click', init);