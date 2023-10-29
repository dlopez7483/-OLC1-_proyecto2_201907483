const instruccion = require('../interprete/instruccion');
const dato = require('../interprete/dato_simple');
const clase_ast = require('../ast/clase_ast');
const errores= require('../manejador_errores/errores')
const TIPO_VALOR={
ID:'ID',
SUMA:'SUMA',
RESTA:'RESTA',
POR:'POR',
DIV:'DIV',
MAYOR_QUE:'MAYOR_QUE',
MENOR_QUE:'MENOR_QUE',
IGUAL_BOOL:'IGUAL_BOOL',
DIFERENTE:'DIFERENTE',
MAYOR_IGUAL:'MAYOR_IGUAL',
MENOR_IGUAL:'MENOR_IGUAL',
NOT:'NOT',
AND:'AND',
OR:'OR',
AGRUPACION:'AGRUPACION',
LLAMADA:'LLAMADA',
DATE:'DATE',
MOD:'MOD'

}
 


class expresion extends instruccion{
  

  //operador_unario
    constructor (tipo,valor1,valor2){
     super();
     this.tipo=tipo;
     this.valor1=valor1;
     this.valor2=valor2;
     this.valores=[];
    }
 
    ejecutar(entorno){

    switch(this.tipo){
     case 'SUMA':
          
          var val1=this.valor1.ejecutar(entorno);
          var val2=this.valor2.ejecutar(entorno);
           if (typeof val1 == 'number' && typeof val2 == 'number'){
            return val1+val2;
           }
           else if (typeof val1=='number' && typeof val2=='string'){
           return val1+parseFloat(val2.replace(/["']/g, ''));
          }
          else if (typeof val1=='string' && typeof val2=='number'){
           return parseFloat(val1.replace(/["']/g, ''))+val2;
           }

          else if (typeof val1=='number' && val2 instanceof Date){
           return new Date(val2.getTime()+val1);
           }
          else if (val1 instanceof Date && typeof val2=='number'){
          return new Date(val1.getTime()+val2);
          }
          else if(typeof val1=='string' && typeof val2=='string'){
          return val1+val2;
          }
          else if(typeof val1=='string' && val2 instanceof Date){
          var fecha=new Date(val2.getTime()+parseFloat(val1.replace(/["']/g, '')));
          return fecha;
          }
          else if(val1 instanceof Date && typeof val2=='string'){
          var fecha=new Date(val1.getTime()+parseFloat(val2.replace(/["']/g, '')));
          return fecha;
          }
          else{
          //error semantico
          }
        
     case 'RESTA':
           val1=this.valor1.ejecutar(entorno);
           val2=this.valor2.ejecutar(entorno);
               if (typeof val1 === 'number' && typeof val2 === 'number'){
               return val1-val2;
               }
               else if (typeof val1=='number' && typeof val2=='string'){
               return val1-parseFloat(val2);
               }
               else if (typeof val1=='string' && typeof val2=='number'){
               return parseFloat(val1)-val2;
               }
               else if (typeof val1=='number' && val2 instanceof Date){
               return new Date(val2.getTime()-val1);
               }
               else if (val1 instanceof Date && typeof val2=='number'){
               return new Date(val1.getTime()-val2);
               }
               else if(typeof val1=='string' && typeof val2=='string'){
               return (parseFloat(val1)-parseFloat(val2)).toString();
               }
               else{
               //error semantico

               }
          case 'POR':
           val1=this.valor1.ejecutar(entorno);
           val2=this.valor2.ejecutar(entorno);
           if (typeof val1 === 'number' && typeof val2 === 'number'){
      
           return val1*val2;
           }
           else{
               //error semantico
           }
          case 'DIV':
               val1=this.valor1.ejecutar(entorno);
               val2=this.valor2.ejecutar(entorno);
               if (typeof val1 === 'number' && typeof val2 === 'number'){
               return val1/val2;
               }
               else{
                    //error semantico
               }
          case 'MOD':
               val1=this.valor1.ejecutar(entorno);
               val2=this.valor2.ejecutar(entorno);
               if (typeof val1 === 'number' && typeof val2 === 'number'){
               return val1%val2;
               }
               else{
                    console.log("error semantico");
               }
          case 'MAYOR':
               val1=this.valor1.ejecutar(entorno);
               val2=this.valor2.ejecutar(entorno);
               if (typeof val1 === 'number' && typeof val2 === 'number'){
               return val1>val2;
               }
               else{
                    //error semantico
               }
          case 'MENOR':
               val1=this.valor1.ejecutar(entorno);
               val2=this.valor2.ejecutar(entorno);
               if (typeof val1 === 'number' && typeof val2 === 'number'){
               return val1<val2;
               }
               else{
                    //error semantico
               }
          case 'MAYOR_IGUAL':
               val1=this.valor1.ejecutar(entorno);
               val2=this.valor2.ejecutar(entorno);
               if (typeof val1 === 'number' && typeof val2 === 'number'){
               return val1>=val2;
               }
               else{
                    //error semantico
               }
          case 'MENOR_IGUAL':
               val1=this.valor1.ejecutar(entorno);
               val2=this.valor2.ejecutar(entorno);
               if (typeof val1 === 'number' && typeof val2 === 'number'){
               return val1<=val2;
               }
               else{
                    //error semantico
               }
          case 'IGUAL':
               val1=this.valor1.ejecutar(entorno);
               val2=this.valor2.ejecutar(entorno);
               return val1==val2;
              
          case 'DIFERENTE':
               val1=this.valor1.ejecutar(entorno);
               val2=this.valor2.ejecutar(entorno);
               return val1!=val2;
          case 'AND':
               val1=this.valor1.ejecutar(entorno);
               val2=this.valor2.ejecutar(entorno);
               if (typeof val1 === 'boolean' && typeof val2 === 'boolean'){
               return val1&&val2;
               }
               else{
               //error semantico     
               }
          
           case 'OR':
               val1=this.valor1.ejecutar(entorno);
               val2=this.valor2.ejecutar(entorno);
               if (typeof val1 === 'boolean' && typeof val2 === 'boolean'){
               return val1||val2;
               }
               else{
               //error semantico     
               }

          


          
          default:
           console.log("error semantico");


           
     
     
     
     
     }

  




    }
   
    ejecucion_where(tabla,col,entorno){
    if(this.tipo=='IGUAL'){
     if (tabla!=null || tabla!=undefined && col!=null ){
      if(this.valor1.tipo=='ID_NORMAL' && this.valor1.valor==col){
      for(var i in tabla.columnas){

           if(tabla.columnas[i].nombre==col){
          for(var j in tabla.columnas[i].valor){
           if(tabla.columnas[i].valor[j]==this.valor2.ejecutar(entorno)){
               this.valores.push(tabla.columnas[i].valor[j]);
           }
          }
           }
      }



      }

     }
   
    }
    else if (this.tipo=='MAYOR'){
     
     if (tabla!=null || tabla!=undefined && col!=null ){
      if(this.valor1.tipo=='ID_NORMAL' && this.valor1.valor==col){
      for(var i in tabla.columnas){

           if(tabla.columnas[i].nombre==col){
          for(var j in tabla.columnas[i].valor){
           if(tabla.columnas[i].valor[j]>this.valor2.ejecutar(entorno)){
               this.valores.push(tabla.columnas[i].valor[j]);
           }
          }
           }
      }
     }}}



    }

    getAst(){
     let nodo = {
          padre: -1,
          cadena: ""
      }
      let izq=this.valor1.getAst();
      let der=this.valor2.getAst();
      let nodo_v=clase_ast.sumar_contador();
      let nodo_padre=clase_ast.sumar_contador();
      nodo.padre=nodo_padre;
      nodo.cadena=izq.cadena+der.cadena+`${nodo_v}[label="${this.tipo}"]\n${nodo_padre}[label="expresion"]\n${nodo_padre}->${nodo_v}\n${nodo_v}->${izq.padre}\n${nodo_v}->${der.padre}\n`;



      return nodo;


    }
    


    }



module.exports = expresion;

 