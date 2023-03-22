import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { matchRoutes, Navigate, useNavigate } from "react-router-dom";
import PokemonCart from "./PokemonCart";

const Pokedex = () => {

    const name = useSelector(state => state.userName)
    const [pokemons, setPokemons] = useState([])
    const [valueInput, setValueInput] = useState('')
    const [types, setTypes] = useState([])
    const [page, setPage] = useState(1)
    const pokemonPerPage = 21
    const lastPokemonIndex = page * pokemonPerPage
    const firstPokemonIndex = lastPokemonIndex - pokemonPerPage
    const pokemonPaginated = pokemons.slice(firstPokemonIndex, lastPokemonIndex)
    const totalPage = Math.ceil(pokemons.length / pokemonPerPage)
    const pageNumber = [];
    const [typeSearch, setTypeSearch] = useState(true)
    const [classBtn, setClassBtn] = useState('')
    
    for (let i = 1; i <= totalPage; i++) {
        pageNumber.push(i)
    }
    
    const [firstButtonIndex, setFirstButtonIndex] = useState(0)
    const [lastButtonIndex, setLastButtonIndex] = useState(5)
    const buttonPaginated = pageNumber.slice(firstButtonIndex, lastButtonIndex)
    
    
    const changePaginated = valor =>{
        if(valor === 1 && totalPage >= 5){
            setFirstButtonIndex(0)
            setLastButtonIndex(5)
        }else if(valor === totalPage && totalPage >= 5){
            setFirstButtonIndex(buttonPaginated.length - 5)
            setLastButtonIndex(totalPage)
        }else if(totalPage <= 5){
            setFirstButtonIndex(0)
            setLastButtonIndex(totalPage)
        }else if(valor < page){
            setFirstButtonIndex(firstButtonIndex - 1)
            setLastButtonIndex(lastButtonIndex - 1)
        }else if(valor > page){
            setFirstButtonIndex(firstButtonIndex + 1)
            setLastButtonIndex(lastButtonIndex + 1)
        }

        setPage(valor)
    }

    const navigate = useNavigate();

    useEffect(() => {
        axios.get('https://pokeapi.co/api/v2/pokemon/?offset=0&limit=1500')
            .then(res => setPokemons(res.data.results));

        axios.get('https://pokeapi.co/api/v2/type/')
            .then(res => setTypes(res.data.results))
    }, []);


    const searchName = () => {
        navigate(`/pokedex/${valueInput.toLowerCase()}`)
        searchType(valueInput)
    }

    const searchType = url => {
        console.log(url)
        axios.get(url)
            .then(res => setPokemons(res.data.pokemon))
    }

    const changeTypeSearch = () =>{
        if(classBtn === ''){
            setClassBtn('btn-mode')
            setTypeSearch(false)
        }else{
            setClassBtn('')
            setTypeSearch(true)
        }
    }


    return (
        <div className="App">
            <img className="frame" src="https://http2.mlstatic.com/D_NQ_NP_941554-MLB47020647381_082021-V.jpg" alt="" />
            <p className="welcome"><b>Welcome {name}</b> i'm your pokedex and will help you to search a Pokemón</p>
            <section className="section-search">
                <p>Cahnge type of search</p>
                <div className="change-search">
                    <button onClick={() => changeTypeSearch()} className={`btn-change-search ${classBtn}`}>.</button>
                </div>
                {
                    typeSearch ? (
                        <>
                            <input
                                className="input"
                                type="text"
                                placeholder="Write the name of the Pokemón"
                                value={valueInput}
                                onChange={e => setValueInput(e.target.value)}
                            />
                            <button className="button" onClick={() => searchName()}>Search</button>
                        </>
                    ) : (
                        <select className="input input-select" defaultValue={'default'} onChange={e => searchType(e.target.value)}>
                            <option value="default" disabled>Select...</option>
                            {
                                types.map(type => (
                                    <option value={type.url} key={type.name}>{type.name}</option>
                                ))
                            }
                        </select>

                    )
                }
            </section>
             
            <section className="list-pokemon ">
                {
                    pokemonPaginated.map(pokemon => (
                        <PokemonCart pokemon={pokemon.url ? pokemon.url : pokemon.pokemon.url} key={pokemon.url ? pokemon.url : pokemon.pokemon.url} />
                    ))
                }
            </section>
            <section className="pagination">
                <button className="btn-page" onClick={() => changePaginated(page - 1)} disabled={page === 1}><span className="material-symbols-outlined">chevron_left</span></button>
                {
                    buttonPaginated.map((number) => (
                        <button className="btn-page bnt-number" key={number} onClick={() => changePaginated(number)}><span>{number}</span></button>
                    ))
                }
                <button className="btn-page" onClick={() => changePaginated(page + 1)} disabled={page === totalPage}><span className="material-symbols-outlined">chevron_right</span></button>
            </section>
        </div>
    );
};

export default Pokedex;