%{

const Tipo = require('../build/controllers/simbol/tipo')
const Nativo = require('../build/controllers/expr/Nativo')
const Aritmeticas = require('../build/controllers/expr/Aritmeticas')
const Relacionales = require('../build/controllers/expr/Relacionales')
const Logicos = require('../build/controllers/expr/Logicos')

const DeclaracionVacia = require('../build/controllers/instruc/declaracionVacia')
const Print = require('../build/controllers/instruc/print')
const PrintSeguido = require('../build/controllers/instruc/printSeguido')
const Declaracion = require('../build/controllers/instruc/declaracion')
const AccesoVar = require('../build/controllers/expr/accesoVar')
const AsignacionVar = require('../build/controllers/instruc/asignacionVar')
const If = require('../build/controllers/instruc/if')
const FNativas = require('../build/controllers/expr/fNativas')
const While = require('../build/controllers/instruc/while')
const Break = require('../build/controllers/instruc/Break')
const DoWhile = require('../build/controllers/instruc/doWhile')
const IncreDecre = require('../build/controllers/instruc/increDecre')
const Casteo = require('../build/controllers/expr/casteo')
const For = require('../build/controllers/instruc/for')
const Continue = require('../build/controllers/instruc/Continue')
const OpTernario = require('../build/controllers/instruc/opTernario')

var cadena  = '';
var errores = [];

%}

%lex

%options case-insensitive
%x string

%%

