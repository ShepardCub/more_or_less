shopBtn.addEventListener("click", () => {
    shop.style.display = "flex";
});

closeShop.addEventListener("click", () => {
    shop.style.display = "none";
});

// Fermer en cliquant sur l'overlay
shop.addEventListener("click", (e) => {
    if (e.target === shop) {
        shop.style.display = "none";
    }
});

const prices = {
    direction: 3,
    gold: 5,
    proximity: 3,
    confetti: 4,
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
