const clase_ast=require('../ast/clase_ast');
class asignacion_columna{
constructor(valor1,valor2){
this.valor1=valor1;
this.valor2=valor2;
}

getAst(){
let nodo={
padre:-1,
cadena:''
}
let n_valor1=clase_ast.sumar_contador();
let nodo_valor2=this.valor2.getAst();
let n_asignacion=clase_ast.sumar_contador();
let n_padre=clase_ast.sumar_contador();
nodo.padre=n_padre;
nodo.cadena+=`${n_padre}[label="instruccion"];\n${n_asignacion}[label="="];\n${n_padre}->${n_asignacion};\n${n_asignacion}->${n_valor1};\n${n_asignacion}->${nodo_valor2.padre};\n`+nodo_valor2.cadena;
return nodo;




}



}
module.exports=asignacion_columna;