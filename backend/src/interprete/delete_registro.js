const instruccion = require('./instruccion');
const tablas = require('../estructuras/tablas');
const entorno=require('../tabla_simbolos/entorno');
const clase_ast=require('../ast/clase_ast');
class delete_registro extends instruccion{
constructor(id,condicion){
super();
this.id=id;
this.condicion=condicion;
this.entorno=new entorno('delete',null);
}

ejecutar(entorno){
var tab=tablas.buscar_tabla(this.id);
if(tab!=null){
    this.entorno.anterior=entorno;
    for(var i in tab.filas[0]){  
    this.entorno.add_simbolo(tab.filas[0][i].nombre,tab.filas[0][i].tipo,null);
    }
   
    for (var i in tab.filas){
        var validar=false;
        for(var j in tab.filas[i]){
        this.entorno.asignar_simbolo(tab.filas[i][j].nombre,tab.filas[i][j].valor);
        if(this.condicion==null){
            tab.filas.splice(i,1);
            break;
        }
        else{
            if(this.condicion.ejecutar(this.entorno)){
                validar=true;
            }
        }

        }
        if(validar){
            tab.filas.splice(i,1);

        }
       
    }







}





}

getAst(){
let nodo={
padre:-1,
cadena:""
}
let nodo_condicion=this.condicion.getAst();
let n_delete=clase_ast.sumar_contador();
let n_where=clase_ast.sumar_contador();
let n_padre=clase_ast.sumar_contador();
nodo.padre=n_padre;
nodo.cadena+=`${n_padre}[label="instruccion"];\n${n_delete}[label="DELETE"];\n${n_where}[label="WHERE"];\n${n_padre}->${n_delete};\n${n_padre}->${n_where};\n${n_where}->${nodo_condicion.padre};\n`+nodo_condicion.cadena;
return nodo;



}





}




module.exports=delete_registro;