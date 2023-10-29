
const instruccion = require('../interprete/instruccion');
const entorno = require('../tabla_simbolos/entorno');
const clase_ast=require('../ast/clase_ast');
class while_ extends instruccion{
constructor(expresion,instrucciones){
super();
this.expresion=expresion;
this.instrucciones=instrucciones;
this.entorno=new entorno("while",null);
}

ejecutar(entorno){
 let ins_ejecutadas=[];
this.entorno.anterior=entorno;
var ins='';   
while(this.expresion.ejecutar(entorno)){
 
 for(var i in this.instrucciones){
 var intr=this.instrucciones[i].ejecutar(this.entorno);
    if(intr!=null && intr!=undefined && intr!=''){
        ins+=intr.toString()+"\n";
        if(intr == 'BREAK'){

            break;
        }
        else if(intr == 'CONTINUE'){
            continue;
        }
       
    }
 }

}



return ins;
}    

getAst(){
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
contenido+=nodo_instruccion.cadena+`\n${nodo_instruccion.padre+1}->${nodo_instruccion.padre};\n`;
}

let n_instrucciones=clase_ast.sumar_contador();
let n_while=clase_ast.sumar_contador();
let nodo_expresion=this.expresion.getAst();
let n_padre=clase_ast.sumar_contador();
nodo.padre=n_padre;
nodo.cadena=`${n_padre}[label="instruccion"];\n${n_instrucciones}[label="instrucciones"];\n${n_while}[label="WHILE"];\n${n_padre}->${n_while};\n${n_while}->${nodo_expresion.padre};\n${n_while}->${n_instrucciones};\n`+contenido+nodo_expresion.cadena;

return nodo;


}


}

module.exports=while_;