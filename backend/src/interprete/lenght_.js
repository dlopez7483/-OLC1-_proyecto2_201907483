const instruccion = require('./instruccion');
const clase_ast = require('../ast/clase_ast');


class length_ extends instruccion {
    constructor(valor) {
        super();
        this.valor = valor;
    }
    ejecutar(entorno) {
    var valor=this.valor.ejecutar(entorno);
    if(typeof valor=='string'){
        return valor.length;
    }
    else{
        console.log("error de tipos")
    }



    }

    getAst(){
    let nodo = {
        padre: -1,
        cadena: ""


    }
    let nodo_valor=this.valor.getAst();
    let n_length=clase_ast.sumar_contador();
    let n_padre=clase_ast.sumar_contador();
    nodo.padre=n_padre;
    nodo.cadena+=`${n_padre}[label="instruccion"];\n${n_length}[label="LENGTH"];\n${n_padre}->${n_length};\n${n_length}->${nodo_valor.padre};\n`+nodo_valor.cadena;


}

}
module.exports = length_;