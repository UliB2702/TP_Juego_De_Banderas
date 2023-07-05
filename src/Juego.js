import './App.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.css';

function Juego() {
    const [isLoading, setIsLoading] = useState(true);
    const [pais, setPais] = useState('');
    const [pregunta, setPregunta] = useState('');
    const [puntaje, setPuntaje] = useState(0);
    const [pulsado, setPulsado] = useState(false);

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

    const ConseguirBandera = () => {
        let posicion = Math.floor(Math.random() * 220)
        var nuevaBandera = {
           nombre: pais[posicion].name,
           imagen: pais[posicion].flag
        }
        console.log(pais[posicion].flag)

        setPregunta(nuevaBandera)
        console.log(nuevaBandera.nombre)
    }

    const IniciarJuego = (e) => {
        setPulsado(true)
        e.target.parentNode.removeChild(e.target)
        ConseguirBandera()
    }
    
    const CambiarPuntaje = (e) => {
        e.preventDefault()
        const datos = new FormData(e.target)
        let respuesta = datos.get("respuesta")
        let nuevoPuntaje
        if(respuesta === pregunta.nombre)
        {
            nuevoPuntaje = puntaje + 10
            setPuntaje(nuevoPuntaje)
        }
        else{
            nuevoPuntaje = puntaje - 1
            setPuntaje(nuevoPuntaje)
        }
        datos.delete("respuesta")
        ConseguirBandera()
    }

    const RestoDelJuego = () => {

        return(<div id='Restodeljuego'>
            <h4 className='DiferenteLetra outline shadow'> Puntaje: {`${puntaje}`} </h4><br/>
            <img className='Bandera shadow' alt='Bandera' src={`${pregunta.imagen}`}/><br/><br/>
            <form onSubmit={CambiarPuntaje}> 
                <input className='form-control text-center achicar shadow' type="text" placeholder="Ingrese el nombre de la bandera" name='respuesta' aria-label="default input example"></input> <br/>
                <button type="submit" className='btn btn-primary achicar form-control shadow'> Enviar </button>
            </form> <br/>
        </div>)
    }
    
    if(isLoading){
    return(
        <div className='App'>
            <h2> Cargando ... </h2>
        </div>
    );

    }
    return(
        <div className='App'><br/><br/>
            <h1 className='DiferenteLetra '> ¿Qué bandera es esta? </h1>
            <br/><br/>
            <div id='Juego' className='container'>
                <button onClick={IniciarJuego} className='btn btn-primary achicar form-control'> Iniciar Juego</button> <br/><br/>
                {pulsado ? (
                <RestoDelJuego />
                 ) : (
                    <div></div>
                 )}
            </div>
        </div>
    );
  
}

export default Juego;