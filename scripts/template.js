function getPokemonCardInSectionTemplate(pokemonDetails) {
  let id = pokemonDetails.id;

  return /* HTML */ `<button id="pokemonCardId${pokemonDetails.id}" class="small_pokemon_card ${pokemonDetails.types[0].type.name}">
    <img
      class="small_card_image"
      src="${pokemonDetails.sprites.other["official-artwork"].front_default}"
      alt="Pokémon Image"
    />
    <span class="pokemon_card_name" style="--name_length: ${pokemonDetails.name.length}">${makeFirstCharUpperCase(pokemonDetails.name)}</span>
    <section class="pokemon_type_section">
      <div class="pokemon_card_type_general ${pokemonDetails.types[0].type.name}">${makeFirstCharUpperCase(pokemonDetails.types[0].type.name)}</div>
      ${pokemonDetails.types.length === 2 ? `<div class="pokemon_card_type_general ${pokemonDetails.types[1].type.name}">${makeFirstCharUpperCase(pokemonDetails.types[1].type.name)}</div>` : ""}
    </section>
    <span class="pokemon_card_id">#${pokemonDetails.id}</span>
  </button>`;
}
