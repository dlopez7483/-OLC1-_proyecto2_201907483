const clase_ast = require('../ast/clase_ast');
const instruccion = require('./instruccion');






class declaracion extends instruccion{
 constructor(nombre,tipo,valor){
    super();
     this.nombre=nombre;
     this.valor=valor;
     this.tipo=tipo;
     }
 
 
 ejecutar(entorno){
 if (this.tipo=='INT'){
    var valor=this.valor
    if (valor!=null){
       var val=valor.ejecutar(entorno);
        if(typeof val == 'number'){
            entorno.add_simbolo(this.nombre,this.tipo,val);
        }
        else{
            console.log("error de tipos")
        }
    }
    else{
        entorno.add_simbolo(this.nombre,this.tipo,null);
    }
     
  }
else if(this.tipo=='DOUBLE'){
    var valor=this.valor
    if (valor!=null){
         var val=valor.ejecutar(entorno);
        if(typeof val == 'number'){
            entorno.add_simbolo(this.nombre,this.tipo,val);
        }
         else{
               console.log("error de tipos")
         }
       
    }
      else{
         entorno.add_simbolo(this.nombre,this.tipo,null);
      }

   }
 else if(this.tipo=='VARCHAR'){
      var valor=this.valor
      if (valor!=null){
         var val=valor.ejecutar(entorno);
         if(typeof val == 'string'){
               entorno.add_simbolo(this.nombre,this.tipo,val);
         }
            else{
                  console.log("error de tipos")
            }
         
      }
         else{
            entorno.add_simbolo(this.nombre,this.tipo,null);
         }
   
      }
 else if(this.tipo=='DATE'){
 var valor=this.valor;
   if(valor!=null){
      var val=valor.ejecutar(entorno);
      if(val instanceof Date){
         entorno.add_simbolo(this.nombre,this.tipo,val);
      }
         else{
            console.log("error de tipos")
         }
   



   }
   else{


      entorno.add_simbolo(this.nombre,this.tipo,null);
   }




 }

 else if (this.tipo=='BOOLEAN') {
 var valor=this.valor;
   if(valor!=null){
      var val=valor.ejecutar(entorno);
      if(val==true || val==false){
         entorno.add_simbolo(this.nombre,this.tipo,val);
      }
         else{
            console.log("error de tipos")
         }


 }
 else{
      entorno.add_simbolo(this.nombre,this.tipo,null);
 }
 }

 }


 getAst(){
   let nodo = {
      padre: -1,
      cadena: ""
  }
 

  if(this.valor!=null){
   let nodo_valores=this.valor.getAst();
 let nodo_default=clase_ast.sumar_contador();
 let nodo_nombre=clase_ast.sumar_contador();
 let nodo_tipo=clase_ast.sumar_contador();
 let nodo_declare=clase_ast.sumar_contador();

 let nodo_padre=clase_ast.sumar_contador();
 nodo.padre=nodo_padre;
 nodo.cadena=nodo_valores.cadena+`${nodo_padre} [label="lista"];\n${nodo_default} [label="DEFAULT"];\n${nodo_nombre} [label="${this.nombre}"];\n${nodo_tipo} [label="${this.tipo}"];\n${nodo_declare} [label="DECLARE"];\n${nodo_padre}->${nodo_declare};\n${nodo_declare}->${nodo_nombre};\n${nodo_declare}->${nodo_tipo};\n${nodo_declare}->${nodo_default};\n${nodo_declare}->${nodo_valores.padre};\n`;
 



  }
   else{
      let nodo_nombre=clase_ast.sumar_contador();
      let nodo_tipo=clase_ast.sumar_contador();
      let nodo_declare=clase_ast.sumar_contador();
      let nodo_padre=clase_ast.sumar_contador();
      nodo.padre=nodo_padre;
      nodo.cadena=`${nodo_padre} [label="lista"];\n${nodo_nombre} [label="${this.nombre}"];\n${nodo_tipo} [label="${this.tipo}"];\n${nodo_declare} [label="DECLARE"];\n${nodo_padre}->${nodo_declare};\n${nodo_declare}->${nodo_nombre};\n${nodo_declare}->${nodo_tipo};\n`;
   }


  return nodo;



 }

 }    
        
        




module.exports=declaracion;