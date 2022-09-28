import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const PokemonCart = ({ pokemon }) => {

    const [currentPokemon, setCurrentPokemon] = useState([])
    const [types, setTypes] = useState([])

    const navigate = useNavigate()


    useEffect(() => {
        axios.get(`${pokemon}`)
            .then(res => {
                setCurrentPokemon(res.data)
                setTypes(res.data.types)
            })
    }, [])

    return (
        <div  className="current-pokemon" onClick={() => navigate(`/pokedex/${currentPokemon.id}`)}>
            <img src={currentPokemon.sprites?.other.dream_world.front_default} alt="Photo of a Pokemón" />
        </div>
    );
};

export default PokemonCart;