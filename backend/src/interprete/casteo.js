const tablas = require('../estructuras/tablas');
const instruccion = require('../interprete/instruccion');
const clase_ast=require('../ast/clase_ast');

class casteo extends instruccion{
constructor(expresion,tipo_casteo){
super();
this.expresion=expresion;
this.tipo_casteo=tipo_casteo;
}
ejecutar(entorno){ 
var valor_expresion=this.expresion.ejecutar(entorno);
if(typeof valor_expresion =='string' && this.tipo_casteo=='INT'){
try{
return parseInt(valor_expresion.replace(/["']/g, ''));
}
catch(err){
console.log("error de casteo");
}

}
else if(typeof valor_expresion =='number' && this.tipo_casteo=='VARCHAR'){

return "\'"+valor_expresion.toString()+"\'";

}

else if(valor_expresion instanceof Date && this.tipo_casteo=='VARCHAR'){

return valor_expresion.toString();

}

else if (typeof valor_expresion == 'boolean' && this.tipo_casteo=='VARCHAR'){
return valor_expresion.toString();
}
else if (typeof valor_expresion == 'boolean' && this.tipo_casteo=='INT'){
if(valor_expresion==true){
return 1;
}
else{
return 0;
}
}

else if(valor_expresion instanceof Date && this.tipo_casteo=='INT'){
return valor_expresion.getTime();
}
else if(valor_expresion==null && this.tipo_casteo=='VARCHAR'){

return 'NULL';
}

else if (valor_expresion==null && this.tipo_casteo=='INT'){
return 0;
}

else if(typeof valor_expresion=='number' && this.tipo_casteo=='BOOLEAN'){
if(valor_expresion==0 || valor_expresion==0.0 || valor_expresion==null ){
return false;
}
else{
return true;


}


}


else if(typeof valor_expresion=='string' && this.tipo_casteo=='BOOLEAN'){
if(valor_expresion=='true' || valor_expresion=='TRUE' || valor_expresion=='True'){
return true;

}
else if(valor_expresion=='false' || valor_expresion=='FALSE' || valor_expresion=='False'){
return false;

}


}

else if(typeof valor_expresion=='number' && this.tipo_casteo=='DATE'){
return new Date(valor_expresion);
    
}    


else{
console.log("error de casteoooooooooooo");


}






}

getAst(){
let nodo={
padre:-1,  
cadena:""
}
console.log(this.expresion)
let nodo_valor=this.expresion.getAst();
let n_cast=clase_ast.sumar_contador();
let n_as=clase_ast.sumar_contador();
let n_tipo=clase_ast.sumar_contador();
let n_padre=clase_ast.sumar_contador();
nodo.padre=n_padre;

nodo.cadena=`${n_padre}[label="instruccion"]\n${n_cast}[label="CAST"]\n${n_as}[label="AS"]\n${n_tipo}[label="${this.tipo_casteo}"]\n${n_padre}->${n_cast}\n${n_cast}->${nodo_valor.padre}\n${n_cast}->${n_as}\n${n_cast}->${n_tipo}\n`+nodo_valor.cadena;
return nodo;


}



}
module.exports=casteo;