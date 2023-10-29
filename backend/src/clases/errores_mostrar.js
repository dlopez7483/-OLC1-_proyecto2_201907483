const errores=require('../manejador_errores/errores');
exports.errores = async (req, res) => {
 const error="";   
for(var i=0;i<errores.errores_.length;i++){
    error+="tipo: "+errores.errores_[i].tipo+" descripcion: "+errores.errores_[i].descripcion+" linea: "+errores.errores_[i].linea+" columna: "+errores.errores_[i].columna+"\n";
}

try {
    res.status(200).json({
          body: { res: true, message:error},
    }); 
    } catch (error) {
       console.log(error);
       res.status(500).json({
           body: { res: false, message: 'OCURRIÓ UN PROBLEMA AL hacer la consulta', error },
       });
    }



}