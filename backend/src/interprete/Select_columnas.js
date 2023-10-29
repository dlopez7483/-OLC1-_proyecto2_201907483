const tablas = require('../estructuras/tablas');
const instruccion = require('../interprete/instruccion');
const casteo = require('../interprete/casteo');
const expresion = require('../interprete/expresion');
const dato_simple = require('../interprete/dato_simple');
const entorno = require('../tabla_simbolos/entorno');
const clase_ast=require('../ast/clase_ast');
class Select_columnas extends instruccion{
constructor(columnas,tabla,where){
super();
this.columnas=columnas;
this.tabla=tabla;
this.where=where;
this.entorno=new entorno("select",null);

}


ejecutar(entorno){
var tab=tablas.buscar_tabla(this.tabla);
var cont="";
if(tab!=null){

 if(this.where==null){
    if(this.columnas=="*"){

     for(var i in tab.filas){
    var fila="";
    for(var j in tab.filas[i]){
        if(tab.filas[i][j].valor!=null){
        fila+="["+tab.filas[i][j].valor.toString()+"]";
        }
        else{
        fila+="[null]";
        }
    }
     cont+=fila+"\n";

     }
     return cont;
    }
    else{
        console.log("columnas especificas");
    
    
      for(var i in tab.filas){
     var fila="";
     for(var j in tab.filas[i]){
       for (var k in this.columnas){
       if(this.columnas[k].tipo=="ID_NORMAL"){
        var col=this.columnas[k].ejecutar(entorno);
        if(tab.filas[i][j].nombre==col){
        if(tab.filas[i][j].valor!=null){
        fila+="["+tab.filas[i][j].valor.toString()+"]";
        }
        else{
        fila+="[null]";
        }
        }}
        else if(this.columnas[k].tipo=="CASTEO"){
       
        var col=this.columnas[k].valor.expresion.ejecutar(entorno);
        if(tab.filas[i][j].nombre==col){
        if(tab.filas[i][j].valor!=null){
        var dato=new dato_simple(tab.filas[i][j].tipo,tab.filas[i][j].valor.toString());

        var cast=new casteo(dato,this.columnas[k].valor.tipo_casteo);
        fila+="["+cast.ejecutar(entorno).toString()+"]";
        }
        }}

       } 


      }
      cont+=fila+"\n";
      
    }

        
       
       return cont;
    }
    
        
}
else{
this.entorno.anterior=entorno;
for(var i in tab.filas[0]){  
this.entorno.add_simbolo(tab.filas[0][i].nombre,tab.filas[0][i].tipo,null);
}


for(var i in tab.filas){
    var fila="";
   for(var j in tab.filas[i]){
     
     for(var k in this.columnas){
     if(this.columnas[k].tipo=="ID_NORMAL"){
        var col=this.columnas[k].ejecutar(entorno);
     
        if(tab.filas[i][j].nombre==col){
        
        this.entorno.asignar_simbolo(col,tab.filas[i][j].valor);
        if(this.where.ejecutar(this.entorno)){
         fila+="["+tab.filas[i][j].valor.toString()+"]";
   
   
        }
   
   
   
        }
        
   


     }
     else if(this.columnas[k].tipo=="CASTEO"){
      var col=this.columnas[k].expresion.valor.ejecutar(entorno);
      if(tab.filas[i][j].nombre==col){
        
        this.entorno.asignar_simbolo(col,tab.filas[i][j].valor);
        if(this.where.ejecutar(this.entorno)){
            var dato=new dato_simple(tab.filas[i][j].tipo,tab.filas[i][j].valor.toString());

            var cast=new casteo(dato,this.columnas[k].valor.tipo_casteo);
            fila+="["+cast.ejecutar(entorno).toString()+"]";
   
   
        }
   
   
   
        }

     }
    


     }
     
   
    }
    cont+=fila+"\n";
   }

 return cont;
 
}


}



}

getAst(){
let nodo = {
padre: -1,
cadena: ""
}

if(this.columnas=="*" && this.where==null){
let n_select=clase_ast.sumar_contador();
let n_por=clase_ast.sumar_contador();
let n_from=clase_ast.sumar_contador();
let n_tabla=clase_ast.sumar_contador();
let n_padre=clase_ast.sumar_contador();
nodo.padre=n_padre;
nodo.cadena=`${n_padre}[label="instruccion"];\n${n_select}[label="SELECT"];\n${n_por}[label="*"];\n${n_from}[label="FROM"];\n${n_tabla}[label="${this.tabla}"];\n${n_padre}->${n_select};\n${n_select}->${n_from};\n${n_select}->${n_por};\n${n_select}->${n_tabla};\n`;

return  nodo;
}

else{
var contenido="";
var nodo_lista=0;
if(this.columnas.length>1){
var cont="";
for(var i = 0; i < this.columnas.length - 1; i++){
var nodo_declaracion=this.columnas[i].getAst();
var n_declaracion=nodo_declaracion.padre;
var nodo_siguiente=this.columnas[i+1].getAst();
var n_siguiente=nodo_siguiente.padre;
cont+=nodo_declaracion.cadena+nodo_siguiente.cadena+`${n_siguiente}->${n_declaracion};\n${n_siguiente+1}->${n_siguiente};\n`;
}
contenido+=cont;      
}
else if(this.columnas.length==1){
var nodo_declaracion=this.columnas[0].getAst();
contenido+=nodo_declaracion.cadena+`\n${nodo_declaracion.padre+1}->${nodo_declaracion.padre};\n`;
}


let n_lista_columnas=clase_ast.sumar_contador();
let n_from=clase_ast.sumar_contador();
let nodo_where=this.where.getAst();
let n_where=clase_ast.sumar_contador();
let n_nombre=clase_ast.sumar_contador();
let n_select=clase_ast.sumar_contador();
let n_padre=clase_ast.sumar_contador();
nodo.padre=n_padre;
nodo.cadena=`${n_padre}[label="instruccion"];\n${n_select}[label="SELECT"];\n${n_from}[label="FROM"];\n${n_nombre}[label="${this.tabla}"];\n${n_where}[label="WHERE"]\n${n_lista_columnas}[label="columnas"];\n${n_padre}->${n_select};\n${n_select}->${n_from};\n${n_select}->${n_lista_columnas};\n${n_select}->${n_nombre};\n${n_select}->${n_where}\n${n_where}->${nodo_where.padre}`+contenido+nodo_where.cadena;
return nodo;

}




}


}
module.exports=Select_columnas;