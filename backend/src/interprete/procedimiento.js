const instruccion = require('./instruccion');

class procedimiento extends instruccion{
constructor(id,parametros,instrucciones){
this.id=id;
this.parametros=parametros;
this.instrucciones=instrucciones;
}

ejecutar(entorno){

}


getAst(){

    
}

}

module.exports=procedimiento;