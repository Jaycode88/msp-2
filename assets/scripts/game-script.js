// N.b some sourcecode from Divya M C m at medium.com and adapted
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

function rise() {
    let ratBin = randomBin(bins);
    let mouseBin = randomBin(bins);
    // Check if the same bin is selected for rat and mouse, and choose call rise() if necessary
    if (ratBin === mouseBin) {
        return rise();
    }

    let rat = ratBin.querySelector('.rat');
    let mouse = mouseBin.querySelector('.mouse');

    // Check if the selected bins already contain a rat or mouse, and call rise() again if necessary
    if (rat.style.display === 'block' || mouse.style.display === 'block') {
      return rise();
  }

    // display rat from using animation by adding class 'up' 
    ratBin.classList.add('up');
    rat.style.display = 'block';
    //hide rat after random duration by removing class 'up'
    setTimeout(() => {
        ratBin.classList.remove('up');
        rat.style.display = 'none';
    }, randomTime(200, 2000));

    setTimeout(() => {
        //After random time display mouse using animation  by adding class 'up
        mouseBin.classList.add('up');
        mouse.style.display = 'block';

        setTimeout(() => {
            //After rndom time remove mouse by removing class 'up'
            mouseBin.classList.remove('up');
            mouse.style.display = 'none';
        }, randomTime(200, 2000));
    }, randomTime(200, 2000));
    // if game not over , schedule for next rat or mouse
    if (!timeUp) {
        setTimeout(rise, randomTime(1000, 2000)); // Delay the next rat and mouse
    }
}

rats.forEach(rat => {
    rat.style.display = 'none'; // Hide rats initially
});
mice.forEach(mouse => {
    mouse.style.display = 'none'; // Hide mice initially
});



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
    this.parentNode.classList.remove('up');
    scoreBoard.textContent = score.toString();
}

rats.forEach(rat => rat.addEventListener('click', whack));
mice.forEach(mouse => mouse.addEventListener('click', whack));