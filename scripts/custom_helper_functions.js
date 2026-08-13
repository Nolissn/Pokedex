function makeFirstCharUpperCase(rawstring){
    rawstring = rawstring.charAt(0).toUpperCase() + rawstring.slice(1);
    return rawstring;
}

function findLastLoadedPokemonId(){
    const section = document.getElementById('pokemon_section');
    let numb = section.childNodes.length;
    let specificButton = document.getElementById('pokemonCardId' + numb);
    let specificID = specificButton.lastElementChild.innerHTML;
    specificID = specificID.replaceAll("#", "");
    specificID = parseInt(specificID);
    return specificID;
}