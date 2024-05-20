// Deck of cards
var cards = [0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3, 3, 3, 4, 4, 4, 4, 4, 4, 4, 4, 5, 5, 5, 5, 5, 5, 5, 5, 6, 6, 6, 6, 6, 6, 6, 6, 7, 7, 7, 7, 7, 7, 7, 7, 8, 8, 8, 8, 8, 8, 8, 8, 9, 9, 9, 9, 9, 9, 9, 9, 10, 10, 10, 10, 10, 10, 10, 10, 11, 11, 11, 11, 11, 11, 11, 11, 12, 12, 12, 12, 12, 12, 12, 12, 13, 13, 13, 13, 13, 13, 13, 13];

// Players decks
var player = [];
var opponent = [];

// Main button reference
var button;

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
    // TODO: Remove before the final version
    console.log(cards);
}

/**
 * This function will deal the 4 cards to the players
 */
function dealCards() {
    for (var i = 0; i < 4; i++) {
        player.push(cards.pop());
        opponent.push(cards.pop());
    }
    // TODO: Remove before the final version
    console.log(cards);
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

    // Change the button text
    button.innerHTML = "Iniziamo!";
    button.addEventListener("click", startFirstRound);
}

function hideTwoCards() {
    // Hide the first two cards to the player
    var card1 = document.getElementById("player-card-1");
    card1.innerHTML = "";
    card1.style.backgroundImage = "url('assets/images/card-back.png')";

    var card2 = document.getElementById("player-card-2");
    card2.innerHTML = "";
    card2.style.backgroundImage = "url('assets/images/card-back.png')";

}

/**
 * Ask the player the confirmation to start the first round
 */
function startFirstRound() {
    // Remove the event listener
    button.removeEventListener("click", startFirstRound);
    // Ask the player the confirmation to hide the cards
    if(confirm("Sei pronto a giocare?")) {
        // Hide the first two cards
        hideTwoCards();
        playerRound();
    }
}

/**
 * This function will play the game
 */
function play() {
    // TODO: Remove before the final version
    console.log(cards);
    // Remove the event listener
    button.removeEventListener("click", play);
    
    // Shuffle the deck
    shuffle();

    // Deal the cards
    dealCards();

    // Show the first two cards to the player
    showTwoCards();

    console.log("Player: " + player);
    console.log("Opponent: " + opponent);
}

function playerRound() {
    // Change the button text
    button.innerHTML = "Pesca";
    // Remove the previous event listener
    button.addEventListener("click", drawCard);
}

function opponentRound() {
    // Draw a card from the deck
    var card = cards.pop();

    // Find the highest card of the opponent
    var highest = Math.max(opponent[0], opponent[1], opponent[2], opponent[3]);
    
    // TODO: Remove before the final version
    console.log("Highest: " + highest + " - Card: " + card);
    // Check if the drew card is higher than the highest card
    if(card < highest) {
        // Swap the card with the highest card
        var index = opponent.indexOf(highest);
        opponent[index] = card;

        // Discard the card with the swapped one
        var table = document.getElementById("table");
        table.innerHTML = highest;

        setTimeout(() => {
            askPlayerDiscard();
        }, 1000);

        // TODO: Remove before the final version
        console.log("Opponent swapped " + highest + " with " + card);
    } else {
        // Discard the card
        var table = document.getElementById("table");
        table.innerHTML = card;

        // TODO: Remove before the final version
        console.log("Opponent not swapped and discarded " + card);

        setTimeout(() => {
            askPlayerDiscard();
        }, 1000);
    }

    // TODO: Implement the check for win
    
    // TODO: Remove before the final version
    console.log(opponent);
}

/**
 * Function executed when the opponent's round is finished. Ask the player if he wants to discard a card on top of the opponent's discarded card
 */
function askPlayerDiscard() {
    if(confirm("Vuoi scartare una tua carta?")) {
        // Apply the action to every card
        var cardsToRemove = document.getElementsByClassName("player-cards");
        for(var i = 0; i < cardsToRemove.length; i++) {
            cardsToRemove[i].addEventListener("click", discardInOpponentTurn);
        }
    }
    else {
        // Enable the button and change the opacity
        button.disabled = false;
        button.style.opacity = 1;
        button.style.cursor = "pointer";

        // Start player round
        playerRound();
    }
}

