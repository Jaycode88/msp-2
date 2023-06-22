let bins = document.querySelectorAll('.bin');
let scoreBoard = document.querySelector('.score');
let rats = document.querySelectorAll('.rat');
let timerElement = document.querySelector('.timer');
let lastBin;
let timeUp = false;
let score = 0;
let timer;
let countdown;

function randomTime(min, max) {
  return Math.round(Math.random() * (max - min) + min);
}

function randomBin(bins) {
    let index = Math.floor(Math.random() * bins.length);
    let bin = bins[index];
    if (bin === lastBin) {
      return randomBin(bins);
    }
    lastBin = bin;
    return bin;
  }

  function rise() {
    let time = randomTime(200, 2000);
    let bin = randomBin(bins);
    bin.classList.add('up');
    setTimeout(() => {
      bin.classList.remove('up');
      if (!timeUp) rise();
    }, time);
  }

  function startTimer(duration) {
    let time = duration;
    countdown = setInterval(() => {
      time--;
      timerElement.textContent = time.toString();
      if (time <= 0) {
        clearInterval(countdown);
        endGame();
      }
    }, 1000); // sets the countdown to to update and display the time every second
  }

  function startGame() {
    scoreBoard.textContent = '0';
    timeUp = false;
    score = 0;
    timerElement.textContent = '60'; // Reset the timer value to 60
    peep();
    startTimer(60); // Start  countdown with 60 seconds
  }

  function endGame() {
    timeUp = true;
    clearTimeout(timer);
    clearInterval(countdown);
    // Additional logic to be added like score result shown etc
  }

  function whack(e) {
    if (!e.isTrusted) return;
    score++;
    this.parentNode.classList.remove('up');
    scoreBoard.textContent = score.toString();
  }
  
  rats.forEach(rat => rat.addEventListener('click', whack));


//module.exports = { randomTime };