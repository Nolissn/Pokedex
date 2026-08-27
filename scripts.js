function init() {
  loadPokemons(1, 20);
}

const BASE_URL = "https://pokeapi.co/api/v2/pokemon";
let loadedPokemons = [];
let searchResultPokemons = [];
let loadedRangeEnd = 0;

function findLoadedPokemon(idOrName) {
  const searchKey = String(idOrName).toLowerCase();
  for (let index = 0; index < loadedPokemons.length; index++) {
    const pokemon = loadedPokemons[index];
    if (pokemon.name === searchKey || String(pokemon.id) === searchKey) {
      return pokemon;
    }
  }
  return false;
}

function saveLoadedPokemon(pokemonDetails) {
  if (!findLoadedPokemon(pokemonDetails.id)) {
    loadedPokemons.push(pokemonDetails);
  }
  return pokemonDetails;
}

async function loadPokemons(start, amount) {
  openLoadingSpinner();
  try {
    const basicInformation = await fetchPokemonList(start, amount);
    const pokemonList = await fetchAllPokemonDetails(basicInformation);
    loadedRangeEnd = start - 1 + pokemonList.length;
    renderPokemonSection(sortPokemonsById(loadedPokemons));
  } finally {
    closeLoadingSpinner();
  }
}

function loadNextPokemons() {
  loadPokemons(loadedRangeEnd + 1, 20);
}

async function fetchPokemonList(start, amount) {
  const response = await fetch(
    `${BASE_URL}?limit=${amount}&offset=${start - 1}`,
  );
  return await response.json();
}

async function fetchAllPokemonDetails(basicInformation) {
  const pokemonList = [];
  for (let index = 0; index < basicInformation.results.length; index++) {
    const pokemonDetails = await fetchPokemonDetails(
      basicInformation.results[index].name,
    );
    pokemonList.push(pokemonDetails);
  }
  return pokemonList;
}

