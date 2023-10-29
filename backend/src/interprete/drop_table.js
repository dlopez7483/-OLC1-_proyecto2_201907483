const tablas = require('../estructuras/tablas');
const instruccion = require('../interprete/instruccion');
const clase_ast=require('../ast/clase_ast');
class drop_table extends instruccion{
constructor(nombre){
super();
this.nombre=nombre;
}

ejecutar(entorno){
tablas.borrar_tabla(this.nombre);

}

getAst(){
    let nodo = {
        padre: -1,
        cadena: ""
    }
   let n_nombre = clase_ast.sumar_contador();
   let n_table = clase_ast.sumar_contador();
   let n_drop = clase_ast.sumar_contador();
   let n_padre=clase_ast.sumar_contador();
   nodo.padre=n_padre;
  nodo.cadena+=`${n_padre}[label="instruccion"];\n${n_drop}[label="DROP"];\n${n_table}[label="TABLE"];\n${n_nombre}[label="${this.nombre}"];\n${n_padre}->${n_drop};\n${n_drop}->${n_table};\n${n_drop}->${n_nombre};\n`;
  return nodo;


   

    
}






}
module.exports=drop_table;