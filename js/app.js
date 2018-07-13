/*
 * Create a list that holds all of your cards
 */
let deck = document.querySelector(".deck");
let cards = deck.getElementsByClassName("card");
	

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

let faceUpCards = [];
let moves = 0;

function incrementMoves() {
	moves++;
	let span = document.querySelector(".moves");
	span.textContent = moves;
}

deck.addEventListener("click", function(ev) {
	let card = ev.target.closest("li"); // the card that was clicked
	// if either the card is already face up or we have already more than 1 non-match card face up, just ignore the rest of the function
	if (faceUpCards.length < 2 && !card.classList.contains("open") && !card.classList.contains("show") && !card.classList.contains("match")) {
		turnFaceUp(card);
		if (faceUpCards.length === 2) match(faceUpCards[0], faceUpCards[1]);
	}
})

function turnFaceUp(card) {
	card.classList.add("show", "open");
	faceUpCards.push(card);
}

function turnFaceDown(card) {
	card.classList.remove("show", "open");
}

function match(card1, card2) {
	incrementMoves();
	if (card1.innerHTML === card2.innerHTML) {
		addMatch(card1);
		addMatch(card2);
	}
	faceUpCards.splice(0);
	setTimeout(function turnEverythingFaceDown(includeMatch) {
		for (let i=0; i<cards.length; i++) {
			let card = cards[i];
			if (includeMatch || !card.classList.contains("match")) {
				turnFaceDown(card);
			}
		}
	}, 1000);
}

function addMatch(card) {
	turnFaceDown(card);
	card.classList.add("match");
}

/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */
