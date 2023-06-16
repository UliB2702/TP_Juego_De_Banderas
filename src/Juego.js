import './App.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Juego() {
    const [isLoading, setIsLoading] = useState(true);
    const [pais, setPais] = useState('');
    const [pregunta, setPregunta] = useState('');
 //   const [respuesta, setRespuesta] = useState('');

    useEffect(() => {
        axios.get('https://countriesnow.space/api/v0.1/countries/flag/images')
            .then((res) => {
            setPais(res.data.data);
            setIsLoading(false);
            })
            .catch((error) => {
            console.log(error);
            setIsLoading(false);
            });
        }, []);

    function ConseguirBandera() {
        console.log(pais)
        let posicion = Math.floor(Math.random() * 220)
        setPregunta(pais[posicion])
        console.log(pregunta.flag)
        return pregunta.flag
    }

    if(isLoading){
    return(
        <div className='App'>
            <h1> Cargando ... </h1>
        </div>
    );
    }

    return(
        <div className='App'>
            <h3> ¿Qué bandera es esta? </h3>
            <img src={ConseguirBandera()} alt='Una bandera'/>
            <input type="text" id="bandera" name="bandera" required> Adivine el pais: </input>
        </div>
    );
    

}

export default Juego;