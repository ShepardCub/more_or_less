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



// Variables du jeu
let secretNumber = Math.floor(Math.random() * 100) + 1;
let attempts = 0;
let wins = Number(localStorage.getItem("wins")) || 0;
const inventory = JSON.parse(localStorage.getItem("inventory")) || {};

scoreDisplay.textContent = "Score : " + wins;


    console.log(inventory);

applyEffects();



// Fonction pour vérifier la réponse
function checkGuess() {
    const guess = Number(guessInput.value);

    if (!guess || guess < 1 || guess > 100) {
        message.textContent = "⚠️ Entre un nombre valide entre 1 et 100.";
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
        message.textContent = "🎉 INCROYABLE ! Tu as trouvé !";
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


    attemptsDisplay.textContent = "Nombre d'essais : " + attempts;
    scoreDisplay.textContent = "Score : " + wins;

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
    document.body.style.backgroundColor = "#888888";

    guessInput.style.border = "";
    guessInput.style.boxShadow = "";

    // 🔄 Rendre le champ et le bouton visibles à nouveau
    guessInput.style.display = "inline-block";
    checkBtn.style.display = "inline-block";

    message.style.display = "none";
    attemptsDisplay.style.display = "none";
}

function showDirection(guess, secretNumber){

    var textDirection = "\n";
    if (guess < secretNumber) {
        if(inventory.direction){
            textDirection+="📉 ";
        }
        textDirection += "Trop petit !";
    } else if (guess > secretNumber) {
        if(inventory.direction){
            textDirection+="📈 ";
        }
        textDirection += "Trop grand !";
    }

    message.textContent += textDirection;
}

function showProximity(difference){
    if (difference <= 5) {
        message.textContent = "🔥 Brûlant !!";
        document.body.classList.add("hot");
    }
    else if (difference <= 15) {
        message.textContent = "🌡️ Tu chauffes...";
        document.body.classList.add("warm");
    }
    else {
        message.textContent = "🧊 Très froid !";
        document.body.classList.add("cold");
    }

    setDynamicBackgroundColor(difference)
}


function applyEffects() {

    if (inventory.gold) {
        guessInput.style.border = "3px solid gold";
    }

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