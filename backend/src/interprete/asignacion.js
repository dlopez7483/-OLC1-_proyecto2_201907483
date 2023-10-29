const instruccion = require('../interprete/instruccion');
const clase_ast = require('../ast/clase_ast');


class asignacion extends instruccion{
constructor(nombre,valor){
super();
this.nombre=nombre;
this.valor=valor;

}
ejecutar(entorno){
entorno.asignar_simbolo(this.nombre,this.valor);
}

getAst(){
let nodo={
padre:-1,
cadena:''
}
let nodo_valor=this.valor.getAst();
let n_asignacion=clase_ast.sumar_contador();
let n_padre=clase_ast.sumar_contador();
nodo.padre=n_padre;
nodo.cadena+=`${n_padre}[label="instruccion"];\n${n_asignacion}[label="="];\n${n_padre}->${n_asignacion};\n${n_asignacion}->${nodo_valor.padre};\n`+nodo_valor.cadena;

   
}








}

module.exports=asignacion;