const clase_ast=require('../ast/clase_ast');

class when_{
constructor(expresion1,expresion2){
this.expresion1=expresion1;
this.expresion2=expresion2;
}
getAst(){
let nodo={
padre:-1,
cadena:''
}

let nodo_expresion1=this.expresion1.getAst();
let nodo_expresion2=this.expresion2.getAst();
let n_when=clase_ast.sumar_contador();
let n_padre=clase_ast.sumar_contador();
nodo.padre=n_padre;
nodo.cadena+=`${n_padre}[label="instruccion"];\n${n_when}[label="WHEN"];\n${n_padre}->${n_when};\n${n_when}->${nodo_expresion1.padre};\n${n_when}->${nodo_expresion2.padre};\n`+nodo_expresion1.cadena+nodo_expresion2.cadena;
return nodo;




}




}
module.exports=when_;