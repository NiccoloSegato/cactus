/**
 * Check if the page is loaded
 */
document.addEventListener("DOMContentLoaded", function() {
    // Get the leaderboard from the local storage
    let leaderboard = JSON.parse(localStorage.getItem("leaderboard"));

    console.log(leaderboard);

    // Check if the leaderboard is empty
    if (leaderboard === null) {
        let box = document.createElement("p");
        box.id = "leaderboad-noresults";
        box.innerHTML = "Nessun risultato da mostrare";

        document.getElementById("leaderboard-box").appendChild(box);

    }
    else {
        // Turn the leaderboard front to back
        leaderboard.reverse();
        // For each result in the leaderboard
        for (let i = 0; i < leaderboard.length; i++) {
            // Create the content
            let resbox = document.createElement("div");
            let subtitle = document.createElement("p");
            let title = document.createElement("p");
            resbox.classList.add("lead-resb");
            subtitle.classList.add("lead-subtitle");
            title.classList.add("lead-title");

            let resTranslated = "Pareggio";
            if (leaderboard[i].result === "lose") {
                resTranslated = "Sconfitta";
            }
            else if (leaderboard[i].result === "win") {
                resTranslated = "Vittoria";
            }

            // Set the content
            subtitle.innerHTML = leaderboard[i].date + " - " + resTranslated;
            title.innerHTML = leaderboard[i].player + "-" + leaderboard[i].opponent;
            
            // Append the content to the box
            resbox.appendChild(title);
            resbox.appendChild(subtitle);

            // Append the box to the leaderboard box
            document.getElementById("leaderboard-box").appendChild(resbox);
        }


        // Append the table to the leaderboard box
        document.getElementById("leaderboard-box").appendChild(table);
    }
});