function renderPokemonSection(pokemonList) {
  const section = document.getElementById("pokemon_section");
  let cardsHTML = "";
  for (let index = 0; index < pokemonList.length; index++) {
    cardsHTML += getPokemonCardInSectionTemplate(pokemonList[index]);
  }
  section.innerHTML = cardsHTML;
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

function sortPokemonsById(pokemons) {
  return pokemons.sort((pokemonA, pokemonB) => pokemonA.id - pokemonB.id);
}

function goBackToPokemonSection() {
  const pokemonSection = document.getElementById("pokemon_section");
  searchResultPokemons = [];
  document.getElementById("searchInputId").value = "";
  pokemonSection.className = "pokemon_section";
  renderPokemonSection(sortPokemonsById(loadedPokemons));
  const goBackButton = document.getElementById("refreshButtonId");
  goBackButton.outerHTML = getLoadMoreButtonTemplate();
}

async function fetchPokemonDetails(pokemonId) {
  const cachedPokemon = findLoadedPokemon(pokemonId);
  if (cachedPokemon) {
    return cachedPokemon;
  }
  const response = await fetch(`${BASE_URL}/${pokemonId}`);
  return saveLoadedPokemon(await response.json());
}

async function fetchPokemonDetailsWithDelayedSpinner(pokemonId) {
  const cachedPokemon = findLoadedPokemon(pokemonId);
  if (cachedPokemon) {
    return cachedPokemon;
  }
  const spinnerTimeout = setTimeout(openLoadingSpinner, 500);
  try {
    return await fetchPokemonDetails(pokemonId);
  } finally {
    clearTimeout(spinnerTimeout);
    closeLoadingSpinner();
  }
}

async function showPokemonDetailsDialog(dialogId) {
  const individualPokemonDialog = document.getElementById(
    "individualPokemonDialogId" + dialogId,
  );
  const specificPokemonDetails =
    await fetchPokemonDetailsWithDelayedSpinner(dialogId);
  individualPokemonDialog.innerHTML = getPokemonDetailsDialogTemplate(
    specificPokemonDetails,
    getNavBarCounterText(specificPokemonDetails.id),
    isNavBarLocked(specificPokemonDetails.id),
  );
  individualPokemonDialog.showModal();
}

function findSearchResultIndex(id) {
  for (let index = 0; index < searchResultPokemons.length; index++) {
    if (searchResultPokemons[index].id === id) {
      return index;
    }
  }
  return -1;
}

function findNextPokemonId(id) {
  const index = findSearchResultIndex(id);
  if (index === -1) {
    return id === 1025 ? 1 : id + 1;
  }
  const nextIndex =
    index === searchResultPokemons.length - 1 ? 0 : index + 1;
  return searchResultPokemons[nextIndex].id;
}

function findPreviousPokemonId(id) {
  const index = findSearchResultIndex(id);
  if (index === -1) {
    return id === 1 ? 1025 : id - 1;
  }
  const previousIndex =
    index === 0 ? searchResultPokemons.length - 1 : index - 1;
  return searchResultPokemons[previousIndex].id;
}

function getNavBarCounterText(id) {
  const index = findSearchResultIndex(id);
  if (index === -1) {
    return `${id}/1025`;
  }
  return `${index + 1}/${searchResultPokemons.length}`;
}

function isNavBarLocked(id) {
  return findSearchResultIndex(id) !== -1 && searchResultPokemons.length === 1;
}

async function renderNextPokemonDialog(id, buttonElement) {
  const nextId = findNextPokemonId(id);
  const currentDialog = buttonElement.closest("dialog");
  const specificPokemonDetails =
    await fetchPokemonDetailsWithDelayedSpinner(nextId);
  renderPokemonDetailsDialog(specificPokemonDetails, currentDialog);
}

async function renderPreviousPokemonDialog(id, buttonElement) {
  const previousId = findPreviousPokemonId(id);
  const currentDialog = buttonElement.closest("dialog");
  const specificPokemonDetails =
    await fetchPokemonDetailsWithDelayedSpinner(previousId);
  renderPokemonDetailsDialog(specificPokemonDetails, currentDialog);
}

function renderPokemonDetailsDialog(specificPokemonDetails, currentDialog) {
  currentDialog.className =
    "pokemon_details_dialog " + specificPokemonDetails.types[0].type.name;
  currentDialog.setAttribute(
    "aria-label",
    `${makeFirstCharUpperCase(specificPokemonDetails.name)} details`,
  );
  currentDialog.innerHTML = getPokemonDetailsDialogTemplate(
    specificPokemonDetails,
    getNavBarCounterText(specificPokemonDetails.id),
    isNavBarLocked(specificPokemonDetails.id),
  );
}

function isValidInputLength(rawInput) {
  if (rawInput.length >= 3 && rawInput.length <= 27) {
    return true;
  }
  alert("Please enter between 3 and 27 characters!");
  return false;
}

function parseValidPokemonNumber(rawInput) {
  const rawInputNumber = Number(rawInput);
  if (rawInputNumber >= 1 && rawInputNumber <= 1025) {
    return rawInputNumber;
  }
  alert(
    `Please enter a number with a total value between 1 and 1025. "${rawInputNumber}" isn't valid`,
  );
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
  const userInputField = document.getElementById("searchInputId");
  const userInput = userInputField.value;
  const trimmedUserInput = userInput.trim();
  const validatedInput = validateUserInput(trimmedUserInput);
  if (validatedInput === false) {
    return;
  }
  await fetchAndRenderSearchResult(validatedInput, userInput);
}

async function fetchExactMatch(validatedInput) {
  const cachedPokemon = findLoadedPokemon(validatedInput);
  if (cachedPokemon) {
    return { status: 200, details: cachedPokemon };
  }
  const response = await fetch(`${BASE_URL}/${validatedInput}`);
  if (response.status !== 200) {
    return { status: response.status, details: null };
  }
  return { status: 200, details: saveLoadedPokemon(await response.json()) };
}

async function fetchAndRenderSearchResult(validatedInput, userInput) {
  openLoadingSpinner();
  try {
    const exactMatch = await fetchExactMatch(validatedInput);
    const partialMatches = findPartialMatches(validatedInput);
    renderSearchOutcome(exactMatch, partialMatches, userInput);
  } finally {
    closeLoadingSpinner();
  }
}

function renderSearchOutcome(exactMatch, partialMatches, userInput) {
  searchResultPokemons = [];
  if (exactMatch.status !== 200 && partialMatches.length === 0) {
    renderSearchFail(exactMatch.status, userInput);
    return;
  }
  renderSearchResults(exactMatch, partialMatches);
  renderPartialMatchesResult(partialMatches);
}

function findPartialMatches(validatedInput) {
  const searchTerm = String(validatedInput).toLowerCase();
  const matches = loadedPokemons.filter(
    (pokemon) =>
      pokemon.name.includes(searchTerm) && pokemon.name !== searchTerm,
  );
  return matches;
}

function addSearchResultCard(pokemonDetails, isExactMatch) {
  const pokemonSection = document.getElementById("pokemon_section");
  searchResultPokemons.push(pokemonDetails);
  pokemonSection.innerHTML += getPokemonCardInSectionTemplate(pokemonDetails);
  const smallPokemonCard = document.getElementById(
    "pokemonCardId" + pokemonDetails.id,
  );
  smallPokemonCard.classList.add("small_pokemon_card_search_success");
  if (isExactMatch) {
    smallPokemonCard.classList.add("small_pokemon_card_exact_match");
  }
}

function renderPartialMatchesResult(partialMatches) {
  for (let index = 0; index < partialMatches.length; index++) {
    addSearchResultCard(partialMatches[index]);
  }
}

function renderSearchResults(exactMatch, partialMatches) {
  if (exactMatch.status !== 200) {
    changeToPartialMatchesHTML(false);
    return;
  }
  if (partialMatches.length === 0) {
    changeToSuccessHTML(exactMatch.details);
    return;
  }
  changeToPartialMatchesHTML(true);
  addSearchResultCard(exactMatch.details, true);
}

function changeToPartialMatchesHTML(hasExactMatch) {
  const pokemonSection = document.getElementById("pokemon_section");
  pokemonSection.innerHTML = "";
  pokemonSection.className = "pokemon_section_partial_match";
  const loadMoreButton =
    document.getElementById("loadMoreButtonId") ||
    document.getElementById("refreshButtonId");
  loadMoreButton.outerHTML = getRefreshPageButtonTemplate();
  pokemonSection.innerHTML += hasExactMatch
    ? getSuccessSearchResultTemplate()
    : getPartialMatchResultTemplate();
}

function changeToSuccessHTML(specificPokemonDetails) {
  const pokemonSection = document.getElementById("pokemon_section");
  pokemonSection.innerHTML = "";
  pokemonSection.className = "pokemon_section_search_success";
  const loadMoreButton =
    document.getElementById("loadMoreButtonId") ||
    document.getElementById("refreshButtonId");
  loadMoreButton.outerHTML = getRefreshPageButtonTemplate();
  addSearchResultCard(specificPokemonDetails);
  pokemonSection.innerHTML += getSuccessSearchResultTemplate();
}

function renderSearchFail(statusCode, userInput) {
  const pokemonSection = document.getElementById("pokemon_section");
  pokemonSection.innerHTML = "";
  const loadMoreButton =
    document.getElementById("loadMoreButtonId") ||
    document.getElementById("refreshButtonId");
  loadMoreButton.outerHTML = getRefreshPageButtonTemplate();
  pokemonSection.className = "pokemon_section_search_fail";
  pokemonSection.innerHTML += getSearchFailResultTemplate(
    statusCode,
    userInput,
  );
}
