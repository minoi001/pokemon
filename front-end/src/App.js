import logo from "./logo.svg";
import "./App.css";
// src/App.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import PokemonList from "./components/PokemonList";
import SearchBar from "./components/SearchBar";

function App() {
  const [pokemons, setPokemons] = useState([]);
  const [filteredPokemons, setFilteredPokemons] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      let pokemonsData = [];

      try {
        const response = await axios.get(
          "https://pokeapi.co/api/v2/pokemon?limit=32"
        );

        for (let i = 0; i < response?.data?.results?.length; i++) {
          let pokemonDetails = await axios.get(
            `https://pokeapi.co/api/v2/pokemon/${response.data.results[i].name}/`
          );
          let pokemonSpecifics = pokemonDetails;
          pokemonSpecifics.data = pokemonDetails.data;
          pokemonSpecifics.name = response.data.results[i].name;
          pokemonSpecifics.url = response.data.results[i].url;
          pokemonSpecifics.image =
            pokemonDetails.data.sprites.other["official-artwork"].front_default;
          pokemonsData.push(pokemonSpecifics);
        }

        setPokemons(pokemonsData);
        setFilteredPokemons(pokemonsData);
      } catch (error) {
        console.error("Error fetching Pokemon data:", error);
      }
    };

    fetchData();
  }, []);

  const handleSearch = (value) => {
    setSearchTerm(value);
    const filtered = pokemons.filter((pokemon) =>
      pokemon.name.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredPokemons(filtered);
  };

  return (
    <div className="App m-3">
      <h1>Pokemon App</h1>
      <SearchBar handleSearch={handleSearch} />

      <div className="m-6 bg-slate-100 rounded-sm">
        <PokemonList pokemons={filteredPokemons} />
      </div>
    </div>
  );
}

export default App;
