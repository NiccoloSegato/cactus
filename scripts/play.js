// Deck of cards
var cards = [0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3, 3, 3, 4, 4, 4, 4, 4, 4, 4, 4, 5, 5, 5, 5, 5, 5, 5, 5, 6, 6, 6, 6, 6, 6, 6, 6, 7, 7, 7, 7, 7, 7, 7, 7, 8, 8, 8, 8, 8, 8, 8, 8, 9, 9, 9, 9, 9, 9, 9, 9, 10, 10, 10, 10, 10, 10, 10, 10, 11, 11, 11, 11, 11, 11, 11, 11, 12, 12, 12, 12, 12, 12, 12, 12, 13, 13, 13, 13, 13, 13, 13, 13];

// Players decks
var player = [];
var opponent = [];

// Player lifes
let playerLifes = 3;

// Main button reference
var button;

/**
 * Boolean to check if the player has called cactus
 * False if the player hasn't called cactus, true otherwise
 * @type {boolean}
 * @default false
 */
let isCactus = false;

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
 * This function will show the first two cards to the player
 */
function showTwoCards() {
    // Show the first two cards to the player
    var card1 = document.getElementById("player-card-1");
    var front1 = document.getElementById("player-front-1");
    front1.innerHTML = player[0];
    card1.classList.toggle('flipped');

    var card2 = document.getElementById("player-card-2");
    var front2 = document.getElementById("player-front-2");
    front2.innerHTML = player[1];
    card2.classList.toggle('flipped');

    // Change the button text
    button.innerHTML = "Iniziamo!";
    button.addEventListener("click", startFirstRound);
}

/**
 * Function called after the user pressed "Iniziamo!" button and flip the cards
 */
function hideTwoCards() {
    // Hide the first two cards to the player
    var card1 = document.getElementById("player-card-1");
    var front1 = document.getElementById("player-front-1");
    front1.innerHTML = "";
    card1.classList.toggle('flipped');

    var card2 = document.getElementById("player-card-2");
    var front2 = document.getElementById("player-front-2");
    front2.innerHTML = "";
    card2.classList.toggle('flipped');

}

/**
 * Ask the player the confirmation to start the first round
 */
function startFirstRound() {
    // Remove the event listener
    button.removeEventListener("click", startFirstRound);

    // Show the Cactus button
    document.getElementById("cactusbtn").style.display = "block";
    
    hideTwoCards();
    playerRound();
}

/**
 * This function will start the game
 */
function play() {
    // Remove the event listener
    button.removeEventListener("click", play);
    
    // Shuffle the deck
    shuffle();

    // Deal the cards
    dealCards();

    // Show the first two cards to the player
    showTwoCards();
}

/**
 * Function to start the player round
 */
function playerRound() {
    // Show the Cactus button
    document.getElementById("cactusbtn").style.display = "block";
    // Change the button text
    button.innerHTML = "Pesca";
    // Remove the previous event listener
    button.addEventListener("click", drawCard);
}

/**
 * Function to start the opponent round
 */
function opponentRound() {
    // Draw a card from the deck
    var card = cards.pop();

    // Find the highest card of the opponent
    var highest = Math.max(...opponent);
    
    // Check if the drew card is higher than the highest card
    if(card < highest) {
        // Swap the card with the highest card
        var index = opponent.indexOf(highest);
        opponent[index] = card;

        // Discard the card with the swapped one
        var table = document.getElementById("table");
        table.innerHTML = highest;

        // Check if the opponent has a good chance to win
        opponentCactusCallCheck();

        setTimeout(() => {
            askPlayerDiscard();
        }, 1000);
    } else {
        // Discard the card
        var table = document.getElementById("table");
        table.innerHTML = card;

        // Check if the opponent has a good chance to win
        opponentCactusCallCheck();

        setTimeout(() => {
            askPlayerDiscard();
        }, 1000);
    }
}

/**
 * Function executed when the opponent's round is finished. Ask the player if he wants to discard a card on top of the opponent's discarded card
 */
function askPlayerDiscard() {
    // Ask the player if he wants to discard a card only if the player not called cactus
    if(!isCactus) {
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
    else {
        checkWinner();
        return;
    }
}

/**
 * This function ask the player to discard a card in the opponent's turn
 * @param {Element} event The card clicked by the player
 */
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

    // Show the player selected card
    var card1 = document.getElementById("player-card-" + (swapIndex + 1));
    var front1 = document.getElementById("player-front-" + (swapIndex + 1));
    front1.innerHTML = player[swapIndex];
    card1.classList.toggle('flipped');

    // Wait a second before checking if discard the card
    setTimeout(() => {
        // Check if the card value is the same as the discarded card
        if(player[swapIndex] == document.getElementById("table").innerHTML) {
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
            var fronts = document.getElementsByClassName("player-front");
            for(var i = 0; i < cards.length; i++) {
                cards[i].id = "player-card-" + (i + 1);
                fronts[i].id = "player-front-" + (i + 1);
            }

            // Start player round
            button.disabled = false;
            button.style.opacity = 1;
            button.style.cursor = "pointer";
            playerRound();
        }
        else {
            // Remove a player life
            playerLifes--;
            document.getElementById("player-lifes").innerHTML = "<i class=\"fa-solid fa-heart\"></i> " + playerLifes;

            // Turn the card back
            front1.innerHTML = "";
            card1.classList.toggle('flipped');

            if(playerLifes == 0) {
                // Player lost
                endGameIfPlayerLifesAreZero();
                return;
            }

            // Enable the button and change the opacity
            button.disabled = false;
            button.style.opacity = 1;
            button.style.cursor = "pointer";
            playerRound();
        }
    }, 1000);
}

