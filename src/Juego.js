import './App.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Juego() {
    const [isLoading, setIsLoading] = useState(true);
    const [pais, setPais] = useState('');
    const [pregunta, setPregunta] = useState('');
    //const [respuesta, setRespuesta] = useState('');

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

    console.log(pais)
    const ConseguirBandera = () => {
        let posicion = Math.floor(Math.random() * 220)
        var nuevaBandera = {
           nombre: pais[posicion].name,
           imagen: pais[posicion].flag
        }

        setPregunta(nuevaBandera)
        //console.log(pregunta.flag)
        //setRespuesta(pregunta.name)
    }
    
    if(isLoading){
    return(
        <div className='App'>
            <h2> Cargando ... </h2>
        </div>
    );
    }
    console.log(pregunta)
    return(
        <div className='App'>
            <h3> ¿Qué bandera es esta? </h3>
            <div onLoad={ConseguirBandera}/>
            <img alt='Bandera' src={`${pregunta.imagen}`}/>
            
        </div>
    );
    
/* 
    <input type="text" id="bandera" name="bandera" required> Ingrese el pais </input>
    <input type="submit" value='Submit'> Enviar </input>
*/ 
  
}

export default Juego;