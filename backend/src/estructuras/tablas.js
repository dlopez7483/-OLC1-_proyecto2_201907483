


class tablas{
constructor(){


}
static tabs = [];
static agregar_tabla(tabla){
this.tabs.push(tabla);


}

static buscar_tabla(nombre_tabla){
for(var i in this.tabs){
if(this.tabs[i].nombre==nombre_tabla){

return this.tabs[i];

}


}


}


static borrar_tabla(nombre_tabla){
    for(var i in this.tabs){
        if(this.tabs[i].nombre==nombre_tabla){
        
            this.tabs.splice(i,1);
            break;
        
        }
        
        
        }



}   



}
module.exports=tablas;