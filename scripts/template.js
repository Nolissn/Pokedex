function getPokemonCardInSectionTemplate(pokemonDetails) {
  return `<button
      onclick="showPokemonDetailsDialog(${pokemonDetails.id})"
      id="pokemonCardId${pokemonDetails.id}"
      data-id="card"
      aria-label="View details for ${makeFirstCharUpperCase(pokemonDetails.name)}"
      class="small_pokemon_card ${pokemonDetails.types[0].type.name}"
    >
      <img
        class="small_card_image"
        data-id="card-image"
        src="${pokemonDetails.sprites.other["official-artwork"].front_default}"
        alt="${makeFirstCharUpperCase(pokemonDetails.name)} artwork"
      />
      <span class="pokemon_card_name"
        >${makeFirstCharUpperCase(pokemonDetails.name)}</span
      >
      <section class="pokemon_type_section">
        <div
          class="pokemon_card_type_general ${pokemonDetails.types[0].type.name}"
        >
          ${makeFirstCharUpperCase(pokemonDetails.types[0].type.name)}
        </div>
        ${
          pokemonDetails.types.length === 2
            ? `<div class="pokemon_card_type_general ${pokemonDetails.types[1].type.name}">${makeFirstCharUpperCase(pokemonDetails.types[1].type.name)}</div>`
            : ""
        }
      </section>
      <span class="pokemon_card_id">#${pokemonDetails.id}</span>
    </button>
    <dialog
      closedby="any"
      id="individualPokemonDialogId${pokemonDetails.id}"
      data-id="dialog"
      aria-label="${makeFirstCharUpperCase(pokemonDetails.name)} details"
      class="pokemon_details_dialog ${pokemonDetails.types[0].type.name}"
    ></dialog>`;
}

function getPokemonDetailsDialogTemplate(
  specificPokemonDetails,
  navBarCounterText,
  isNavBarLocked,
) {
  return `
    <button
      onclick="this.closest('dialog').close()"
      data-id="close-dialog-button"
      aria-label="Close dialog"
      class="close_dialog_button"
    >
      <img
        class="close_dialog_icon_default"
        src="./assets/SVG/close_x_button.svg"
        alt="Close"
      />
      <img
        class="close_dialog_icon_hover"
        src="./assets/SVG/close_x_button_hover.svg"
        alt="Close"
      />
    </button>
    <div data-id="overlay-pokemon-name" class="overlay_pokemon_name">
    <div class="big_card_image_circle">
      <img
        class="big_card_image"
        data-id="dialog-image"
        src="${specificPokemonDetails.sprites.other["official-artwork"].front_default}"
        alt="${makeFirstCharUpperCase(specificPokemonDetails.name)} artwork"
      ></img>
    </div>
    <span class="big_card_name"
      >${makeFirstCharUpperCase(specificPokemonDetails.name)}</span
    >
    <hr class="big_card_dividing_line_name" />
    <section class="big_pokemon_type_section">
      <div
        class="big_card_type_general ${specificPokemonDetails.types[0].type.name}"
      >
        ${makeFirstCharUpperCase(specificPokemonDetails.types[0].type.name)}
      </div>
      ${
        specificPokemonDetails.types.length === 2
          ? `<div class="big_card_type_general ${specificPokemonDetails.types[1].type.name}">${makeFirstCharUpperCase(specificPokemonDetails.types[1].type.name)}</div>`
          : ""
      }
    </section>
    <section class="big_card_stats_section">
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
    <footer class="big_card_footer">
      <nav class="big_card_nav_bar">
        <button
          onclick="renderPreviousPokemonDialog(${specificPokemonDetails.id}, this)"
          data-id="prev-button"
          aria-label="Previous Pokémon"
          class="big_card_nav_bar_button ${specificPokemonDetails.types[0].type.name}"
          ${isNavBarLocked ? "disabled" : ""}
        >
          <img
            class="big_card_nav_image"
            src="./assets/SVG/arrow-left.svg"
            alt=""
          />
        </button>
        <p class="big_card_nav_id_text">
          ${navBarCounterText}
        </p>
        <button
          onclick="renderNextPokemonDialog(${specificPokemonDetails.id}, this)"
          data-id="next-button"
          aria-label="Next Pokémon"
          class="big_card_nav_bar_button ${specificPokemonDetails.types[0].type.name}"
          ${isNavBarLocked ? "disabled" : ""}
        >
          <img
            class="big_card_nav_image"
            src="./assets/SVG/arrow-right.svg"
            alt=""
          />
        </button>
      </nav>
    </footer>
    </div>
  `;
}

function getSearchFailResultTemplate(statusCode, userInput) {
  return `
    <div class="search_fail_content_positioning_div">
      <img
        class="search_fail_image"
        src="./assets/SVG/search_fail_pikachu.svg"
        alt="Detective Pikachu looking through a magnifying lens"
      />
      <div class="search_fail_text_positioning_div">
        <span class="search_fail_status_code"
          >Statuscode "<span class="search_fail_highlight">${statusCode}</span
          >"</span
        >
        <p data-id="not-found" class="search_fail_message">
          The Pokémon "<span class="search_fail_highlight">${userInput}</span>"
          was not found. Enter something else and try again!
        </p>
      </div>
    </div>
  `;
}

function getSuccessSearchResultTemplate() {
  return `<span class="search_success_text"
    >Success! here is your Pokémon:</span
  >`;
}

function getPartialMatchResultTemplate() {
  return `<span class="search_success_text"
    >No exact match, but these Pokémon fit:</span
  >`;
}

function getLoadMoreButtonTemplate() {
  return `<button
    id="loadMoreButtonId"
    onclick="loadNextPokemons()"
    data-id="load-more-button"
    aria-label="Load more Pokémon"
    class="load_more_button"
  >
    Load more
  </button>`;
}

function getRefreshPageButtonTemplate() {
  return `<button
    id="refreshButtonId"
    onclick="goBackToPokemonSection()"
    aria-label="Go back"
    class="load_more_button go_back_button"
  >
    <img
      class="go_back_button_icon"
      src="./assets/SVG/arrow-left.svg"
      alt=""
    />
    Go back
  </button>`;
}
