function init(){
    loadTwentyPokemons(0, 20);
}

const BASE_URL = "https://pokeapi.co/api/v2/pokemon";

async function loadTwentyPokemons(start, end){
   let response = await fetch(`${BASE_URL}?limit=${end}&offset=${start}`);
   let information = await response.json();
   loadOnePokemonSection();
}

function loadOnePokemonSection(){
    main = document.getElementById('mainId');
    main.innerHTML = getOnePokemonSectionTemplate();
}