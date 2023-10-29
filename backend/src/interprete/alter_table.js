const tablas = require('../estructuras/tablas');
const instruccion = require('../interprete/instruccion');
const clase_ast=require('../ast/clase_ast');

class alter_table extends instruccion{
constructor(nombre,comando){
super();
this.nombre=nombre;
this.comando=comando;

}


ejecutar(entorno){

if(this.comando.tipo_operacion=='ADD'){
    console.log("AAAAAS");
    this.comando.buscar_columna(this.nombre);

}
else if(this.comando.tipo_operacion=='DROP'){
console.log('DROOOOP')
this.comando.drop_(this.nombre);

}
else if(this.comando.tipo_operacion=='RENAME'){
    console.log('RENAME')
    this.comando.renombrar_col(this.nombre);

}


}

getAst(){
    let nodo = {
        padre: -1,
        cadena: ""
    }
    let n_tipo=clase_ast.sumar_contador();
    let n_nombre=clase_ast.sumar_contador();
    let n_alter=clase_ast.sumar_contador();
    
    let n_padre=clase_ast.sumar_contador();
    nodo.padre=n_padre;
    nodo.cadena+=`${n_padre}[label="instruccion"];\n${n_alter}[label="ALTER"]\n${n_tipo}[label="${this.comando.tipo_operacion}"];\n${n_nombre}[label="${this.nombre}"];\n${n_padre}->${n_alter};\n${n_alter}->${n_tipo};\n${n_alter}->${n_nombre};\n`;
    return nodo;

    
}





}
module.exports=alter_table