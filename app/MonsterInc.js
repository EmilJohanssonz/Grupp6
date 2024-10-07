// Global lista för att lagra alla skapade monster
let monsters = [];

document.addEventListener("DOMContentLoaded", () => {
  // Hämta formuläret för att skapa monster
  const monsterForm = document.querySelector("#monsterForm"); 
  // Hämta knappen för att lägga till eller uppdatera monster
  const submitButton = monsterForm.querySelector("button[type='submit']"); 
  // Hämta containern där alla monster ska visas
  const monsterList = document.querySelector(".monster-container");
  // Hämta elementet som visar antalet skapade monster
  const numberOfMonsters = document.querySelector("#number-of-monsters");
  // Hämta rubriken som visas när monster skapas
  const monsterHeader = document.querySelector("#monster-header");
  // Hämta sökfältet
  const searchInput = document.querySelector(".search-input input");
  // Hämta knappen för att visa alla monster
  const seeAllButton = document.querySelector(".see-all");
  // Hämta listan där alla monster ska visas vid "See All Monsters"
  const seeAllList = document.getElementById("see-all");

  // Lyssnare för att fånga händelsen när användaren skickar in formuläret
  monsterForm.addEventListener("submit", (event) => {
    event.preventDefault(); // Förhindrar att sidan laddas om när formuläret skickas

// om man vill redigera någon egenskap så kan 
//man ändra värdet här nere, glöm inte o       
//ändra i div taggen och update listan⬇️


    // Hämta värdena från formulärfälten
    const name = monsterForm.name.value;
    const type = monsterForm.type.value;
    const color = monsterForm.color.value;
    const tentacles = monsterForm.tentacles.value;
    const eyes = monsterForm.eyes.value;
    const horn = monsterForm.horn.value;
    const ears = monsterForm.ears.value;

    // Kontrollera om det finns ett index för ett monster som ska redigeras
    const editIndex = monsterForm.getAttribute("data-edit-index");

    // Om vi redigerar ett befintligt monster
    if (editIndex !== null) {
      monsters[editIndex] = { name, type, color, tentacles, eyes, horn, ears };
      monsterForm.removeAttribute("data-edit-index"); // Ta bort attributet så vi kan lägga till nya monster igen
      submitButton.textContent = "Add Monster"; // Återställ knappen till "Add Monster"
    } else {
      // Skapa ett nytt monster och lägg till i listan
      const newMonster = { name, type, color, tentacles, eyes, horn, ears };
      monsters.push(newMonster);
    }

    // Visa rubriken om det finns minst ett monster, annars göm den
    if (monsters.length > 0) {
      monsterHeader.style.display = "block";
    } else {
      monsterHeader.style.display = "none";
    }

    // Uppdatera monsterlistan och visa den
    updateMonsterList(monsters, monsterList);
    // Återställ formuläret efter att ett monster har skapats
    monsterForm.reset();
    // Uppdatera texten som visar antalet monster
    numberOfMonsters.textContent = `Number of monsters: ${monsters.length}`;
  });

  // Funktion för att uppdatera listan med alla monster och visa dem i rätt element
  function updateMonsterList(monstersToShow, targetElement) {
    targetElement.innerHTML = ""; // Rensa det befintliga innehållet
    monstersToShow.forEach((monster, index) => {
      // Skapa en div för varje monster
      const monsterDiv = document.createElement("div");
      monsterDiv.classList.add("monster-box");
      monsterDiv.style.backgroundColor = monster.color; // Ge bakgrundsfärg baserat på monsterfärgen

// här kan du redigera div taggen ⬇️

      // Fyll i monsteregenskaper i div-taggen
      monsterDiv.innerHTML = `
        <p><strong>Name:</strong> ${monster.name}</p>
        <p><strong>Type:</strong> ${monster.type}</p>
        <p><strong>Color:</strong> ${monster.color}</p>
        <p><strong>Tentacles:</strong> ${monster.tentacles}</p>
        <p><strong>Eyes:</strong> ${monster.eyes}</p>
        <p><strong>Horn:</strong> ${monster.horn}</p>
        <p><strong>Ears:</strong> ${monster.ears}</p>
        <button class="edit" data-index="${index}">Edit</button>
        <button class="delete" data-index="${index}">Remove</button>
      `;

      // Lägg till det skapade monster-elementet i target-elementet
      targetElement.appendChild(monsterDiv);
    });

    // Lyssnare för alla "Edit"-knappar
    document.querySelectorAll(".edit").forEach((button) => {
      button.addEventListener("click", (event) => {
        const indexEdit = event.target.getAttribute("data-index");
        loadMonsterIntoForm(indexEdit); // Ladda monstrets data i formuläret för redigering
      });
    });

    // Lyssnare för alla "Remove"-knappar
    document.querySelectorAll(".delete").forEach((button) => {
      button.addEventListener("click", (event) => {
        const indexDelete = event.target.getAttribute("data-index");
        deleteMonster(indexDelete); // Ta bort monstrets data
      });
    });
  }

  // Funktion för att fylla i formuläret med ett monsters data vid redigering
// glöm inte att redigera här också ⬇️
  function loadMonsterIntoForm(index) {
    const monster = monsters[index]; // Hämta det monster som ska redigeras
    // Fyll i formulärfälten med monstrets egenskaper
    document.getElementById("name").value = monster.name;
    document.getElementById("type").value = monster.type;
    document.getElementById("color").value = monster.color;
    document.getElementById("tentacles").value = monster.tentacles;
    document.getElementById("eyes").value = monster.eyes;
    document.getElementById("horn").value = monster.horn;
    document.getElementById("ears").value = monster.ears;

    // Sätt ett attribut på formuläret så att vi vet vilket monster som redigeras
    monsterForm.setAttribute("data-edit-index", index);
    submitButton.textContent = "Save Changes"; // Ändra texten på knappen
  }

  // Funktion för att ta bort ett monster
  function deleteMonster(index) {
    monsters.splice(index, 1); // Ta bort monster från listan
    updateMonsterList(monsters, monsterList); // Uppdatera listan med alla monster

    // Göm rubriken om det inte finns några monster kvar
    if (monsters.length === 0) {
      monsterHeader.style.display = "none";
    }
  }

  // Funktion för att visa alla monster i en annan lista (t.ex. #see-all)
  function showAllMonsters() {
    seeAllList.innerHTML = ""; // Rensa den befintliga listan
    updateMonsterList(monsters, seeAllList); // Använd samma uppdateringsfunktion för att visa alla monster
  }

  // Lyssnare för "See All Monsters"-knappen
  seeAllButton.addEventListener("click", () => {
    showAllMonsters(); // Visa alla monster när knappen klickas
  });
});