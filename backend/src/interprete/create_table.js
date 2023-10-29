const tablas = require('../estructuras/tablas');
const instruccion = require('../interprete/instruccion');
const clase_ast = require('../ast/clase_ast');
class create_table extends instruccion{
constructor(tabla){
super();
this.tabla=tabla;
}
ejecutar(entorno){
tablas.agregar_tabla(this.tabla);




}
getAst(){
    let nodo = {
        padre: -1,
        cadena: ""
    }
    let nodo_tab=this.tabla.getAst();
    let n_tabla=clase_ast.sumar_contador();
    let n_padre=clase_ast.sumar_contador();
    nodo.padre=n_padre;
    nodo.cadena=nodo_tab.cadena+`${n_tabla}[label="create_table"]\n${n_padre}[label="instruccion"]\n${n_padre}->${n_tabla}\n${n_tabla}->${nodo_tab.padre}\n`;

    return nodo;


}






}

module.exports=create_table;