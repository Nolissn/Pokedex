function init() {
  loadTwentyPokemons(0, 20);
}

const BASE_URL = "https://pokeapi.co/api/v2/pokemon";
let sectioncounter = 0;

async function loadTwentyPokemons(start, end) {
  let response = await fetch(`${BASE_URL}?limit=${end}&offset=${start}`);
  let information = await response.json();
  console.log(information);
  loadOnePokemonSection(information);
}

function loadOnePokemonSection(information) {
  sectioncounter++;
  let main = document.getElementById("mainId");
  main.innerHTML = getOnePokemonSectionTemplate(sectioncounter);
  let currentsection = document.getElementById(
    "twenty_pokemons_section_" + sectioncounter,
  );

  for (let index = 1; index < information.results.length + 1; index++) {
    const pokemon = information.results[index - 1];
    currentsection.innerHTML += getPokemonCardInSectionTemplate(index, pokemon);
  }
}
