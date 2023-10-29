class error{
constructor(tipo,descripcion,linea,columna) {
this.tipo=tipo;
this.descripcion=descripcion;
this.linea=linea;
this.columna=columna;


}



}




class errores {
constructor() {


}
static errores_ = [];

static agregar_error(tipo,descripcion,linea,columna) {
errores.errores_.push(new error(tipo,descripcion,linea,columna));


}




}
module.exports = errores;