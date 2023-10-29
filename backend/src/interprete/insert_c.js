const tablas = require('../estructuras/tablas');
const instruccion = require('../interprete/instruccion');
const clase_ast=require('../ast/clase_ast');
class insert_c extends instruccion{
constructor(nombre_tabla,columnas, valores){
super();
this.nombre_tabla=nombre_tabla;
this.columnas=columnas;
this.valores=valores;

}

ejecutar(entorno){

    var tab=tablas.buscar_tabla(this.nombre_tabla);
    if(tab!=null){
      let fila=[];
     if(this.columnas.length==this.valores.length){
        for(var i in tab.columnas){
           var validar=true;
            for (var j in this.columnas){
              if(tab.columnas[i].nombre==this.columnas[j].ejecutar(entorno)){
              validar=false;
              if(typeof this.valores[j].ejecutar(entorno)=='string' || this.valores[j].ejecutar(entorno)==null && tab.columnas[i].tipo=='VARCHAR'){
              
                fila.push({nombre:tab.columnas[i].nombre,valor:this.valores[j].ejecutar(entorno),tipo:tab.columnas[i].tipo})

              }
              else if(typeof this.valores[j].ejecutar(entorno)=='number' || this.valores[j].ejecutar(entorno)==null && tab.columnas[i].tipo=='INT'){
              
                fila.push({nombre:tab.columnas[i].nombre,valor:this.valores[j].ejecutar(entorno),tipo:tab.columnas[i].tipo})
              }
              else if(typeof this.valores[j].ejecutar(entorno)=='number' || this.valores[j].ejecutar(entorno)==null && tab.columnas[i].tipo=='DOUBLE'){
              
                fila.push({nombre:tab.columnas[i].nombre,valor:this.valores[j].ejecutar(entorno),tipo:tab.columnas[i].tipo})
              }


              else if(this.valores[j].ejecutar(entorno) instanceof Date || this.valores[j].ejecutar(entorno)==null && tab.columnas[i].tipo=='DATE'){
              
                fila.push({nombre:tab.columnas[i].nombre,valor:this.valores[j].ejecutar(entorno),tipo:tab.columnas[i].tipo})
            }
              }
             
            }
         
     
           if(validar){

            fila.push({nombre:tab.columnas[i].nombre,valor:null,tipo:tab.columnas[i].tipo})
           }
     
          }


     }
     else{
        console.log("error de columnas")
      }
     
     



     tab.insertar_fila(fila);
    }



}
getAst(){
  let nodo = {
    padre: -1,
    cadena: ""
}
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

let n_insert=clase_ast.sumar_contador();


let n_into=clase_ast.sumar_contador();

let n_nombre=clase_ast.sumar_contador();

let n_padre=clase_ast.sumar_contador();

nodo.cadena=`${n_padre}[label="instruccion"]\n${n_insert}[label="INSERT"]\n${n_into}[label="INTO"]\n${n_nombre}[label="${this.nombre_tabla}"]\n${n_lista_columnas}[label="columnas"];\n${n_lista_valores}[label="valores"];\n${n_padre}->${n_insert};\n${n_insert}->${n_into};\n${n_insert}->${n_nombre};\n${n_insert}->${n_lista_columnas};\n${n_insert}->${n_lista_valores};\n`+contenido;

return nodo;










}




}


module.exports=insert_c;