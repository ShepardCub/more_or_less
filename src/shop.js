shopBtn.addEventListener("click", () => {
    shop.style.display = "flex";
});

closeShop.addEventListener("click", closeShopPanel);

// Fermer en cliquant sur l'overlay
shop.addEventListener("click", (e) => {
    if (e.target === shop) {
        closeShopPanel();
    }
});

const prices = {
    direction: 3,
    gold: 5,
    proximity: 3,
    hint: 4,
};

document.querySelectorAll(".buy").forEach(button => {
    const item = button.dataset.item;

    // Marquer les items déjà possédés
    if (inventory[item]) {
        markOwned(button, item);
    }



    button.addEventListener("click", () => {
        if (wins >= prices[item]) {
            wins -= prices[item];
            localStorage.setItem("wins", wins);
            scoreDisplay.textContent = "Score : " + wins;

            inventory[item] = true;
            localStorage.setItem("inventory", JSON.stringify(inventory));

            markOwned(button, item);
            applyEffects();

            // Feedback visuel au lieu d'alert
            showToast(t("bought"));

        } else {
            showToast(t("notEnough"));
        }
    });
});

function markOwned(button, item) {
    button.disabled = true;
    button.textContent = t("owned");

    const shopItem = document.getElementById("item-" + item);
    if (shopItem) shopItem.classList.add("owned");
}

// Toast notification (remplace alert)
function showToast(msg) {
    const existing = document.getElementById("toast");
    if (existing) existing.remove();

    const toast = document.createElement("div");
    toast.id = "toast";
    toast.textContent = msg;
    toast.style.cssText = `
        position: fixed;
        bottom: 30px;
        left: 50%;
        transform: translateX(-50%) translateY(10px);
        background: #1a1e35;
        border: 1.5px solid rgba(124,106,255,0.4);
        color: #e8eaff;
        padding: 12px 22px;
        border-radius: 12px;
        font-family: 'Rajdhani', sans-serif;
        font-size: 0.95rem;
        font-weight: 600;
        letter-spacing: 0.5px;
        box-shadow: 0 10px 30px rgba(0,0,0,0.5);
        z-index: 999;
        opacity: 0;
        transition: all 0.3s cubic-bezier(0.34,1.56,0.64,1);
    `;
    document.body.appendChild(toast);

    requestAnimationFrame(() => {
        toast.style.opacity = "1";
        toast.style.transform = "translateX(-50%) translateY(0)";
    });

    setTimeout(() => {
        toast.style.opacity = "0";
        toast.style.transform = "translateX(-50%) translateY(10px)";
        setTimeout(() => toast.remove(), 300);
    }, 2200);
}

const skillBuyBtn = document.getElementById("skillbuy-btn");

function updateSkillCard() {
    const icon      = document.getElementById("skill-icon");
    const lvlBadge  = document.getElementById("skill-lvl");
    const rowConf   = document.getElementById("row-confetti");
    const dotConf   = document.getElementById("dot-confetti");
    const priceConf = document.getElementById("price-confetti");
    const rowStars  = document.getElementById("row-stars");
    const dotStars  = document.getElementById("dot-stars");
    const starsDesc = document.getElementById("stars-desc");

    if (inventory.stars) {
        icon.textContent      = "⭐";
        lvlBadge.className    = "card-lvl lvl3";
        lvlBadge.textContent  = "NIV 2 / 2 ✓";

        rowConf.className  = "level-row done";
        dotConf.className  = "level-dot done";
        dotConf.textContent = "✓";
        priceConf.textContent = "";

        rowStars.className  = "level-row done";
        dotStars.className  = "level-dot done";
        dotStars.textContent = "✓";
        starsDesc.textContent = "Acquis";

        skillBuyBtn.textContent = "✔ COLLECTION COMPLÈTE";
        skillBuyBtn.className   = "upgrade-btn done";
        skillBuyBtn.disabled    = true;

    } else if (inventory.confetti) {
        icon.textContent      = "🎆";
        lvlBadge.className    = "card-lvl lvl1";
        lvlBadge.textContent  = "NIV 1 / 2";

        rowConf.className  = "level-row done";
        dotConf.className  = "level-dot done";
        dotConf.textContent = "✓";
        priceConf.textContent = "";

        rowStars.className  = "level-row current";
        dotStars.className  = "level-dot current";
        dotStars.textContent = "2";
        starsDesc.textContent = "Disponible à l'achat";

        skillBuyBtn.textContent = "⚡ UPGRADE NIV.2 — 🏆 6";
        skillBuyBtn.className   = "upgrade-btn";
        skillBuyBtn.disabled    = false;

    } else {
        icon.textContent      = "🎆";
        lvlBadge.className    = "card-lvl lvl0";
        lvlBadge.textContent  = "NIV 0 / 2";

        rowConf.className  = "level-row current";
        dotConf.className  = "level-dot current";
        dotConf.textContent = "1";
        priceConf.textContent = "🏆 4";

        rowStars.className  = "level-row locked";
        dotStars.className  = "level-dot locked";
        dotStars.textContent = "2";
        starsDesc.textContent = "Verrouillé";

        skillBuyBtn.textContent = "⚡ ACHETER NIV.1 — 🏆 4";
        skillBuyBtn.className   = "upgrade-btn";
        skillBuyBtn.disabled    = false;
    }
}

function closeShopPanel() {
    shop.classList.add("closing");
    setTimeout(() => {
        shop.style.display = "none";
        shop.classList.remove("closing");
    }, 200);
}

skillBuyBtn.addEventListener("click", () => {
    if (!inventory.confetti) {
        if (wins >= 4) {
            wins -= 4;
            inventory.confetti = true;
            localStorage.setItem("wins", wins);
            localStorage.setItem("inventory", JSON.stringify(inventory));
            scoreDisplay.textContent = t("score") + wins;
            updateSkillCard();
            showToast(t("bought"));
        } else {
            showToast(t("notEnough"));
        }
    } else if (!inventory.stars) {
        if (wins >= 6) {
            wins -= 6;
            inventory.stars = true;
            localStorage.setItem("wins", wins);
            localStorage.setItem("inventory", JSON.stringify(inventory));
            scoreDisplay.textContent = t("score") + wins;
            updateSkillCard();
            showToast(t("bought"));
        } else {
            showToast(t("notEnough"));
        }
    }
});



// Init au chargement
updateSkillCard();
