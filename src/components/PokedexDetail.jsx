import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import colors from '../colors.json'

const PokedexDetail = () => {
    const { id } = useParams();
    const [currentPokemon, setCurrentPokemon] = useState({})
    const [types, setTypes] = useState([])
    const [abilities, setAbilities] = useState([])
    const [moves, setMoves] = useState([])
    const [color, setColor] = useState('')
    
    
    useEffect(() => {
        axios.get(`https://pokeapi.co/api/v2/pokemon/${id}/`)
            .then(res => {
                setCurrentPokemon(res.data)
                setTypes(res.data.types)
                setAbilities(res.data.abilities)
                setMoves(res.data.moves)
            })
    }, [])

    console.log(types)
    console.log(colors)

    return (
        <div className="cartPokemonCurrent">
            <img className="imgPokemonCurrent" src={currentPokemon.sprites?.other.dream_world.front_default} alt="" />
            <h4 className="idPokemonCurrent" style={{color: `${colors[types[0]?.type.name]?.uno}`}}>#{currentPokemon.id}</h4>
            <h4 className="namePokemonCurrent" style={{color: `${colors[types[0]?.type.name]?.uno}`}}>{currentPokemon.name}</h4>
            <section className="sizePokemonCurrent">
                <span>
                    <p>Peso</p>
                    {currentPokemon.weight}
                </span>
                <span>
                    <p>Altura</p>
                    {currentPokemon.height}
                </span>
            </section>
            <section className="typeHabilityPokemonCurrent">
                <article>
                    <h4>Type</h4>
                    {
                        types.map(type => (
                            <span className="type" style={{background: `${colors[types[0]?.type.name]?.dos}`}}> {type.type.name} </span>
                        ))
                    }
                </article>
                <article>
                    <h4>Hability</h4>
                    {
                        abilities.map(ability => (
                            <span className="hability"> {ability.ability.name} </span>
                        ))
                    }
                </article>
            </section>
            <section className="stats">
                <h3>Stats</h3>
                <article className="stats-bars">
                    <b>HP:</b> <span>{currentPokemon.stats?.[0].base_stat}/150</span>
                    <div className="div" style={{background: `${colors[types[0]?.type.name]?.dos}`, width: `${currentPokemon.stats?.[0].base_stat > 100 ? '100' : `${currentPokemon.stats?.[0].base_stat}`}%` }}></div>
                    <b>Attack:</b> <span>{currentPokemon.stats?.[1].base_stat}/150</span>
                    <div className="div" style={{background: `${colors[types[0]?.type.name]?.dos}`, width: `${currentPokemon.stats?.[1].base_stat > 100 ? '100' : `${currentPokemon.stats?.[1].base_stat}`}%` }}></div>
                    <b>Defence:</b> <span>{currentPokemon.stats?.[2].base_stat}/150</span>
                    <div className="div" style={{background: `${colors[types[0]?.type.name]?.dos}`, width: `${currentPokemon.stats?.[2].base_stat > 100 ? '100' : `${currentPokemon.stats?.[2].base_stat}`}%` }}></div>
                    <b>Speed:</b> <span>{currentPokemon.stats?.[5].base_stat}/150</span>
                    <div className="div" style={{background: `${colors[types[0]?.type.name]?.dos}`, width: `${currentPokemon.stats?.[5].base_stat > 100 ? '100' : `${currentPokemon.stats?.[5].base_stat}`}%` }}></div>
                </article>
            </section>
            <h2 className='moves-title'>Moves</h2>
            <section className="moves">
                {
                    moves.map(move => (
                        <span className="move">{move.move.name}</span>
                    ))
                }
            </section>
        </div>
    );
};

export default PokedexDetail;