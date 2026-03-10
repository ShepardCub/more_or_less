const translations = {
    fr: {
        title: "🎯 Devine",
        subtitle: "Choisis un nombre entre 1 et 100",
        validate: "Valider",
        restart: "↺ Recommencer",
        shop: "🛒 Magasin",
        shopTitle: "⚡ MAGASIN",
        shopSubtitle: "Dépense tes victoires pour des pouvoirs",
        close: "Fermer",
        score: "Score : ",
        attempts: "Nombre d'essais : ",
        win: "🎉 INCROYABLE ! Tu as trouvé !",
        invalid: "⚠️ Entre un nombre valide entre 1 et 100.",
        tooCold: "🧊 Très froid !",
        warm: "🌡️ Tu chauffes...",
        hot: "🔥 Brûlant !!",
        tooSmall: "Trop petit !",
        tooBig: "Trop grand !",
        bought: "✅ Objet acheté !",
        notEnough: "❌ Pas assez de victoires !",
        owned: "✔ Acquis",
        hint: "Le nombre est ",
        even: "pair",
        odd: "impair",
        title: "Effets victoire",
        confettiName: "Confettis",
        starsName: "+ Étoiles",
        items: {
            direction: { name: "Direction", desc: "Affiche 📉 ou 📈 à chaque essai" },
            proximity: { name: "Proximité", desc: "Indique si tu es chaud ou froid" },
            gold: { name: "Bordure dorée", desc: "Un style légendaire pour ton input" },
            confetti: { name: "Confettis", desc: "Animation de victoire explosive" },
            bears: { name: "Ours en fond", desc: "Des ours traversent l'écran" },
            hint: { name: "Indice", desc: "Révèle si le nombre est pair ou impair" },
            victoryFx: {
                name: "Effets victoire", cardLvl0: "NIV 0 / 2", cardLvl1: "NIV 1 / 2", cardLvl2: "NIV 2 / 2 ✓",
                buyNiv1: "⚡ ACHETER NIV.1 — 🏆 4", upgradeNiv2: "⚡ UPGRADE NIV.2 — 🏆 6",
                complete: "✔ COLLECTION COMPLÈTE",
                confettiName: "Confettis", confettiDesc: "Disponible à l'achat", confettiLocked: "Verrouillé",
                starsName: "+ Étoiles", starsAvailable: "Disponible à l'achat", starsLocked: "Verrouillé", starsOwned: "Acquis"
            },
        }
    },
    en: {
        title: "🎯 Guess",
        subtitle: "Pick a number between 1 and 100",
        validate: "Validate",
        restart: "↺ Restart",
        shop: "🛒 Shop",
        shopTitle: "⚡ SHOP",
        shopSubtitle: "Spend your wins to unlock powers",
        close: "Close",
        score: "Score: ",
        attempts: "Attempts: ",
        win: "🎉 INCREDIBLE! You found it!",
        invalid: "⚠️ Enter a valid number between 1 and 100.",
        tooCold: "🧊 Ice cold!",
        warm: "🌡️ Getting warmer...",
        hot: "🔥 Burning hot!!",
        tooSmall: "Too small!",
        tooBig: "Too big!",
        bought: "✅ Item purchased!",
        notEnough: "❌ Not enough wins!",
        owned: "✔ Owned",
        hint: "The number is ",
        even: "even",
        odd: "odd",
        title: "Victory effects",
        confettiName: "Confetti",
        starsName: "+ Stars",
        items: {
            direction: { name: "Direction", desc: "Shows 📉 or 📈 each guess" },
            proximity: { name: "Proximity", desc: "Tells you if you're hot or cold" },
            bears: { name: "Bears background", desc: "Bears walk across the screen" },
            gold: { name: "Golden border", desc: "A legendary style for your input" },
            confetti: { name: "Confetti", desc: "Explosive victory animation" },
            hint: { name: "Hint", desc: "Reveals if the number is even or odd" },
            victoryFx: {
                name: "Victory effects", cardLvl0: "LVL 0 / 2", cardLvl1: "LVL 1 / 2", cardLvl2: "LVL 2 / 2 ✓",
                buyNiv1: "⚡ BUY LVL.1 — 🏆 4", upgradeNiv2: "⚡ UPGRADE LVL.2 — 🏆 6",
                complete: "✔ COLLECTION COMPLETE",
                confettiName: "Confetti", confettiDesc: "Available for purchase", confettiLocked: "Locked",
                starsName: "+ Stars", starsAvailable: "Available for purchase", starsLocked: "Locked", starsOwned: "Owned"
            },

        }
    }
};

let currentLang = localStorage.getItem("lang")
    || (navigator.language.startsWith("fr") ? "fr" : "en");

function t(key) {
    return translations[currentLang][key] || key;
}

function setLang(lang) {
    currentLang = lang;
    localStorage.setItem("lang", lang);
    applyTranslations();
}

function applyTranslations() {
    // Jeu
    document.querySelector("h1").textContent = t("title");
    document.querySelector(".game-container > p").textContent = t("subtitle");
    document.getElementById("checkBtn").textContent = t("validate");
    document.getElementById("restartBtn").textContent = t("restart");
    document.getElementById("shopBtn").textContent = t("shop");

    // Shop
    document.querySelector(".shop-panel h2").textContent = t("shopTitle");
    document.querySelector(".shop-subtitle").textContent = t("shopSubtitle");
    document.getElementById("closeShop").textContent = t("close");

    // Items du shop
    Object.keys(translations[currentLang].items).forEach(key => {
        const el = document.getElementById("item-" + key);
        if (!el) return;
        el.querySelector(".item-name").textContent = t("items")[key].name;
        el.querySelector(".item-desc").textContent = t("items")[key].desc;
    });

    // Bouton langue
    document.getElementById("langBtn").textContent = currentLang === "fr" ? "🇬🇧 EN" : "🇫🇷 FR";
    updateSkillCard();
}