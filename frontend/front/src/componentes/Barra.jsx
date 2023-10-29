import { useEffect, useState } from "react";
import axios from 'axios';

export function Barra({ejecutar,salida}){
    const [texto_salida, setTexto_salida] = useState('');
    function enviar(){
    axios.post('http://localhost:3000/analisis', {
        entrada: ejecutar
    }).then(
        (response) => {
            console.log(response.data.body.message);
            setTexto_salida(response.data.body.message);
            salida(texto_salida);
        }

    )

        
    }
    return (
        <div>
          <button onClick={enviar}>Ejecutar</button>
          
        </div>
      );




}