
function spawnBears(count = 12) {
    for (let i = 0; i < count; i++) {
        const img = document.createElement("img");
        img.src = "./images/bear_image.png";
        img.classList.add("bg-bear");
        img.style.top                = (Math.random() * 90 + 5) + "%";
        img.style.width              = (Math.random() * 100 + 60) + "px";
        img.style.animationDuration  = (Math.random() * 20 + 15) + "s";
        img.style.animationDelay     = -(Math.random() * 30) + "s";
        document.body.appendChild(img);
    }
}

if (inventory.bears) spawnBears();
