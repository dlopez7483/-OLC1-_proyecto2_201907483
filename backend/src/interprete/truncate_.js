const instruccion = require('./instruccion');
const tablas = require('../estructuras/tablas');
const clase_ast = require('../ast/clase_ast');
class truncate_ extends instruccion{
constructor(valor1,valor2){
super();
this.valor1=valor1;
this.valor2=valor2;

}

ejecutar(entorno){
var val1=this.valor1.ejecutar(entorno);
var val2=this.valor2.ejecutar(entorno);
if(typeof val1=='number'&&typeof val2=='number'){
return val1.toFixed(val2);
}


}

getAst(){
let nodo = {
padre: -1,
cadena: ""
}

let nodo_valor1=this.valor1.getAst();
let nodo_valor2=this.valor2.getAst();
let n_truncate=clase_ast.sumar_contador();
let n_padre=clase_ast.sumar_contador();
nodo.padre=n_padre;
nodo.cadena+=`${n_padre}[label="instruccion"];\n${n_truncate}[label="TRUNCATE"];\n${n_padre}->${n_truncate};\n${n_truncate}->${nodo_valor1.padre};\n${n_truncate}->${nodo_valor2.padre};\n`+nodo_valor1.cadena+nodo_valor2.cadena;
return nodo;





}




}

module.exports=truncate_;