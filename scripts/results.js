/**
 * Check if the page is loaded
 */
document.addEventListener("DOMContentLoaded", function() {
    // Get the elements
    const title = document.getElementById("title");
    const desc = document.getElementById("desc");
    const player = document.getElementById("player");
    const opponent = document.getElementById("opponent");

    // Get from the URL if the user won or lost
    const urlParams = new URLSearchParams(window.location.search);
    const result = urlParams.get('r');
    const playerSum = urlParams.get('p');
    const opponentSum = urlParams.get('o');

    switch (result) {
        case "win":
            title.innerHTML = "Vittoria!";
            desc.innerHTML = "Complimenti, hai vinto!";
            player.innerHTML = playerSum;
            opponent.innerHTML = opponentSum;
            break;
        case "lose":
            title.innerHTML = "Sconfitta!";
            desc.innerHTML = "Non disperare, la prossima volta andrà meglio!";
            player.innerHTML = playerSum;
            opponent.innerHTML = opponentSum;
            break;
        case "draw":
            title.innerHTML = "Pareggio!";
            desc.innerHTML = "Nessuno ha vinto, nessuno ha perso!";
            player.innerHTML = playerSum;
            opponent.innerHTML = opponentSum;
            break;
        case "endlife":
            title.innerHTML = "Sconfitta!";
            desc.innerHTML = "Hai esaurito le vite, attento a quello che scarti!";
            player.innerHTML = 0;
            opponent.innerHTML = 0;
            break;
        default:
            title.innerHTML = "Qualcosa non va...";
            desc.innerHTML = "Non dovresti essere qui!";
            document.getElementById("results").style.display = "none";
            break;
    }

    // Save the result in the leaderboard
    saveResult(result, playerSum, opponentSum);
});

/**
 * Function to save the result in the leaderboard
 * @param {string} result The result of the match, can be "win", "lose", "draw" or "endlife"
 * @param {number} player The sum of the player's cards
 * @param {number} opponent The sum of the opponent's cards
 */
function saveResult(result, player, opponent) {
    // Get the leaderboard from the local storage
    let leaderboard = JSON.parse(localStorage.getItem("leaderboard"));

    // If the leaderboard is empty, create a new one
    if (leaderboard === null) {
        leaderboard = [];
    }

    // Get the current date
    const date = new Date();
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    const hours = date.getHours();
    const minutes = date.getMinutes();

    // Create the new result
    const newResult = {
        date: `${day}/${month}/${year} ${hours}:${minutes}`,
        result: result,
        player: player,
        opponent: opponent
    };

    // Add the new result to the leaderboard
    leaderboard.push(newResult);

    // Save the leaderboard in the local storage
    localStorage.setItem("leaderboard", JSON.stringify(leaderboard));
}