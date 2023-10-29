const instruccion = require('./instruccion');
const clase_ast=require('../ast/clase_ast');

class round_ extends instruccion{
constructor(valor,valor2){
super();
this.valor=valor;
this.valor2=valor2;
}


ejecutar(entorno){
var valor=this.valor.ejecutar(entorno);
var valor2=this.valor2.ejecutar(entorno);
if(typeof valor=='number' && typeof valor2=='number'){
return valor.toFixed(valor2);


}



}
getAst(){
let nodo={
padre:-1,
cadena:''
}

let nodo_valor=this.valor.getAst();
let nodo_valor2=this.valor2.getAst();
let n_round=clase_ast.sumar_contador();
let n_padre=clase_ast.sumar_contador();
nodo.padre=n_padre;
nodo.cadena+=`${n_padre}[label="instruccion"];\n${n_round}[label="ROUND"];\n${n_padre}->${n_round};\n${n_round}->${nodo_valor.padre};\n${n_round}->${nodo_valor2.padre};\n`+nodo_valor.cadena+nodo_valor2.cadena;
return nodo;





}



}
module.exports=round_;