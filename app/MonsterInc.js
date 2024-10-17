// Hämta referenser till våra nödvänliga element
const monsterForm = document.querySelector("#monsterForm");
const submitButton = document.querySelector("#monsterForm button[type='submit']");
const monsterList = document.querySelector(".monster-container");
const numberOfMonsters = document.querySelector("#number-of-monsters");
const monsterHeader = document.querySelector("#monster-header");
const seeAllButton = document.querySelector(".see-all");
const seeAllList = document.getElementById("see-all-monsters");

// Nya referenser för filtrering
const typeFilter = document.getElementById("type-filter");
const colorFilter = document.getElementById("color-filter");

// Variabler vi använder
let monsters = [];
let monstersVisible = false; // Håller reda på om alla monster visas eller inte
let currentIndex = 0; // Håller reda på det aktuella monstret som visas

seeAllList.style.display = "none"; // Döljer "See all monsters" boxen tills man trycker på knappen

// Hantera formulärinlämning för att skapa/redigera monster
monsterForm.addEventListener("submit", (event) => {
  seeAllButton.textContent = "See All Monsters";
  event.preventDefault();

  // Hämta input-värden från formuläret
  const name = monsterForm.name.value;
  const type = monsterForm.type.value;
  const color = monsterForm.color.value;
  const tentacles = monsterForm.tentacles.value;
  const eyes = monsterForm.eyes.value;
  const horn = monsterForm.horn.value;
  const ears = monsterForm.ears.value;
  const wings = monsterForm.wings.value;

  // Kontrollera om ett monster redigeras eller skapas nytt
  const editIndex = monsterForm.getAttribute("data-edit-index");

  if (editIndex !== null) {
    // Redigera befintligt monster
    monsters[editIndex] = {
      name,
      type,
      color,
      tentacles,
      eyes,
      horn,
      ears,
      wings,
    };
    monsterForm.removeAttribute("data-edit-index");
    submitButton.textContent = "Add Monster";

    // Uppdatera endast "See All"-containern efter redigering
    updateMonsterList(monsters, seeAllList, true);
  } else {
    // Skapa nytt monster
    const newMonster = {
      name,
      type,
      color,
      tentacles,
      eyes,
      horn,
      ears,
      wings,
    };
    monsters.push(newMonster); // Lägg till det nya monstret i arrayen
    currentIndex = monsters.length - 1; // Visa det senaste tillagda monstret
  }

  // Uppdatera rubrik och antal monster
  updateMonsterVisibility();
  updateMonsterList(monsters, monsterList, false); // Uppdaterar den enskilda visningen
  monsterForm.reset();
  numberOfMonsters.textContent = `Number of monsters: ${monsters.length}`;
});

// Funktion för att uppdatera monsterlistan
function updateMonsterList(monstersToShow, targetElement, showAll = false) {
  targetElement.innerHTML = ""; // Rensa befintlig lista

  if (monstersToShow.length === 0) {
    targetElement.innerHTML = "<p>No monsters available</p>";
    return;
  }

  // Färger för bakgrund
  const colors = {
    "red": "rgb(255, 91, 65)",
    "blue": "rgb(135, 206, 250)",
    "green": "rgb(144, 238, 144)",
    "white": "rgb(245, 245, 245)",
    "black": "rgb(114, 114, 114)"
  };

  // Visa antingen alla monster eller bara det aktuella baserat på 'showAll'
  if (showAll) {
    monstersToShow.forEach((monster) => {
      const monsterDiv = createMonsterDiv(monster);
      targetElement.appendChild(monsterDiv);
    });
  } else {
    const monster = monstersToShow[currentIndex];
    const monsterDiv = createMonsterDiv(monster);
    targetElement.appendChild(monsterDiv);
  }
}

