//Search kanppen

const searchInputWrapper = document.querySelector(".search-input-wrapper");
const searchInput = document.querySelector(".search-input input")
const searchIcon = document.querySelector(".search-icon i");
const closeIcon = document.querySelector(".search-input i");

searchIcon.addEventListener(`click`, () => {
  searchIcon.parentElement.classList.add("change");
  searchInputWrapper.classList.add("change");

  setTimeout(() => {
    searchInput.focus();
  }, 1000);
})

closeIcon.addEventListener(`click`, () => {
  searchIcon.parentElement.classList.remove("change");
  searchInputWrapper.classList.remove("change");
})



// javascript för MonsterInc


// använd DOM för att hämta data till  formulär
document.addEventListener("DOMContentLoaded", () => {
  const monsterForm = document.querySelector("#monsterForm"); // formuläret
  const submitButton = document.querySelector("#monsterForm button[type='submit']"); // knappen som skapar ett monster
  const monsterList = document.querySelector(".monster-container"); // div-taggen som visar alla monster
  const numberOfMonsters = document.querySelector("#number-of-monsters"); // span-taggen som visar antal monster i listan



  // skapa en tom lista för att lagra alla monster
  let monsters = [];

  // Lyssna på formulärets submit-knapp
  monsterForm.addEventListener("submit", (event) => {
    event.preventDefault();


    // skapar ett monster-objekt med olika egenskaper
    const name = monsterForm.name.value;
    const type = monsterForm.type.value;
    const color = monsterForm.color.value;
    const tentacles = monsterForm.tentacles.value;
    const eyes = monsterForm.eyes.value;
    const horn = monsterForm.horn.value;
    const ears = monsterForm.ears.value;


    // ↑ om man vill kunna redigera med andra egenskaper, ↑
    // så får man lägga till ny const med den nya egenskapen.
    // obs glömt inte att ändra i diven också längre ner.


    // skapar en editIndex om det finns ett monster att redigera
    const editIndex = monsterForm.getAttribute("data-edit-index");

    // Uppdatera ett befintligt monster
    if (editIndex !== null) { // om det finns ett monster att redigera
      monsters[editIndex] = { name, type, color, tentacles, eyes, horn, ears };
      monsterForm.removeAttribute("data-edit-index"); // ta bort attributet data-edit-index
      submitButton.textContent = "Add Monster"; // Återställ knappen till 'Add Monster'
    } else {
      // Lägg till ett nytt monster
      const newMonster = { name, type, color, tentacles, eyes, horn, ears };
      monsters.push(newMonster); // använder push() för att lägga till ett objekt i arrayen
    }
    // uppdatera listan med alla monster
    updateMonsterList(monsters);
    monsterForm.reset();
  });

  // Funktion för att uppdatera DOM med alla monster
  function updateMonsterList(monstersToShow) {
    monsterList.innerHTML = "";
    // anäver foreach för att få ut alla egenskaper i arrayen
    monstersToShow.forEach((monster, index) => {
      const monsterDiv = document.createElement("div"); // skap ett div-element för monstret
      monsterDiv.classList.add("monster-box");
      // använder diven jag skapade för att få ut alla egenskaper i arrayen i egen box.
      // skapar även edit och remove button i diven för att alla kort får en varsinina knappar

      // gjort så den färgen man har valt på sitt monster blir backgrundsfärgen i diven.
      // använder monsterDriv som är skapade i funktionen och sedan style och backgroundColor.
      // och för att få det att funka så använder jag av dropmenyn av färgena från html.
      monsterDiv.style.backgroundColor = monster.color;

      // har man lagg till nya consts i egenskaperna, 
      // ↓ de att måste skriva en ny egenskap här för att det ska synas i div taggen. ↓

      monsterDiv.innerHTML = ` 
        <p><strong>Name:</strong> ${monster.name}</p>
        <p><strong>Type:</strong> ${monster.type}</p>
        <p><strong>Color:</strong> ${monster.color}</p>
        <p><strong>Tentacles:</strong> ${monster.tentacles}</p>
        <p><strong>Eyes:</strong> ${monster.eyes}</p>
        <p><strong>Horn:</strong> ${monster.horn}</p>
        <p><strong>ears:</strong> ${monster.ears}</p>
        <button class="edit" data-index="${index}">Edit</button>
        <button class="delete" data-index="${index}">Remove</button>
      `;
      monsterList.appendChild(monsterDiv);
    });

    // Lägg till lyssnare för edit-knappar och använder foreach så alla knappar gör samma sak
    document.querySelectorAll(".edit").forEach((button) => {
      button.addEventListener("click", (event) => {
        const indexEdit = event.target.getAttribute("data-index");
        loadMonsterIntoForm(indexEdit);
      });
    });

    // Lägg till lyssnare för delete-knappar även här använder jag foreach så alla knappar blir samma.
    document.querySelectorAll(".delete").forEach((button) => {
      button.addEventListener("click", (event) => {
        const indexDelete = event.target.getAttribute("data-index");
        deleteMonster(indexDelete);
      });
    });

    // uppdatera antalet monster i span-taggen
    numberOfMonsters.textContent = `Number of monsters: ${monstersToShow.length}`;
  }

  // Funktion för att fylla formuläret med monsterdata vid redigering
  function loadMonsterIntoForm(index) {
    const monster = monsters[index];
    document.getElementById("name").value = monster.name;
    document.getElementById("type").value = monster.type;
    document.getElementById("color").value = monster.color;
    document.getElementById("tentacles").value = monster.tentacles;
    document.getElementById("eyes").value = monster.eyes;
    document.getElementById("horn").value = monster.horn;
    document.getElementById("ears").value = monster.ears;

    // Sätt attribut för att indikera att vi redigerar
    monsterForm.setAttribute("data-edit-index", index);
    submitButton.textContent = "Save Changes"; // Ändrar add knapten till 'Save Changes' när man trycker på edit.
  }

  // Funktion för att ta bort ett monster från listan
  function deleteMonster(index) {
    monsters.splice(index, 1); // använd splice() för att ta bort ett objekt i arrayen
    updateMonsterList(monsters);
  }

  // Funktion för att söka efter monster.
  document.getElementById("search-button").addEventListener("click", (event) => {
    event.preventDefault();
    const searchInput = document.getElementById("search").value.toLowerCase();
    // filtrera monster och uppdatera listan med filtrering
    const filteredMonsters = monsters.filter((monster) => {
      return (
        monster.name.toLowerCase().includes(searchInput) ||
        monster.type.toLowerCase().includes(searchInput) ||
        monster.color.toLowerCase().includes(searchInput)
      );
    });

    updateMonsterList(filteredMonsters); // kör programmet för att uppdatera listan med filtreringen
  });
});
