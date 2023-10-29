const tablas = require('../estructuras/tablas');
const instruccion = require('../interprete/instruccion');
const clase_ast=require('../ast/clase_ast');
class truncate_table extends instruccion{
constructor(nombre){
super();
this.nombre=nombre;
}



ejecutar(entorno){
var tab=tablas.buscar_tabla(this.nombre);
if(tab!=null){

tab.filas=[];


}


}
getAst(){ 
let nodo = {
padre: -1,
cadena: ""
}
let n_nombre=clase_ast.sumar_contador();  
let n_truncate_table=clase_ast.sumar_contador();
let n_padre=clase_ast.sumar_contador();
nodo.padre=n_padre;
nodo.cadena+=`${n_padre}[label="instruccion"];\n${n_truncate_table}[label="TRUNCATE_TABLE"];\n${n_padre}->${n_truncate_table};\n${n_truncate_table}->${n_nombre};\n`;
return nodo;

}

}

module.exports=truncate_table;