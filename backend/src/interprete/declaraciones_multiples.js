const instruccion = require('./instruccion');
const clase_ast = require('../ast/clase_ast');


class declaracion_multiple extends instruccion{
constructor(declaraciones){
super();
this.declaraciones=declaraciones;
}


ejecutar(entorno){
for(const i in this.declaraciones){
this.declaraciones[i].ejecutar(entorno);

}




}
getAst(){
 let nodo = {
     padre: -1,
     cadena: ""
 }

var contenido="";
var nodo_lista=0;
if(this.declaraciones.length>1){
    var cont="";
    console.log(this.declaraciones.length);
    for(var i = 0; i < this.declaraciones.length - 1; i++){
        var nodo_declaracion=this.declaraciones[i].getAst();
        var n_declaracion=nodo_declaracion.padre;
        var nodo_siguiente=this.declaraciones[i+1].getAst();
        var n_siguiente=nodo_siguiente.padre;
        cont+=nodo_declaracion.cadena+nodo_siguiente.cadena+`${n_siguiente}->${n_declaracion};\n${n_siguiente+1}->${n_siguiente};\n`;
        
        }

 contenido=cont;      

}
else if(this.declaraciones.length==1){
    var nodo_declaracion=this.declaraciones[0].getAst();
    contenido=nodo_declaracion.cadena+`\n${nodo_declaracion.padre+1}->${nodo_declaracion.padre};\n`;




}   

var n_lista_padre=clase_ast.sumar_contador();
var n_padre=clase_ast.sumar_contador();
nodo.padre=n_padre;
var listas_contenido=`${n_padre}[label="instruccion"];\n${n_lista_padre}[label="declaraciones"];\n${n_padre}->${n_lista_padre};\n`+contenido;
nodo.cadena=listas_contenido;

return nodo;

}





}

module.exports=declaracion_multiple;