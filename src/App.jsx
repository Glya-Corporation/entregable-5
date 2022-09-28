import './App.css'
import { useState } from 'react'
import { HashRouter, Route, Routes } from 'react-router-dom'
import Login from './components/Login'
import Pokedex from './components/Pokedex'
import PokedexDetail from './components/PokedexDetail'
import ProtectedRoutes from './components/ProtectedRoutes'
import pokeball from "./assets/img/pokeball.gif"


function App() {
  const [count, setCount] = useState(0)

  return (
    <HashRouter>
      <Routes>
        <Route path='/' element={<Login />} />

        <Route element={<ProtectedRoutes />}>
          <Route path='/pokedex' element={<Pokedex />} />
          <Route path='/pokedex/:id' element={<PokedexDetail />} />
        </Route>
      </Routes>
      <footer className="footer-login">
                <article className="red"></article>
                <div className="background-pokeball"></div>
                <img className="pokeball" src={pokeball} alt="pokeball" />
                <article className="black"></article>
      </footer>
    </HashRouter>
  )
}

export default App
