const tablas = require('../estructuras/tablas');
const instruccion = require('../interprete/instruccion');
const entorno = require('../tabla_simbolos/entorno');
const clase_ast=require('../ast/clase_ast');
class update extends instruccion{
constructor(nombre_tabla,asignaciones,where){
super();
this.nombre_tabla=nombre_tabla;
this.asignaciones=asignaciones;
this.where=where;
this.entorno=new entorno("update",null);

}

ejecutar(entorno){
    console.log("update");
var tab=tablas.buscar_tabla(this.nombre_tabla);
this.entorno.anterior=entorno;
if(tab!=null){
    for(var i in tab.filas[0]){  
        this.entorno.add_simbolo(tab.filas[0][i].nombre,tab.filas[0][i].tipo,null);
        }
    if(this.where==null){
        for(var i in this.asignaciones){
            var asig=this.asignaciones[i];
            var valor1=asig.valor1;
            var valor2=asig.valor2;
           
            for(var i in tab.filas[0]){ 
                if(tab.filas[0][i].nombre==valor1){
                  if(tab.filas[0][i].tipo==valor2.tipo){
                    tab.filas[0][i].valor=valor2.ejecutar(this.entorno);
                  }
                }


            }




        }
    }
    else if(this.where!=null){
        for(var i in this.asignaciones){
            var asig=this.asignaciones[i];
            var valor1=asig.valor1;
            var valor2=asig.valor2;
             for(var i in tab.filas){
             for(var j in tab.filas[i]){
                this.entorno.asignar_simbolo(tab.filas[i][j].nombre,tab.filas[i][j].valor);
                if(tab.filas[i][j].nombre==valor1){
                    

                    if(this.where.ejecutar(this.entorno)){
                    tab.filas[i][j].valor=valor2.ejecutar(entorno);
                    }
                }


             }


             }  
         




        }


     console.log(tab.filas);
    }


    }

}
getAst(){
let nodo={
padre:-1,
cadena:""
}
var contenido="";
if(this.asignaciones.length>1){
var cont="";
for(var i = 0; i < this.asignaciones.length - 1; i++){
var nodo_instruccion=this.asignaciones[i].getAst();
var n_instruccion=nodo_instruccion.padre;
var nodo_siguiente=this.asignaciones[i+1].getAst();
var n_siguiente=nodo_siguiente.padre;
cont+=nodo_instruccion.cadena+nodo_siguiente.cadena+`${n_siguiente}->${n_instruccion};\n${n_siguiente+1}->${n_siguiente};\n`;
}
contenido+=cont;



}
else if(this.asignaciones.length==1){
var nodo_instruccion=this.asignaciones[0].getAst();
contenido+=nodo_instruccion.cadena+`\n${nodo_instruccion.padre+1}->${nodo_instruccion.padre};\n`;
}
let n_asignaciones=clase_ast.sumar_contador();
let n_nombre=clase_ast.sumar_contador();
let n_tabla=clase_ast.sumar_contador();
let nodo_where=this.where.getAst();
let n_update=clase_ast.sumar_contador();
let n_padre=clase_ast.sumar_contador();
nodo.padre=n_padre;
nodo.cadena=`${n_padre}[label="instruccion"];\n${n_update}[label="UPDATE"];\n${n_nombre}[label="${this.nombre_tabla}"];\n${n_tabla}[label="TABLA"];\n${n_asignaciones}[label="asignaciones"];\n${n_padre}->${n_update};\n${n_update}->${n_nombre};\n${n_update}->${n_tabla};\n${n_update}->${n_asignaciones};\n${n_tabla}->${n_nombre};\n${n_update}->${nodo_where.padre};\n${nodo_where.cadena}\n`;
return nodo;

}




}

module.exports=update;

    
