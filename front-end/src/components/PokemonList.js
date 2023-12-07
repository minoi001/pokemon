// src/components/PokemonList.js
import React from "react";

const PokemonList = ({ pokemons }) => {
  return (
    <center>
      <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 justify-center">
        {pokemons.map((pokemon) => (
          <div
            id="pokemon-card"
            className="flex justify-center p-1 max-w-xs m-3 bg-white rounded-sm"
            key={pokemon.name}
            onClick
          >
            <center>
              <img
                src={pokemon.image}
                className="w-36 p-3"
                alt={pokemon.name + " - Front Default Official Pokemon Artwork"}
              ></img>
              <p className="justify-center">{pokemon.name}</p>
            </center>
          </div>
        ))}
      </div>
      {pokemons.length < 1 ? (
        <p className="justify-center text-center p-4">
          No Pokemon matching search
        </p>
      ) : (
        ""
      )}
    </center>
  );
};

export default PokemonList;
