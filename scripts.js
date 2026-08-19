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
  const cardButtons = section.querySelectorAll(".small_pokemon_card");
  let specificButton = cardButtons[cardButtons.length - 1];
  let specificID = specificButton.lastElementChild.innerHTML;
  specificID = specificID.replaceAll("#", "");
  specificID = parseInt(specificID);
  return specificID;
}

async function showPokemonDetailsDialog(DialogId){
  openLoadingSpinner();
  try{
    const individualPokemonDialog = document.getElementById("individualPokemonDialogId" + DialogId);
    let specificPokemonDetailsResponse = await fetch(`${BASE_URL}/${DialogId}`);
    let specificPokemonDetails = await specificPokemonDetailsResponse.json();
    individualPokemonDialog.innerHTML = getPokemonDetailsDialogTemplate(specificPokemonDetails, individualPokemonDialog);
    individualPokemonDialog.showModal();
  }
  finally{
    closeLoadingSpinner();
  }
}

async function renderNextPokemonDialog(id, buttonElement){
  const nextId = id === 1025 ? 1 : id + 1;
  const currentDialog = buttonElement.closest("dialog");
  openLoadingSpinner();
  try {
    let specificPokemonDetailsResponse = await fetch(`${BASE_URL}/${nextId}`);
    let specificPokemonDetails = await specificPokemonDetailsResponse.json();
    currentDialog.className = "pokemon_details_dialog " + specificPokemonDetails.types[0].type.name;
    currentDialog.innerHTML = getPokemonDetailsDialogTemplate(specificPokemonDetails);
  } finally {
    closeLoadingSpinner();
  }
}

async function RenderPreviosPokemonDialog(id, buttonElement){
  const previousId = id === 1 ? 1025 : id - 1;
  const currentDialog = buttonElement.closest("dialog");
  openLoadingSpinner();
  try {
    let specificPokemonDetailsResponse = await fetch(`${BASE_URL}/${previousId}`);
    let specificPokemonDetails = await specificPokemonDetailsResponse.json();
    currentDialog.className = "pokemon_details_dialog " + specificPokemonDetails.types[0].type.name;
    currentDialog.innerHTML = getPokemonDetailsDialogTemplate(specificPokemonDetails);
  } finally {
    closeLoadingSpinner();
  }
}