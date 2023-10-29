//import './App.css';
import {Barra} from './componentes/Barra';
import {Consola} from './componentes/consola';
import {Cuadros_texto} from './componentes/Cuadros_texto';
import {Lista} from './componentes/lista';
import React, { useState } from 'react';

function App() {
  const [fileContent, setFileContent] = useState('');

  const handleFileContentChange = (content) => {
    setFileContent(content);
  };
 
  const [texto_entrada, settexto_entrada] = useState('');
  
  const handletexto_entradaChange = (content) => {
    settexto_entrada(content);
  }
  return (
    <>
       <Lista onFileContentChange={handleFileContentChange} />
   
     <Cuadros_texto manejador={handletexto_entradaChange} contenido={fileContent}/>
      <Consola />
    </>
  )
}

export default App
