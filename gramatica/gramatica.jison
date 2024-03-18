%{


%}

%lex

%options case-insensitive

%%
\s+

//Comentarios

[0-9]+("."[0-9]+)\b return 'NUM';
[0-9]+\b return 'NUM';
([a-zA-Z])[a-zA-Z0-9_]* return 'ID';

<<EOF>> return 'EOF';
.{
    console.log(yyloc.first_line, yyloc.first_column, yytext);
}
/lex


