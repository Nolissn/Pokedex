function init() {
  loadPokemons(1, 20)
}

const BASE_URL = "https://pokeapi.co/api/v2/pokemon";

async function loadPokemons(start, amound) {
  openLoadingSpinner();
  try {
    let response = await fetch(`${BASE_URL}?limit=${amound}&offset=${start - 1}`);
    let basicInformation = await response.json();
    await loadOnePokemonSection(basicInformation);
  } finally {
    closeLoadingSpinner();
  }
}


async function loadOnePokemonSection(basicInformation) {
  let section = document.getElementById("pokemon_section");

  for (let index = 0; index < basicInformation.results.length; index++) {
    let detailResponse = await fetch(basicInformation.results[index].url);
    let pokemonDetails = await detailResponse.json();
    section.innerHTML += getPokemonCardInSectionTemplate(pokemonDetails);
  }
}

function openLoadingSpinner() {
  const loadingSpinner = document.getElementById("loadingScreenDialogId");
  loadingSpinner.showModal();
}

function closeLoadingSpinner() {
  const loadingSpinner = document.getElementById("loadingScreenDialogId");
  loadingSpinner.close();
}

function makeFirstCharUpperCase(rawstring) {
  rawstring = rawstring.charAt(0).toUpperCase() + rawstring.slice(1);
  return rawstring;
}

function findLastLoadedPokemonId() {
  const section = document.getElementById("pokemon_section");
  let numb = section.childNodes.length;
  let specificButton = document.getElementById("pokemonCardId" + numb);
  let specificID = specificButton.lastElementChild.innerHTML;
  specificID = specificID.replaceAll("#", "");
  specificID = parseInt(specificID);
  return specificID;
}