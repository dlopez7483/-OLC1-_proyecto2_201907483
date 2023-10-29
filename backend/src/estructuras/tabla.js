const clase_ast = require('../ast/clase_ast');


class tabla{

constructor(nombre,columnas){
this.nombre=nombre;
this.columnas=columnas;
this.filas=[];
}

insertar_fila(fila){
this.filas.push(fila);

}

add_colums(columna){

this.columnas[columna.nombre]=columna;


}

getAst(){
    let nodo = {
        padre: -1,
        cadena: ""
    }
    var contenido="";
    if(this.columnas.length>1){
        var cont="";
        for(var i = 0; i < this.columnas.length - 1; i++){
            var nodo_columna=this.columnas[i].getAst();
            var n_columna=nodo_columna.padre;
            var nodo_siguiente=this.columnas[i+1].getAst();
            var n_siguiente=nodo_siguiente.padre;
            cont+=nodo_columna.cadena+nodo_siguiente.cadena+`${n_siguiente}->${n_columna};\n${n_siguiente+1}->${n_siguiente};\n`;
            
            }

     contenido=cont;      



    }
    else if(this.columnas.length==1){
        var nodo_columna=this.columnas[0].getAst();
        contenido=nodo_columna.cadena+`\n${nodo_columna.padre+1}->${nodo_columna.padre};\n`;
    }
    var n_lista_padre=clase_ast.sumar_contador();
    var n_nombre=clase_ast.sumar_contador();
    var n_padre=clase_ast.sumar_contador();
    nodo.padre=n_padre;
    var listas_contenido=`${n_padre}[label="TABLA"];\n${n_lista_padre}[label="lista_columnas"];\n${n_nombre}[label="${this.nombre}"]\n${n_padre}->${n_lista_padre};\n${n_padre}->${n_nombre}\n`+contenido;
    nodo.cadena=listas_contenido;
    return nodo;



}








}

module.exports=tabla;