\s+                                  // Ignorar espacios en blanco
\/\/.* {}                              // Comentario de una linea
[/][*][^*]*[*]+([^/*][^*]*[*]+)*[/]	{} // Comentario Multilinea


// TIPOS DE DATOS
//---------------------------------------------------
"int"                                return 'R_INT';
"double"                              return 'R_DOUBLE';
"char"                               return 'R_CHAR';
"string"                             return 'R_STRING';
"bool"                               return 'R_BOOL';
//----------------------------------------------------

//Sentencias if switch
//----------------------------------------------------
"if"                                 return 'R_IF';
"else"                               return 'R_ELSE';
"switch"                             return 'R_SWITCH';
"case"                               return 'R_CASE';
"default"                            return 'R_DEFAULT';
"break"                             return 'R_BREAK';
//----------------------------------------------------


//Sentencias de Ciclo
//----------------------------------------------------
"for"                                return 'R_FOR';
"while"                              return 'R_WHILE';
"do"                                 return 'R_DO';
"continue"                           return 'R_CONTINUE';
"return"                            return 'R_RETURN';

//----------------------------------------------------

//Sentencias de Funciones
//----------------------------------------------------
"void"                              return 'R_VOID';
//----------------------------------------------------

//Incremento y decremento
//----------------------------------------------------
"++"                                return 'R_INC';
"--"                                return 'R_DEC';
//----------------------------------------------------

//Funciones nativas
//----------------------------------------------------
"cout"                              return 'R_COUT';
"<<"                                return 'R_DOBLEMENOR'
"tolower"                            return 'R_TOLOWER';
"toupper"                            return 'R_TOUPPER';
".length()"                            return 'R_LENGTH';
"c_str"                             return 'R_C_STR';
"std"                               return 'R_STD';
"toString"                          return 'R_TOSTRING';
"execute"                           return 'R_EXECUTE';
"typeOf"                            return 'R_TYPEOF';
"round"                             return 'R_ROUND';
"endl"                              return 'R_ENDL';

//True y False
//----------------------------------------------------
"true"                              return 'R_TRUE';
"false"                             return 'R_FALSE';
//----------------------------------------------------

//operadores lógicos
//----------------------------------------------------
"!="                   	return 'R_DISTINTO';
"=="                   	return 'R_IGUALIGUAL';
"!"                   	return 'R_NOT';
"="						return 'R_IGUAL';
"<="                   	return 'R_MENORIGUAL';
">="					return 'R_MAYORIGUAL';
">"                   	return 'R_MAYOR';
"<"                   	return 'R_MENOR';
"&&"                   	return 'R_AND';
"||"                   	return 'R_OR';
//----------------------------------------------------

//operadores aritméticos
//----------------------------------------------------
"+"                   	return 'R_MAS';
"-"                   	return 'R_MENOS';
"*"                   	return 'R_POR';
"/"                   	return 'R_DIV';
"%"                   	return 'R_MOD';
"pow"                   return 'R_POW';
//----------------------------------------------------

//Coma, punto y coma, parentesis, llaves, corchetes, ternario
//----------------------------------------------------
","                   	return 'R_COMA';
";"                   	return 'R_PUNTOYCOMA';
"("                   	return 'R_PARIZQ';
")"                   	return 'R_PARDER';
"{"                   	return 'R_LLAVEIZQ';
"}"                   	return 'R_LLAVEDER';
"["                   	return 'R_CORCHETEIZQ';
"]"                   	return 'R_CORCHETEDER';
"?"                   	return 'R_TERNARIO';
":"                   	return 'R_DOSPUNTOS';
//----------------------------------------------------


//Tipos de datos aceptados
//----------------------------------------------------
([a-zA-Z])([a-zA-Z0-9_])*                                               return 'ID';
[']\\\\[']|[']\\\"[']|[']\\\'[']|[']\\n[']|[']\\t[']|[']\\r[']|['].?[']	return 'CARACTER';
[0-9]+"."[0-9]+	                                                        return 'DECIMAL';
[0-9]+					                                                return 'ENTERO';
["]						{ cadena = ''; this.begin("string"); }
//----------------------------------------------------

//Secuencias de escape
//----------------------------------------------------
<string>[^"\\]+			{ cadena += yytext; }
<string>"\\\""			{ cadena += "\""; }
<string>"\\n"			{ cadena += "\n"; }
<string>\s				{ cadena += " ";  }
<string>"\\t"			{ cadena += "\t"; }
<string>"\\\\"			{ cadena += "\\"; }
<string>"\\\'"			{ cadena += "\'"; }
<string>"\\r"			{ cadena += "\r"; }
<string>["]				{ yytext = cadena; this.popState(); return 'CADENA'; }
//----------------------------------------------------


<<EOF>> return 'EOF';
.                     	{ errores.push({ tipo: "Lexico", error: yytext, linea: yylloc.first_line, columna: yylloc.first_column+1 }); return 'ERROR_LEX'; }

/lex

//Precedencias
%left 'R_TERNARIO'
%left 'R_OR'
%left 'R_AND'
%right 'R_NOT'
%left 'R_IGUALIGUAL', 'R_DISTINTO', 'R_MENOR', 'R_MENORIGUAL', 'R_MAYOR', 'R_MAYORIGUAL'
%left 'R_MAS', 'R_MENOS'
%left 'R_POR', 'R_DIV', 'R_MOD'
%left 'R_POW'
%left 'R_INC', 'R_DEC'
%left umenos
%left 'R_PARIZQ'
%left 'R_LENGTH'


%start inicio

%%

inicio : instrucciones EOF                  {return $1;}
;

instrucciones : instrucciones instruccion   {$1.push($2); $$=$1;}
              | instruccion                 {$$=[$1];}
;

instruccion : impresion            {$$=$1;}
            | declaracion R_PUNTOYCOMA           {$$=$1;}
            | asignacion  R_PUNTOYCOMA           {$$=$1;}
            | if                                {$$=$1;}
            | while                             {$$=$1;}
            | break                             {$$=$1;}
            | do_while                          {$$=$1;}
            | for                               {$$=$1;}
            | continue                          {$$ = $1;}
;

impresion : R_COUT R_DOBLEMENOR expresion final_cout    {if($4 == true){$$= new Print.default($3, @1.first_line, @1.first_column);}else{$$= new PrintSeguido.default($3, @1.first_line, @1.first_column);} }
;

final_cout: R_DOBLEMENOR R_ENDL R_PUNTOYCOMA {$$= true;}
          | R_PUNTOYCOMA      {$$= false;}
;

declaracion : tipos declaraciones_varias asignar_declaracion     {
      if($3 == true){
            $$ = new DeclaracionVacia.default($1, @1.first_line, @1.first_column, $2);
      }else{
            $$ = new Declaracion.default($1, @1.first_line, @1.first_column, $2, $3);}

      }
;

asignar_declaracion: R_IGUAL expresion {$$ = $2;}
                    | {$$ = true;}
;

declaraciones_varias: declaraciones_varias R_COMA ID          { $$.push($3); $$=$1;}
                        | ID                                    {$$ = [$1];}
;

asignacion : ID R_IGUAL expresion             {$$ = new AsignacionVar.default($1, $3, @1.first_line, @1.first_column);}
| incre_decre {$$ = $1;}
;

tipos : R_INT             {$$ = new Tipo.default(Tipo.tipoDato.ENTERO);}
      |  R_DOUBLE         {$$ = new Tipo.default(Tipo.tipoDato.DECIMAL);}
      |R_STD R_DOSPUNTOS R_DOSPUNTOS R_STRING          {$$ = new Tipo.default(Tipo.tipoDato.CADENA);}
      | R_BOOL            {$$ = new Tipo.default(Tipo.tipoDato.BOOL);}
      | R_CHAR            {$$ = new Tipo.default(Tipo.tipoDato.CARACTER);}
;



expresion : expresion R_MAS expresion          {$$ = new Aritmeticas.default(Aritmeticas.Operadores.SUMA, @1.first_line, @1.first_column, $1, $3);}
          | expresion R_MENOS expresion        {$$ = new Aritmeticas.default(Aritmeticas.Operadores.RESTA, @1.first_line, @1.first_column, $1, $3);}
          | expresion R_POR expresion          {$$ = new Aritmeticas.default(Aritmeticas.Operadores.MULTIPLICACION, @1.first_line, @1.first_column, $1, $3);}
          | expresion R_DIV expresion          {$$ = new Aritmeticas.default(Aritmeticas.Operadores.DIVISION, @1.first_line, @1.first_column, $1, $3);}
          | expresion R_MOD expresion          {$$ = new Aritmeticas.default(Aritmeticas.Operadores.MODULO, @1.first_line, @1.first_column, $1, $3);}
          | R_PARIZQ expresion R_PARDER              {$$ = $2;}
          | R_POW R_PARIZQ expresion R_COMA expresion R_PARDER {$$ = new Aritmeticas.default(Aritmeticas.Operadores.POTENCIA, @1.first_line, @1.first_column, $3, $5);}
          | expresion R_IGUALIGUAL expresion {$$ = new Relacionales.default(Relacionales.Operadores.IGUAL, @1.first_line, @1.first_column, $1, $3);}
          | expresion R_DISTINTO expresion {$$ =  new Relacionales.default(Relacionales.Operadores.DIFERENTE, @1.first_line, @1.first_column, $1, $3);}
          | expresion R_MAYOR expresion    {$$ = new Relacionales.default(Relacionales.Operadores.MAYOR, @1.first_line, @1.first_column, $1, $3);}
          | expresion R_MENOR expresion   {$$ = new Relacionales.default(Relacionales.Operadores.MENOR, @1.first_line, @1.first_column, $1, $3);}
          | expresion R_MAYORIGUAL expresion {$$ = new Relacionales.default(Relacionales.Operadores.MAYORIGUAL, @1.first_line, @1.first_column, $1, $3);}
          | expresion R_MENORIGUAL expresion {$$ = new Relacionales.default(Relacionales.Operadores.MENORIGUAL, @1.first_line, @1.first_column, $1, $3);}
          | R_NOT expresion               {$$ = new Logicos.default(Logicos.Operadores.NOT, @1.first_line, @1.first_column, $2);}
          | expresion R_AND expresion    {$$ = new Logicos.default(Logicos.Operadores.AND, @1.first_line, @1.first_column, $1, $3);}
          | expresion R_OR expresion     {$$ = new Logicos.default(Logicos.Operadores.OR, @1.first_line, @1.first_column, $1, $3);}
          | R_MENOS expresion %prec umenos     {$$ = new Aritmeticas.default(Aritmeticas.Operadores.NEG, @1.first_line, @1.first_column, $2);}
          | ENTERO                           {$$ = new Nativo.default(new Tipo.default(Tipo.tipoDato.ENTERO), $1, @1.first_line, @1.first_column );}
          | DECIMAL                          {$$ = new Nativo.default(new Tipo.default(Tipo.tipoDato.DECIMAL), $1, @1.first_line, @1.first_column );}
          | CADENA                           {$$ = new Nativo.default(new Tipo.default(Tipo.tipoDato.CADENA), $1, @1.first_line, @1.first_column );}
          | ID                               {$$ = new AccesoVar.default($1, @1.first_line, @1.first_column);} 
          | CARACTER                        {$$ = new Nativo.default(new Tipo.default(Tipo.tipoDato.CARACTER), $1, @1.first_line, @1.first_column );} 
          | R_TRUE                           {$$ = new Nativo.default(new Tipo.default(Tipo.tipoDato.BOOL), true, @1.first_line, @1.first_column );}
          | R_FALSE                          {$$ = new Nativo.default(new Tipo.default(Tipo.tipoDato.BOOL), false, @1.first_line, @1.first_column );}  
          | f_nativas                       {$$ = $1;}
          | expresion R_LENGTH                   {$$ = new FNativas.default(FNativas.Operadores.LENGTH, @1.first_line, @1.first_column, $1);}
          | casteo                              {$$ = $1;}
          | expresion R_TERNARIO expresion R_DOSPUNTOS expresion {$$ = new OpTernario.default($1, $3, $5, @1.first_line, @1.first_column);}
;

f_nativas: R_TOLOWER R_PARIZQ expresion R_PARDER    {$$ = new FNativas.default(FNativas.Operadores.TOLOWER, @1.first_line, @1.first_column, $3);} 
            | R_TOUPPER R_PARIZQ expresion R_PARDER {$$ = new FNativas.default(FNativas.Operadores.TOUPPER, @1.first_line, @1.first_column, $3);}
            | R_ROUND R_PARIZQ expresion R_PARDER   {$$ = new FNativas.default(FNativas.Operadores.ROUND, @1.first_line, @1.first_column, $3);}
            | R_TYPEOF R_PARIZQ expresion R_PARDER  {$$ = new FNativas.default(FNativas.Operadores.TYPEOF, @1.first_line, @1.first_column, $3);}
            | R_STD R_DOSPUNTOS R_DOSPUNTOS R_TOSTRING R_PARIZQ expresion R_PARDER {$$ = new FNativas.default(FNativas.Operadores.TOSTRING, @1.first_line, @1.first_column, $6);} 
            | R_C_STR R_PARIZQ expresion R_PARDER
;

if: R_IF R_PARIZQ expresion R_PARDER R_LLAVEIZQ instrucciones R_LLAVEDER else_opcional {$$ = new If.default($3, $6, @1.first_line, @1.first_column);}
;

else_opcional: R_ELSE R_LLAVEIZQ instrucciones R_LLAVEDER {$$ = $3;}
              | R_ELSE if {$$ = $2;}
              | {$$ = [];}
;

while: R_WHILE R_PARIZQ expresion R_PARDER R_LLAVEIZQ instrucciones R_LLAVEDER {$$ = new While.default($3, $6, @1.first_line, @1.first_column);}
;

do_while: R_DO R_LLAVEIZQ instrucciones R_LLAVEDER R_WHILE R_PARIZQ expresion R_PARDER R_PUNTOYCOMA {$$ = new DoWhile.default($7, $3, @1.first_line, @1.first_column);}
;

for: R_FOR R_PARIZQ eleccion_for R_PUNTOYCOMA expresion R_PUNTOYCOMA asignacion R_PARDER R_LLAVEIZQ instrucciones R_LLAVEDER{ $$ = new For.default($3,$5,$7,$10,@1.first_line,@1.first_column);}
;

eleccion_for: declaracion {$$ = $1;}
            | asignacion  {$$ = $1;}
;

break: R_BREAK R_PUNTOYCOMA {$$ = new Break.default(@1.first_line, @1.first_column);}
;

continue: R_CONTINUE R_PUNTOYCOMA {$$ = new Continue.default(@1.first_line, @1.first_column);}
;

incre_decre: ID signo_incre_decre {$$ = new IncreDecre.default($1, @1.first_line, @1.first_column,$2);}
;

signo_incre_decre: R_INC {$$ = true;}
                  | R_DEC {$$ = false;}
;

casteo: R_PARIZQ tipos R_PARDER expresion {$$ = new Casteo.default($2, @1.first_line, @1.first_column, $4);} 
;
