const instruccion = require('../interprete/instruccion');
const clase_ast = require('../ast/clase_ast');
class Set_var extends instruccion{
    constructor(expresion){
        super();
        this.expresion=expresion;
    }

    ejecutar(entorno){
        if(this.expresion.tipo=='IGUAL'){
        
        if(this.expresion.valor1.tipo=='ID_VARIABLE'){
        entorno.asignar_simbolo(this.expresion.valor1.valor,this.expresion.valor2.ejecutar(entorno));   
        }
        }
    }
    getAst(){
        let nodo = {
            padre: -1,
            cadena: ""
        }
        let nodo_expresion=this.expresion.getAst();
        let nodo_v=clase_ast.sumar_contador();
        let nodo_padre=clase_ast.sumar_contador();
        nodo.padre=nodo_padre;
        nodo.cadena=nodo_expresion.cadena+`${nodo_v}[label="set_var"]\n${nodo_padre}[label="instruccion"]\n${nodo_padre}->${nodo_v}\n${nodo_v}->${nodo_expresion.padre}\n`;
    
        return nodo;





    }
}
module.exports=Set_var;