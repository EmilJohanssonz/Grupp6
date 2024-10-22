// Man kan redigera koden med andra egenskaper på rad : 
// 36 - 44 kan man lägga till fler egenskaper
// Raderna 47–78: om man lägger till nya egenskkaperna så får man Uppdatera här där monster skapas eller redigeras
// Raderna 138–149: här visas alla monster till diven man skapas för att output monster. denna del behöver också redigeras om man vill få ut sitt monster.

// Hämta referenser till nödvändiga elementen i HTML
const monsterForm = document.querySelector("#monsterForm"); // Formulär för att lägga till/redigera monster
const submitButton = document.querySelector("#monsterForm button[type='submit']"); // Knappen för att skicka in formuläret
const monsterList = document.querySelector(".monster-container"); // Där vi visar aktuellt monster (current monster)
const numberOfMonsters = document.querySelector("#number-of-monsters"); // Element som visar antal monster
const monsterHeader = document.querySelector("#monster-header"); // Rubrik ovanför aktuell monster-vy
const seeAllButton = document.querySelector(".see-all"); // Knappen "See All Monsters"
const seeAllList = document.getElementById("see-all-monsters"); // Boxen där alla monster visas
// Nya referenser för filtrering
const typeFilter = document.getElementById("type-filter"); // Filter för typ av monster
const colorFilter = document.getElementById("color-filter"); // Filter för färg på monster
seeAllButton.classList.add('allButtun')
// Variabler som används i logiken
let monsters = []; // Lista för att lagra alla monster
let monstersVisible = false; // Om alla monster är synliga eller inte
let currentIndex = 0; // Håller reda på vilket monster som visas i "Current Monster"-sektionen

// Dölj boxen med alla monster från början
seeAllList.style.display = "none"; 

// Hantera formulärinlämning (lägga till eller redigera monster)
monsterForm.addEventListener("submit", (event) => {
  seeAllButton.textContent = "See All Monsters"; // Återställ knappen "See All Monsters"
  event.preventDefault(); // Förhindrar att sidan laddas om när formuläret skickas

  // Hämta värden från formuläret (skapa nya egenskaper här om du vill lägga till fler)
  const name = monsterForm.name.value;
  const type = monsterForm.type.value;
  const color = monsterForm.color.value;
  const tentacles = monsterForm.tentacles.value;
  const eyes = monsterForm.eyes.value;
  const horn = monsterForm.horn.value;
  const ears = monsterForm.ears.value;
  const wings = monsterForm.wings.value;

  // Kontrollera om vi redigerar ett befintligt monster
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

    // Ta bort edit-index och återställ knappen till "Add Monster"
    monsterForm.removeAttribute("data-edit-index");
    submitButton.textContent = "Add Monster";

    // Uppdatera endast "See All"-listan
    updateMonsterList(monsters, seeAllList, true);
  } else {
    // Skapa nytt monster och lägg till i listan
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
    monsters.push(newMonster); // Lägg till nytt monster i listan
    currentIndex = monsters.length - 1; // Visa det senaste tillagda monstret
  }


   // Uppdatera antal monster och visa aktuellt monster
  updateMonsterVisibility();
  updateMonsterList(monsters, monsterList, false); // Uppdatera enskild monster-vy
  monsterForm.reset(); // Nollställ formuläret efter inlämning
  numberOfMonsters.textContent = `Number of monsters: ${monsters.length}`; // Uppdatera räknaren för antal monster
});

