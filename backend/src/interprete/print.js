
const instruccion = require('../interprete/instruccion');
const expresion = require('../interprete/expresion');
const entorno = require('../tabla_simbolos/entorno')
const clase_ast = require('../ast/clase_ast')
class Print extends instruccion {
constructor (valor){
super();
this.valor=valor;
}

ejecutar(entorno){
var valor=this.valor.ejecutar(entorno);  
if(valor!=null){

return valor.toString();



} 
else{
return null;


}

}

getAst(){
    let nodo = {
        padre: -1,
        cadena: ""
    }
    let nodo_expresion=this.valor.getAst();
    let nodo_v=clase_ast.sumar_contador();
    let nodo_padre=clase_ast.sumar_contador();
    nodo.padre=nodo_padre;
    nodo.cadena=nodo_expresion.cadena+`${nodo_v}[label="print"]\n${nodo_padre}[label="instruccion"]\n${nodo_padre}->${nodo_v}\n${nodo_v}->${nodo_expresion.padre}\n`;

    return nodo;


}


}
module.exports=Print;