const entorno = require('../tabla_simbolos/entorno');
const instruccion = require('../interprete/instruccion');
const clase_ast=require('../ast/clase_ast');
class For_ extends instruccion{
constructor(ID,rango,instrucciones){
super();
this.ID=ID;
this.rango=rango;
this.instrucciones=instrucciones;
this.entorno=new entorno("for",null);



}

ejecutar(entorno){
var ins_ejecutadas=[];
var primer_rango=this.rango[0].ejecutar(entorno);
var segundo_rango=this.rango[1].ejecutar(entorno);
this.entorno.anterior=entorno;
if(this.ID.tipo=="ID_NORMAL"||this.ID.tipo=="ID_VARIABLE" && primer_rango!=null && segundo_rango!=null && typeof primer_rango=="number" && typeof segundo_rango=="number"){
 var id=this.ID.ejecutar(entorno);
 this.entorno.add_simbolo(id,"INT",0);
    for(var i=primer_rango;i<=segundo_rango;i++){
     this.entorno.asignar_simbolo(id,i);
        for(var j in this.instrucciones){
            var ins=this.instrucciones[j].ejecutar(this.entorno);
            if(ins!=null && ins!=undefined && ins!=''){
                ins_ejecutadas.push(ins);
                if(ins == 'BREAK'){
                 break;

                }
                else if(ins == 'CONTINUE'){
                 continue;
                }
                
            }
        }
    }

}


var salida="";
for(var i in ins_ejecutadas){
    if(ins_ejecutadas[i]!=null ){
        salida+=ins_ejecutadas[i].toString()+"\n";
    }
}

return salida;


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
contenido=cont;

}
else if(this.instrucciones.length==1){
var nodo_instruccion=this.instrucciones[0].getAst();
contenido+=nodo_instruccion.cadena+`\n${nodo_instruccion.padre+1}->${nodo_instruccion.padre};\n`;
}

let n_instrucciones=clase_ast.sumar_contador();
let n_for=clase_ast.sumar_contador();
let n_in=clase_ast.sumar_contador();
let nodo_id=this.ID.getAst();
let nodo_rango1=this.rango[0].getAst();
let nodo_rango2=this.rango[1].getAst();
let n_padre=clase_ast.sumar_contador();
nodo.padre=n_padre;
nodo.cadena+=`${n_padre}[label="instruccion"];\n${n_for}[label="FOR"];\n${n_in}[label="IN"];\n${n_instrucciones}[label="instrucciones"];\n${n_padre}->${n_for};\n${n_for}->${nodo_id.padre};\n${n_for}->${n_in};\n${n_in}->${nodo_rango1.padre};\n${n_in}->${nodo_rango2.padre};\n${n_for}->${n_instrucciones};\n`+nodo_id.cadena+nodo_rango1.cadena+nodo_rango2.cadena+contenido;

return nodo;




}

}
module.exports = For_;