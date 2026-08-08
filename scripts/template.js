function getOnePokemonSectionTemplate() {
  return /* HTML */ ` <section class="twenty_pokemons_section">
    <button class="small_pokemon_card">
      <header>
        <img
          class="small_card_image"
          src="./assets/SVG's/pokemon_card_image_template.svg"
          alt="Pokémon Image"
        />
      </header>
      <span>NAME</span>
      <section>
        <div></div>
      </section>
      <span>ID</span>
    </button>
  </section>`;
}
