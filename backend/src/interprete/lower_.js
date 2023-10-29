const instruccion = require('./instruccion');
const clase_ast=require('../ast/clase_ast');



class lower_ extends instruccion{
constructor(valor){
super();
this.valor=valor;
}

ejecutar(entorno){
var valor=this.valor.ejecutar(entorno);
if(typeof valor=='string'){

return valor.toLowerCase();

}



}
getAst(){
let nodo={
padre:-1,
cadena:''
}
let nodo_valor=this.valor.getAst();
let n_lower=clase_ast.sumar_contador();
let n_padre=clase_ast.sumar_contador();
nodo.padre=n_padre;
nodo.cadena+=`${n_padre}[label="instruccion"];\n${n_lower}[label="LOWER"];\n${n_padre}->${n_lower};\n${n_lower}->${nodo_valor.padre};\n`+nodo_valor.cadena;
return nodo;






}



}
module.exports=lower_;

