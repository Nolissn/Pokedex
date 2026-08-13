function init() {
  loadPokemons(1, 20)
}

const BASE_URL = "https://pokeapi.co/api/v2/pokemon";

async function loadPokemons(start, amound) {
  let response = await fetch(`${BASE_URL}?limit=${amound}&offset=${start - 1}`);
  let basicInformation = await response.json();
  console.log(basicInformation);
  await loadOnePokemonSection(basicInformation);
}

async function loadOnePokemonSection(basicInformation) {
  let section = document.getElementById("pokemon_section");

  for (let index = 0; index < basicInformation.results.length; index++) {
    let detailResponse = await fetch(basicInformation.results[index].url);
    let pokemonDetails = await detailResponse.json();
    console.log(pokemonDetails);
    section.innerHTML += getPokemonCardInSectionTemplate(pokemonDetails);
  }
}