
//----------Waving hand-----------

const hand = document.getElementById("wavingHandEmoji");
let animationFrame;
let degree = 0;
let direction = 1;

function wave() {
    degree += 2 * direction;
    hand.style.transform = `rotate(${degree}deg)`;
    
    if (degree >= 20 || degree <= -20) {
        direction *= -1;
    }

    animationFrame = requestAnimationFrame(wave);
}

hand.addEventListener("mouseenter", () => {
    degree = 0;
    direction = 1;
    wave();
});

hand.addEventListener("mouseleave", () => {
    cancelAnimationFrame(animationFrame);
    hand.style.transform = "rotate(0deg)";
});

//------Project and table animations-----