import { useState } from 'react'

export function useLocalStore (key, valorInicial) {

    const [estadoLocal, setEstadoLocal] = useState(() => {
        try {
            const item = window.localStorage.getItem(key)
            return item ? JSON.parse(item) : valorInicial
        } catch (error) {
            return valorInicial
        }
    })

    const setValue = value => {
        try {
            //const newData = event.target.value;
            setEstadoLocal(value);
            window.localStorage.setItem(key, JSON.stringify(value));
            /* setEstadoLocal(value);
            localStorage.setItem(key, JSON.stringify(value)) */
    
          } catch (error) {
            console.error(error);
          }
    }

  return [estadoLocal, setValue]
}
