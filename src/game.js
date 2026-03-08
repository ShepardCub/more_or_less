// Sélection des éléments
const shopBtn = document.getElementById("shopBtn");
const shop = document.getElementById("shop");
const closeShop = document.getElementById("closeShop");
const guessInput = document.getElementById("guessInput");
const checkBtn = document.getElementById("checkBtn");
const restartBtn = document.getElementById("restartBtn");
const message = document.getElementById("message");
const attemptsDisplay = document.getElementById("attempts");
const scoreDisplay = document.getElementById("wins");
const hintBtn = document.getElementById("hintBtn");



// Variables du jeu
let secretNumber = Math.floor(Math.random() * 100) + 1;
let attempts = 0;
let wins = Number(localStorage.getItem("wins")) || 0;
const inventory = JSON.parse(localStorage.getItem("inventory")) || {};
let hintUsed = false;

scoreDisplay.textContent = t("score") + wins;

applyEffects();



// Fonction pour vérifier la réponse
function checkGuess() {
    const guess = Number(guessInput.value);

    if (!guess || guess < 1 || guess > 100) {
        message.textContent = t("invalid");
        message.style.display = "block"; // même pour erreur
        return;
    }

    attempts++;

    // Afficher les messages et score si cachés
    message.style.display = "block";
    attemptsDisplay.style.display = "block";
    scoreDisplay.style.display = "block";
    message.textContent = "";
    const difference = Math.abs(secretNumber - guess);

    if (difference === 0) {
        message.textContent = t("win");
        checkBtn.disabled = true;

        // Effet spécial victoire
        message.classList.add("win");
        document.body.classList.add("win");

        // Champ de saisie clignotant
        guessInput.style.border = "3px solid gold";
        guessInput.style.boxShadow = "0 0 20px gold";

        // On cache les boutons
        guessInput.style.display = "none";
        checkBtn.style.display = "none";

        wins++;
        localStorage.setItem("wins", wins);

        if (inventory.confetti){ 
            launchConfetti();
        }

    }

    else{
        if(inventory.proximity){
            showProximity(difference);
        }

        showDirection(guess,secretNumber);
        


        guessInput.classList.add("shake");
        setTimeout(() => {
            guessInput.classList.remove("shake");
        }, 300);
    }


    attemptsDisplay.textContent = t("attempts") + attempts;
    scoreDisplay.textContent = t("score") + wins;

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

    // Supprimer les effets spéciaux
    message.classList.remove("win");
    document.body.classList.remove("win");
    document.body.style.backgroundColor = "var(--bg-dark)";

    guessInput.style.border = "";
    guessInput.style.boxShadow = "";

    // 🔄 Rendre le champ et le bouton visibles à nouveau
    guessInput.style.display = "inline-block";
    checkBtn.style.display = "inline-block";

    message.style.display = "none";
    attemptsDisplay.style.display = "none";

    hintUsed = false;
    hintBtn.disabled = false;
}

function showDirection(guess, secretNumber){

    var textDirection = "\n";
    if (guess < secretNumber) {
        if(inventory.direction){
            textDirection+="📉 ";
        }
        textDirection += t("tooSmall");
    } else if (guess > secretNumber) {
        if(inventory.direction){
            textDirection+="📈 ";
        }
        textDirection += t("tooBig");
    }

    message.textContent += textDirection;
}

function showProximity(difference){
    if (difference <= 5) {
        message.textContent = t("hot");
        document.body.classList.add("hot");
    }
    else if (difference <= 15) {
        message.textContent = t("warm");
        document.body.classList.add("warm");
    }
    else {
        message.textContent = t("tooCold");
        document.body.classList.add("cold");
    }

    setDynamicBackgroundColor(difference)
}


function applyEffects() {

    if (inventory.gold) {
        guessInput.style.border = "3px solid gold";
    }

    hintBtn.style.display = inventory.hint ? "inline-block" : "none";


}

function setDynamicBackgroundColor(difference){
        // Calcul d'une couleur entre bleu (froid) et rouge (chaud)
    const maxDiff = 100; // nombre max possible
    const ratio = Math.min(difference / maxDiff, 1); // 0 = exact, 1 = très loin

    // fonction pour interpoler couleurs
    function interpolateColor(ratio) {
        // du bleu (#4e73df) au rouge (#e74a3b)
        const r = Math.round(78 + (231 - 78) * (1 - ratio));
        const g = Math.round(115 + (74 - 115) * (1 - ratio));
        const b = Math.round(223 + (59 - 223) * (1 - ratio));
        return `rgb(${r},${g},${b})`;
    }

    // Applique le dégradé dynamique
    document.body.style.backgroundColor = interpolateColor(ratio);
}

// Colle cette fonction dans game.js
function launchConfetti() {
    const colors = ["#7c6aff", "#ff6a9b", "#f6c23e", "#1de98b", "#4e73df", "#ff4d6d"];
    const count = 120;

    for (let i = 0; i < count; i++) {
        setTimeout(() => {
            const confetti = document.createElement("div");
            const size = Math.random() * 10 + 6;
            const isCircle = Math.random() > 0.5;

            confetti.style.cssText = `
                position: fixed;
                width: ${size}px;
                height: ${size}px;
                background: ${colors[Math.floor(Math.random() * colors.length)]};
                border-radius: ${isCircle ? "50%" : "2px"};
                left: ${Math.random() * 100}vw;
                top: -20px;
                z-index: 9999;
                pointer-events: none;
                opacity: 1;
                transform: rotate(${Math.random() * 360}deg);
            `;

            document.body.appendChild(confetti);

            const duration = Math.random() * 2000 + 1500;
            const xDrift = (Math.random() - 0.5) * 200;

            confetti.animate([
                { transform: `translate(0, 0) rotate(0deg)`, opacity: 1 },
                { transform: `translate(${xDrift}px, 105vh) rotate(${Math.random() * 720}deg)`, opacity: 0 }
            ], {
                duration,
                easing: "cubic-bezier(0.25, 0.46, 0.45, 0.94)",
                fill: "forwards"
            }).onfinish = () => confetti.remove();

        }, i * 20);
    }
}

function useHint() {
    if (!inventory.hint) return;
    if (hintUsed) {
        showToast(t("hintUsed"));
        return;
    }
    hintUsed = true;
    const parity = secretNumber % 2 === 0 ? t("even") : t("odd");
    showToast(t("hint") + parity);
    hintBtn.disabled = true;
}