function init() {
  loadPokemons(1, 20);
}

const BASE_URL = "https://pokeapi.co/api/v2/pokemon";

async function loadPokemons(start, amount) {
  openLoadingSpinner();
  try {
    const response = await fetch(
      `${BASE_URL}?limit=${amount}&offset=${start - 1}`,
    );
    const basicInformation = await response.json();
    await loadIntoPokemonSection(basicInformation);
  } finally {
    closeLoadingSpinner();
  }
}

async function loadIntoPokemonSection(basicInformation) {
  const section = document.getElementById("pokemon_section");

  for (let index = 0; index < basicInformation.results.length; index++) {
    const detailResponse = await fetch(basicInformation.results[index].url);
    const pokemonDetails = await detailResponse.json();
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

function makeFirstCharUpperCase(rawString) {
  rawString = rawString.charAt(0).toUpperCase() + rawString.slice(1);
  return rawString;
}

function findLastLoadedPokemonId() {
  const section = document.getElementById("pokemon_section");
  const cardButtons = section.querySelectorAll(".small_pokemon_card");
  const specificButton = cardButtons[cardButtons.length - 1];
  let specificId = specificButton.lastElementChild.innerHTML;
  specificId = specificId.replaceAll("#", "");
  specificId = parseInt(specificId);
  return specificId;
}

async function fetchPokemonDetails(pokemonId) {
  const response = await fetch(`${BASE_URL}/${pokemonId}`);
  return await response.json();
}

async function showPokemonDetailsDialog(dialogId) {
  openLoadingSpinner();
  try {
    const individualPokemonDialog = document.getElementById(
      "individualPokemonDialogId" + dialogId,
    );
    const specificPokemonDetails = await fetchPokemonDetails(dialogId);
    individualPokemonDialog.innerHTML = getPokemonDetailsDialogTemplate(specificPokemonDetails);
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
    const specificPokemonDetails = await fetchPokemonDetails(nextId);
    currentDialog.className =
      "pokemon_details_dialog " + specificPokemonDetails.types[0].type.name;
    currentDialog.innerHTML = getPokemonDetailsDialogTemplate(specificPokemonDetails);
  } finally {
    closeLoadingSpinner();
  }
}

async function renderPreviousPokemonDialog(id, buttonElement) {
  const previousId = id === 1 ? 1025 : id - 1;
  const currentDialog = buttonElement.closest("dialog");
  openLoadingSpinner();
  try {
    const specificPokemonDetails = await fetchPokemonDetails(previousId);
    currentDialog.className =
      "pokemon_details_dialog " + specificPokemonDetails.types[0].type.name;
    currentDialog.innerHTML = getPokemonDetailsDialogTemplate(specificPokemonDetails);
  } finally {
    closeLoadingSpinner();
  }
}

function isValidInputLength(rawInput) {
  if (rawInput.length >= 3 && rawInput.length <= 25) {
    return true;
  }
  alert("Please enter between 3 and 25 characters!");
  return false;
}

function parseValidPokemonNumber(rawInput) {
  const rawInputNumber = Number(rawInput);
  if (rawInputNumber >= 1 && rawInputNumber <= 1025) {
    return rawInputNumber;
  }
  alert(`Please enter a number with a total value between 1 and 1025. "${rawInputNumber}" isn't valid`);
  return false;
}

function validateUserInput(rawInput) {
  if (!isValidInputLength(rawInput)) {
    return false;
  }
  if (/^\d+$/.test(rawInput)) {
    return parseValidPokemonNumber(rawInput);
  }
  if (/^[^a-zA-Z0-9]/.test(rawInput)) {
    alert("Special characters can not be used like that!");
    return false;
  }
  return rawInput.toLowerCase();
}

async function searchPokemons() {
  const userInputField = document.getElementById("SearchInputId");
  const userInput = userInputField.value;
  const trimmedUserInput = userInput.trim();
  const validatedInput = validateUserInput(trimmedUserInput);
  if (validatedInput === false) {
    return;
  }
  await fetchAndRenderSearchResult(validatedInput, userInput);
}

async function fetchAndRenderSearchResult(validatedInput, userInput) {
  openLoadingSpinner();
  try {
    const response = await fetch(`${BASE_URL}/${validatedInput}`);
    if (response.status === 200) {
      renderSearchResults(response);
    } else {
      renderSearchFail(response, userInput);
    }
  } finally {
    closeLoadingSpinner();
  }
}

async function renderSearchResults(response) {
  const specificPokemonDetails = await response.json();
  const pokemonSection = document.getElementById("pokemon_section");
  pokemonSection.innerHTML = "";
  pokemonSection.className = "pokemon_section_search_success";
  const loadMoreButton =
    document.getElementById("loadMoreButtonId") ||
    document.getElementById("RefreshButtonId");
  loadMoreButton.outerHTML = getRefreshPageButtonTemplate();
  await loadPokemons(specificPokemonDetails.id, 1);
  pokemonSection.innerHTML += getSuccessSearchResultTemplate();
}

function renderSearchFail(response, userInput) {
  const statusCode = response.status;
  const pokemonSection = document.getElementById("pokemon_section");
  pokemonSection.innerHTML = "";
  const loadMoreButton =
    document.getElementById("loadMoreButtonId") ||
    document.getElementById("RefreshButtonId");
  loadMoreButton.outerHTML = getRefreshPageButtonTemplate();
  pokemonSection.className = "pokemon_section_search_fail";
  pokemonSection.innerHTML += getSearchFailResultTemplate(
    statusCode,
    userInput,
  );
}
