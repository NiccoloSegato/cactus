// Deck of cards
var cards = [0, 0, 0, 0, 1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 4, 5, 5, 5, 5, 6, 6, 6, 6, 7, 7, 7, 7, 8, 8, 8, 8, 9, 9, 9, 9, 10, 10, 10, 10, 11, 11, 11, 11, 12, 12, 12, 12, 13, 13, 13, 13];

// Players decks
var player = [];
var opponent = [];

/**
 * Function to shuffle the deck of cards
 */
function shuffle() {
    // Shuffle the deck
    for (var i = 0; i < cards.length; i++) {
        var j = Math.floor(Math.random() * cards.length);
        var temp = cards[i];
        cards[i] = cards[j];
        cards[j] = temp;
    }
}

/**
 * This function will deal the 4 cards to the players
 */
function dealCards() {
    for (var i = 0; i < 4; i++) {
        player.push(cards.pop());
        opponent.push(cards.pop());
    }
}

/**
 * This function will show the first two cards to the plyer
 */
function showTwoCards() {
    // Show the first two cards to the player
    var card1 = document.getElementById("player-card-1");
    card1.innerHTML = player[0];
    card1.style.backgroundImage = "none";

    var card2 = document.getElementById("player-card-2");
    card2.innerHTML = player[1];
    card2.style.backgroundImage = "none";
}

/**
 * This function will play the game
 */
function play() {
    // Shuffle the deck
    shuffle();

    // Deal the cards
    dealCards();

    // Show the first two cards to the player
    showTwoCards();

    console.log("Player: " + player);
    console.log("Opponent: " + opponent);
}

/**
 * Check if the page is loaded
 */
document.addEventListener("DOMContentLoaded", function() {
    play();
});