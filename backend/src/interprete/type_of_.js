const instruccion = require('./instruccion');
const clase_ast = require('../ast/clase_ast');

class type_of_ extends instruccion{
constructor(valor){
super();
this.valor=valor;

}

ejecutar(entorno){
var valor=this.valor;
return valor.tipo;





}

getAst(){
let nodo={
padre:-1,
cadena:''
}
let nodo_valor=this.valor.getAst();
let n_type_of=clase_ast.sumar_contador(); 
let n_padre=clase_ast.sumar_contador();
nodo.padre=n_padre;
nodo.cadena+=`${n_padre}[label="instruccion"];\n${n_type_of}[label="TYPEOF"];\n${n_padre}->${n_type_of};\n${n_type_of}->${nodo_valor.padre};\n`+nodo_valor.cadena;

return nodo;


}


}
module.exports=type_of_;