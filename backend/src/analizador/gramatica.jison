// ################### ANALIZADOR LEXICO #######################
%lex
%options case-insensitive 

// ---------> Expresiones Regulares
entero  [0-9]+;
comentario ((-)(-)+.\r\n)|((-)(-)+.\n)|((-)(-)+.*\r);
comentario_mul "\\/\\[^\\\\/]\\\\/" ;
decimal [0-9]+\.[0-9]+;
cadena  \"[^"]\" | \'[^\']\';
date   [0-9]{4}-[0-9]{2}-[0-9]{2};
id_variables (@)[a-zA-Z][a-zA-Z0-9_]*;
id_normal [a-zA-Z][a-zA-Z0-9_]*;

%%
// -----> Reglas Lexicas
'('          {return 'PARIZQ'}
')'          {return 'PARDER'}
';'          {return 'PYC'}
','          {return 'COMA'}
'+'          {return 'MAS'}
'-'          {return 'MENOS'}
'*'          {return 'POR'}
'/'          {return 'DIV'}
'%'          {return 'MOD'}
'='          {return 'IGUAL'}
'<'          {return 'MENOR'}
'>'          {return 'MAYOR'}
'<='         {return 'MENORIGUAL'}
'>='         {return 'MAYORIGUAL'}

//-----------------------------
'int'       {return 'INT'}
'double'    {return 'DOUBLE'}
'date'      {return 'DATE_P'}
'varchar'  {return 'VARCHAR'}
'True'     {return 'TRUE'}
'False'    {return 'FALSE'}
'null'     {return 'NULL'}
'RETURNS'      {return 'RETURNS'}

//------------------------------------
'declare'  {return 'DECLARE'}
'default'  {return 'DEFAULT'}
'set'      {return 'SET'}
'select'   {return 'SELECT'}
'table'    {return 'TABLE'}
'create'   {return 'CREATE'}
'alter'    {return 'ALTER'}
'add'      {return 'ADD'}
'drop'     {return 'DROP'}
'rename'   {return 'RENAME'}
'to'       {return 'TO'}
'column'   {return 'COLUMN'}
'insert'   {return 'INSERT'}
'into'     {return 'INTO'}


//----------------------------------------
'values'   {return 'VALUES'}
'from'    {return 'FROM'}
'where'   {return 'WHERE'}
'update'  {return 'UPDATE'}
'truncate' {return 'TRUNCATE'}
'delete'   {return 'DELETE'}
'cast'     {return 'CAST'}
'if'       {return 'IF'}
'then'     {return 'THEN'}
'begin'    {return 'BEGIN'}
'end'      {return 'END'}
'else'     {return 'ELSE'}
'PRINT'    {return 'PRINT'}
'CASE'     {return 'CASE'}
'WHEN'     {return 'WHEN'}
'FOR'      {return 'FOR'}
'IN'       {return 'IN'}
'WHILE'    {return 'WHILE'}
'LOOP'     {return 'LOOP'}
'BREAK'    {return 'BREAK'}
//-------------------------------------
'CONTINUE' {return 'CONTINUE'}
'FUNCTION' {return 'FUNCTION'}
'RETURN'   {return 'RETURN'}
'PROCEDURE' {return 'PROCEDIMIENTO'}
'LOWER'    {return 'LOWER'}
'UPPER'    {return 'UPPER'}
'ROUND'    {return 'ROUND'}
'LEN'      {return 'LEN'}
'TYPE OF'  {return 'TYPEOF'}
'AS'       {return 'AS'}
'boolean'  {return 'BOOLEAN'}
//---------------------------------------
'AND'      {return 'AND'}
'OR'       {return 'OR'}
'NOT'      {return 'NOT'}
'.'        {return 'PUNTO'}
//----------------------------------------------
{entero}    {return 'ENTERO'}
{decimal}   {return 'DECIMAL'}
{cadena}    {return 'CADENA'}
{date}      {return 'DATE'}
{id_variables} {return 'ID_VARIABLES'}
{id_normal} {return 'ID_NORMAL'}



