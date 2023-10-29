const instruccion = require('../interprete/instruccion');
const entorno = require('../tabla_simbolos/entorno');
const clase_ast=require('../ast/clase_ast');
class if_ extends instruccion{
constructor(condicion,instrucciones,instrucciones_else){
super();
this.condicion=condicion;
this.instrucciones=instrucciones;
this.instrucciones_else=instrucciones_else;
this.entorno=new entorno("if",null);
}


ejecutar(entorno){
let ins_ejecutadas=[];
this.entorno.anterior=entorno;
if(this.instrucciones_else!=null){
if(this.condicion.ejecutar(entorno)){
for(var i in this.instrucciones){
var ins=this.instrucciones[i].ejecutar(this.entorno);
if(ins!=null && ins!=undefined && ins!=''){

 ins_ejecutadas.push(ins);

}



}


}
else{
for(var i in this.instrucciones_else){

    var ins=this.instrucciones_else[i].ejecutar(this.entorno);
    if(ins!=null && ins!=undefined && ins!=''){
    
     ins_ejecutadas.push(ins);
    
    }

}


}


}
else{
    if(this.condicion.ejecutar(entorno)){
        for(var i in this.instrucciones){
        
            var ins=this.instrucciones[i].ejecutar(this.entorno);
              if(ins!=null && ins!=undefined && ins!=''){
    
               ins_ejecutadas.push(ins);
    
             }
        
        }
        
        
        }



}
var ins='';
for(var i in ins_ejecutadas){
    ins+=ins_ejecutadas[i].toString()+'\n';
}

return ins;
}
getAst(){
let nodo={
padre:-1,
cadena:""
}
if(this.instrucciones_else==null){
var contenido="";
var nodo_lista=0;
if(this.instrucciones.length>1){
var cont="";
for(var i = 0; i < this.instrucciones.length - 1; i++){
var nodo_valor=this.instrucciones[i].getAst();
var n_valor=nodo_valor.padre;
var nodo_siguiente=this.instrucciones[i+1].getAst();
var n_siguiente=nodo_siguiente.padre;
cont+=nodo_valor.cadena+nodo_siguiente.cadena+`${n_siguiente}->${n_valor};\n${n_siguiente+1}->${n_siguiente};\n`;
}
contenido+=cont;
}
else if(this.instrucciones.length==1){
var nodo_valor=this.instrucciones[0].getAst();
contenido+=nodo_valor.cadena+`\n${nodo_valor.padre+1}->${nodo_valor.padre};\n`;
}

let n_lista_instrucciones=clase_ast.sumar_contador();
let nodo_if=clase_ast.sumar_contador();
let nodo_condicion=this.condicion.getAst();
let nodo_then=clase_ast.sumar_contador();
let n_padre=clase_ast.sumar_contador();
nodo.padre=n_padre;
nodo.cadena=`${n_padre}[label="instruccion"]\n${n_lista_instrucciones}[label="instrucciones"];\n${nodo_if}[label="IF"];\n${nodo_then}[label="THEN"]\n${n_padre}->${nodo_if}\n${nodo_if}->${nodo_condicion.padre}\n${nodo_if}->${nodo_then}\n${nodo_if}->${n_lista_instrucciones}\n`+contenido+nodo_condicion.cadena;
return nodo;
}
else{
var contenido="";
var nodo_lista=0;
if(this.instrucciones.length>1){
var cont="";
if(this.instrucciones.length>1){
    for(var i = 0; i < this.instrucciones.length - 1; i++){
        var nodo_valor=this.instrucciones[i].getAst();
        var n_valor=nodo_valor.padre;
        var nodo_siguiente=this.instrucciones[i+1].getAst();
        var n_siguiente=nodo_siguiente.padre;
        cont+=nodo_valor.cadena+nodo_siguiente.cadena+`${n_siguiente}->${n_valor};\n${n_siguiente+1}->${n_siguiente};\n`;
        }
        contenido+=cont;

}
else if(this.instrucciones.length==1){
    var nodo_valor=this.instrucciones[0].getAst();
    contenido+=nodo_valor.cadena+`\n${nodo_valor.padre+1}->${nodo_valor.padre};\n`;
}



}
let nodo_lista_instrucciones=clase_ast.sumar_contador();

if(this.instrucciones_else.length>1){
var cont="";

    for(var i = 0; i < this.instrucciones_else.length - 1; i++){
        var nodo_valor=this.instrucciones_else[i].getAst();
        var n_valor=nodo_valor.padre;
        var nodo_siguiente=this.instrucciones_else[i+1].getAst();
        var n_siguiente=nodo_siguiente.padre;
        cont+=nodo_valor.cadena+nodo_siguiente.cadena+`${n_siguiente}->${n_valor};\n${n_siguiente+1}->${n_siguiente};\n`;
        }
        contenido+=cont;
    }

else if(this.instrucciones_else.length==1){
    var nodo_valor=this.instrucciones_else[0].getAst();
    contenido+=nodo_valor.cadena+`\n${nodo_valor.padre+1}->${nodo_valor.padre};\n`;

}

let nodo_lista_instrucciones_else=clase_ast.sumar_contador();
let nodo_if=clase_ast.sumar_contador();
let nodo_condicion=this.condicion.getAst();
let nodo_then=clase_ast.sumar_contador();
let nodo_else=clase_ast.sumar_contador();
let n_padre=clase_ast.sumar_contador();

nodo.padre=n_padre;
nodo.cadena=`${n_padre}[label="instruccion"]\n${n_lista_instrucciones}[label="instrucciones"];\n${nodo_if}[label="IF"];\n${nodo_then}[label="THEN"]\n${nodo_else}[label="ELSE"]\n${n_lista_instrucciones_else}[label="instrucciones_else"];\n${n_padre}->${nodo_if}\n${nodo_if}->${nodo_condicion.padre}\n${nodo_if}->${nodo_then}\n${nodo_if}->${n_lista_instrucciones}\n${nodo_if}->${nodo_else}\n${nodo_else}->${n_lista_instrucciones_else}\n`+contenido;
return nodo;


}


}




}
module.exports=if_;