function discardInOpponentTurn(event) {
    // Remove the event listener from all the cards
    var cardsToRemove = document.getElementsByClassName("player-cards");
    for(var i = 0; i < cardsToRemove.length; i++) {
        cardsToRemove[i].removeEventListener("click", discardInOpponentTurn);
    }

    // Get the card to discard
    var card = event.currentTarget.id;
    // Get last character
    card = card.charAt(card.length - 1);
    var swapIndex = parseInt(card) - 1;

    // TODO: Remove before production
    console.log("Player discarded " + player[swapIndex]);

    // Show the player selected card
    var card1 = document.getElementById("player-card-" + (swapIndex + 1));
    card1.innerHTML = player[swapIndex];
    card1.style.backgroundImage = "none";

    // Wait a second before checking if discard the card
    setTimeout(() => {
        // Check if the card value is the same as the discarded card
        if(player[swapIndex] == document.getElementById("table").innerHTML) {
            // Discard the card
            //player.slice(swapIndex, 1);

            // Swap the position between the last element and the one I want to pop
            const tmp = player[swapIndex];
            player[swapIndex] = player[player.length - 1];
            player[player.length - 1] = tmp;

            // Discard the card
            player.pop();
            
            // Remove the discarded card from the player's cards
            card1.remove();

            // Rename the cards IDs to match the array's length
            var cards = document.getElementsByClassName("player-cards");
            for(var i = 0; i < cards.length; i++) {
                cards[i].id = "player-card-" + (i + 1);
            }

            // TODO: Remove before production
            console.log("Actual player's cards: ");
            for(let i = 0; i < player.length; i++) {
                console.log(player[i]);
            }

            // Start player round
            button.disabled = false;
            button.style.opacity = 1;
            button.style.cursor = "pointer";
            playerRound();
        }
        else {
            // TODO: Impelement the error in the discard
            // Enable the button and change the opacity
            button.disabled = false;
            button.style.opacity = 1;
            button.style.cursor = "pointer";
            playerRound();
        }
    }, 1000);
}

function setOpponentDelay() {
    // Change the button text
    button.innerHTML = "Turno avversario...";
    // Disable the button and change the opacity
    button.disabled = true;
    button.style.opacity = 0.5;
    button.style.cursor = "not-allowed";

    // Set the delay for the opponent round
    setTimeout(() => {
        opponentRound();
    }, 2000);
}

function drawCard() {
    // Remove the event listener
    button.removeEventListener("click", drawCard);
    // TODO: Remove before the final version
    console.log(cards);
    // Pick a card from the deck
    var card = cards.pop();
    // TODO: Remove before the final version
    console.log(cards);
    // Visualize the card in the p inside the div "draw"
    var draw = document.getElementById("draw");
    draw.innerHTML = card;

    // Retrieve all the player cards
    var cardsToRemove = document.getElementsByClassName("player-cards");

    // Add the event listener to all the cards
    for(var i = 0; i < cardsToRemove.length; i++) {
        cardsToRemove[i].addEventListener("click", checkSwap);
        cardsToRemove[i].persPosition = i;
    }

    // Change the button text 
    button.innerHTML = "Scarta";
    // Add the event listener to the button
    button.addEventListener("click", discardCard);
}

/** 
 * Function to discard the drew card
 */
function discardCard() {
    // Remove event listener from all the cards
    var cardsToRemove = document.getElementsByClassName("player-cards");
    for(var i = 0; i < cardsToRemove.length; i++) {
        cardsToRemove[i].removeEventListener("click", checkSwap);
    }

    // TODO: Remove before the final version
    console.log(cards);

    // Remove the event listener
    button.removeEventListener("click", discardCard);
    // Add the drew card value to the table card
    var table = document.getElementById("table");
    table.innerHTML = document.getElementById("draw").innerHTML;
    // Remove the drew card
    document.getElementById("draw").innerHTML = "";

    // Start the opponent round
    setOpponentDelay();
}

/**
 * Function to check which option the player choose
 * @param {*} event 
 */
function checkSwap(event) {
    // Get the card
    var drewCard = document.getElementById("draw");
    // Get the card to swap
    var card = event.currentTarget.persPosition;
    
    // Show the player card
    var card1 = document.getElementById("player-card-" + (card + 1));
    card1.innerHTML = player[card];
    card1.style.backgroundImage = "none";

    // Wait one second before swapping the card
    setTimeout(() => {
        var toDiscard = player[card];
        // Swap the card
        player[card] = parseInt(drewCard.innerHTML);
        // Hide the card
        card1.innerHTML = "";
        card1.style.backgroundImage = "url('assets/images/card-back.png')";

        // Discard the swapped card
        var table = document.getElementById("table");
        table.innerHTML = toDiscard;

        drewCard.innerHTML = "";

        // Remove the event listener from all the cards
        var cardsToRemove = document.getElementsByClassName("player-cards");
        for(var i = 0; i < cardsToRemove.length; i++) {
            cardsToRemove[i].removeEventListener("click", checkSwap);
        }
        document.getElementById("mainbtn").removeEventListener("click", discardCard);

        // Start the opponent round
        setOpponentDelay();

    }, 1000);
}

/**
 * Check if the page is loaded
 */
document.addEventListener("DOMContentLoaded", function() {
    // Get the main button
    button = document.getElementById("mainbtn");
    
    // Add the event listener
    button.addEventListener("click", play);
});