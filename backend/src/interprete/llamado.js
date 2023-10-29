const instruccion = require('./instruccion');
const clase_ast=require('../ast/clase_ast');

class llamado extends instruccion{
constructor(id,valores){
 super();
 this.id=id;
 this.valores=valores;      
}




ejecutar(entorno){
var funcion=entorno.buscar_funcion(this.id);
var vals=[];

for(var i in this.valores){

vals.push(this.valores[i].ejecutar(entorno));

}

return funcion.llamado(vals);




}


getAst(){
let nodo={
padre:-1,
cadena:''
}
var contenido="";
var nodo_lista=0;
if(this.valores.length>1){
var cont="";
for(var i = 0; i < this.valores.length - 1; i++){
var nodo_declaracion=this.valores[i].getAst();
var n_declaracion=nodo_declaracion.padre;
var nodo_siguiente=this.valores[i+1].getAst();
var n_siguiente=nodo_siguiente.padre;
cont+=nodo_declaracion.cadena+nodo_siguiente.cadena+`${n_siguiente}->${n_declaracion};\n${n_siguiente+1}->${n_siguiente};\n`;
}
contenido+=cont;      



}
else if(this.valores.length==1){
var nodo_declaracion=this.valores[0].getAst();
contenido+=nodo_declaracion.cadena+`\n${nodo_declaracion.padre+1}->${nodo_declaracion.padre};\n`;
}
let n_lista_valores=clase_ast.sumar_contador();
let n_llamado=clase_ast.sumar_contador();
let n_id=clase_ast.sumar_contador();
let n_padre=clase_ast.sumar_contador();
nodo.padre=n_padre;
nodo.cadena=`${n_padre}[label="instruccion"];\n${n_llamado}[label="LLAMADO"];\n${n_id}[label="${this.id}"];\n${n_padre}->${n_llamado};\n${n_llamado}->${n_id};\n${n_llamado}->${n_lista_valores};\n`+contenido;
return nodo;



}




}
module.exports=llamado;