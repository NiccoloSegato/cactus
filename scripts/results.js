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

    if (result === "win") {
        title.innerHTML = "Vittoria!";
        desc.innerHTML = "Complimenti, hai vinto!";
        player.innerHTML = playerSum;
        opponent.innerHTML = opponentSum;
    }
    else if (result === "lose") {
        title.innerHTML = "Sconfitta!";
        desc.innerHTML = "Non disperare, la prossima volta andrà meglio!";
        player.innerHTML = playerSum;
        opponent.innerHTML = opponentSum;
    }
    else if (result === "draw") {
        title.innerHTML = "Pareggio!";
        desc.innerHTML = "Nessuno ha vinto, nessuno ha perso!";
        player.innerHTML = playerSum;
        opponent.innerHTML = opponentSum;
    }
    else {
        title.innerHTML = "Qualcosa non va...";
        desc.innerHTML = "Non dovresti essere qui!";
        document.getElementById("results").style.display = "none";
    }
});