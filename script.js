// 🎯 LISTENERS
checkBtn.addEventListener("click", checkGuess);
restartBtn.addEventListener("click", restartGame);
hintBtn.addEventListener("click", useHint);

// Permet d'appuyer sur Entrée pour valider
guessInput.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
        checkGuess();
    }
});

document.getElementById("langBtn").addEventListener("click", () => {
    setLang(currentLang === "fr" ? "en" : "fr");
});

applyTranslations();
