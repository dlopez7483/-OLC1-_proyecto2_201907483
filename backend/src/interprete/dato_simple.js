const instruccion = require('../interprete/instruccion');
const clase_ast = require('../ast/clase_ast');
const TIPO_VALOR={
    INT:'INT',
    DOUBLE:'DOUBLE',
    STRING:'STRING',
    TRUE:'TRUE',
    FALSE:'FALSE',
    DOUBLE:'DOUBLE',
    NULL:'NULL',
    ID:'ID',
   }


class dato_simple extends instruccion{
constructor (tipo,valor){
super();
this.tipo=tipo;
this.valor=valor;
}


ejecutar(entorno){
    switch(this.tipo){
        case 'INT':
             return new Number(this.valor).valueOf();
        case 'DOUBLE':
             return parseFloat(this.valor);
         case 'STRING':
              console.log(this.valor);
               return this.valor.toString();
         case 'TRUE':
               return true;
         case 'FALSE':
               return false;
         case 'NULL':
               return 'NULL';
         case 'ID_VARIABLE':
            var val=entorno.buscar_simbolo(this.valor);
            if(val!=null){
                  return val.valores;
            }
            else{
                  return this.valor;
            }
         case 'ID_NORMAL':
                var val=entorno.buscar_simbolo(this.valor);
                  if(val!=null){
                        return val.valores;
                  }
                  else{
                        return this.valor;
                  }
          case 'DATE':
               return new Date(this.valor);
          case 'NEGATIVO':
             return new Number(this.valor.ejecutar(entorno)).valueOf()*-1;
          case 'NOT':
             var val = this.valor.ejecutar(entorno);
             if(typeof val == 'boolean'){
                 return !val;
             }
             else{

             //ERROR SEMANTICO

             }
          case 'PARENTESIS':
             return this.valor.ejecutar(entorno);
          case 'CASTEO':
             return this.valor.ejecutar(entorno);
          case'PRIMITIVA':
             return this.valor.ejecutar(entorno);
          case 'BREAK':
              return this.valor;
           case 'CONTINUE':
             return this.valor;
        case 'LLAMADA':
             return this.valor.ejecutar(entorno);
           
             

    }
}

getAst(){
 let nodo = {
 padre: -1,
 cadena: ""
 }
 if(this.tipo=='CASTEO'){

 let nodo_valores=this.valor.getAst();

 let nodo_padre=clase_ast.sumar_contador();
 let cadena=`${nodo_padre}[label="expresion"]\n${nodo_padre}->${nodo_valores.padre}\n`+nodo_valores.cadena;
 nodo.padre=nodo_padre;
 nodo.cadena=cadena;
 return nodo;

 }
 else if(this.tipo=='PRIMITIVA'){
      let nodo_valores=this.valor.getAst();
      let nodo_padre=clase_ast.sumar_contador();
      let cadena=`${nodo_padre}[label="expresion"]\n${nodo_padre}->${nodo_valores.padre}\n`+nodo_valores.cadena;
      nodo.padre=nodo_padre;
      nodo.cadena=cadena;
      return nodo;
 }
 else if (this.tipo=='LLAMADA'){
      let nodo_valores=this.valor.getAst();
      let nodo_padre=clase_ast.sumar_contador();
      let cadena=`${nodo_padre}[label="expresion"]\n${nodo_padre}->${nodo_valores.padre}\n`+nodo_valores.cadena;
      nodo.padre=nodo_padre;
      nodo.cadena=cadena;
      return nodo;
 }


 let nodo_dato=clase_ast.sumar_contador();
 let nodo_padre=clase_ast.sumar_contador();
 let cadena=`${nodo_dato}[label="${this.valor}"]\n${nodo_padre}[label="expresion"]\n${nodo_padre}->${nodo_dato}\n`;
 nodo.padre=nodo_padre;
 nodo.cadena=cadena;
 return nodo;


}



}
module.exports=dato_simple;