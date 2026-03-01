

    // Sélection des éléments
    const guessInput = document.getElementById("guessInput");
    const checkBtn = document.getElementById("checkBtn");
    const restartBtn = document.getElementById("restartBtn");
    const message = document.getElementById("message");
    const attemptsDisplay = document.getElementById("attempts");

    // Variables du jeu
    let secretNumber = Math.floor(Math.random() * 100) + 1;
    let attempts = 0;

    // Fonction pour vérifier la réponse
    function checkGuess() {
        const guess = Number(guessInput.value);

        if (!guess || guess < 1 || guess > 100) {
            message.textContent = "⚠️ Entre un nombre valide entre 1 et 100.";
            return;
        }

        attempts++;

        if (guess < secretNumber) {
            message.textContent = "📉 Trop petit !";
        } else if (guess > secretNumber) {
            message.textContent = "📈 Trop grand !";
        } else {
            message.textContent = "🎉 Bravo ! Tu as trouvé !";
            checkBtn.disabled = true; // bloque le bouton après victoire
        }

        attemptsDisplay.textContent = "Nombre d'essais : " + attempts;

        guessInput.value = "";
        guessInput.focus();
    }

    // Fonction pour recommencer
    function restartGame() {
        secretNumber = Math.floor(Math.random() * 100) + 1;
        attempts = 0;
        message.textContent = "";
        attemptsDisplay.textContent = "";
        guessInput.value = "";
        checkBtn.disabled = false;
    }

    // 🎯 LISTENERS
    checkBtn.addEventListener("click", checkGuess);
    restartBtn.addEventListener("click", restartGame);

    // Permet d'appuyer sur Entrée pour valider
    guessInput.addEventListener("keydown", function (event) {
        if (event.key === "Enter") {
            checkGuess();
        }
    });

