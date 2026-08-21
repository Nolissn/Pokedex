function getPokemonCardInSectionTemplate(pokemonDetails) {
  return /* HTML */ `<button
      onclick="showPokemonDetailsDialog(${pokemonDetails.id})"
      id="pokemonCardId${pokemonDetails.id}"
      class="small_pokemon_card ${pokemonDetails.types[0].type.name}"
    >
      <img
        class="small_card_image"
        src="${pokemonDetails.sprites.other["official-artwork"].front_default}"
        alt="Pokémon Image"
      />
      <span
        class="pokemon_card_name"
        style="--name_length: ${pokemonDetails.name.length}"
        >${makeFirstCharUpperCase(pokemonDetails.name)}</span
      >
      <section class="pokemon_type_section">
        <div
          class="pokemon_card_type_general ${pokemonDetails.types[0].type.name}"
        >
          ${makeFirstCharUpperCase(pokemonDetails.types[0].type.name)}
        </div>
        ${pokemonDetails.types.length === 2
          ? `<div class="pokemon_card_type_general ${pokemonDetails.types[1].type.name}">${makeFirstCharUpperCase(pokemonDetails.types[1].type.name)}</div>`
          : ""}
      </section>
      <span class="pokemon_card_id">#${pokemonDetails.id}</span>
    </button>
    <dialog
      closedby="any"
      id="individualPokemonDialogId${pokemonDetails.id}"
      class="pokemon_details_dialog ${pokemonDetails.types[0].type.name}"
    ></dialog>`;
}

