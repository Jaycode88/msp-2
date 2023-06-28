// N.b some sourcecode from Divya M C m at medium.com and adapted
let startButton = document.getElementById('play');
let gameArea = document.querySelector('.game');
let bins = document.querySelectorAll('.bin');
let scoreBoard = document.querySelector('.score');
let rats = document.querySelectorAll('.rat');
let mice = document.querySelectorAll('.mouse');
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

// Check for animal already in bin
function checkCollision(bin) {
    if (
      bin.querySelector('.rat').classList.contains('up') ||
      bin.querySelector('.mouse').classList.contains('up')
    ) {
      return true; // Collision detected
    }
    return false; // No collision
  }

function rise() {
    let ratBin = randomBin(bins);
    let mouseBin = randomBin(bins);
    // Check if the same bin is selected for rat and mouse, and call rise() if necessary
    if (ratBin === mouseBin || checkCollision(ratBin) || checkCollision(mouseBin)) {
        return rise(); // Collision detected or same bin selected, choose new bins
      }
     

    // display rat from using animation by adding class 'up' 
    ratBin.querySelector('.rat').classList.add('up');
    //hide rat after random duration by removing class 'up'
    setTimeout(() => {
        ratBin.querySelector('.rat').classList.remove('up');
        // rat.style.display = 'none';
    }, randomTime(1000, 4000));

    setTimeout(() => {
        //After random time display mouse using animation  by adding class 'up
        mouseBin.querySelector('.mouse').classList.add('up');

        setTimeout(() => {
            //After rndom time remove mouse by removing class 'up'
            mouseBin.querySelector('.mouse').classList.remove('up');
        }, randomTime(500, 5000));
    }, randomTime(500, 5000));
    // if game not over , schedule for next rat or mouse
    if (!timeUp) {
        setTimeout(rise, randomTime(1000, 2000)); // Delay the next rat and mouse
    }
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
    }, 1000);
}

function startGame() {
    gameArea.style.display = 'flex';
    scoreBoard.textContent = '0';
    timeUp = false;
    score = 0;
    timerElement.textContent = '60';
    // Give 1 second delay for game area to appear before rise() and startTimer are called
    setTimeout(() => {
        rise();
        startTimer(60);
    }, 1000);
}

function endGame() {
    timeUp = true;
    clearTimeout(timer);
    clearInterval(countdown);
    gameArea.style.display = 'none';
    //show alert with player score
    alert("Game Over! Well done, you recieved " + score + " points. Try again to see if you can do better!");
}

function whack(e) {
    if (!e.isTrusted) return;
    if (this.classList.contains('rat')) {
        score++;
    } else if (this.classList.contains('mouse')) {
        score--;
    }
    this.classList.remove('up');
    scoreBoard.textContent = score.toString();
}

startButton.addEventListener('click', startGame);
rats.forEach(rat => rat.addEventListener('click', whack));
mice.forEach(mouse => mouse.addEventListener('click', whack));

//module.exports = {
//  startButton,
//  scoreBoard,
//  timerElement,
//  timeUp,
//  score,
//  randomTime
//};