window.onload = getPokemon();
const list = document.getElementById("list");
const name = document.getElementById("name");
const weight = document.getElementById("weight");
const height = document.getElementById("height");
const ability = document.getElementById("ability");
const baseHp = document.getElementById("baseHp");
const artwork = document.getElementById("artwork");

//get initial list of 151 pokemon
function getPokemon() {
  httpRequest = new XMLHttpRequest();
  if (!httpRequest) {
    let error = document.createElement("p");
    error.innerText = "Pokemon info not available";
    list.appendChild(error);
    return false;
  }
  httpRequest.onreadystatechange = displayPokemon;
  httpRequest.open("GET", "https://pokeapi.co/api/v2/pokemon?limit=151", true);
  httpRequest.send();
}

//display initial list of pokemon
function displayPokemon() {
  if (httpRequest.readyState === XMLHttpRequest.DONE) {
    if (httpRequest.status === 200) {
      let response = JSON.parse(httpRequest.response);
      for (let i = 0; i < 151; i++) {
        let newItem = document.createElement("li");
        newItem.id = i + 1;
        newItem.innerText = response.results[i].name;
        list.appendChild(newItem);
        newItem.addEventListener("click", getDetails);
        newItem.addEventListener("click", toggleActive);
      }
    } else {
      list.innerText = "Pokemon info not available";
    }
    let firstSelected = document.getElementById("1");
    firstSelected.className = "active";
  }
}

//toggle active list item
function toggleActive() {
  let current = document.getElementsByClassName("active");
  current[0].className = "";
  this.classList.add("active");
}

//get details when a pokemon is clicked
function getDetails() {
  let index = this.id;
  httpRequest = new XMLHttpRequest();
  if (!httpRequest) {
    alert("Pokemon info not available");
    return false;
  }
  httpRequest.onreadystatechange = showDetails;
  httpRequest.open("GET", `https://pokeapi.co/api/v2/pokemon/${index}`, true);
  httpRequest.send();
}

//show details of pokemon that was selected
function showDetails() {
  if (httpRequest.readyState === XMLHttpRequest.DONE) {
    if (httpRequest.status === 200) {
      let details = JSON.parse(httpRequest.response);
      name.innerText = `Name: ${details.name}`;
      weight.innerText = `Weight: ${details.weight}`;
      height.innerText = `Height: ${details.height}`;
      ability.innerText = `Ability: ${details.abilities[0].ability.name}`;
      baseHp.innerText = `Base HP: ${details.stats[0].base_stat}`;
      artwork.src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${details.id}.png`;
    } else {
      list.innerText = "Pokemon info not available";
    }
  }
}
