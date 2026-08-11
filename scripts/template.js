function getOnePokemonSectionTemplate(sectioncounter) {
  return /* HTML */ ` <section id="twenty_pokemons_section_${sectioncounter}" class="twenty_pokemons_section"></section> `;
}

function getPokemonCardInSectionTemplate(index, pokemon) {
  return /* HTML */ `<button class="small_pokemon_card">
    <img
      class="small_card_image"
      src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${index}.png"
      alt="Pokémon Image"
    />
    <span class="pokemon_card_name">${pokemon.name.toUpperCase()}</span>
    <section class="pokemon_type_section">
      <div class="pokemon_card_type_general">Type</div>
      <div class="pokemon_card_type_general">Type</div>
    </section>
    <span class="pokemon_card_id">#0000</span>
  </button>`;
}
