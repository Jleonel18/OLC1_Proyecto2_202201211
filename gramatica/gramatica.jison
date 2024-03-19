%{


%}

%lex

%options case-insensitive

%%
\s+

//Comentarios

[0-9]+("."[0-9]+)\b return 'ENTERO';
[0-9]+\b return 'DOBLE';
"pow" return 'POW';
"int" return 'TIPO_DATO';
"double" return 'TIPO_DATO';
"bool" return 'TIPO_DATO';
"char" return 'TIPO_DATO';
"string" return 'TIPO_DATO';
"<<" return 'DOBLE_MENORQ'
"+" return "SUMA_RESTA";
"-" return "SUMA_RESTA";
"*" return 'MUL_DIV';
"/" return 'MUL_DIV';
"%" return 'MOD';
"=" return 'OP_IGUAL';
";" return 'PYC';
":" return 'DOSP';
"==" return 'OP_REL';
"!=" return 'OP_REL';
">" return 'OP_REL';
"<" return 'OP_REL';
"<=" return 'OP_REL';
">=" return 'OP_REL';
"||" return 'OP_LOGIC';
"&&" return 'OP_LOGIC';
"!" return 'OP_LOGIC';
"{" return 'LLAV_A';
"}" return 'LLAV_C';
"(" return 'PAR_A';
")" return 'PAR_C';
"[" return 'CORC_A';
"]" return 'CORC_C';
"if" return 'RES_IF';
"else" return 'RES_ELSE';
"switch" return 'RES_SWITCH';
"case" return 'RES_CASE';
"default" return 'RES_DEFAULT';
"while" return 'RES_WHILE';
"for" return 'RES_FOR';
"do" return 'RES_DO';
"break" return 'RES_BREAK';
"continue" return 'RES_CONTINUE';
"return" return 'RES_RETURN';
"void" return 'RES_VOID';
"cout" return 'RES_COUT';
"tolower" return 'RES_TOLOWER';
"toupper" return 'RES_TOUPPER';
"round" return 'RES_ROUND';
"length" return 'RES_LENGTH';
"typeof" return 'RES_TYPEOF';
"tostring" return 'RES_TOSTRING';
"c_str" return 'RES_C_STR';
"execute" return 'RES_EXECUTE';
"true" return 'BOOLEANO';
"false" return 'BOOLEANO';
"\"" return 'COMILLAS_D';
"\'" return 'COMILLAS_S';

([a-zA-Z])[a-zA-Z0-9_]* return 'ID';

<<EOF>> return 'EOF';
.{
    console.log(yyloc.first_line, yyloc.first_column, yytext);
}
/lex


