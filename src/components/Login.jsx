import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { savedName } from "../store/slices/userName.slice";
import pikachuBackground from '../assets/img/pikachuBackground.png'

const Login = () => {
    const [nameUser, setNameUser] = useState('')
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const submit = () => {
        dispatch(savedName(nameUser))
        navigate('/pokedex')
    }

    return (
        <div className="login">
            <section className="form">
                <img className="pikachu" src="https://img.wattpad.com/9222be8b29343f3799ac8a6493531b3e48ef0acb/68747470733a2f2f73332e616d617a6f6e6177732e636f6d2f776174747061642d6d656469612d736572766963652f53746f7279496d6167652f507473596c664a38686f64356d673d3d2d3934393330343637342e313633323661336162663963383266323734393031363739393131392e676966" alt="Img" />
                <h2>¡Hi Coach!</h2>
                <p>To start, i need your name</p>
                <input
                    className="input"
                    type="text"
                    placeholder="Your Name!"
                    value={nameUser}
                    onChange={e => setNameUser(e.target.value)}
                />
                <button className="button" onClick={() => submit()}>Send</button>
            </section>
            <img className="background" src={pikachuBackground} alt="pikachu-background" />
        </div>
    );
};

export default Login;