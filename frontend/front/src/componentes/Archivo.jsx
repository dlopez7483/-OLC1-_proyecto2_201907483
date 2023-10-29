import React, { useState } from 'react';

 export function Archivo() {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0]; // Obtenemos el primer archivo seleccionado
    if (file) {
      setSelectedFile(file);
    }
  };

  return (
    <div>
      <input
        type="file"
        onChange={handleFileChange}
      />
      <p>Archivo seleccionado: {selectedFile ? selectedFile.name : 'Ninguno'}</p>
    </div>
  );
}