/**
 * Function to end the game if the player has no more lifes
 */
function endGameIfPlayerLifesAreZero() {
    location.href = "results.html?r=endlife&p=0&o=0";
}

/**
 * Function to check if the opponent has the card that the player discarded, and discard it
 */
function opponentDiscardInPlayerTurn() {
    // Get the discarded card value
    let discardedValue = parseInt(document.getElementById("table").innerHTML);

    // Check if the discarded value from the player is present in the opponent deck
    if(opponent.includes(discardedValue)) {
        // Get the index of the discarded value
        let index = opponent.indexOf(discardedValue);
        
        // Swap the position between the last element and the one I want to pop
        const tmp = opponent[index];
        opponent[index] = opponent[opponent.length - 1];
        opponent[opponent.length - 1] = tmp;

        // Discard the card
        opponent.pop();

        // Show the card and add a delay to be visible
        var card = document.getElementById("opponent-card-" + (index + 1));
        var front = document.getElementById("opponent-front-" + (index + 1));
        front.innerHTML = discardedValue;
        card.classList.toggle('flipped');

        // Wait a second before removing the card
        setTimeout(() => {
            // Remove the card from the opponent's cards
            document.getElementById("opponent-card-" + (index + 1)).remove();

            // Rename the cards IDs to match the array's length
            var cards = document.getElementsByClassName("opponent-cards");
            var front = document.getElementsByClassName("opponent-front");
            for(var i = 0; i < cards.length; i++) {
                cards[i].id = "opponent-card-" + (i + 1);
                front[i].id = "opponent-front-" + (i + 1);
            }
        }, 1000);
    }
}

/**
 * Function to set the delay for the opponent round
 */
function setOpponentDelay() {
    // Remove button event listener
    button.removeEventListener("click", setOpponentDelay);

    if(!isCactus) {
        // Hide the Cactus button
        document.getElementById("cactusbtn").style.display = "none";
    }

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

/**
 * Function to draw a card from the deck
 */
function drawCard() {
    // Remove the event listener
    button.removeEventListener("click", drawCard);
    // Pick a card from the deck
    var card = cards.pop();
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

    // Remove the event listener
    button.removeEventListener("click", discardCard);
    // Add the drew card value to the table card
    var table = document.getElementById("table");
    table.innerHTML = document.getElementById("draw").innerHTML;
    // Remove the drew card
    document.getElementById("draw").innerHTML = "";

    // Opponent discard algorithm
    opponentDiscardInPlayerTurn();

    // Start the opponent round
    setOpponentDelay();
}

/**
 * Function to check which option the player choose
 * @param {Element} event The card the player clicked
 */
function checkSwap(event) {
    // Get the card
    var drewCard = document.getElementById("draw");
    // Get the card to swap
    var card = event.currentTarget.persPosition;
    
    // Show the player card
    var card1 = document.getElementById("player-card-" + (card + 1));
    var front1 = document.getElementById("player-front-" + (card + 1));
    front1.innerHTML = player[card];
    card1.classList.toggle('flipped');

    // Wait one second before swapping the card
    setTimeout(() => {
        var toDiscard = player[card];
        // Swap the card
        player[card] = parseInt(drewCard.innerHTML);
        // Hide the card
        front1.innerHTML = "";
        card1.classList.toggle('flipped');

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

        // Opponent discard algorithm
        opponentDiscardInPlayerTurn();

        // Wait for player to choose if call cactus or continue game
        button.innerHTML = "Concludi turno";
        button.addEventListener("click", setOpponentDelay);

    }, 1000);
}

/**
 * Function to check if the opponent has good chances to win
 * If the opponent has a good chance to win, it will call the cactus function
 */
function opponentCactusCallCheck() {
    // Generating a random number between 2 and 5
    var random = Math.floor(Math.random() * 4) + 2;

    // Check the opponent's cards
    var opponentSum = opponent.reduce((a, b) => a + b, 0);

    // If the opponent's sum is lower than the random number, call the cactus function
    if(opponentSum < random) {
        playerCactus();
    }
}

/**
 * Function called when the opponent algorithm called a cactus
 * It will start the last round of the game
 */
function opponentCactus() {
    isCactus = true;

    // Disable the cactus button and change the opacity
    let cactusbtn = document.getElementById("cactusbtn");
    cactusbtn.disabled = true;
    cactusbtn.style.opacity = 0.5;
    cactusbtn.style.cursor = "not-allowed";
    cactusbtn.innerHTML = "CACTUS! per l'avversario";
    
    // Start the last round
    playerRound();
}

/**
 * Function called when the user click the cactus button
 * It start the last round of the game
 */
function playerCactus() {
    isCactus = true;

    // Disable the cactus button and change the opacity
    let cactusbtn = document.getElementById("cactusbtn");
    cactusbtn.disabled = true;
    cactusbtn.style.opacity = 0.5;
    cactusbtn.style.cursor = "not-allowed";
    cactusbtn.innerHTML = "Hai chiamato CACTUS!";
}

/**
 * Function to check the winner after a cacuts call
 */
function checkWinner() {
    // Check the winner
    var playerSum = player.reduce((a, b) => a + b, 0);
    var opponentSum = opponent.reduce((a, b) => a + b, 0);

    // Check the winner
    if(playerSum < opponentSum) {
        location.href = "results.html?r=win&p=" + playerSum + "&o=" + opponentSum;
    }
    else if(playerSum > opponentSum) {
        location.href = "results.html?r=lose&p=" + playerSum + "&o=" + opponentSum;
    }
    else {
        location.href = "results.html?r=draw&p=" + playerSum + "&o=" + opponentSum;
    }
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