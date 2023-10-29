const tablas = require('../estructuras/tablas');
const instruccion = require('./instruccion');
const clase_ast=require('../ast/clase_ast');


class add_column extends instruccion{
constructor(columna,tipo_operacion){
super();
this.columna=columna;
this.tipo_operacion=tipo_operacion;
}

ejecutar(entorno){



}
buscar_columna(nombre){

var tab=tablas.buscar_tabla(nombre);

if(tab!=null){
tab.columnas.push(this.columna);



}
else{

  console.log("tabla no encontrada")  
}




}

getAst(){
let nodo = {
padre: -1,
cadena: ""
}
let n_tipo=clase_ast.sumar_contador();
let n_nombre=clase_ast.sumar_contador();
let n_alter=clase_ast.sumar_contador();
let n_padre=clase_ast.sumar_contador();
nodo.padre=n_padre;
nodo.cadena+=`${n_padre}[label="instruccion"];\n${n_alter}[label="ALTER"]\n${n_tipo}[label="${this.tipo_operacion}"];\n${n_nombre}[label="${this.nombre}"];\n${n_padre}->${n_alter};\n${n_alter}->${n_tipo};\n${n_alter}->${n_nombre};\n`;
return nodo;





}


}

module.exports=add_column;