// Funktion för att uppdatera monsterlistan
// showAll: om det är sant, visa alla monster, annars bara ett
function updateMonsterList(monstersToShow, targetElement, showAll = false) {
  targetElement.innerHTML = ""; // Rensa befintlig lista

  // Om det inte finns några monster, visa meddelande
  if (monstersToShow.length === 0) {
    targetElement.innerHTML = "<p>No monsters available</p>";
    return;
  }

  // Definiera färger för olika monsterfärger (du kan lägga till nya färger här)
  const colors = {
    "red": "rgb(255, 91, 65)",
    "blue": "rgb(135, 206, 250)",
    "green": "rgb(144, 238, 144)",
    "white": "rgb(245, 245, 245)",
    "black": "rgb(114, 114, 114)"
  };

  // Om showAll är sant, visa alla monster, annars bara det aktuella monstret
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

  // Bakgrundsfärg baserat på monsterfärg (kan lägga till fler färger i 'colors'-objektet)
  const colors = {
    "red": "rgb(255, 91, 65)",
    "blue": "rgb(135, 206, 250)",
    "green": "rgb(144, 238, 144)",
    "white": "rgb(245, 245, 245)",
    "black": "rgb(114, 114, 114)"
  };
  monsterDiv.style.backgroundColor = colors[monster.color]; // Applicera färgen

  // HTML för att visa monstret (lägger till flera attribut här om du vill skapa nya egenskaper)
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

  // Hantera redigeringsknappen för varje monster
  monsterDiv.querySelector(".edit-btn").addEventListener("click", () => {
    const index = monsters.indexOf(monster); // Hitta rätt monster i listan
    const monsterToEdit = monsters[index];

    // Fyll formuläret med monstrets data för att redigera det
    monsterForm.name.value = monsterToEdit.name;
    monsterForm.type.value = monsterToEdit.type;
    monsterForm.color.value = monsterToEdit.color;
    monsterForm.tentacles.value = monsterToEdit.tentacles;
    monsterForm.eyes.value = monsterToEdit.eyes;
    monsterForm.horn.value = monsterToEdit.horn;
    monsterForm.ears.value = monsterToEdit.ears;
    monsterForm.wings.value = monsterToEdit.wings;
    submitButton.textContent = "Save Changes"; // Ändra knappen för att spara ändringar
    monsterForm.setAttribute("data-edit-index", index); // Sätt data-attributet för redigering
  });

  // Hantera borttagningsknappen för varje monster
  monsterDiv.querySelector(".delete-btn").addEventListener("click", () => {
    const index = monsters.indexOf(monster);
    monsters.splice(index, 1); // Ta bort monstret från listan
    currentIndex = Math.max(0, currentIndex - 1); // Justera för att visa rätt monster efter borttagning
    updateMonsterList(monsters, seeAllList, true); // Uppdatera "See All"-listan
    numberOfMonsters.textContent = `Number of monsters: ${monsters.length}`; // Uppdatera räknaren
    updateMonsterVisibility(); // Uppdatera synligheten
    seeAllList.style.display = "";
    seeAllButton.textContent = "See All Monsters";
  });

  return monsterDiv;
}

/// Funktion för att visa eller dölja alla monster när "See All Monsters"-knappen trycks
function showAllMonsters() {
  monstersVisible = !monstersVisible; // Växla mellan synligt och dolt

  // Växla synligheten baserat på om alla monster syns eller ej
  if (monstersVisible) {
    seeAllButton.textContent = "Hide All Monsters";
    updateMonsterList(monsters, seeAllList, true); // Visa alla monster
    seeAllList.style.display = "";
    // Dölj alla monster om det finns mer monster i listan
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
  const selectedType = typeFilter.value.toLowerCase(); // Läsa in valt filtertyp
  const selectedColor = colorFilter.value.toLowerCase(); // Läsa in valt filterfärg
  const countDisplay = document.getElementById("countDisplay");

  // Filtera monster baserat på valt filtertyp och färg
  const filteredMonsters = monsters.filter((monster) => {
    const matchesType = selectedType === "" || monster.type.toLowerCase() === selectedType; // Kontrollera om typen matchar valt filtertyp
    const matchesColor = selectedColor === "" || monster.color.toLowerCase() === selectedColor; // Kontrollera om färgen matchar valt filterfärg
    return matchesType && matchesColor;
  });

  // Uppdatera listan med filtrerade monster
  updateMonsterList(filteredMonsters, seeAllList, true);

  // Här räknar vi antalet monster som matchar den valda typen
  const typeCount = monsters.filter((monster) => {
    return selectedType === "" || monster.type.toLowerCase() === selectedType;
  }).length;

  // Här räknar vi antalet monster som matchar den valda färgen
  const colorCount = monsters.filter((monster) => {
    return selectedColor === "" || monster.color.toLowerCase() === selectedColor;
  }).length;

  // Uppdatera räkningsvisningen - Showing count for filtered monsters, type, and color
  countDisplay.innerHTML = `Matching monsters: ${filteredMonsters.length} (Type matches: ${typeCount}, Color matches: ${colorCount})`;
}

// Lägg till event listeners för dropdown-filters
typeFilter.addEventListener("change", filterMonsters);
colorFilter.addEventListener("change", filterMonsters);
