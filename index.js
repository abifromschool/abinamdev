
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

//Loads projects from JSON
fetch('data/projects.json')
  .then(res => res.json())
  .then(data => {
    const wrapper = document.getElementById('projectContainer');
    wrapper.innerHTML = '';

    data.forEach(project => {
      const box = document.createElement('div');
      box.className = 'box';
      box.innerHTML = `
        <h2>${project.title}</h2>
        <p>${project.description}</p>
        <img src="${project.image}" alt="${project.title}">
      `;
      wrapper.appendChild(box);
    });
  })
  .catch(err => {
    console.error("Failed to load projects:", err);
  });