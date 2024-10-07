let monsters = []; // Global lista för alla skapade monster

document.addEventListener("DOMContentLoaded", () => {
  const monsterForm = document.querySelector("#monsterForm");
  const submitButton = monsterForm.querySelector("button[type='submit']");
  const monsterList = document.querySelector(".monster-container");
  const numberOfMonsters = document.querySelector("#number-of-monsters");
  const monsterHeader = document.querySelector("#monster-header");
  const searchInput = document.querySelector(".search-input input");
  const seeAllButton = document.querySelector(".see-all");
  const seeAllList = document.getElementById("see-all");

  // Lyssna på formulärets submit-knapp
  monsterForm.addEventListener("submit", (event) => {
    event.preventDefault();

    // om man vill redigera ett monster så ska man ändra i detta formulär samt uppdatera listan i div taggen.

    const name = monsterForm.name.value;
    const type = monsterForm.type.value;
    const color = monsterForm.color.value;
    const tentacles = monsterForm.tentacles.value;
    const eyes = monsterForm.eyes.value;
    const horn = monsterForm.horn.value;
    const ears = monsterForm.ears.value;

    const editIndex = monsterForm.getAttribute("data-edit-index");

    if (editIndex !== null) {
      monsters[editIndex] = { name, type, color, tentacles, eyes, horn, ears };
      monsterForm.removeAttribute("data-edit-index");
      submitButton.textContent = "Add Monster";
    } else {
      const newMonster = { name, type, color, tentacles, eyes, horn, ears };
      monsters.push(newMonster);
    }

    if (monsters.length > 0) {
      monsterHeader.style.display = "block";
    } else {
      monsterHeader.style.display = "none";
    }

    updateMonsterList(monsters, monsterList);
    monsterForm.reset();
    numberOfMonsters.textContent = `Number of monsters: ${monsters.length}`;
  });

  // Funktion för att uppdatera listan
  function updateMonsterList(monstersToShow, targetElement) {
    targetElement.innerHTML = "";
    monstersToShow.forEach((monster, index) => {
      const monsterDiv = document.createElement("div");
      monsterDiv.classList.add("monster-box");

      monsterDiv.style.backgroundColor = monster.color; // Färgen för bakgrunden i div taggen.
      // om man redigerar ett monster så ska man ändra i detta div taggen.

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

      targetElement.appendChild(monsterDiv);
    });

    // Lägg till redigera och ta bort funktioner
    document.querySelectorAll(".edit").forEach((button) => {
      button.addEventListener("click", (event) => {
        const indexEdit = event.target.getAttribute("data-index");
        loadMonsterIntoForm(indexEdit);
      });
    });

    document.querySelectorAll(".delete").forEach((button) => {
      button.addEventListener("click", (event) => {
        const indexDelete = event.target.getAttribute("data-index");
        deleteMonster(indexDelete);
      });
    });
  }

  // Ladda ett monster i formuläret för redigering
  function loadMonsterIntoForm(index) {
    const monster = monsters[index];
    document.getElementById("name").value = monster.name;
    document.getElementById("type").value = monster.type;
    document.getElementById("color").value = monster.color;
    document.getElementById("tentacles").value = monster.tentacles;
    document.getElementById("eyes").value = monster.eyes;
    document.getElementById("horn").value = monster.horn;
    document.getElementById("ears").value = monster.ears;

    monsterForm.setAttribute("data-edit-index", index);
    submitButton.textContent = "Save Changes";
  }

  // Ta bort ett monster
  function deleteMonster(index) {
    monsters.splice(index, 1);
    updateMonsterList(monsters, monsterList);

    if (monsters.length === 0) {
      monsterHeader.style.display = "none";
    }
  }

  // Funktion för att visa alla monster
  function showAllMonsters() {
    seeAllList.innerHTML = "";
    updateMonsterList(monsters, seeAllList);
  }

  // Event listener för "See All Monsters"
  seeAllButton.addEventListener("click", () => {
    showAllMonsters();
  });
});
