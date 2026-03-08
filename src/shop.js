shopBtn.addEventListener("click", () => {
    shop.style.display = "block";
});

closeShop.addEventListener("click", () => {
    shop.style.display = "none";
});


document.querySelectorAll(".buy").forEach(button => {

    if (inventory[button.dataset.item]) {
        button.disabled = true;
        button.textContent += " ✔";
        button.style.backgroundColor = "#118822"
    }

    button.addEventListener("click", () => {

        const item = button.dataset.item;
        const prices = {
            direction: 3,
            gold: 5,
            proximity: 3

        };

        if (wins >= prices[item]) {

            
            wins -= prices[item];
            localStorage.setItem("wins", wins);
            scoreDisplay.textContent = "Score : " + wins;

            inventory[item] = true;
            localStorage.setItem("inventory", JSON.stringify(inventory));

            button.disabled = true;
            button.textContent += " ✔";
            button.style.backgroundColor = "#118822"

            applyEffects();
            alert("Objet acheté !");
        }
        else {
            alert("Pas assez de victoires !");
        }

        

    });
});


