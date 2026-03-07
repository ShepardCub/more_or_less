// 🎯 LISTENERS
checkBtn.addEventListener("click", checkGuess);
restartBtn.addEventListener("click", restartGame);

// Permet d'appuyer sur Entrée pour valider
guessInput.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
        checkGuess();
    }
});

