const clase_ast = require('../ast/clase_ast');
class columna{
    constructor(tipo,nombre){
    this.nombre=nombre;
    this.tipo=tipo;
    }
    getAst(){
        let nodo = {
            padre: -1,
            cadena: ""
        }
       console.log(this.nombre)
       let nodo_nombre=this.nombre;
       let n_nombre=clase_ast.sumar_contador();
       let n_tipo=clase_ast.sumar_contador();
       let n_v=clase_ast.sumar_contador();
       let nodo_padre=clase_ast.sumar_contador();
       nodo.padre=nodo_padre;
       nodo.cadena=`${nodo_padre}[label="Lista columna"];\n${n_v}[label="columna"];\n${n_tipo}[label="${this.tipo}"]\n${n_nombre}[label="${this.nombre}"]\n${nodo_padre}->${n_v}\n${n_v}->${n_nombre}\n${n_v}->${n_tipo}\n`;
       return nodo;





    }
    
    
    
}
module.exports=columna;
    