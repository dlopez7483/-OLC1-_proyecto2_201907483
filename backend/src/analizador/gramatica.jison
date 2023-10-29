// ################### ANALIZADOR LEXICO #######################
%{
const instruccion = require('../interprete/instruccion');
const expresion = require('../interprete/expresion');
const print = require('../interprete/print');
const dato_simple = require('../interprete/dato_simple');
const columna = require('../estructuras/columna');
const create_table = require('../interprete/create_table.js');
const add_column=require('../interprete/add_column');
const tabla=require('../estructuras/tabla');
const alter_table=require('../interprete/alter_table');
const drop_column= require('../interprete/drop_column');
const rename_col= require('../interprete/rename_col');
const drop_table= require('../interprete/drop_table');
const insert_c= require('../interprete/insert_c');
const Select_columnas = require('../interprete/Select_columnas');
const asignacion_columna = require('../interprete/asignacion_columna');
const truncate_table = require('../interprete/truncate_table');
const casteo = require('../interprete/casteo');
const if_ = require('../interprete/if_');
const declaracion = require('../interprete/declaracion');
const declaraciones_multiples = require('../interprete/declaraciones_multiples');
const Set_var = require('../interprete/Set_var');
const select_simple = require('../interprete/select_simple');
const For_ = require('../interprete/For_');
const while_ = require('../interprete/while_');
const case_ = require('../interprete/case_');
const when_ = require('../interprete/when_');
const lower_= require('../interprete/lower_');
const upper_= require('../interprete/upper_');
const round_= require('../interprete/round_');
const lenght_= require('../interprete/lenght_');
const type_of_= require('../interprete/type_of_');
const truncate_ = require('../interprete/truncate_');
const encapsulamiento = require('../interprete/encapsulamiento');
const llamado= require('../interprete/llamado');
const funcion = require('../interprete/funcion');
const update = require('../interprete/update');
const procedimiento = require('../interprete/procedimiento');
const delete_registro = require('../interprete/delete_registro');
const parametro = require('../interprete/parametro');
const errores=require('../manejador_errores/errores');
var cadena = '';
const lista=[];
%}
%lex
%options case-insensitive 
%x string
%x string_s
%x comentario
%x comentario_mul
// ---------> Expresiones Regulares
date   [0-9]{4}-[0-9]{2}-[0-9]{2};
entero  [0-9]+;

decimal [0-9]+(".")[0-9]+;


id_variables ("@")[a-zA-Z][a-zA-Z0-9_]*;
id_normal [a-zA-Z][a-zA-Z0-9_]*;

%%



// -----> Reglas Lexicas

// -----> Espacios en Blanco
[ \s\r\n\t]             {/* Espacios se ignoran */}
// -----> Comentarios


