const instruccion = require('../interprete/instruccion');
const tablas = require('../estructuras/tablas');
class rename_col extends instruccion{
constructor(nombre,nombre_nuevo,tipo_operacion){
super();
this.nombre=nombre;
this.nombre_nuevo=nombre_nuevo;
this.tipo_operacion=tipo_operacion;
}
ejecutar(entorno){}

renombrar_col(nombre_tab){
    var tab=tablas.buscar_tabla(nombre_tab);
    console.log(this.nombre);
    if(tab!=null){
        for(var i in tab.columnas){
         if(tab.columnas[i].nombre==this.nombre){
            tab.columnas[i].nombre=this.nombre_nuevo;
            for (var j in tab.filas){
                for (var k in tab.filas[j]){
                    if(tab.filas[j][k].nombre==this.nombre){
                    tab.filas[j][k].nombre=this.nombre_nuevo;
                    }
                }
            }


            break;
         }
    
        }
        
        
        
        }
        else{
        
          console.log("tabla no encontrada")  
        }

  
        console.log("Tabla no encontrada") 
}



}

module.exports=rename_col;