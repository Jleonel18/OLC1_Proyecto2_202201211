%{

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
"float"                              return 'R_FLOAT';
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
"length"                            return 'R_LENGTH';
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


%start inicio

%%

inicio: EOF {return 0};