// Funktion för att skapa ett monster-div
function createMonsterDiv(monster) {
  const monsterDiv = document.createElement("div");
  monsterDiv.classList.add("monster-box");

  // Sätt bakgrundsfärgen baserat på RGB-värdet från 'colors' objektet
  const colors = {
    "red": "rgb(255, 91, 65)",
    "blue": "rgb(135, 206, 250)",
    "green": "rgb(144, 238, 144)",
    "white": "rgb(245, 245, 245)",
    "black": "rgb(114, 114, 114)"
  };
  monsterDiv.style.backgroundColor = colors[monster.color];

  monsterDiv.innerHTML = `
    <p><strong>Name:</strong> ${monster.name}</p>
    <p><strong>Type:</strong> ${monster.type}</p>
    <p><strong>Color:</strong> ${monster.color}</p>
    <p><strong>Tentacles:</strong> ${monster.tentacles}</p>
    <p><strong>Eyes:</strong> ${monster.eyes}</p>
    <p><strong>Horn:</strong> ${monster.horn}</p>
    <p><strong>Ears:</strong> ${monster.ears}</p>
    <p><strong>Wings:</strong> ${monster.wings}</p>
    <button class="edit-btn">Edit</button>
    <button class="delete-btn">Delete</button>
  `;

  // Hantera edit- och delete-knapparna
  monsterDiv.querySelector(".edit-btn").addEventListener("click", () => {
    const index = monsters.indexOf(monster);
    const monsterToEdit = monsters[index];
    monsterForm.name.value = monsterToEdit.name;
    monsterForm.type.value = monsterToEdit.type;
    monsterForm.color.value = monsterToEdit.color;
    monsterForm.tentacles.value = monsterToEdit.tentacles;
    monsterForm.eyes.value = monsterToEdit.eyes;
    monsterForm.horn.value = monsterToEdit.horn;
    monsterForm.ears.value = monsterToEdit.ears;
    monsterForm.wings.value = monsterToEdit.wings;
    submitButton.textContent = "Save Changes";
    monsterForm.setAttribute("data-edit-index", index);
  });

  monsterDiv.querySelector(".delete-btn").addEventListener("click", () => {
    const index = monsters.indexOf(monster);
    monsters.splice(index, 1); // Ta bort valt monster
    currentIndex = Math.max(0, currentIndex - 1); // Visa föregående monster om det sista monstret togs bort
    updateMonsterList(monsters, seeAllList, true); // Uppdatera endast i "See All"-containern
    numberOfMonsters.textContent = `Number of monsters: ${monsters.length}`;
    updateMonsterVisibility();
    seeAllList.style.display = "none";
    seeAllButton.textContent = "See All Monsters";
  });

  return monsterDiv;
}

// Funktion för att hantera visning/döljning av monster när "See All Monsters"-knappen trycks
function showAllMonsters() {
  monstersVisible = !monstersVisible;

  if (monstersVisible) {
    seeAllButton.textContent = "Hide All Monsters";
    updateMonsterList(monsters, seeAllList, true); // Visa alla monster
    seeAllList.style.display = "flex";
  } else {
    seeAllButton.textContent = "See All Monsters";
    seeAllList.style.display = "none"; // Dölj alla monster när de göms
  }
}

// Lägg till event listener för "See All Monsters"-knappen
seeAllButton.addEventListener("click", () => {
  showAllMonsters();
});

// Funktion för att uppdatera synligheten av H2-rubriken baserat på om det finns monster eller ej
function updateMonsterVisibility() {
  if (monsters.length > 0) {
    monsterHeader.style.display = "block";
  } else {
    monsterHeader.style.display = "none";
  }
}

// Funktion för att filtrera monster baserat på dropdown-menyerna
function filterMonsters() {
  const selectedType = typeFilter.value.toLowerCase();
  const selectedColor = colorFilter.value.toLowerCase();

  const filteredMonsters = monsters.filter((monster) => {
    const matchesType = selectedType === "" || monster.type.toLowerCase() === selectedType;
    const matchesColor = selectedColor === "" || monster.color.toLowerCase() === selectedColor;
    return matchesType && matchesColor;
  });

  updateMonsterList(filteredMonsters, seeAllList, true); // Uppdatera listan med filtrerade monster
}

// Lägg till event listeners för dropdown-filters
typeFilter.addEventListener("change", filterMonsters);
colorFilter.addEventListener("change", filterMonsters);

