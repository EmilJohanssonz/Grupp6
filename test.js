// JavaScript för den importerade sökknappen
const searchInputWrapper = document.querySelector(".search-input-wrapper");
const searchInput = document.querySelector(".search-input input");
const searchIcon = document.querySelector(".search-icon i");
const closeIcon = document.querySelector(".search-input i");

searchIcon.addEventListener("click", () => {
    searchIcon.parentElement.classList.add("change");
    searchInputWrapper.classList.add("change");
    searchInput.focus(); // Fokusera direkt på sökfältet
});

closeIcon.addEventListener("click", () => {
    searchIcon.parentElement.classList.remove("change");
    searchInputWrapper.classList.remove("change");
    searchInput.value = ""; // Rensar sökfältet när det stängs
});

// Hämta referenser till nödvändiga element
const monsterForm = document.querySelector("#monsterForm");
const submitButton = document.querySelector("#monsterForm button[type='submit']");
const monsterList = document.querySelector(".monster-container");
const numberOfMonsters = document.querySelector("#number-of-monsters");
const monsterHeader = document.querySelector("#monster-header");
const seeAllButton = document.querySelector(".see-all");
const seeAllList = document.getElementById("see-all-monsters");
const searchButton = document.getElementById("search-button");

// Variabler vi använder
let monsters = [];
let monstersVisible = false; // Håller reda på om alla monster visas eller inte

// Hantera formulärinlämning för att skapa/redigera monster
monsterForm.addEventListener("submit", (event) => {
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
        monsters[editIndex] = { name, type, color, tentacles, eyes, horn, ears, wings };
        monsterForm.removeAttribute("data-edit-index");
        submitButton.textContent = "Add Monster"; // Återställ knapptexten
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
function updateMonsterList(monstersToShow, targetElement) {
    targetElement.innerHTML = ""; // Rensa befintlig lista

    // Färger för bakgrund
    const colors = {
        "red": "rgb(255, 160, 122)",
        "blue": "rgb(135, 206, 250)",
        "green": "rgb(144, 238, 144)",
        "white": "rgb(245, 245, 245)",
        "black": "rgb(169, 169, 169)"
    };

    monstersToShow.forEach((monster, index) => {
        const monsterDiv = document.createElement("div");
        monsterDiv.classList.add("monster-box");
        monsterDiv.style.backgroundColor = colors[monster.color]; // Sätt bakgrundsfärgen

        // Fyll monsterDiv med information
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
            const monsterToEdit = monsters[index];
            // Sätt in värden i formuläret för redigering
            monsterForm.name.value = monsterToEdit.name;
            monsterForm.type.value = monsterToEdit.type;
            monsterForm.color.value = monsterToEdit.color;
            monsterForm.tentacles.value = monsterToEdit.tentacles;
            monsterForm.eyes.value = monsterToEdit.eyes;
            monsterForm.horn.value = monsterToEdit.horn;
            monsterForm.ears.value = monsterToEdit.ears;
            monsterForm.wings.value = monsterToEdit.wings;
            submitButton.textContent = "Save Changes"; // Ändra knappen till "Save Changes"
            monsterForm.setAttribute("data-edit-index", index); // Spara indexet för redigering
        });

        monsterDiv.querySelector(".delete-btn").addEventListener("click", () => {
            monsters.splice(index, 1); // Ta bort valt monster
            updateMonsterList(monsters, monsterList); // Uppdatera listan
            numberOfMonsters.textContent = `Number of monsters: ${monsters.length}`; // Uppdatera antalet
            updateMonsterVisibility(); // Uppdatera synligheten av rubriken
        });

        targetElement.appendChild(monsterDiv); // Lägg till monstret i listan
    });
}

// Funktion för att hantera visning/döljning av monster när "See All Monsters"-knappen trycks
function showAllMonsters() {
    if (monstersVisible) {
        seeAllList.style.display = ""; // Döljer monsterlistan
        seeAllButton.textContent = "See All Monsters"; // Återställ knapptext
    } else {
        if (monsters.length === 0) {
            seeAllList.innerHTML = "<p>No monsters available</p>";
        } else {
            seeAllList.innerHTML = "";
            updateMonsterList(monsters, seeAllList); // Visa alla monster i listan
        }
        seeAllList.style.display = "none"; // Visar monsterlistan
        seeAllButton.textContent = "Hide All Monsters"; // Ändrar knapptexten
    }
    monstersVisible = !monstersVisible; // Växlar status för synlighet
}

// Lägg till event listener för "See All Monsters"-knappen
seeAllButton.addEventListener("click", showAllMonsters);

// Funktion för att uppdatera synligheten av rubriken baserat på om det finns monster
function updateMonsterVisibility() {
    monsterHeader.style.display = monsters.length > 0 ? "block" : "none"; // Visa eller dölj rubriken
}

// Sökfunktion för att filtrera monster baserat på sökfältet
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

// Lägg till event listener för sökknappen
searchButton.addEventListener("click", (event) => {
    event.preventDefault();
    searchInput.focus(); // Fokusera på sökrutan
    searchMonsters(); // Kör sökfunktionen
});

// Lägg till event listener för Enter-tangenten i sökrutan
searchInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        event.preventDefault();
        searchMonsters(); // Kör sökfunktionen när man trycker på Enter
    }
});