(("-")("-")+.*\r\n)|(("-")("-")+.*\n)|(("-")("-")+.*\r)                           {} 
[/][*][^*]*[*]+([^/*][^*]*[*]+)*[/]  {}

';'          {console.log('Reconocio lexema PYC: '+yytext);
               return 'PYC'}
'('          {console.log('Reconocio lexema PARIZQ: '+yytext);return 'PARIZQ'}
')'          {console.log('Reconocio lexema PARDER: '+yytext);return 'PARDER'}

','          {console.log('Reconocio lexema COMA: '+yytext);
            return 'COMA'}
'+'          {console.log('Reconocio lexema MAS: '+yytext);
               return 'MAS'}
'-'          {
    
    console.log('Reconocio lexema MENOS: '+yytext);    
    return 'MENOS'}
'*'          {
    console.log('Reconocio lexema POR: '+yytext);
    return 'POR'}
'/'          {
    console.log('Reconocio lexema DIV: '+yytext);
    return 'DIV'}
'%'          {
    console.log('Reconocio lexema MOD: '+yytext);
    return 'MOD'}
'<='         {
    console.log('Reconocio lexema MENORIGUAL: '+yytext);
    return 'MENORIGUAL'}
'>='         {
    console.log('Reconocio lexema MAYORIGUAL: '+yytext);
    return 'MAYORIGUAL'}

'<'          {console.log('Reconocio lexema MENOR: '+yytext);
              return 'MENOR';}
'>'          {
    console.log('Reconocio lexema MAYOR: '+yytext);
    return 'MAYOR'}


'!='         {
    console.log('Reconocio lexema DIFERENTE: '+yytext);
    return 'DIFERENTE'}
'='          {
    console.log('Reconocio lexema IGUAL: '+yytext);
    return 'IGUAL'}




{decimal}    {
    console.log('Reconocio lexema DECIMAL: '+yytext);
    return 'DECIMAL'}
{date}       {
    console.log('Reconocio lexema DATE: '+yytext);
    return 'DATE'}

'boolean'   { 
    console.log('Reconocio lexema BOOLEAN: '+yytext);
    return 'BOOLEAN'}


'int'       {
    console.log('Reconocio lexema INT: '+yytext);
    return 'INT'}
'double'    {
    console.log('Reconocio lexema DOUBLE: '+yytext);
    return 'DOUBLE'}
'date'      {
    console.log('Reconocio lexema DATE_P: '+yytext);
    return 'DATE_P'}
'varchar'  {
    console.log('Reconocio lexema VARCHAR: '+yytext);
    return 'VARCHAR'}
'True'     {
    console.log('Reconocio lexema TRUE: '+yytext);
    return 'TRUE'}
'False'    {
    console.log('Reconocio lexema FALSE: '+yytext);
    return 'FALSE'}
'null'     {
    console.log('Reconocio lexema NULL: '+yytext);
    return 'NULL'}

//------------------------
'declare'  {
    console.log('Reconocio lexema DECLARE: '+yytext);
    return 'DECLARE'}
'default'  {
    console.log('Reconocio lexema DEFAULT: '+yytext);
    return 'DEFAULT'}
'set'      {
    console.log('Reconocio lexema SET: '+yytext);
    return 'SET'}
'select'   {
    console.log('Reconocio lexema SELECT: '+yytext);
    return 'SELECT'}
'table'    {
    console.log('Reconocio lexema TABLE: '+yytext);
    return 'TABLE'}
'create'   {
    console.log('Reconocio lexema CREATE: '+yytext);
    return 'CREATE'}
'alter'    {
    console.log('Reconocio lexema ALTER: '+yytext);
    return 'ALTER'}
'add'      {
    console.log('Reconocio lexema ADD: '+yytext);
    return 'ADD'}
'drop'     {
    console.log('Reconocio lexema DROP: '+yytext);
    return 'DROP'}
'rename'   {
    console.log('Reconocio lexema RENAME: '+yytext);
    return 'RENAME'}
'to'       {
    
    console.log('Reconocio lexema TO: '+yytext);
    return 'TO'}
'column'   {
    console.log('Reconocio lexema COLUMN: '+yytext);
    return 'COLUMN'}
'insert'   {
    console.log('Reconocio lexema INSERT: '+yytext);
    return 'INSERT'}
'into'     {
    
    console.log('Reconocio lexema INTO: '+yytext);
    return 'INTO'}
//--------------
["]    {cadena=''; this.begin('string');}
<string>[^"\\]+ {cadena+=yytext;}
<string>"\\\"" {cadena+='\"';}
<string>"\\\\" {cadena+='\\';}
<string>"\\n" {cadena+='\\n';}
<string>"\\r" {cadena+='\\r';}
<string>"\\t" {cadena+='\\t';}
<string>\s    {cadena+=" " ;}
<string>["]   {yytext=cadena; this.popState();console.log("Reconocido lexema CADENA: "+yytext );return 'CADENA';}
[']    {cadena=''; this.begin('string_s');}
<string_s>[^'\\]+ {cadena+=yytext;}
<string_s>"\\\"" {cadena+='\"';}
<string_s>"\\\\" {cadena+='\\';}
<string_s>"\\n" {cadena+='\\n';}
<string_s>"\\r" {cadena+='\\r';}
<string_s>"\\t" {cadena+='\\t';}
<string_s>\s    {cadena+=" " ;}
<string_s>[']   {yytext=cadena; this.popState();console.log("Reconocido lexema CADENA_S: "+yytext );return 'CADENA_S';}
'values'   {
    console.log('Reconocio lexema VALUES: '+yytext);
    return 'VALUES'}
'from'    {
    console.log('Reconocio lexema FROM: '+yytext);
    return 'FROM'}
'where'   {
    console.log('Reconocio lexema WHERE: '+yytext);
    return 'WHERE'}
'update'  {
    console.log('Reconocio lexema UPDATE: '+yytext);
    return 'UPDATE'}
'truncate' {
    console.log('Reconocio lexema TRUNCATE: '+yytext);
    return 'TRUNCATE'}
'delete'   {
    console.log('Reconocio lexema DELETE: '+yytext);
    return 'DELETE'}
'cast'     {
    console.log('Reconocio lexema CAST: '+yytext);
    return 'CAST'}
'if'       {
    console.log('Reconocio lexema IF: '+yytext);
    return 'IF'}
'then'     {
    console.log('Reconocio lexema THEN: '+yytext);
    return 'THEN'}
'begin'    {
    console.log('Reconocio lexema BEGIN: '+yytext);
    return 'BEGIN'}
'end'      {
    console.log('Reconocio lexema END: '+yytext);
    return 'END'}
'else'     {
    console.log('Reconocio lexema ELSE: '+yytext);
    return 'ELSE'}
'PRINT'    {
    console.log('Reconocio lexema PRINT: '+yytext);
    return 'PRINT'}
'CASE'     {
    console.log('Reconocio lexema CASE: '+yytext);    
    return 'CASE'}
'WHEN'     {
    console.log('Reconocio lexema WHEN: '+yytext);
    return 'WHEN'}
'FOR'      {
    console.log('Reconocio lexema FOR: '+yytext);
    return 'FOR'}
'IN'       {
    console.log('Reconocio lexema IN: '+yytext);
    return 'IN'}
'WHILE'    {
    console.log('Reconocio lexema WHILE: '+yytext);
    return 'WHILE'}
'LOOP'     {
    console.log('Reconocio lexema LOOP: '+yytext);
    return 'LOOP'}
'BREAK'    {
    console.log('Reconocio lexema BREAK: '+yytext);
    return 'BREAK'}
//-------------------------
'CONTINUE' {
    console.log('Reconocio lexema CONTINUE: '+yytext);
    return 'CONTINUE'}
'FUNCTION' {
    console.log('Reconocio lexema FUNCTION: '+yytext);
    return 'FUNCTION'}
'RETURN'   {
    console.log('Reconocio lexema RETURN: '+yytext);
    return 'RETURN'}
'PROCEDURE' {
    console.log('Reconocio lexema PROCEDURE: '+yytext);
    return 'PROCEDIMIENTO'}
'LOWER'    {
    console.log('Reconocio lexema LOWER: '+yytext);
    return 'LOWER'}
'UPPER'    {
    console.log('Reconocio lexema UPPER: '+yytext);
    return 'UPPER'}
'ROUND'    {
    console.log('Reconocio lexema ROUND: '+yytext);
    return 'ROUND'}
'LEN'      {
    console.log('Reconocio lexema LEN: '+yytext);
    return 'LEN'}
'TYPEOF'  {
    console.log('Reconocio lexema TYPEOF: '+yytext);
    return 'TYPEOF'}
'AS'       {
    console.log('Reconocio lexema AS: '+yytext);
    return 'AS'}
//---------------------------
'AND'      {
    console.log('Reconocio lexema AND: '+yytext);
    return 'AND'}
'OR'       {
    console.log('Reconocio lexema OR: '+yytext);
    return 'OR'}
'NOT'      {
    console.log('Reconocio lexema NOT: '+yytext);
    return 'NOT'}

'RETURNS'  {
    console.log('Reconocio lexema RETURNS: '+yytext);
    return 'RETURNS'}
'.'        {
    console.log('Reconocio lexema PUNTO: '+yytext);
    return 'PUNTO'}

{entero}                 {
    console.log('Reconocio lexema ENTERO: '+yytext); 
    return 'ENTERO'; } 

{id_variables} {
    console.log('Reconocio lexema ID_VARIABLES: '+yytext);
    return 'ID_VARIABLES'}
{id_normal}  {
    console.log('Reconocio lexema ID_NORMAL: '+yytext);
    return 'ID_NORMAL'}









// -----> FIN DE CADENA Y ERRORES
<<EOF>>               return 'EOF';
.  { console.error('Error léxico: \"' + yytext + '\", linea: ' + yylloc.first_line + ', columna: ' + yylloc.first_column); 

 errores.agregar_error('Error lexico',yytext,yylloc.first_line,yylloc.first_column);

 }


/lex
// ################## ANALIZADOR SINTACTICO ######################
// -------> Precedencia
%left 'OR'
%left 'AND'
%right 'UNOT'
%left 'MENOR' 'MAYOR' 'DIFERENTE' 'IGUAL' 'MENORIGUAL' 'MAYORIGUAL'
%left 'MAS' 'MENOS'
%left 'POR' 'DIV' 'MOD'
%right 'UMENOS'



// -------> Simbolo Inicial
%start inicio


%% // ------> Gramatica

inicio
: lista_instrucciones_general EOF {$$ = $1; return $$;}
;
lista_instrucciones_general
 : lista_instrucciones_general instruccion_general {$$ = $1; $$.push($2);}
| instruccion_general {$$ = []; $$.push($1);}

;
instruccion_general 
:instrucciom_ddl_dml {$$=$1;}
|funcion {$$ = $1;}
|procedimiento {$$ = $1;}
|encapsulamiento {$$ = $1;}
| error 	{console.error('Error sintáctico: ' + yytext + ',  linea: ' + this._$.first_line + ', columna: ' + this._$.first_column);

errores.agregar_error('Error SINTACTICO',yytext,this._$.first_line,this._$.first_column);
}
;
instrucciones_funciones
:instrucciones_funciones instruccion_funciones {$$ = $1; $$.push($2);}
|instruccion_funciones {$$ = []; $$.push($1);}

;
instruccion_funciones
:instruccion {$$ = $1;}
|return {$$=$1;}

;
return
:RETURN expresion PYC {$$=new dato_simple('RETURN',$2);}


;
procedimiento
:CREATE PROCEDIMIENTO ID_NORMAL lista_parametros AS BEGIN lista_instrucciones END PYC

;
funcion
:CREATE FUNCTION  ID_NORMAL PARIZQ lista_parametros PARDER RETURNS tipo_val BEGIN instrucciones_funciones END PYC {$$=new funcion($3,$5,$8,$10);}
;
tipo_val
:INT {$$='INT';}
|DOUBLE {$$='DOUBLE';}
|DATE_P {$$='DATE';}
|VARCHAR {$$='VARCHAR';}
|BOOLEAN {$$='BOOLEAN';}
|NULL {$$='NULL';}
;
lista_parametros
:lista_parametros COMA parametro {$$=$1; $$.push($3);}
|parametro {$$=[];$$.push($1);}
;
parametro
: ID_VARIABLES INT {$$=new parametro($1,'INT');}
| ID_VARIABLES DOUBLE {$$=new parametro($1,'DOUBLE');}
| ID_VARIABLES DATE_P {$$=new parametro($1,'DATE');}
| ID_VARIABLES VARCHAR {$$=new parametro($1,'VARCHAR');}
| ID_VARIABLES BOOLEAN {$$=new parametro($1,'BOOLEAN');}

;
lista_instrucciones
    : lista_instrucciones instruccion {$$ = $1; $$.push($2);}
    | instruccion  {$$ = []; $$.push($1);}
;

instruccion
: declaracion {$$=$1;}
| asignacion {$$=$1;}
|impresion_print {$$ = $1;}
|if {$$=$1;}
|case {$$=$1;}
|while {$$=$1;}
|for {$$=$1;}
|instrucciom_ddl_dml {$$=$1;}
|encapsulamiento {$$=$1;}
;
instrucciom_ddl_dml
:sentencia_ddl {$$=$1;}
|sentencia_dml {$$=$1;}
|impresion_select {$$=$1;}
;



instrucciones_loop
:instrucciones_loop instruccion_loop {$$=$1; $$.push($2);}
|instruccion_loop {$$=[];$$.push($1);}


;
instruccion_loop
:instruccion {$$=$1;}
|BREAK PYC {$$=new dato_simple('BREAK','BREAK');}
|CONTINUE PYC {$$=new dato_simple('CONTINUE','CONTINUE');}



;
for
:FOR expresion IN rango BEGIN instrucciones_loop END  PYC {$$=new For_($2,$4,$6);}
;
rango
:expresion PUNTO PUNTO expresion {$$=[];$$.push($1);$$.push($4);}

;
while
:WHILE expresion BEGIN instrucciones_loop END PYC {$$=new while_($2,$4);}

;
case
:CASE expresion lista_when ELSE expresion END AS expresion PYC {$$=new case_($2,$3,$5,$8);}
|CASE lista_when ELSE expresion END PYC {$$=new case_(null,$2,$4,null);}
|CASE expresion lista_when ELSE expresion END PYC {$$=new case_($2,$3,$5,null);}
|CASE lista_when ELSE expresion END AS expresion PYC {$$=new case_(null,$2,$4,$7);}
;
lista_when
:lista_when WHEN expresion THEN expresion {$$ = $1; $$.push(new when_($3,$5));}
|WHEN expresion THEN expresion {$$=[];$$.push(new when_($2,$4));}

;
if
:IF expresion THEN lista_instrucciones END IF PYC {$$=new if_($2,$4,null);}
|IF expresion THEN lista_instrucciones ELSE lista_instrucciones END IF PYC {$$=new if_($2,$4,$6);}

;
expresion
:ENTERO {$$ = new dato_simple('INT', $1);}
| DECIMAL {$$ = new dato_simple('DOUBLE', $1);}
| CADENA { $$ = new dato_simple('STRING', $1);}
| CADENA_S { $$ = new dato_simple('STRING', $1);}
|funcion_primitiva {$$=new dato_simple('PRIMITIVA',$1);}
| DATE { $$ = new dato_simple('DATE', $1);}
|llamada {$$=new dato_simple('LLAMADA',$1);}
|casteo {$$=new dato_simple('CASTEO',$1);}
| ID_VARIABLES {$$ = new dato_simple('ID_VARIABLE', $1);}
| ID_NORMAL {$$ = new dato_simple('ID_NORMAL', $1);}
| TRUE { $$ = new dato_simple('TRUE', $1);}
| FALSE { $$ = new dato_simple('FALSE', $1);}
| NULL { $$ = new dato_simple('NULL', $1);}
|select_agrupacion 
| MENOS expresion %prec UMENOS { $$ = new dato_simple('NEGATIVO', $2);}
| expresion MAS expresion { $$ = new expresion('SUMA', $1, $3);}
| expresion MENOS expresion { $$ = new expresion('RESTA', $1, $3);}
| expresion POR expresion { $$ = new expresion('POR', $1, $3);}
| expresion DIV expresion { $$ = new expresion('DIV', $1, $3);}
| expresion MOD expresion { $$ = new expresion('MOD', $1, $3);}
| expresion MENOR expresion {$$=new expresion('MENOR',$1,$3);}
| expresion MAYOR expresion {$$=new expresion('MAYOR',$1,$3);}
| expresion MENORIGUAL expresion {$$=new expresion('MENOR_IGUAL',$1,$3);}
| expresion MAYORIGUAL expresion {$$=new expresion('MAYOR_IGUAL',$1,$3);}
| expresion DIFERENTE expresion {$$=new expresion('DIFERENTE',$1,$3);}
|expresion IGUAL expresion {$$=new expresion('IGUAL',$1,$3);}
| expresion AND expresion {$$=new expresion('AND',$1,$3);}
| expresion OR expresion {$$=new expresion('OR',$1,$3);}
| NOT expresion %prec UNOT {$$=new expresion('NOT',$2);}
| PARIZQ expresion PARDER {$$=$2;}


;
llamada
: ID_NORMAL PARIZQ lista_valores PARDER {$$=new llamado($1,$3);}

;
funcion_primitiva
:LOWER PARIZQ expresion PARDER  {$$=new lower_($3);}
| UPPER PARIZQ expresion PARDER {$$=new upper_($3);}
| ROUND PARIZQ expresion COMA expresion PARDER {$$=new round_($3,$5);}
| LEN PARIZQ expresion PARDER {$$=new lenght_($3);}
| TYPEOF PARIZQ expresion PARDER {$$=new type_of_($3);}
| TRUNCATE PARIZQ expresion COMA expresion PARDER  {$$=new truncate_($3,$5);}
;
declaracion
: DECLARE declaracion_multiple PYC {$$=new declaraciones_multiples($2);}
;
encapsulamiento
:BEGIN lista_instrucciones END PYC {$$=new encapsulamiento($2);}

;
declaracion_multiple
: declaracion_multiple COMA declaracion_simple {$$ = $1; $$.push($3);}
| declaracion_simple {$$ = []; $$.push($1)}
;
declaracion_simple
: ID_VARIABLES INT {$$=new declaracion($1,'INT',null);}
| ID_VARIABLES DOUBLE {$$=new declaracion($1,'DOUBLE',null);}
| ID_VARIABLES DATE_P {$$=new declaracion($1,'DATE',null);}
| ID_VARIABLES VARCHAR {$$=new declaracion($1,'VARCHAR',null);}
| ID_VARIABLES BOOLEAN {$$=new declaracion($1,'BOOLEAN',null);}
| ID_VARIABLES INT DEFAULT expresion {$$=new declaracion($1,'INT',$4);}
| ID_VARIABLES DOUBLE DEFAULT expresion {$$=new declaracion($1,'DOUBLE',$4);}
| ID_VARIABLES DATE_P DEFAULT expresion {$$=new declaracion($1,'DATE',$4);}
| ID_VARIABLES VARCHAR DEFAULT expresion {$$=new declaracion($1,'VARCHAR',$4);}
| ID_VARIABLES BOOLEAN DEFAULT expresion {$$=new declaracion($1,'BOOLEAN',$4);}
;
asignacion
:SET expresion PYC {$$=new Set_var($2);}
;
impresion_select
:SELECT lista_valores PYC {$$=new select_simple($2,null);}
|SELECT lista_valores AS lista_valores PYC {$$=new select_simple($2,$4);}
;
impresion_print
:PRINT expresion PYC {$$ = new print($2);}
;
sentencia_ddl
:sentencia_create {$$=$1;}
|sentencia_alter {$$=$1;}
|sentencia_drop {$$=$1;}
;
sentencia_create
:CREATE TABLE ID_NORMAL PARIZQ lista_columnas PARDER PYC {$$=new create_table(new tabla($3,$5));}
;
lista_columnas
:lista_columnas COMA columna {$$ = $1; $$.push($3);}
|columna {$$ = []; $$.push($1)}
;
columna
: ID_NORMAL INT {$$=new columna('INT',$1);}
| ID_NORMAL DOUBLE{$$=new columna('DOUBLE',$1);}
| ID_NORMAL DATE_P{$$=new columna('DATE',$1);}
| ID_NORMAL VARCHAR{$$=new columna('VARCHAR',$1);}
| ID_NORMAL BOOLEAN{$$=new columna('BOOL',$1);}
;
sentencia_alter
:ALTER TABLE ID_NORMAL sentencia_alter_opciones PYC {$$=new alter_table($3,$4);}
;
sentencia_alter_opciones
: ADD ID_NORMAL INT{$$=new add_column(new columna('INT',$2),'ADD');}
| ADD ID_NORMAL DOUBLE {$$=new add_column(new columna('DOUBLE',$2),'ADD');}
| ADD ID_NORMAL DATE_P {$$=new add_column(new columna('DATE',$2),'ADD');}
| ADD ID_NORMAL VARCHAR {$$=new add_column(new columna('VARCHAR',$2),'ADD');}
| ADD ID_NORMAL BOOLEAN {$$=new add_column(new columna('BOOL',$2),'ADD');}
| DROP COLUMN ID_NORMAL {$$=new drop_column($3,'DROP');}
| RENAME COLUMN ID_NORMAL TO ID_NORMAL {$$=new rename_col($3,$5,'RENAME');}
| RENAME TO ID_NORMAL
;
sentencia_drop
:DROP TABLE ID_NORMAL PYC {$$=new drop_table($3);}
;
sentencia_dml
: sentencia_insert {$$=$1;}
| sentencia_update {$$=$1;}
| sentencia_delete {$$=$1;}
| sentencia_truncate {$$=$1;}
| sentencia_select {$$=$1;}

;
sentencia_insert
:INSERT INTO ID_NORMAL PARIZQ lista_valores PARDER VALUES PARIZQ lista_valores PARDER PYC {$$=new insert_c($3,$5,$9);}
;
lista_valores
:lista_valores COMA expresion  {$$ = $1; $$.push($3);} 
| expresion {$$ = []; $$.push($1);}
;
sentencia_select
:SELECT lista_valores FROM ID_NORMAL PYC {$$=new Select_columnas($2,$4,null);}
|SELECT lista_valores FROM ID_NORMAL WHERE expresion PYC {$$=new Select_columnas($2,$4,$6);}
|SELECT POR FROM ID_NORMAL PYC {$$=new Select_columnas($2,$4,null);}
|SELECT POR FROM ID_NORMAL WHERE expresion PYC {$$=new Select_columnas($2,$4,$6);}
;
select_agrupacion
: PARIZQ SELECT lista_valores FROM ID_NORMAL PARDER
|PARIZQ SELECT lista_valores FROM ID_NORMAL WHERE expresion PARDER
|PARIZQ SELECT POR FROM ID_NORMAL PARDER
|PARIZQ SELECT POR FROM ID_NORMAL WHERE expresion PARDER 

;

sentencia_update
:UPDATE ID_NORMAL SET lista_asignaciones WHERE expresion PYC {$$=new update($2,$4,$6);}

;
lista_asignaciones
:lista_asignaciones COMA asignacion { $$ = $1; $$.push($3);}
| asignacion { $$ = []; $$.push($1);}
;
asignacion
: ID_NORMAL IGUAL expresion {$$=new asignacion_columna($1,$3);}
;
sentencia_truncate
:TRUNCATE TABLE ID_NORMAL PYC {$$=new truncate_table($3);}
;
sentencia_delete
:DELETE FROM ID_NORMAL WHERE expresion PYC {$$=new delete_registro($3,$5);}
;
casteo
:CAST PARIZQ expresion AS INT PARDER {$$=new casteo($3,'INT');}
|CAST PARIZQ expresion AS DOUBLE PARDER {$$=new casteo($3,'DOUBLE');}
|CAST PARIZQ expresion AS DATE_P PARDER {$$=new casteo($3,'DATE');}
|CAST PARIZQ expresion AS VARCHAR PARDER {$$=new casteo($3,'VARCHAR');}
|CAST PARIZQ expresion AS BOOLEAN PARDER {$$=new casteo($3,'BOOLEAN');}
;
