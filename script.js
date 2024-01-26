'use strict';
//selecting elements-----COMMENT
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const score0El = document.getElementById('score--0');
const score1El = document.getElementById('score--1');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');

const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

const HTP = document.querySelector('.rules');
const overlay = document.querySelector('.overlay');
const closebtn = document.querySelector('.close-modal');
const Openbtn = document.querySelector('.btn--htp');

let score, activePlayer, currentScore, playing;

const init = function () {
  //STARTING CONDITION-----COMMENT
  score0El.textContent = 0;
  score1El.textContent = 0;

  score = [0, 0];
  activePlayer = 0;
  currentScore = 0;
  playing = true;

  current0El.textContent = 0;
  current1El.textContent = 0;
  //ADD HIDDEN PROPETY TO DICE CLASS---COMMENT
  diceEl.classList.add('hidden');

  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');
  player0El.classList.add('player--active');
  player1El.classList.remove('palyer--active');
};

const HowToPlay = function () {
  HTP.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeHTP = function () {
  HTP.classList.add('hidden');
  overlay.classList.add('hidden');
};

init();
const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer == 0 ? 1 : 0;
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
};

//DICE ROLL FUNCTIONALITY
btnRoll.addEventListener('click', function () {
  if (playing == true) {
    // 1--random dice number generate
    const dice = Math.trunc(Math.random() * 6) + 1;

    //2-- display dice
    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${dice}.png`;

    //3-- checked for rolled 1
    if (dice !== 1) {
      //add dice to current score
      currentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      //--switch player
      switchPlayer();
    }
  }
});

btnHold.addEventListener('click', function () {
  if (playing) {
    //1--add current score to active player
    score[activePlayer] += currentScore; //score[1]=score[1]+currentscore

    document.getElementById(`score--${activePlayer}`).textContent =
      score[activePlayer];

    //check if player's score is>=100
    if (score[activePlayer] >= 20) {
      //finish game
      playing = false;
      diceEl.classList.add('hidden');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
    } else {
      //switch player
      switchPlayer();
    }
  }
});

btnNew.addEventListener('click', init);
Openbtn.addEventListener('click', HowToPlay);
closebtn.addEventListener('click', closeHTP);
