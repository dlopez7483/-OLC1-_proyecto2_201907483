const instruccion = require('../interprete/instruccion');
const entorno = require('../tabla_simbolos/entorno');
const clase_ast=require('../ast/clase_ast');
const e = require('express');

class case_ extends instruccion{
    constructor(expresion,cases,default_,as){
        super();
        this.expresion=expresion;
        this.cases=cases;
        this.default_=default_;
        this.as=as;
        this.entorno=new entorno("case",null);
    }
    ejecutar(entorno){
   
   for (var i in this.cases){
   var when=this.cases[i];
   if(when.expresion1.ejecutar(entorno)==true){
    if(this.as!=null){

    return this.as.ejecutar(entorno).toString()+"\n"+when.expresion2.ejecutar(entorno).toString()+"\n"+this.as.ejecutar(entorno).toString()+"\n";
    }
    else{
    return when.expresion2.ejecutar(entorno).toString()+"\n";
    }
   
  }
 }
    if(this.default_!=null){
    if(this.as!=null){
        return this.as.ejecutar(entorno).toString()+"\n"+this.default_.ejecutar(entorno).toString()+"\n";
    }
    else{
        return this.default_.ejecutar(entorno).toString()+"\n";}

    


    }



   



    }

    getAst(){
        let nodo={
            padre:-1,
            cadena:""
        }
        
        var contenido="";
        if(this.cases.length>1){
        var cont="";
        for(var i = 0; i < this.cases.length - 1; i++){
        var nodo_instruccion=this.cases[i].getAst();
        var n_instruccion=nodo_instruccion.padre;
        var nodo_siguiente=this.cases[i+1].getAst();
        var n_siguiente=nodo_siguiente.padre;
        cont+=nodo_instruccion.cadena+nodo_siguiente.cadena+`${n_siguiente}->${n_instruccion};\n${n_siguiente+1}->${n_siguiente};\n`;
        }
        contenido+=cont;
        
        
        }
        else if(this.cases.length==1){
        var nodo_instruccion=this.cases[0].getAst();
        contenido+=nodo_instruccion.cadena+`\n${nodo_instruccion.padre+1}->${nodo_instruccion.padre};\n`;
        }
        let n_cases=clase_ast.sumar_contador();
        if(this.default_!=null){
        var nodo_default=this.default_.getAst();
        contenido+=nodo_default.cadena+`\n${n_cases}->${nodo_default.padre};\n`;
        }
        let n_default=clase_ast.sumar_contador();
        let nodo_as=this.as.getAst();
        let n_as=this.as.getAst();
        let nodo_expresion=this.expresion.getAst();
        let n_case=clase_ast.sumar_contador();
        let n_padre=clase_ast.sumar_contador();
        nodo.padre=n_padre;
        nodo.cadena=`${n_padre}[label="instruccion"];\n${n_case}[label="CASE"];\n${n_as}[label="AS"];\n${n_cases}[label="CASES"];\n${n_default}[label="DEFAULT"];\n${n_padre}->${n_case};\n${n_case}->${n_cases};\n${n_padre}->${n_default};\n${n_case}->${nodo_expresion};\n${n_case}->${n_as};\n${n_case}->${nodo_as.padre};\n${n_case}->${n_cases};\n${n_case}->${n_default};\n`;
        return nodo;
        






        }




}
module.exports=case_;