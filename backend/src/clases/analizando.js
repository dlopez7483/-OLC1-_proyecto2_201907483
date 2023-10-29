const parser = require('../analizador/Parser');
const tablas = require('../estructuras/tablas');
const entorno = require('../tabla_simbolos/entorno');
const clase_ast = require('../ast/clase_ast');
const fs = require('fs');
const Viz = require('viz.js');
const { Module, render } = require('viz.js/full.render');
const errores = require('../manejador_errores/errores');

exports.analisis = async (req, res) => {

//entrada=`

//SELECT LOWER("HOLA MUNDO"); -- hola mundo


//`;
const entrada = req.body.entrada;
console.log(entrada);
let ins_salidas =[];
var entorno_global=new entorno('global',null);
var instrucciones_ast=[];
let instrucciones=parser.parse(entrada);
instrucciones.forEach(instruccion => {
   try{
   
   ins_salidas.push(instruccion.ejecutar(entorno_global));
  instrucciones_ast.push(instruccion);
}catch(error){
   console.log("error en la ejecucion");
}

});
console.log('saliendo');
contenido = '';
let nodo = {
padre: -1,
cadena: ""
}



if(instrucciones_ast.length>1){
var cont='';
for(var i = 0; i < instrucciones_ast.length - 1; i++){
try{
   var nodo_instruccion=instrucciones_ast[i].getAst();
var n_instruccion=nodo_instruccion.padre;
var nodo_siguiente=instrucciones_ast[i+1].getAst();
var n_siguiente=nodo_siguiente.padre;
cont+=nodo_instruccion.cadena+nodo_siguiente.cadena+`${n_siguiente}->${n_instruccion};\n${n_siguiente+1}->${n_siguiente};\n`;
}
catch(error){
   console.log("error en el ast");

}

}
contenido=cont;
}

else if(instrucciones_ast.length==1){
var nodo_instruccion=instrucciones_ast[0].getAst();
contenido=nodo_instruccion.cadena+`\n${nodo_instruccion.padre+1}->${nodo_instruccion.padre};\n`;
}
let n_instrucciones=clase_ast.sumar_contador();
let n_padre=clase_ast.sumar_contador();
nodo.padre=n_padre;
nodo.cadena=`${n_padre}[label="AST"];\n${n_instrucciones}[label="instrucciones"];\n${n_padre}->${n_instrucciones};\n`+contenido;

var arbol="digraph G {\n"+nodo.cadena+"}";


const ruta='ast.dot';
try {
   fs.writeFileSync(ruta,arbol);
}
catch(error){
   console.log("error al escribir el archivo");
}

const rutaArchivoDot = 'ast.dot';

// Leer el contenido del archivo .dot
const contenidoDot = fs.readFileSync(rutaArchivoDot, 'utf-8');

// Crear un nuevo objeto Viz
const viz = new Viz({ Module, render });

// Renderizar el grafo .dot en formato .svg
viz.renderString(contenidoDot)
  .then(svg => {
    // Guardar el resultado en un archivo .svg
    fs.writeFileSync('grafo.svg', svg);
    console.log('Archivo .svg generado con éxito.');
  })
  .catch(error => {
    console.error('Error al convertir el archivo .dot a .svg:', error);
  });








clase_ast.limpar_contador();





var salida='';

for(var i in ins_salidas){
if(ins_salidas[i]!=null && ins_salidas[i]!=undefined && ins_salidas[i]!=''){
salida+=ins_salidas[i]+'\n';
}


}

try {
res.status(200).json({
      body: { res: true, message:salida},
}); 
} catch (error) {
   console.log(error);
   res.status(500).json({
       body: { res: false, message: 'OCURRIÓ UN PROBLEMA AL hacer la consulta', error },
   });
}

//console.log(entorno_global.tabla_simbolos)

/*for(var i in tablas.tabs){
console.log(tablas.tabs[i])

} */



};



