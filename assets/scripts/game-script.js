// N.b some sourcecode from Divya M C m at medium.com and adapted

// Get necessary elements from the DOM
let startButton = document.getElementById('play'); // Start button element
let gameArea = document.querySelector('.game'); // Game area element
let bins = document.querySelectorAll('.bin'); // Array of bins
let scoreBoard = document.querySelector('.score'); // Score display element
let rats = document.querySelectorAll('.rat'); // Array of rats
let mice = document.querySelectorAll('.mouse'); // Array of mice
let frogs = document.querySelectorAll('.frog'); // Array of frogs
let timerElement = document.querySelector('.timer') // Timer display element

let lastBin;
let timeUp = false;
let score = 0;
let timer;
let countdown;
let frogCount = 0;
let maxFrogCount = 2;

/**
 * Generates a random time between the given minimum and maximum values.
 * @param {number} min - The minimum value.
 * @param {number} max - The maximum value.
 * @returns {number} The generated random time.
 */
function randomTime(min, max) {
	return Math.round(Math.random() * (max - min) + min);
}

/**
 * Selects a random bin from the provided array of bins.
 * @param {NodeList} bins - The array of bins.
 * @returns {Element} The selected bin.
 */
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

/**
 * Checks if an animal is already present in the provided bin.
 * @param {Element} bin - The bin to check for collision.
 * @returns {boolean} True if collision detected, false otherwise.
 */
function checkCollision(bin) {
	if (!bin) {
		return false; // Defensive check: Return false if the bin is null or undefined
	}

	// Check if any of the animals (rat, mouse, frog) is already up
	if (
		bin.querySelector('.rat').classList.contains('up') ||
		bin.querySelector('.mouse').classList.contains('up') ||
		bin.querySelector('.frog').classList.contains('up')
	) {
		return true; // Collision detected
	}
	return false; // No collision
}

/**
 * Makes a frog appear and disappear twice in a game.
 */
function riseFrog() {
	if (frogCount >= maxFrogCount) {
		return; // Limit reached, stop appearing frogs
	}

	let frogBin = randomBin(bins);

	// Defensive check: Ensure selected frogBin is not null or undefined
	if (!frogBin) {
		return; // Retry if the selected frogBin is null or undefined
	}

	if (checkCollision(frogBin)) {
		return riseFrog(); // Retry if there is a collision
	}

	setTimeout(() => {
		frogBin.querySelector('.frog').classList.add('up');
		setTimeout(() => {
			frogBin.querySelector('.frog').classList.remove('up');
		}, randomTime(1000, 4000));
	}, randomTime(20000, 30000));
	// Adjust delay before each frog appearance

	frogCount++;

	if (!timeUp) {
		setTimeout(riseFrog, randomTime(1000, 2000));
	}
}

/**
 * Makes a rat and a mouse appear and disappear periodically.
 */
function rise() {
	let ratBin = randomBin(bins);
	let mouseBin = randomBin(bins);
	// Check if the same bin is selected for rat and mouse,
	// and call rise() if necessary
	if (ratBin === mouseBin || checkCollision(ratBin) ||
		checkCollision(mouseBin)) {
		return rise();
		// Collision detected or same bin selected, choose new bins
	}


	// display rat from using animation by adding class 'up' 
	ratBin.querySelector('.rat').classList.add('up');
	setTimeout(() => {
		ratBin.querySelector('.rat').classList.remove('up');
	}, randomTime(1000, 4000));

	setTimeout(() => {
		//After random time display mouse using animation  
		//by adding class 'up
		mouseBin.querySelector('.mouse').classList.add('up');

		setTimeout(() => {
			//After random time remove mouse by removing class 'up'
			mouseBin.querySelector('.mouse').classList.remove('up');
		}, randomTime(500, 5000));
	}, randomTime(500, 5000));
	// if game not over , schedule for next rat or mouse
	if (!timeUp) {
		setTimeout(rise, randomTime(1000, 2000));
		// Delay next rat or mouse
	}
}

/**
 * Starts the game timer.
 * @param {number} duration - The duration of the game in seconds.
 */
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

/**
 * Starts the game.
 */
function startGame() {
	startButton.disabled = true; // Disable the play button
	startButton.style.display = 'none'; // Hide the play button
	gameArea.style.display = 'flex';
	scoreBoard.textContent = '0';
	timeUp = false;
	score = 0;
	timerElement.textContent = '60';
	frogCount = 0;
	// Give 1 second delay for game area to appear before rise()
	// and startTimer are called
	setTimeout(() => {
		rise();
		riseFrog();
		startTimer(60);
	}, 1000);
}

/**
 * Ends the game.
 */
function endGame() {
	timeUp = true;
	clearTimeout(timer);
	clearInterval(countdown);
	gameArea.style.display = 'none';
	startButton.disabled = false; // enable the play button
	startButton.style.display = 'inline-block'; // show the play button
	//show alert with player score after 1 second time delay
	setTimeout(() => {
	alert("Game Over! Well done, you recieved " + score +
		" points. Try again to see if you can do better!");
	},1000);
}

/**
 * Handles whacking an animal.
 * @param {Event} e - The click event.
 */
function whack(e) {
	if (!e.isTrusted) return;
	if (this.classList.contains('rat')) {
		score++;
	} else if (this.classList.contains('mouse')) {
		score--;
	} else if (this.classList.contains('frog')) {
		score += 10;
	}

	this.removeEventListener('click', whack); // remove EL to stop double click double points
	this.classList.remove('up');
	scoreBoard.textContent = score.toString();
	setTimeout(() => {
		this.addEventListener('click', whack); // Re-enable click event after 0.25 seconds
	}, 250);

}

//Event Listeners
startButton.addEventListener('click', startGame);
rats.forEach(rat => rat.addEventListener('click', whack));
mice.forEach(mouse => mouse.addEventListener('click', whack));
frogs.forEach(frog => frog.addEventListener('click', whack));

// Exports for jest
//module.exports = {
// startButton,
//  scoreBoard,
// timerElement,
// timeUp,
//  score,
//  randomTime,
//  checkCollision,
//};