/* import { useState } from "react" */
import { counterContext } from "./counterContex"
import { useLocalStore } from "../hook/useLocalStore"
import { useEffect } from "react"

export const StateCompo = ({ children }) => {

    const [couter, setCounter] = useLocalStore('couter', 0)
    const [state, setState] = useLocalStore('state', [])
    const [car, setCar] = useLocalStore('car', [])

    useEffect(() => {
        const storedData = localStorage.getItem('state');
        if (storedData) {
            setState(storedData);
        }
    }, []);

    const increment = () => {
        setCounter(couter + 1)
    }
    const decrement = () => {
        setCounter(couter - 1)
    }
    const reset = () => {
        setCounter(0)
    }
    const estadoLocal = (data) => {
        setState(data);
        localStorage.setItem('state', data);
    }
    const closetSesion = () => {
        setState([{
            logged: false,
            u_id: '',
            username: '',
            nombre: '',
            nivel: '',
            foto: '',
        }])
    }


    const estadoCar = (data) => {
        setCar('car', data)
    }

    return (
        <counterContext.Provider
            value={{
                couter,
                state,
                increment,
                decrement,
                reset,
                estadoLocal,
                closetSesion,
                estadoCar
            }}
        >
            { children }    
        </counterContext.Provider>
    )
}