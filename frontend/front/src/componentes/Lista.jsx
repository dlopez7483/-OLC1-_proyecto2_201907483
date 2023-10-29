import React, { useState } from 'react';

export function Lista({ onFileContentChange }) {
    const [fileList, setFileList] = useState([]);
    const [selectedFileContent, setSelectedFileContent] = useState('');
    const handleFileChange = (event) => {
        const files = event.target.files;
        const newFileList = Array.from(files);
        setFileList((prevFileList) => [...prevFileList, ...newFileList]);
      };
    const handleSelectFile = (event) => {


        const selectedFileIndex = event.target.value;
        if (selectedFileIndex >= 0) {
          const selectedFile = fileList[selectedFileIndex];
          // Leemos el contenido del archivo seleccionado
          const reader = new FileReader();
          reader.onload = (e) => {
            setSelectedFileContent(e.target.result);
          };
          reader.readAsText(selectedFile);
        } else {
          setSelectedFileContent('');
        }
      // Simulamos la obtención del contenido del archivo
      const content =selectedFileContent;
      setSelectedFileContent(content);
      onFileContentChange(content); // Llama a la función de App.jsx
    };
  
    return (
      <div>
         <input type="file" onChange={handleFileChange} multiple />
      <select onChange={handleSelectFile}>
        <option value="-1">Selecciona un archivo</option>
        {fileList.map((file, index) => (
          <option key={index} value={index}>
            {file.name}
          </option>
        ))}
      </select>
   
      </div>
    );
}

