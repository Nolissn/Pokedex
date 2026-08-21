function init() {
  loadPokemons(1, 20);
}

const BASE_URL = "https://pokeapi.co/api/v2/pokemon";

async function loadPokemons(start, amound) {
  openLoadingSpinner();
  try {
    let response = await fetch(
      `${BASE_URL}?limit=${amound}&offset=${start - 1}`,
    );
    let basicInformation = await response.json();
    await loadIntoPokemonSection(basicInformation);
  } finally {
    closeLoadingSpinner();
  }
}

async function loadIntoPokemonSection(basicInformation) {
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

async function showPokemonDetailsDialog(DialogId) {
  openLoadingSpinner();
  try {
    const individualPokemonDialog = document.getElementById(
      "individualPokemonDialogId" + DialogId,
    );
    let specificPokemonDetailsResponse = await fetch(`${BASE_URL}/${DialogId}`);
    let specificPokemonDetails = await specificPokemonDetailsResponse.json();
    individualPokemonDialog.innerHTML = getPokemonDetailsDialogTemplate(
      specificPokemonDetails,
      individualPokemonDialog,
    );
    individualPokemonDialog.showModal();
  } finally {
    closeLoadingSpinner();
  }
}

async function renderNextPokemonDialog(id, buttonElement) {
  const nextId = id === 1025 ? 1 : id + 1;
  const currentDialog = buttonElement.closest("dialog");
  openLoadingSpinner();
  try {
    let specificPokemonDetailsResponse = await fetch(`${BASE_URL}/${nextId}`);
    let specificPokemonDetails = await specificPokemonDetailsResponse.json();
    currentDialog.className =
      "pokemon_details_dialog " + specificPokemonDetails.types[0].type.name;
    currentDialog.innerHTML = getPokemonDetailsDialogTemplate(
      specificPokemonDetails,
    );
  } finally {
    closeLoadingSpinner();
  }
}

async function RenderPreviosPokemonDialog(id, buttonElement) {
  const previousId = id === 1 ? 1025 : id - 1;
  const currentDialog = buttonElement.closest("dialog");
  openLoadingSpinner();
  try {
    let specificPokemonDetailsResponse = await fetch(
      `${BASE_URL}/${previousId}`,
    );
    let specificPokemonDetails = await specificPokemonDetailsResponse.json();
    currentDialog.className =
      "pokemon_details_dialog " + specificPokemonDetails.types[0].type.name;
    currentDialog.innerHTML = getPokemonDetailsDialogTemplate(
      specificPokemonDetails,
    );
  } finally {
    closeLoadingSpinner();
  }
}

function validateUserInput(rawInput) {
  if (rawInput.length >= 3 && rawInput.length <= 25) {
    const isNumber = /^\d+$/.test(rawInput);
    if(isNumber === true){
      const rawInputNumber = Number(rawInput);
      if (rawInputNumber > 0 && rawInputNumber < 1026) {
        return true;
      }else{
        alert(`Please enter a number with a total value between 1 and 1025. "${rawInputNumber}" isn't valid`);
        return false;
      }
    }
    return true;
  } else {
    alert("Please enter between 3 and 25 characters!");
    return false;
  }
}

async function searchPokemons() {
  const userInputField = document.getElementById("SearchInputId");
  const userInput = userInputField.value;
  const trimUserInput = userInput.trim();
  if (validateUserInput(trimUserInput) === true) {
    openLoadingSpinner();
    try {
      let response = await fetch(`${BASE_URL}/${trimUserInput.toLowerCase()}`);
      if (response.status === 200) {
        renderSearchResults(response);
      } else {
        renderSearchFail(response, userInput);
      }
    } finally {
      closeLoadingSpinner();
    }
  }
}

async function renderSearchResults(response) {
  const specificPokemonDetails = await response.json();
  let pokemonSection = document.getElementById("pokemon_section");
  pokemonSection.innerHTML = "";
  pokemonSection.className = "pokemon_section_search_success";
  let loadMoreButton =
    document.getElementById("loadMoreButtonId") ||
    document.getElementById("RefreshButtonId");
  loadMoreButton.outerHTML = getRefreshPageButtonTemplate();
  await loadPokemons(specificPokemonDetails.id, 1);
  pokemonSection.innerHTML += getSuccessSearchResultTemplate();
}

function renderSearchFail(response, userInput) {
  let statusCode = response.status;
  let pokemonSection = document.getElementById("pokemon_section");
  pokemonSection.innerHTML = "";
  let loadMoreButton =
    document.getElementById("loadMoreButtonId") ||
    document.getElementById("RefreshButtonId");
  loadMoreButton.outerHTML = getRefreshPageButtonTemplate();
  pokemonSection.className = "pokemon_section_search_fail";
  pokemonSection.innerHTML += getSearchFailResultTemplate(
    statusCode,
    userInput,
  );
}
