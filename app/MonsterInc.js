// javascript för den importerade sök knappen
const searchInputWrapper = document.querySelector(".search-input-wrapper");
const searchInput = document.querySelector(".search-input input");
const searchIcon = document.querySelector(".search-icon i");
const closeIcon = document.querySelector(".search-input i");

searchIcon.addEventListener("click", () => {
  searchIcon.parentElement.classList.add("change");
  searchInputWrapper.classList.add("change");

  // Fokusera direkt på sökfältet
  searchInput.focus();

  setTimeout(() => {

  }, 300); // Kortare timeout för snabbare användarrespons
});

closeIcon.addEventListener("click", () => {
  searchIcon.parentElement.classList.remove("change");
  searchInputWrapper.classList.remove("change");
  searchInput.value = ""; // Rensar sökfältet när det stängs
});
// console.log(searchInput);

// Hämta referenser till nödvändiga elementen
const monsterForm = document.querySelector("#monsterForm");
const submitButton = document.querySelector("#monsterForm button[type='submit']");
const monsterList = document.querySelector(".monster-container");
const numberOfMonsters = document.querySelector("#number-of-monsters");
const monsterHeader = document.querySelector("#monster-header");
const seeAllButton = document.querySelector(".see-all");
const seeAllList = document.getElementById("see-all");
const searchButton = document.getElementById("search-button");

// Variabler vi använder
let monsters = [];
let monstersVisible = false; // Håller reda på om alla monster visas eller inte

// Hantera formulärinlämning för att skapa/redigera monster
monsterForm.addEventListener("submit", (event) => {
  event.preventDefault();

  // Hämta input-värden från formuläret
  // ⬇️Här kan man också ändra värdena i formulalet ⬇️
  // Glöm inte att ändra i div taggen som ligger i monster-box och uppdatera i monsterList!

  const name = monsterForm.name.value;
  const type = monsterForm.type.value;
  const color = monsterForm.color.value;
  const tentacles = monsterForm.tentacles.value;
  const eyes = monsterForm.eyes.value;
  const horn = monsterForm.horn.value;
  const ears = monsterForm.ears.value;
  const wings = monsterForm.wings.value;



  // Kontrollera om ett monster redigeras eller skapas nytt
  // om man har gjort nytt värde får man lägga till det här också
  const editIndex = monsterForm.getAttribute("data-edit-index");

  if (editIndex !== null) {
    // Redigera befintligt monster
    monsters[editIndex] = { name, type, color, tentacles, eyes, horn, ears, wings };
    monsterForm.removeAttribute("data-edit-index");
    submitButton.textContent = "Add Monster";
  } else {
    // Skapa nytt monster
    const newMonster = { name, type, color, tentacles, eyes, horn, ears, wings };
    monsters.push(newMonster);
  }

  // Uppdatera rubrik och antal monster
  updateMonsterVisibility();
  updateMonsterList(monsters, monsterList);
  monsterForm.reset();
  numberOfMonsters.textContent = `Number of monsters: ${monsters.length}`;
});

// Funktion för att uppdatera monsterlistan
// Skapar en ny div för varje monster som läggs till
// Gör så att diven ändrar bakgrundsfärg till varje monster med respektive färg man gav på monstret
// Här kan man redigera de nya värderna man skrev i input formuläret, glöm inte att upppdatera i uppdateringsfunktionen!
//         ⬇️               ⬇️
function updateMonsterList(monstersToShow, targetElement) {
  targetElement.innerHTML = ""; // Rensa befintlig lista
  monstersToShow.forEach((monster, index) => {
    const monsterDiv = document.createElement("div");
    monsterDiv.classList.add("monster-box");
    monsterDiv.style.backgroundColor = monster.color;

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

    // Lägg till händelsehanterare för redigera-knappen
    // Här får man uppdatera de nya värdena som man gav tidigare i koden
    //      ⬇️               ⬇️

    monsterDiv.querySelector(".edit-btn").addEventListener("click", () => {
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

    // Lägg till händelsehanterare för ta bort-knappen
    monsterDiv.querySelector(".delete-btn").addEventListener("click", () => {
      monsters.splice(index, 1); // Ta bort valt monster
      updateMonsterList(monsters, monsterList);
      numberOfMonsters.textContent = `Number of monsters: ${monsters.length}`;
      updateMonsterVisibility(); // Uppdatera synligheten av rubriken "Created monsters"
    });

    targetElement.appendChild(monsterDiv);
  });
}

// Funktion för att hantera visning/döljning av monster när "See All Monsters"-knappen trycks
function showAllMonsters() {
  if (monstersVisible) {
    // Om monsterlistan visas, döljer vi den
    seeAllList.style.display = "none";
    seeAllButton.textContent = "See All Monsters"; // Ändrar knapptexten
  } else {
    // Om monsterlistan är dold, visar vi den
    if (monsters.length === 0) {
      seeAllList.innerHTML = "<p>No monsters available</p>";
    } else {
      seeAllList.innerHTML = "";
      updateMonsterList(monsters, seeAllList);
    }
    seeAllList.style.display = "block";
    seeAllButton.textContent = "Hide All Monsters"; // Ändrar knapptexten
  }
  monstersVisible = !monstersVisible; // Växlar status för synlighet
}

// Lägg till event listener för "See All Monsters"-knappen
seeAllButton.addEventListener("click", showAllMonsters);

// Funktion för att uppdatera synligheten av H2-rubriken baserat på om det finns monster eller ej
function updateMonsterVisibility() {
  if (monsters.length > 0) {
    monsterHeader.style.display = "block";  // Visa rubriken
  } else {
    monsterHeader.style.display = "none";  // Dölj rubriken om inga monster finns
  }
}

// Sökfunktion för att filtrera monster baserat på sökfältet
// Man kan filtera med enbart namn, typ och färg
function searchMonsters() {
  const searchInputValue = searchInput.value.toLowerCase(); // Hämta sökvärdet
  const filteredMonsters = monsters.filter((monster) => {
    return (
      monster.name.toLowerCase().includes(searchInputValue) ||
      monster.type.toLowerCase().includes(searchInputValue) ||
      monster.color.toLowerCase().includes(searchInputValue)
    );
  });

  updateMonsterList(filteredMonsters, monsterList); // Uppdatera listan med filtrerade monster
}

// Lägg till event listener för sök-knappen
searchButton.addEventListener("click", (event) => {
  event.preventDefault();
  searchInput.focus(); // Fokuserar på sökrutan
  searchMonsters(); // Kör sökfunktionen när man trycker på knappen
});

// Lägg till event listener för Enter-tangenten i sökrutan
searchInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    event.preventDefault();
    searchInput.focus(); // Fokuserar på sökrutan
    searchMonsters(); // Kör sökfunktionen när man trycker på Enter
  }
});
