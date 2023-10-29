const instruccion = require('../interprete/instruccion');
const clase_ast=require('../ast/clase_ast');
class select_simple extends instruccion{
constructor(valor,as){
super();
this.valor=valor;
this.as=as;
}

ejecutar(entorno){
var filas='';
var encabezado='';
if(this.as==null){

for (const i in this.valor){
filas+="["+this.valor[i].ejecutar(entorno).toString()+"]     ";
}


}
else{
for(const i in this.as){
encabezado+="["+this.as[i].ejecutar(entorno).toString()+"]";
}

for (const i in this.valor){
    if(this.valor[i].ejecutar(entorno)!=null){
    filas+="["+this.valor[i].ejecutar(entorno).toString()+"]    "; 
    }
    else{
        filas+="[null]    ";
    }
    }

}

return encabezado+"\n"+filas+"\n";
}

getAst(){
let nodo={
padre:-1,
cadena:""
}
console.log("nnnnnnnnnnnnnnnnnnnnnnnnnnnnnn");
console.log(this.valor)
console.log("nnnnnnnnnnnnnnnnnnnnnnnnnnnnnn");

if(this.as==null){
 var contenido="";
 var nodo_lista=0;
    if(this.valor.length>1){
        var cont="";
        for(var i = 0; i < this.valor.length - 1; i++){
            var nodo_valor=this.valor[i].getAst();
            var n_valor=nodo_valor.padre;
            var nodo_siguiente=this.valor[i+1].getAst();
            var n_siguiente=nodo_siguiente.padre;
            cont+=nodo_valor.cadena+nodo_siguiente.cadena+`${n_siguiente}->${n_valor};\n${n_siguiente+1}->${n_siguiente};\n`;
            
            }
        
        contenido+=cont;
    }
    else if(this.valor.length==1){
        var nodo_valor=this.valor[0].getAst();
        console.log("**********************************");
        console.log(nodo_valor.cadena);
        console.log("**********************************");
        contenido+=nodo_valor.cadena+`\n${nodo_valor.padre+1}->${nodo_valor.padre};\n`;
    }
    let n_lista_columnas=clase_ast.sumar_contador();
    let n_select=clase_ast.sumar_contador();
    let n_padre=clase_ast.sumar_contador();
    nodo.padre=n_padre;
    nodo.cadena=`${n_padre}[label="instruccion"];\n${n_select}[label="SELECT"];\n${n_lista_columnas}[label="lista_columnas"];\n${n_padre}->${n_select};\n${n_select}->${n_lista_columnas};\n`+contenido;
    return nodo;
    
}
else{
var contenido="";
var nodo_lista=0;
if(this.valor.length>1){
    var cont="";
    console.log(this.valor.length);
    for(var i = 0; i < this.valor.length - 1; i++){
        var nodo_valor=this.valor[i].getAst();
        var n_valor=nodo_valor.padre;
        var nodo_siguiente=this.valor[i+1].getAst();
        var n_siguiente=nodo_siguiente.padre;
        cont+=nodo_valor.cadena+nodo_siguiente.cadena+`${n_siguiente}->${n_valor};\n${n_siguiente+1}->${n_siguiente};\n`;
        
        }
    
    contenido+=cont;

}




else if(this.valor.length==1){
    var nodo_valor=this.valor[0].getAst();
    contenido+=nodo_valor.cadena+`\n${nodo_valor.padre+1}->${nodo_valor.padre};\n`;
}

let n_lista_valores=clase_ast.sumar_contador()

if(this.as.length>1){
    var cont="";
    console.log(this.as.length);
    for(var i = 0; i < this.as.length - 1; i++){
        var nodo_valor=this.as[i].getAst();
        var n_valor=nodo_valor.padre;
        var nodo_siguiente=this.as[i+1].getAst();
        var n_siguiente=nodo_siguiente.padre;
        cont+=nodo_valor.cadena+nodo_siguiente.cadena+`${n_siguiente}->${n_valor};\n${n_siguiente+1}->${n_siguiente};\n`;
        
        }
    
    contenido+=cont;
}
else if(this.as.length==1){
    var nodo_valor=this.as[0].getAst();
    contenido+=nodo_valor.cadena+`\n${nodo_valor.padre+1}->${nodo_valor.padre};\n`;
}

let lista_valores_as=clase_ast.sumar_contador();
let n_select=clase_ast.sumar_contador();
let n_padre=clase_ast.sumar_contador();
nodo.padre=n_padre;
nodo.cadena=`${n_padre}[label="instruccion"];\n${n_select}[label="SELECT"];\n${n_lista_valores}[label="lista_valores"];\n${lista_valores_as}[label="AS"];\n${n_padre}->${n_select};\n${n_select}->${n_lista_valores};\n${n_select}->${lista_valores_as};\n`+contenido;

return nodo;









}











}



}

module.exports=select_simple;