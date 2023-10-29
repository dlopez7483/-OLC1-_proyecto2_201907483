const tablas = require('../estructuras/tablas');
const instruccion = require('./instruccion');
class drop_column extends instruccion{

constructor(nombre_columna,tipo_operacion){
super();
this.nombre_columna=nombre_columna;
this.tipo_operacion=tipo_operacion;

}

ejecutar(entorno){


}
drop_(nombre){
var tab=tablas.buscar_tabla(nombre);
if(tab!=null){
    for(var i in tab.columnas){
     if(tab.columnas[i].nombre==this.nombre_columna){
        tab.columnas.splice(i,1);
        for (var j in tab.filas){
            for (var k in tab.filas[j]){
                if(tab.filas[j][k].nombre==this.nombre_columna){
                tab.filas[j].splice(k,1);
                }
            }
        }
     }

    }
    
    
    
    }
    else{
    
      console.log("tabla no encontrada")  
    }


}    




}
module.exports=drop_column;