// -----> Espacios en Blanco
[ \s\r\n\t]             {/* Espacios se ignoran */}
// -----> Comentarios
{comentario} { /* Ignorar comentarios */ }
{comentario_mul} { /* Ignorar comentarios */ }


// -----> FIN DE CADENA Y ERRORES
<<EOF>>               return 'EOF';
.  { console.error('Error léxico: \"' + yytext + '\", linea: ' + yylloc.first_line + ', columna: ' + yylloc.first_column);  }


/lex
// ################## ANALIZADOR SINTACTICO ######################
// -------> Precedencia

%left 'MAS' 'MENOS'
%left 'POR' 'DIV' 'MOD'
%right 'UMENOS'
%left 'MENOR' 'MAYOR' 'MENORIGUAL' 'MAYORIGUAL' 'IGUAL' 'DIFERENTE'
%left 'AND' 'OR'
%right 'UNOT'

// -------> Simbolo Inicial
%start inicio

%% // ------> Gramatica

inicio
: lista_instrucciones_general EOF 
;
lista_instrucciones_general
 : lista_instrucciones_general instruccion_general
| instruccion_general

;
instruccion_general
:instruccion
|funcion
|procedimiento
;
procedimiento
:CREATE PROCEDIMIENTO ID_NORMAL lista_parametros AS BEGIN lista_instrucciones END PYC

;
funcion
:CREATE FUNCTION  ID_NORMAL PARIZQ lista_parametros PARDER RETURNS tipo_val BEGIN lista_instrucciones RETURN expresion PYC END PYC
;
tipo_val
:INT
|DOUBLE
|DATE_P
|VARCHAR
|BOOLEAN
|NULL
;
lista_parametros
:lista_parametros COMA parametro
|parametro
;
parametro
: ID_VARIABLES INT
| ID_VARIABLES DOUBLE
| ID_VARIABLES DATE_P
| ID_VARIABLES VARCHAR
| ID_VARIABLES BOOLEAN
| ID_VARIABLES NULL

;
lista_instrucciones
    : lista_instrucciones instruccion 
    | instruccion  
;

instruccion
: declaracion
|encapsulamiento
| asignacion
|impresion_select
|impresion_print
|sentencia_ddl
|sentencia_dml
|if
|case
|while
|for
|BREAK
|CONTINUE
;
for
:FOR ID_VARIABLES IN rango BEGIN lista_instrucciones END LOOP PYC
;
rango
:expresion PUNTO PUNTO expresion

;
while
:WHILE expresion BEGIN lista_instrucciones END PYC

;
case
:CASE expresion lista_when ELSE expresion END AS expresion PYC
|CASE lista_when ELSE expresion END PYC

;
lista_when
:lista_when WHEN expresion THEN expresion
|WHEN expresion THEN expresion

;
if
:IF expresion THEN lista_instrucciones END PYC
|IF expresion THEN lista_instrucciones ELSE lista_instrucciones END IF PYC

;
expresion
:ENTERO
| DECIMAL
| CADENA
|funcion_primitiva
| DATE
|llamada
|casteo
| ID_VARIABLES
| ID_NORMAL
| TRUE
| FALSE
| NULL
| MENOS expresion %prec UMENOS
| expresion MAS expresion
| expresion MENOS expresion
| expresion POR expresion
| expresion DIV expresion
| expresion MOD expresion
| expresion MENOR expresion
| expresion MAYOR expresion
| expresion MENORIGUAL expresion
| expresion MAYORIGUAL expresion
| expresion IGUAL expresion
| expresion DIFERENTE expresion
| expresion AND expresion
| expresion OR expresion
| NOT expresion %prec UNOT
| PARIZQ expresion PARDER



;
llamada
: ID_NORMAL PARIZQ lista_valores PARDER

