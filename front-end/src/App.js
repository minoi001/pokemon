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
      try {
        const response = await axios.get(
          "https://pokeapi.co/api/v2/pokemon?limit=20"
        );
        setPokemons(response.data.results);
        setFilteredPokemons(response.data.results);
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
    <div>
      <h1>Pokemon App</h1>
      <SearchBar handleSearch={handleSearch} />
      <PokemonList pokemons={filteredPokemons} />
    </div>
  );
}

export default App;
