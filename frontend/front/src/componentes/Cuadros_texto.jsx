import { useEffect, useState } from "react";
import axios from 'axios';
export function Cuadros_texto({manejador,contenido,contenido_salida}){
    const [texto, setTexto] = useState('');
    manejador(texto);
    const [texto_salida, setTexto_salida] = useState('');
    function enviar(){
    axios.post('http://localhost:3000/analisis', {
        entrada: texto.toString()
    }).then(
        (response) => {
            console.log(response.data.body.message);
            setTexto_salida(response.data.body.message);
        }

    )

        
    }

return (
    <div>
        <button onClick={enviar}>Ejecutar</button>
        <br></br>
        <textarea value={contenido} name="texto_entrada" onChange={(e) => setTexto(e.target.value)} id="texto_entrada" cols="50" rows="20"></textarea>
        <textarea value={texto_salida} name="texto_salida" id="texto_salida" cols="50" rows="20"></textarea>
    </div>
  
);


    
}