;
funcion_primitiva
:LOWER PARIZQ expresion PARDER
| UPPER PARIZQ expresion PARDER
| ROUND PARIZQ expresion PARDER
| LEN PARIZQ expresion PARDER
| TYPEOF PARIZQ expresion PARDER
;
declaracion
: DECLARE declaracion_multiple PYC
;
encapsulamiento
:BEGIN lista_instrucciones END PYC

;
declaracion_multiple
: declaracion_multiple COMA declaracion_simple
| declaracion_simple
;
declaracion_simple
: ID_VARIABLES INT
| ID_VARIABLES DOUBLE
| ID_VARIABLES DATE_P
| ID_VARIABLES VARCHAR
| ID_VARIABLES BOOLEAN
| ID_VARIABLES NULL
| ID_VARIABLES INT DEFAULT expresion
| ID_VARIABLES DOUBLE DEFAULT expresion
| ID_VARIABLES DATE_P DEFAULT expresion
| ID_VARIABLES VARCHAR DEFAULT expresion
| ID_VARIABLES BOOLEAN DEFAULT expresion
| ID_VARIABLES NULL DEFAULT expresion
;
asignacion
:SET ID_VARIABLES IGUAL expresion PYC
;
impresion_select
:SELECT expresion PYC
|SELECT lista_valores AS lista_valores PYC
;
impresion_print
:PRINT expresion PYC
;
sentencia_ddl
:sentencia_create
|sentencia_alter
|sentencia_drop
;
sentencia_create
:CREATE ID_NORMAL PARIZQ lista_columnas PARDER PYC
;
lista_columnas
:lista_columnas COMA columna
;
columna
: ID_NORMAL INT
| ID_NORMAL DOUBLE
| ID_NORMAL DATE_P
| ID_NORMAL VARCHAR
| ID_NORMAL BOOLEAN
| ID_NORMAL NULL
;
sentencia_alter
:ALTER ID_NORMAL sentencia_alter_opciones PYC
;
sentencia_alter_opciones
: ADD COLUMN ID_NORMAL INT
| ADD COLUMN ID_NORMAL DOUBLE
| ADD COLUMN ID_NORMAL DATE_P
| ADD COLUMN ID_NORMAL VARCHAR
| ADD COLUMN ID_NORMAL BOOLEAN
| ADD COLUMN ID_NORMAL NULL
| DROP COLUMN ID_NORMAL
| RENAME COLUMN ID_NORMAL TO ID_NORMAL
| RENAME TO ID_NORMAL
;
sentencia_drop
:DROP TABLE ID_NORMAL PYC
;
sentencia_dml
: sentencia_insert
| sentencia_update
| sentencia_delete
| sentencia_truncate
| sentencia_select

;
sentencia_insert
:INSERT INTO ID_NORMAL PARIZQ lista_valores PARDER VALUES PARIZQ lista_valores PARDER PYC
;
lista_valores
:lista_valores COMA expresion
| expresion
;
sentencia_select
:SELECT lista_valores FROM ID_NORMAL PYC
|SELECT lista_valores FROM ID_NORMAL WHERE expresion PYC
|SELECT POR FROM ID_NORMAL PYC
|SELECT POR FROM ID_NORMAL WHERE expresion PYC
;
sentencia_update
:UPDATE ID_NORMAL SET lista_asignaciones WHERE expresion PYC

;
lista_asignaciones
:lista_asignaciones COMA asignacion
| asignacion
;
asignacion
: ID_NORMAL IGUAL expresion
;
sentencia_truncate
:TRUNCATE TABLE ID_NORMAL PYC
;
sentencia_delete
:DELETE FROM ID_NORMAL WHERE expresion PYC
;
casteo
:CAST PARIZQ expresion AS INT PARDER
|CAST PARIZQ expresion AS DOUBLE PARDER
|CAST PARIZQ expresion AS DATE_P PARDER
|CAST PARIZQ expresion AS VARCHAR PARDER
|CAST PARIZQ expresion AS BOOLEAN PARDER
;


