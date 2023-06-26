import './App.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Juego({onNuevaBandera}) {
    const [isLoading, setIsLoading] = useState(true);
    const [pais, setPais] = useState('');
    //const [respuesta, setRespuesta] = useState('');

    useEffect(() => {
        axios.get('https://countriesnow.space/api/v0.1/countries/flag/images')
            .then((res) => {
                            //console.log(res)
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
        console.log(pais)
        let posicion = Math.floor(Math.random() * 220)
        const nuevaBandera ={
           nombre: pais[posicion].name,
           imagen: pais[posicion].flag,
        }
        console.log(nuevaBandera)
        onNuevaBandera(nuevaBandera)
        //console.log(pregunta.flag)
        //setRespuesta(pregunta.name)
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
            <div onLoad={ConseguirBandera}/>
            <img></img>
            <form>
            <input type="text" id="bandera" name="bandera" required> Adivine el pais: </input>
            <input type="submit" value='Submit'> Enviar </input>
            </form>
        </div>
    );
    

}

export default Juego;