const Simbolo = require("./Simbolo");

class entorno {
constructor(nombre,anterior){
this.tabla_simbolos={};
this.tabla_funciones={};
this.anterior=anterior;
this.nombre=nombre;
}


buscar_funcion(nombre){
let entorno=this;
while(entorno!=null){
    if (entorno.tabla_funciones[nombre]!=undefined){
        return entorno.tabla_funciones[nombre];
    }
entorno=entorno.anterior;
}



}


add_funcion(nombre,funcion){
this.tabla_funciones[nombre]=funcion;


}


add_simbolo(nombre,tipo,valor){
let simb = new Simbolo(nombre,tipo,valor);
this.tabla_simbolos[nombre]=simb;
}

buscar_simbolo(nombre){
let entorno=this;
while(entorno!=null){
    if (entorno.tabla_simbolos[nombre]!=undefined){
        return entorno.tabla_simbolos[nombre];
    }
entorno=entorno.anterior;

}
}


asignar_simbolo(nombre,nuevo_valor){
    let entorno=this;
   while(entorno!=null){
    if (entorno.tabla_simbolos[nombre]!=undefined){
        if(entorno.tabla_simbolos[nombre].tipo=='INT' && typeof nuevo_valor=='number' || nuevo_valor==null ){
            entorno.tabla_simbolos[nombre].valores=nuevo_valor;
        
        }
        else if (entorno.tabla_simbolos[nombre].tipo=='DOUBLE' && typeof nuevo_valor=='number' || nuevo_valor==null){
            entorno.tabla_simbolos[nombre].valores=nuevo_valor;
        
        }

        else if (entorno.tabla_simbolos[nombre].tipo=='VARCHAR' && typeof nuevo_valor=='string' || nuevo_valor==null){
            entorno.tabla_simbolos[nombre].valores=nuevo_valor;
        }
        else if (entorno.tabla_simbolos[nombre].tipo=='DATE' && nuevo_valor instanceof Date || nuevo_valor==null){
            entorno.tabla_simbolos[nombre].valores=nuevo_valor;
        }
        else if (entorno.tabla_simbolos[nombre].tipo=='BOOLEAN'){
         if (nuevo_valor==true){
            entorno.tabla_simbolos[nombre].valores=nuevo_valor;
 
         } 

         else if (nuevo_valor==false){
            entorno.tabla_simbolos[nombre].valores=nuevo_valor;
 
         }

         else if (nuevo_valor==null){
            entorno.tabla_simbolos[nombre].valores=null;
 
         }


        }
        else{
        console.log("error de tipos");
            
        }
    

        }


    
        entorno=entorno.anterior;
    }
   




   }
      






}

module.exports=entorno;