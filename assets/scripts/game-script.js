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





//module.exports = { randomTime };