function getPokemonDetailsDialogTemplate(
  specificPokemonDetails,
  individualPokemonDialog,
) {
  return /* HTML */ `
    <div class="big_pokemon_card_image_circle">
      <img
        class="big_pokemon_card_image"
        src="${specificPokemonDetails.sprites.other["official-artwork"].front_default}"
        alt="Pokémon Image"
      ></img>
    </div>
    <span class="big_pokemon_card_name"
      >${makeFirstCharUpperCase(specificPokemonDetails.name)}</span
    >
    <hr class="big_pokemon_card_deviding_line_name" />
    <section class="big_pokemon_type_section">
      <div
        class="big_pokemon_card_type_general ${specificPokemonDetails.types[0].type.name}"
      >
        ${makeFirstCharUpperCase(specificPokemonDetails.types[0].type.name)}
      </div>
      ${
        specificPokemonDetails.types.length === 2
          ? `<div class="big_pokemon_card_type_general ${specificPokemonDetails.types[1].type.name}">${makeFirstCharUpperCase(specificPokemonDetails.types[1].type.name)}</div>`
          : ""
      }
    </section>
    <section class="big_pokemon_card_stats_section">
      <div class="big_card_content_positioning_div">
        <div class="big_card_image_and_stat_label_positioning_div">
          <img
            class="big_card_stat_image"
            src="./assets/SVG/stats/hp_icon.svg"
            alt="HP Icon"
          />
          <span class="big_card_stats_label_text">HP</span>
        </div>
        <span class="big_card_stats_text">${specificPokemonDetails.stats[0].base_stat}</span>
      </div>
      <div class="big_card_content_positioning_div">
        <div class="big_card_image_and_stat_label_positioning_div">
          <img
            class="big_card_stat_image"
            src="./assets/SVG/stats/attack_icon.svg"
            alt="Attack Icon"
          />
          <span class="big_card_stats_label_text">Attack</span>
        </div>
        <span class="big_card_stats_text">${specificPokemonDetails.stats[1].base_stat}</span>
      </div>
      <div class="big_card_content_positioning_div">
        <div class="big_card_image_and_stat_label_positioning_div">
          <img
            class="big_card_stat_image"
            src="./assets/SVG/stats/defense_icon.svg"
            alt="Defense Icon"
          />
          <span class="big_card_stats_label_text">Defense</span>
        </div>
        <span class="big_card_stats_text">${specificPokemonDetails.stats[2].base_stat}</span>
      </div>
      <div class="big_card_content_positioning_div">
        <div class="big_card_image_and_stat_label_positioning_div">
          <img
            class="big_card_stat_image"
            src="./assets/SVG/stats/special_attack_icon.svg"
            alt="Special Attack Icon"
          />
          <span class="big_card_stats_label_text">Special Attack</span>
        </div>
        <span class="big_card_stats_text">${specificPokemonDetails.stats[3].base_stat}</span>
      </div>
      <div class="big_card_content_positioning_div">
        <div class="big_card_image_and_stat_label_positioning_div">
          <img
            class="big_card_stat_image"
            src="./assets/SVG/stats/special_defense_icon.svg"
            alt="Special Defense Icon"
          />
          <span class="big_card_stats_label_text">Special Defense</span>
        </div>
        <span class="big_card_stats_text">${specificPokemonDetails.stats[4].base_stat}</span>
      </div>
      <div class="big_card_content_positioning_div">
        <div class="big_card_image_and_stat_label_positioning_div">
          <img
            class="big_card_stat_image"
            src="./assets/SVG/stats/speed_icon.svg"
            alt="Speed Icon"
          />
          <span class="big_card_stats_label_text">Speed</span>
        </div>
        <span class="big_card_stats_text">${specificPokemonDetails.stats[5].base_stat}</span>
      </div>
      <div class="big_card_content_positioning_div">
        <div class="big_card_image_and_stat_label_positioning_div">
          <img
            class="big_card_stat_image"
            src="./assets/SVG/stats/height_icon.svg"
            alt="Height Icon"
          />
          <span class="big_card_stats_label_text">Height</span>
        </div>
        <span class="big_card_stats_text">${specificPokemonDetails.height / 10} m</span>
      </div>
      <div class="big_card_content_positioning_div">
        <div class="big_card_image_and_stat_label_positioning_div">
          <img
            class="big_card_stat_image"
            src="./assets/SVG/stats/weight_icon.svg"
            alt="Weight Icon"
          />
          <span class="big_card_stats_label_text">Weight</span>
        </div>
        <span class="big_card_stats_text">${specificPokemonDetails.weight / 10} kg</span>
      </div>
    </section>
    <footer class="big_pokemon_card_footer">
    <nav class="big_card_navbar">
    <button onclick="RenderPreviosPokemonDialog(${specificPokemonDetails.id}, this)" class="big_card_nav_bar_button ${specificPokemonDetails.types[0].type.name}">
    <img
            class="big_card_nav_image"
            src="./assets/SVG/arrow-left.svg"
            alt="Weight Icon"
          />
    </button>
    <p class="big_card_nav_id_text">${specificPokemonDetails.id.toString()}/1025</p>
    <button onclick="renderNextPokemonDialog(${specificPokemonDetails.id}, this)" class="big_card_nav_bar_button ${specificPokemonDetails.types[0].type.name}">
    <img
            class="big_card_nav_image"
            src="./assets/SVG/arrow-right.svg"
            alt="Weight Icon"
          />
    </button>
    </nav>
    </footer>
  `;
}

function getSearchFailResultTemplate(statusCode, userInput) {
  return /* HTML */ `
    <div class="search_fail_content_positioning_div">
      <img
        class="search_fail_image"
        src="./assets/SVG/search_fail_pikachu.svg"
        alt="Search Fail Image"
      />
      <div class="search_fail_text_positioning_div">
        <span class="search_fail_status_code">Statuscode "<span class="search_fail_highlight">${statusCode}</span>"</span>
        <p class="search_fail_message">The Pokémon "<span class="search_fail_highlight">${userInput}</span>" was not found. Enter something else and try again!</p>
      </div>
    </div>
  `;
}

function getSuccessSearchResultTemplate() {
  return /* HTML */ `<span class="search_success_text">Success! here is your Pokémon:</span>`;
}

function getRefreshPageButtonTemplate() {
  return /* HTML */ `<button
        id="RefreshButtonId"
        onclick="location.reload()"
        class="load_more_button"
      >
        Refresh Page
      </button>`
}
