// N.b some sourcecode from Divya M C m at medium.com and adapted
let startButton = document.getElementById('play');
let gameArea = document.querySelector('.game');
let bins = document.querySelectorAll('.bin');
let scoreBoard = document.querySelector('.score');
let rats = document.querySelectorAll('.rat');
let mice = document.querySelectorAll('.mouse');
let frogs = document.querySelectorAll('.frog');
let timerElement = document.querySelector('.timer');
let lastBin;
let timeUp = false;
let score = 0;
let timer;
let countdown;
let frogCount = 0;
let maxFrogCount = 2;

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

     // Defensive check: Ensure the bin exists + contains required elements
     if (!bin || !bin.querySelector('.rat') || 
     !bin.querySelector('.mouse') ||
     !bin.querySelector('.frog')) {
     
        return randomBin(bins);
    }
    return bin;
}

// Check for animal already in bin
function checkCollision(bin) {
    if (!bin) {
        return false; // Defensive check: Return false if the bin is null or undefined
    }
    if (
      bin.querySelector('.rat').classList.contains('up') ||
      bin.querySelector('.mouse').classList.contains('up') ||
      bin.querySelector('.frog').classList.contains('up')
    ) {
      return true; // Collision detected
    }
    return false; // No collision
  }

  function riseFrog() {
    if (frogCount >= maxFrogCount) {
        return; // Limit reached, stop appearing frogs
    }

    let frogBin = randomBin(bins);

        // Defensive check: Ensure selected frogBin is not null or undefined
        if (!frogBin) {
            return;
        }

    if (checkCollision(frogBin)) {
        return riseFrog();
    }

    setTimeout(() => {
        frogBin.querySelector('.frog').classList.add('up');
        setTimeout(() => {
            frogBin.querySelector('.frog').classList.remove('up');
        }, randomTime(1000, 4000));
    }, randomTime(20000, 30000)); // Adjust delay before each frog appearance


    frogCount++;

    if (!timeUp) {
        setTimeout(riseFrog, randomTime(1000, 2000));
    }
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
    setTimeout(() => {
        ratBin.querySelector('.rat').classList.remove('up');
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
    frogCount = 0;
    // Give 1 second delay for game area to appear before rise() and startTimer are called
    setTimeout(() => {
        rise();
        riseFrog();
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
    }else if (this.classList.contains('frog')) {
        score += 10;
    }

    this.classList.remove('up');
    scoreBoard.textContent = score.toString();
}

startButton.addEventListener('click', startGame);
rats.forEach(rat => rat.addEventListener('click', whack));
mice.forEach(mouse => mouse.addEventListener('click', whack));
frogs.forEach(frog =>frog.addEventListener('click', whack));

//module.exports = {
//  startButton,
//  scoreBoard,
//  timerElement,
//  timeUp,
//  score,
//  randomTime
//};