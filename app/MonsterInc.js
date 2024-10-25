// Central konfiguration för monster-egenskaper
const monsterConfig = {
  types: ["water", "fire", "earth"], // Här kan du lägga till nya typer
  colors: {
    "red": "rgb(255, 91, 65)",
    "blue": "rgb(135, 206, 250)",
    "green": "rgb(144, 238, 144)",
    "white": "rgb(245, 245, 245)",
    "black": "rgb(114, 114, 114)",
    // Lägg till nya färger här
  },
  attributes: ["tentacles", "eyes", "horn", "ears", "wings"] // Lägg till nya attribut här
};

// Hämta referenser till nödvändiga elementen i HTML
const monsterForm = document.querySelector("#monsterForm");
const submitButton = document.querySelector("#monsterForm button[type='submit']");
const monsterList = document.querySelector(".monster-container");
const numberOfMonsters = document.querySelector("#number-of-monsters");
const monsterHeader = document.querySelector("#monster-header");
const seeAllButton = document.querySelector(".see-all");
const seeAllList = document.getElementById("see-all-monsters");
const typeFilter = document.getElementById("type-filter");
const colorFilter = document.getElementById("color-filter");
const countDisplay = document.getElementById("countDisplay");

let monsters = [];
let monstersVisible = false;
let currentIndex = 0;

// Dölj boxen med alla monster från början
seeAllList.style.display = "none";

// Funktion för att fylla dropdown-menyer för typer och färger
function populateSelect(selectElement, options) {
  // Rensa befintliga alternativ
  selectElement.innerHTML = '<option value="" disabled selected>Select an option</option>';

  // Lägg till nya alternativ dynamiskt
  options.forEach(option => {
    const newOption = document.createElement("option");
    newOption.value = option.toLowerCase(); // Använd värdet som läggs till
    newOption.textContent = option.charAt(0).toUpperCase() + option.slice(1); 
    selectElement.appendChild(newOption);
  });
}


// Rensa den första populateSelect funktionen, 
function populateSelect(selectElement, options) {
  selectElement.innerHTML = '<option value="" disabled selected>Select an option</option>';
  options.forEach(option => {
    const opt = document.createElement("option");
    opt.value = option.toLowerCase();
    opt.textContent = option.charAt(0).toUpperCase() + option.slice(1);
    selectElement.appendChild(opt);
  });
}

// Fyll dropdown-menyer för monster-typ och färg
populateSelect(document.getElementById("type"), monsterConfig.types);
populateSelect(document.getElementById("color"), Object.keys(monsterConfig.colors));
populateSelect(typeFilter, ["", ...monsterConfig.types]); // Lägger till tomt alternativ för filter
populateSelect(colorFilter, ["", ...Object.keys(monsterConfig.colors)]);

// funktion förr lägga till attributes till html
function createAttributeInputs() {
  const attributesContainer = document.getElementById("attributes-container");
  // Loopar genom attribut och skapar ett input-fält för varje, om det inte redan finns
  monsterConfig.attributes.forEach(attribute => {
    if (!document.getElementById(attribute)) {
      const inputDiv = document.createElement("div"); 

      const label = document.createElement("label");
      label.setAttribute("for", attribute);
      label.textContent = attribute.charAt(0).toUpperCase() + attribute.slice(1);

      const input = document.createElement("input");
      input.setAttribute("type", "text");
      input.setAttribute("id", attribute);
      input.setAttribute("name", attribute); 
      input.setAttribute("placeholder", attribute);

      inputDiv.appendChild(label);
      inputDiv.appendChild(input);

      attributesContainer.appendChild(inputDiv);
    }
  });
}

createAttributeInputs();

// hämta sumbit
monsterForm.addEventListener("submit", (event) => {
  event.preventDefault();
  
  // Hämta värden dynamiskt baserat på monsterConfig.attributes
  const name = monsterForm.name.value;
  const type = monsterForm.type.value;
  const color = monsterForm.color.value;
  const newAttributes = {};
  
  // Iterera genom attributen och hämta värden från formuläret
  monsterConfig.attributes.forEach(attribute => {
    const attributeInput = document.getElementById(attribute);
    newAttributes[attribute] = attributeInput ? attributeInput.value : ""; // Lägg till attributvärdet eller en tom sträng om det saknas
  });

  // Kontrollera om vi redigerar ett befintligt monster
  const editIndex = monsterForm.getAttribute("data-edit-index");

  if (editIndex !== null) {
    monsters[editIndex] = {
      name,
      type,
      color,
      ...newAttributes
    };
    monsterForm.removeAttribute("data-edit-index");
    submitButton.textContent = "Add Monster";
    updateMonsterList(monsters, seeAllList, true);
  } else {
    const newMonster = {
      name,
      type,
      color,
      ...newAttributes
    };
    monsters.push(newMonster);
    currentIndex = monsters.length - 1;
  }

  updateMonsterVisibility();
  updateMonsterList(monsters, monsterList, false);
  monsterForm.reset();
  numberOfMonsters.textContent = `Number of monsters: ${monsters.length}`;
});


