const instruccion = require('./instruccion');
const entorno=require('../tabla_simbolos/entorno');
const clase_ast=require('../ast/clase_ast');
class encapsulamiento extends instruccion{
constructor(instrucciones){
super();
this.instrucciones=instrucciones;
this.entorno=new entorno("encapsulamiento",null);


}

ejecutar(entorno){
this.entorno.anterior=entorno;
var instr='';
for(var i in this.instrucciones){
var valor=this.instrucciones[i].ejecutar(this.entorno);
if(valor!=null && valor!=undefined && valor!=""){
instr+=valor+"\n";
}



}

return instr;

}

getAst(){
    console.log("entro a encapsulamiento");
let nodo={
padre:-1,
cadena:""
}
var contenido="";
if(this.instrucciones.length>1){
var cont="";
for(var i = 0; i < this.instrucciones.length - 1; i++){
var nodo_instruccion=this.instrucciones[i].getAst();
var n_instruccion=nodo_instruccion.padre;
var nodo_siguiente=this.instrucciones[i+1].getAst();
var n_siguiente=nodo_siguiente.padre;
cont+=nodo_instruccion.cadena+nodo_siguiente.cadena+`${n_siguiente}->${n_instruccion};\n${n_siguiente+1}->${n_siguiente};\n`;
}
contenido+=cont;
}
else if(this.instrucciones.length==1){
var nodo_instruccion=this.instrucciones[0].getAst();
contenido=nodo_instruccion.cadena+`\n${nodo_instruccion.padre+1}->${nodo_instruccion.padre};\n`;

}
var n_lista_instrucciones=clase_ast.sumar_contador();
var n_begin=clase_ast.sumar_contador();
var n_end=clase_ast.sumar_contador();
var n_bloque=clase_ast.sumar_contador();
var n_padre=clase_ast.sumar_contador();
nodo.padre=n_padre;

nodo.cadena=`${n_padre}[label="instruccion"];\n${n_lista_instrucciones}[label="lista_instrucciones"];\n${n_begin}[label="begin"];\n${n_end}[label="end"];\n${n_bloque}[label="bloque"];\n${n_padre}->${n_bloque};\n${n_bloque}->${n_begin};\n${n_bloque}->${n_lista_instrucciones};\n${n_bloque}->${n_end};\n`+contenido;

return nodo;






}




}

module.exports=encapsulamiento;