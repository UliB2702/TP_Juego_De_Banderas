import { useState } from "react";
import './App.css';
import Juego from './Juego';

function App() {
  const [pregunta, setPregunta] = useState('');

    const agregarBandera = (contenido) => {
      const nuevaBandera = {
        nombre: contenido.name,
        imagen: contenido.flag,
      };
      setPregunta([...pregunta, nuevaBandera])
    };

  return (
    <Juego onNuevaBandera={agregarBandera} />
  );
}

export default App;
