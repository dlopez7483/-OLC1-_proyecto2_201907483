const instruccion = require('./instruccion');
const clase_ast=require('../ast/clase_ast');
const entorno=require('../tabla_simbolos/entorno');

class funcion extends instruccion{
constructor(nombre,parametros,tipo_val,instrucciones){
super();
this.nombre=nombre;
this.parametros=parametros;
this.tipo_val=tipo_val;
this.instrucciones=instrucciones;
this.instrucciones_salidas="";
this.entorno=new entorno("funcion",null);
}

ejecutar(entorno){
entorno.add_funcion(this.nombre,this);

this.entorno.anterior=entorno;

for(var i in this.parametros){

this.entorno.add_simbolo(this.parametros[i].id,this.parametros[i].tipo,null);


}







}
llamado(valores){
    console.log("llamado");
    if(valores.length==this.parametros.length){
     for (i in this.parametros){
        var valor=valores[i];
        this.entorno.asignar_simbolo(this.parametros[i].id,valor);

     }
    }



    for(var i in this.instrucciones){

        var ins=this.instrucciones[i];
      
        if(ins.tipo=="RETURN"){
            console.log(ins.valor.ejecutar(this.entorno));
        
        return ins.valor.ejecutar(this.entorno);
        
        
        
        
        }
       
        
        
       ins.ejecutar(this.entorno);
        
        
        
        
        
        
        
        }



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


if(this.parametros.length>1){
var cont="";
for(var i = 0; i < this.parametros.length - 1; i++){
var nodo_parametro=this.parametros[i].getAst();
var n_parametro=nodo_parametro.padre;
var nodo_siguiente=this.parametros[i+1].getAst();
var n_siguiente=nodo_siguiente.padre;
cont+=nodo_parametro.cadena+nodo_siguiente.cadena+`${n_siguiente}->${n_parametro};\n${n_siguiente+1}->${n_siguiente};\n`;
}



}
else if(this.parametros.length==1){
var nodo_parametro=this.parametros[0].getAst();
contenido+=nodo_parametro.cadena+`\n${nodo_parametro.padre+1}->${nodo_parametro.padre};\n`;
}
let n_parametros=clase_ast.sumar_contador();

let n_nombre=clase_ast.sumar_contador();
let n_tipo=clase_ast.sumar_contador();
let n_funcion=clase_ast.sumar_contador();
let n_padre=clase_ast.sumar_contador();
nodo.padre=n_padre;
nodo.cadena=`${n_padre}[label="instruccion"];\n${n_funcion}[label="FUNCION"];\n${n_nombre}[label="${this.nombre}"];\n${n_tipo}[label="${this.tipo_val}"];\n${n_padre}->${n_funcion};\n${n_funcion}->${n_nombre};\n${n_funcion}->${n_tipo};\n${n_funcion}->${n_parametros};\n${n_funcion}->${n_instrucciones};\n`+contenido;
return nodo;







}

}

module.exports = funcion;