// Funktion för att uppdatera monsterlistan
function updateMonsterList(monstersToShow, targetElement, showAll = false) {
  targetElement.innerHTML = ""; // Rensa befintlig lista

  if (monstersToShow.length === 0) {
    const p = document.createElement('p');
    p.textContent = 'No monsters available';
    p.classList.add('no-monsters'); // Lägg till CSS-klassen
  
    targetElement.innerHTML = ''; // Rensa innehållet i elementet
    targetElement.appendChild(p); // Lägg till det nya p-elementet
    return;
  }

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

// Funktion för att skapa en div för ett enskilt monster
function createMonsterDiv(monster) {
  const monsterDiv = document.createElement("div");
  monsterDiv.classList.add("monster-box");
  monsterDiv.style.backgroundColor = monsterConfig.colors[monster.color];

  let attributeHTML = "";
  monsterConfig.attributes.forEach(attr => {
    attributeHTML += `<p><strong>${attr.charAt(0).toUpperCase() + attr.slice(1)}:</strong> ${monster[attr]}</p>`;
  });

  monsterDiv.innerHTML = `
    <p><strong>Name:</strong> ${monster.name}</p>
    <p><strong>Type:</strong> ${monster.type}</p>
    <p><strong>Color:</strong> ${monster.color}</p>
    ${attributeHTML}
    <button class="edit-btn">Edit</button>
    <button class="delete-btn">Delete</button>
  `;

  monsterDiv.querySelector(".edit-btn").addEventListener("click", () => {
    const index = monsters.indexOf(monster);
    const monsterToEdit = monsters[index];
    monsterForm.name.value = monsterToEdit.name;
    monsterForm.type.value = monsterToEdit.type;
    monsterForm.color.value = monsterToEdit.color;
    monsterConfig.attributes.forEach(attr => {
      monsterForm[attr].value = monsterToEdit[attr];
    });
    submitButton.textContent = "Save Changes";
    monsterForm.setAttribute("data-edit-index", index);
  });

  monsterDiv.querySelector(".delete-btn").addEventListener("click", () => {
    const index = monsters.indexOf(monster);
    monsters.splice(index, 1);
    currentIndex = Math.max(0, currentIndex - 1);
    updateMonsterList(monsters, seeAllList, true);
    updateMonsterList(monsters, monsterList, false); 
    numberOfMonsters.textContent = `Number of monsters: ${monsters.length}`;
    updateMonsterVisibility();
  });

  return monsterDiv;
}

// Funktion för att visa eller dölja alla monster när "See All Monsters"-knappen trycks
function showAllMonsters() {
  monstersVisible = !monstersVisible;

  if (monstersVisible) {
    seeAllButton.textContent = "Hide All Monsters";
    updateMonsterList(monsters, seeAllList, true);
    seeAllList.style.display = "";
  } else {
    seeAllButton.textContent = "See All Monsters";
    seeAllList.style.display = "none";
  }
}

// Lägg till event listener för "See All Monsters"-knappen
seeAllButton.addEventListener("click", showAllMonsters);

// Funktion för att uppdatera synligheten av rubriken baserat på om det finns monster eller ej
function updateMonsterVisibility() {
  monsterHeader.style.display = monsters.length > 0 ? "block" : "none";
}

// Funktion för att filtrera monster baserat på dropdown-menyerna
function filterMonsters() {
  const selectedType = typeFilter.value.toLowerCase();
  const selectedColor = colorFilter.value.toLowerCase();

  const filteredMonsters = monsters.filter(monster => {
    const matchesType = selectedType === "" || monster.type.toLowerCase() === selectedType;
    const matchesColor = selectedColor === "" || monster.color.toLowerCase() === selectedColor;
    return matchesType && matchesColor;
  });

  const typeCount = monsters.filter(monster => selectedType === "" || monster.type.toLowerCase() === selectedType).length;
  const colorCount = monsters.filter(monster => selectedColor === "" || monster.color.toLowerCase() === selectedColor).length;

  countDisplay.innerHTML = `Matching monsters: ${filteredMonsters.length}, Type: ${typeCount}, Color: ${colorCount}`;

  updateMonsterList(filteredMonsters, seeAllList, true);
}

// Lägg till event listeners för dropdown-filtrena
typeFilter.addEventListener("change", filterMonsters);
colorFilter.addEventListener("change", filterMonsters);
