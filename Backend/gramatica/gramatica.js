/* parser generated by jison 0.4.18 */
/*
  Returns a Parser object of the following structure:

  Parser: {
    yy: {}
  }

  Parser.prototype: {
    yy: {},
    trace: function(),
    symbols_: {associative list: name ==> number},
    terminals_: {associative list: number ==> name},
    productions_: [...],
    performAction: function anonymous(yytext, yyleng, yylineno, yy, yystate, $$, _$),
    table: [...],
    defaultActions: {...},
    parseError: function(str, hash),
    parse: function(input),

    lexer: {
        EOF: 1,
        parseError: function(str, hash),
        setInput: function(input),
        input: function(),
        unput: function(str),
        more: function(),
        less: function(n),
        pastInput: function(),
        upcomingInput: function(),
        showPosition: function(),
        test_match: function(regex_match_array, rule_index),
        next: function(),
        lex: function(),
        begin: function(condition),
        popState: function(),
        _currentRules: function(),
        topState: function(),
        pushState: function(condition),

        options: {
            ranges: boolean           (optional: true ==> token location info will include a .range[] member)
            flex: boolean             (optional: true ==> flex-like lexing behaviour where the rules are tested exhaustively to find the longest match)
            backtrack_lexer: boolean  (optional: true ==> lexer regexes are tested in order and for each matching regex the action code is invoked; the lexer terminates the scan when a token is returned by the action code)
        },

        performAction: function(yy, yy_, $avoiding_name_collisions, YY_START),
        rules: [...],
        conditions: {associative list: name ==> set},
    }
  }


  token location info (@$, _$, etc.): {
    first_line: n,
    last_line: n,
    first_column: n,
    last_column: n,
    range: [start_number, end_number]       (where the numbers are indexes into the input string, regular zero-based)
  }


  the parseError function receives a 'hash' object with these members for lexer and parser errors: {
    text:        (matched text)
    token:       (the produced terminal token, if any)
    line:        (yylineno)
  }
  while parser (grammar) errors will also provide these members, i.e. parser errors deliver a superset of attributes: {
    loc:         (yylloc)
    expected:    (string describing the set of expected tokens)
    recoverable: (boolean: TRUE when the parser has a error recovery rule available for this particular error)
  }
*/
var gramatica = (function(){
var o=function(k,v,o,l){for(o=o||{},l=k.length;l--;o[k[l]]=v);return o},$V0=[1,7],$V1=[1,9],$V2=[1,10],$V3=[1,11],$V4=[1,12],$V5=[1,13],$V6=[1,14],$V7=[5,11,16,38,39,40,41,42],$V8=[1,24],$V9=[1,30],$Va=[1,26],$Vb=[1,25],$Vc=[1,27],$Vd=[1,28],$Ve=[1,29],$Vf=[1,31],$Vg=[1,32],$Vh=[1,33],$Vi=[1,37],$Vj=[1,38],$Vk=[1,39],$Vl=[1,40],$Vm=[1,41],$Vn=[1,42],$Vo=[1,43],$Vp=[1,44],$Vq=[1,45],$Vr=[1,46],$Vs=[1,47],$Vt=[1,48],$Vu=[1,49],$Vv=[8,14,18,19,20,21,22,23,24,25,26,27,28,30,31],$Vw=[8,14,30,31],$Vx=[8,14,18,19,23,24,25,26,27,28,30,31],$Vy=[8,14,23,24,25,26,27,28,30,31];
var parser = {trace: function trace () { },
yy: {},
symbols_: {"error":2,"inicio":3,"instrucciones":4,"EOF":5,"instruccion":6,"impresion":7,"R_PUNTOYCOMA":8,"declaracion":9,"asignacion":10,"R_COUT":11,"R_PARIZQ":12,"expresion":13,"R_PARDER":14,"tipos":15,"ID":16,"R_IGUAL":17,"R_MAS":18,"R_MENOS":19,"R_POR":20,"R_DIV":21,"R_MOD":22,"R_IGUALIGUAL":23,"R_DISTINTO":24,"R_MAYOR":25,"R_MENOR":26,"R_MAYORIGUAL":27,"R_MENORIGUAL":28,"R_NOT":29,"R_AND":30,"R_OR":31,"ENTERO":32,"DECIMAL":33,"CADENA":34,"CARACTER":35,"R_TRUE":36,"R_FALSE":37,"R_INT":38,"R_DOUBLE":39,"R_STRING":40,"R_BOOL":41,"R_CHAR":42,"$accept":0,"$end":1},
terminals_: {2:"error",5:"EOF",8:"R_PUNTOYCOMA",11:"R_COUT",12:"R_PARIZQ",14:"R_PARDER",16:"ID",17:"R_IGUAL",18:"R_MAS",19:"R_MENOS",20:"R_POR",21:"R_DIV",22:"R_MOD",23:"R_IGUALIGUAL",24:"R_DISTINTO",25:"R_MAYOR",26:"R_MENOR",27:"R_MAYORIGUAL",28:"R_MENORIGUAL",29:"R_NOT",30:"R_AND",31:"R_OR",32:"ENTERO",33:"DECIMAL",34:"CADENA",35:"CARACTER",36:"R_TRUE",37:"R_FALSE",38:"R_INT",39:"R_DOUBLE",40:"R_STRING",41:"R_BOOL",42:"R_CHAR"},
productions_: [0,[3,2],[4,2],[4,1],[6,2],[6,2],[6,2],[7,4],[9,4],[10,3],[13,3],[13,3],[13,3],[13,3],[13,3],[13,3],[13,3],[13,3],[13,3],[13,3],[13,3],[13,3],[13,2],[13,3],[13,3],[13,2],[13,1],[13,1],[13,1],[13,1],[13,1],[13,1],[13,1],[15,1],[15,1],[15,1],[15,1],[15,1]],
performAction: function anonymous(yytext, yyleng, yylineno, yy, yystate /* action[1] */, $$ /* vstack */, _$ /* lstack */) {
/* this == yyval */

var $0 = $$.length - 1;
switch (yystate) {
case 1:
return $$[$0-1];
break;
case 2:
$$[$0-1].push($$[$0]); this.$=$$[$0-1];
break;
case 3:
this.$=[$$[$0]];
break;
case 4: case 5: case 6:
this.$=$$[$0-1];
break;
case 7:
this.$= new Print.default($$[$0-1], _$[$0-3].first_line, _$[$0-3].first_column);
break;
case 8:
this.$ = new Declaracion.default($$[$0-3], _$[$0-3].first_line, _$[$0-3].first_column, $$[$0-2], $$[$0]);
break;
case 9:
this.$ = new AsignacionVar.default($$[$0-2], $$[$0], _$[$0-2].first_line, _$[$0-2].first_column);
break;
case 10:
this.$ = new Aritmeticas.default(Aritmeticas.Operadores.SUMA, _$[$0-2].first_line, _$[$0-2].first_column, $$[$0-2], $$[$0]);
break;
case 11:
this.$ = new Aritmeticas.default(Aritmeticas.Operadores.RESTA, _$[$0-2].first_line, _$[$0-2].first_column, $$[$0-2], $$[$0]);
break;
case 12:
this.$ = new Aritmeticas.default(Aritmeticas.Operadores.MULTIPLICACION, _$[$0-2].first_line, _$[$0-2].first_column, $$[$0-2], $$[$0]);
break;
case 13:
this.$ = new Aritmeticas.default(Aritmeticas.Operadores.DIVISION, _$[$0-2].first_line, _$[$0-2].first_column, $$[$0-2], $$[$0]);
break;
case 14:
this.$ = new Aritmeticas.default(Aritmeticas.Operadores.MODULO, _$[$0-2].first_line, _$[$0-2].first_column, $$[$0-2], $$[$0]);
break;
case 15:
this.$ = $$[$0-1];
break;
case 16:
this.$ = new Relacionales.default(Relacionales.Operadores.IGUAL, _$[$0-2].first_line, _$[$0-2].first_column, $$[$0-2], $$[$0]);
break;
case 17:
this.$ =  new Relacionales.default(Relacionales.Operadores.DIFERENTE, _$[$0-2].first_line, _$[$0-2].first_column, $$[$0-2], $$[$0]);
break;
case 18:
this.$ = new Relacionales.default(Relacionales.Operadores.MAYOR, _$[$0-2].first_line, _$[$0-2].first_column, $$[$0-2], $$[$0]);
break;
case 19:
this.$ = new Relacionales.default(Relacionales.Operadores.MENOR, _$[$0-2].first_line, _$[$0-2].first_column, $$[$0-2], $$[$0]);
break;
case 20:
this.$ = new Relacionales.default(Relacionales.Operadores.MAYORIGUAL, _$[$0-2].first_line, _$[$0-2].first_column, $$[$0-2], $$[$0]);
break;
case 21:
this.$ = new Relacionales.default(Relacionales.Operadores.MENORIGUAL, _$[$0-2].first_line, _$[$0-2].first_column, $$[$0-2], $$[$0]);
break;
case 22:
this.$ = new Logicos.default(Logicos.Operadores.NOT, _$[$0-1].first_line, _$[$0-1].first_column, $$[$0]);
break;
case 23:
this.$ = new Logicos.default(Logicos.Operadores.AND, _$[$0-2].first_line, _$[$0-2].first_column, $$[$0-2], $$[$0]);
break;
case 24:
this.$ = new Logicos.default(Logicos.Operadores.OR, _$[$0-2].first_line, _$[$0-2].first_column, $$[$0-2], $$[$0]);
break;
case 25:
this.$ = new Aritmeticas.default(Aritmeticas.Operadores.NEG, _$[$0-1].first_line, _$[$0-1].first_column, $$[$0]);
break;
case 26:
this.$ = new Nativo.default(new Tipo.default(Tipo.tipoDato.ENTERO), $$[$0], _$[$0].first_line, _$[$0].first_column );
break;
case 27:
this.$ = new Nativo.default(new Tipo.default(Tipo.tipoDato.DECIMAL), $$[$0], _$[$0].first_line, _$[$0].first_column );
break;
case 28:
this.$ = new Nativo.default(new Tipo.default(Tipo.tipoDato.CADENA), $$[$0], _$[$0].first_line, _$[$0].first_column );
break;
case 29:
this.$ = new AccesoVar.default($$[$0], _$[$0].first_line, _$[$0].first_column);
break;
case 30:
this.$ = new Nativo.default(new Tipo.default(Tipo.tipoDato.CARACTER), $$[$0], _$[$0].first_line, _$[$0].first_column );
break;
case 31:
this.$ = new Nativo.default(new Tipo.default(Tipo.tipoDato.BOOL), true, _$[$0].first_line, _$[$0].first_column );
break;
case 32:
this.$ = new Nativo.default(new Tipo.default(Tipo.tipoDato.BOOL), false, _$[$0].first_line, _$[$0].first_column );
break;
case 33:
this.$ = new Tipo.default(Tipo.tipoDato.ENTERO);
break;
case 34:
this.$ = new Tipo.default(Tipo.tipoDato.DECIMAL);
break;
case 35:
this.$ = new Tipo.default(Tipo.tipoDato.CADENA);
break;
case 36:
this.$ = new Tipo.default(Tipo.tipoDato.BOOL);
break;
case 37:
this.$ = new Tipo.default(Tipo.tipoDato.CARACTER);
break;
}
},
table: [{3:1,4:2,6:3,7:4,9:5,10:6,11:$V0,15:8,16:$V1,38:$V2,39:$V3,40:$V4,41:$V5,42:$V6},{1:[3]},{5:[1,15],6:16,7:4,9:5,10:6,11:$V0,15:8,16:$V1,38:$V2,39:$V3,40:$V4,41:$V5,42:$V6},o($V7,[2,3]),{8:[1,17]},{8:[1,18]},{8:[1,19]},{12:[1,20]},{16:[1,21]},{17:[1,22]},{16:[2,33]},{16:[2,34]},{16:[2,35]},{16:[2,36]},{16:[2,37]},{1:[2,1]},o($V7,[2,2]),o($V7,[2,4]),o($V7,[2,5]),o($V7,[2,6]),{12:$V8,13:23,16:$V9,19:$Va,29:$Vb,32:$Vc,33:$Vd,34:$Ve,35:$Vf,36:$Vg,37:$Vh},{17:[1,34]},{12:$V8,13:35,16:$V9,19:$Va,29:$Vb,32:$Vc,33:$Vd,34:$Ve,35:$Vf,36:$Vg,37:$Vh},{14:[1,36],18:$Vi,19:$Vj,20:$Vk,21:$Vl,22:$Vm,23:$Vn,24:$Vo,25:$Vp,26:$Vq,27:$Vr,28:$Vs,30:$Vt,31:$Vu},{12:$V8,13:50,16:$V9,19:$Va,29:$Vb,32:$Vc,33:$Vd,34:$Ve,35:$Vf,36:$Vg,37:$Vh},{12:$V8,13:51,16:$V9,19:$Va,29:$Vb,32:$Vc,33:$Vd,34:$Ve,35:$Vf,36:$Vg,37:$Vh},{12:$V8,13:52,16:$V9,19:$Va,29:$Vb,32:$Vc,33:$Vd,34:$Ve,35:$Vf,36:$Vg,37:$Vh},o($Vv,[2,26]),o($Vv,[2,27]),o($Vv,[2,28]),o($Vv,[2,29]),o($Vv,[2,30]),o($Vv,[2,31]),o($Vv,[2,32]),{12:$V8,13:53,16:$V9,19:$Va,29:$Vb,32:$Vc,33:$Vd,34:$Ve,35:$Vf,36:$Vg,37:$Vh},{8:[2,9],18:$Vi,19:$Vj,20:$Vk,21:$Vl,22:$Vm,23:$Vn,24:$Vo,25:$Vp,26:$Vq,27:$Vr,28:$Vs,30:$Vt,31:$Vu},{8:[2,7]},{12:$V8,13:54,16:$V9,19:$Va,29:$Vb,32:$Vc,33:$Vd,34:$Ve,35:$Vf,36:$Vg,37:$Vh},{12:$V8,13:55,16:$V9,19:$Va,29:$Vb,32:$Vc,33:$Vd,34:$Ve,35:$Vf,36:$Vg,37:$Vh},{12:$V8,13:56,16:$V9,19:$Va,29:$Vb,32:$Vc,33:$Vd,34:$Ve,35:$Vf,36:$Vg,37:$Vh},{12:$V8,13:57,16:$V9,19:$Va,29:$Vb,32:$Vc,33:$Vd,34:$Ve,35:$Vf,36:$Vg,37:$Vh},{12:$V8,13:58,16:$V9,19:$Va,29:$Vb,32:$Vc,33:$Vd,34:$Ve,35:$Vf,36:$Vg,37:$Vh},{12:$V8,13:59,16:$V9,19:$Va,29:$Vb,32:$Vc,33:$Vd,34:$Ve,35:$Vf,36:$Vg,37:$Vh},{12:$V8,13:60,16:$V9,19:$Va,29:$Vb,32:$Vc,33:$Vd,34:$Ve,35:$Vf,36:$Vg,37:$Vh},{12:$V8,13:61,16:$V9,19:$Va,29:$Vb,32:$Vc,33:$Vd,34:$Ve,35:$Vf,36:$Vg,37:$Vh},{12:$V8,13:62,16:$V9,19:$Va,29:$Vb,32:$Vc,33:$Vd,34:$Ve,35:$Vf,36:$Vg,37:$Vh},{12:$V8,13:63,16:$V9,19:$Va,29:$Vb,32:$Vc,33:$Vd,34:$Ve,35:$Vf,36:$Vg,37:$Vh},{12:$V8,13:64,16:$V9,19:$Va,29:$Vb,32:$Vc,33:$Vd,34:$Ve,35:$Vf,36:$Vg,37:$Vh},{12:$V8,13:65,16:$V9,19:$Va,29:$Vb,32:$Vc,33:$Vd,34:$Ve,35:$Vf,36:$Vg,37:$Vh},{12:$V8,13:66,16:$V9,19:$Va,29:$Vb,32:$Vc,33:$Vd,34:$Ve,35:$Vf,36:$Vg,37:$Vh},{14:[1,67],18:$Vi,19:$Vj,20:$Vk,21:$Vl,22:$Vm,23:$Vn,24:$Vo,25:$Vp,26:$Vq,27:$Vr,28:$Vs,30:$Vt,31:$Vu},o($Vw,[2,22],{18:$Vi,19:$Vj,20:$Vk,21:$Vl,22:$Vm,23:$Vn,24:$Vo,25:$Vp,26:$Vq,27:$Vr,28:$Vs}),o($Vv,[2,25]),{8:[2,8],18:$Vi,19:$Vj,20:$Vk,21:$Vl,22:$Vm,23:$Vn,24:$Vo,25:$Vp,26:$Vq,27:$Vr,28:$Vs,30:$Vt,31:$Vu},o($Vx,[2,10],{20:$Vk,21:$Vl,22:$Vm}),o($Vx,[2,11],{20:$Vk,21:$Vl,22:$Vm}),o($Vv,[2,12]),o($Vv,[2,13]),o($Vv,[2,14]),o($Vy,[2,16],{18:$Vi,19:$Vj,20:$Vk,21:$Vl,22:$Vm}),o($Vy,[2,17],{18:$Vi,19:$Vj,20:$Vk,21:$Vl,22:$Vm}),o($Vy,[2,18],{18:$Vi,19:$Vj,20:$Vk,21:$Vl,22:$Vm}),o($Vy,[2,19],{18:$Vi,19:$Vj,20:$Vk,21:$Vl,22:$Vm}),o($Vy,[2,20],{18:$Vi,19:$Vj,20:$Vk,21:$Vl,22:$Vm}),o($Vy,[2,21],{18:$Vi,19:$Vj,20:$Vk,21:$Vl,22:$Vm}),o($Vw,[2,23],{18:$Vi,19:$Vj,20:$Vk,21:$Vl,22:$Vm,23:$Vn,24:$Vo,25:$Vp,26:$Vq,27:$Vr,28:$Vs}),o([8,14,31],[2,24],{18:$Vi,19:$Vj,20:$Vk,21:$Vl,22:$Vm,23:$Vn,24:$Vo,25:$Vp,26:$Vq,27:$Vr,28:$Vs,30:$Vt}),o($Vv,[2,15])],
defaultActions: {10:[2,33],11:[2,34],12:[2,35],13:[2,36],14:[2,37],15:[2,1],36:[2,7]},
parseError: function parseError (str, hash) {
    if (hash.recoverable) {
        this.trace(str);
    } else {
        var error = new Error(str);
        error.hash = hash;
        throw error;
    }
},
parse: function parse(input) {
    var self = this, stack = [0], tstack = [], vstack = [null], lstack = [], table = this.table, yytext = '', yylineno = 0, yyleng = 0, recovering = 0, TERROR = 2, EOF = 1;
    var args = lstack.slice.call(arguments, 1);
    var lexer = Object.create(this.lexer);
    var sharedState = { yy: {} };
    for (var k in this.yy) {
        if (Object.prototype.hasOwnProperty.call(this.yy, k)) {
            sharedState.yy[k] = this.yy[k];
        }
    }
    lexer.setInput(input, sharedState.yy);
    sharedState.yy.lexer = lexer;
    sharedState.yy.parser = this;
    if (typeof lexer.yylloc == 'undefined') {
        lexer.yylloc = {};
    }
    var yyloc = lexer.yylloc;
    lstack.push(yyloc);
    var ranges = lexer.options && lexer.options.ranges;
    if (typeof sharedState.yy.parseError === 'function') {
        this.parseError = sharedState.yy.parseError;
    } else {
        this.parseError = Object.getPrototypeOf(this).parseError;
    }
    function popStack(n) {
        stack.length = stack.length - 2 * n;
        vstack.length = vstack.length - n;
        lstack.length = lstack.length - n;
    }
    _token_stack:
        var lex = function () {
            var token;
            token = lexer.lex() || EOF;
            if (typeof token !== 'number') {
                token = self.symbols_[token] || token;
            }
            return token;
        };
    var symbol, preErrorSymbol, state, action, a, r, yyval = {}, p, len, newState, expected;
    while (true) {
        state = stack[stack.length - 1];
        if (this.defaultActions[state]) {
            action = this.defaultActions[state];
        } else {
            if (symbol === null || typeof symbol == 'undefined') {
                symbol = lex();
            }
            action = table[state] && table[state][symbol];
        }
                    if (typeof action === 'undefined' || !action.length || !action[0]) {
                var errStr = '';
                expected = [];
                for (p in table[state]) {
                    if (this.terminals_[p] && p > TERROR) {
                        expected.push('\'' + this.terminals_[p] + '\'');
                    }
                }
                if (lexer.showPosition) {
                    errStr = 'Parse error on line ' + (yylineno + 1) + ':\n' + lexer.showPosition() + '\nExpecting ' + expected.join(', ') + ', got \'' + (this.terminals_[symbol] || symbol) + '\'';
                } else {
                    errStr = 'Parse error on line ' + (yylineno + 1) + ': Unexpected ' + (symbol == EOF ? 'end of input' : '\'' + (this.terminals_[symbol] || symbol) + '\'');
                }
                this.parseError(errStr, {
                    text: lexer.match,
                    token: this.terminals_[symbol] || symbol,
                    line: lexer.yylineno,
                    loc: yyloc,
                    expected: expected
                });
            }
        if (action[0] instanceof Array && action.length > 1) {
            throw new Error('Parse Error: multiple actions possible at state: ' + state + ', token: ' + symbol);
        }
        switch (action[0]) {
        case 1:
            stack.push(symbol);
            vstack.push(lexer.yytext);
            lstack.push(lexer.yylloc);
            stack.push(action[1]);
            symbol = null;
            if (!preErrorSymbol) {
                yyleng = lexer.yyleng;
                yytext = lexer.yytext;
                yylineno = lexer.yylineno;
                yyloc = lexer.yylloc;
                if (recovering > 0) {
                    recovering--;
                }
            } else {
                symbol = preErrorSymbol;
                preErrorSymbol = null;
            }
            break;
        case 2:
            len = this.productions_[action[1]][1];
            yyval.$ = vstack[vstack.length - len];
            yyval._$ = {
                first_line: lstack[lstack.length - (len || 1)].first_line,
                last_line: lstack[lstack.length - 1].last_line,
                first_column: lstack[lstack.length - (len || 1)].first_column,
                last_column: lstack[lstack.length - 1].last_column
            };
            if (ranges) {
                yyval._$.range = [
                    lstack[lstack.length - (len || 1)].range[0],
                    lstack[lstack.length - 1].range[1]
                ];
            }
            r = this.performAction.apply(yyval, [
                yytext,
                yyleng,
                yylineno,
                sharedState.yy,
                action[1],
                vstack,
                lstack
            ].concat(args));
            if (typeof r !== 'undefined') {
                return r;
            }
            if (len) {
                stack = stack.slice(0, -1 * len * 2);
                vstack = vstack.slice(0, -1 * len);
                lstack = lstack.slice(0, -1 * len);
            }
            stack.push(this.productions_[action[1]][0]);
            vstack.push(yyval.$);
            lstack.push(yyval._$);
            newState = table[stack[stack.length - 2]][stack[stack.length - 1]];
            stack.push(newState);
            break;
        case 3:
            return true;
        }
    }
    return true;
}};


const Tipo = require('../build/controllers/simbol/tipo')
const Nativo = require('../build/controllers/expr/Nativo')
const Aritmeticas = require('../build/controllers/expr/Aritmeticas')
const Relacionales = require('../build/controllers/expr/Relacionales')
const Logicos = require('../build/controllers/expr/Logicos')

const Print = require('../build/controllers/instruc/print')
const Declaracion = require('../build/controllers/instruc/declaracion')
const AccesoVar = require('../build/controllers/expr/accesoVar')
const AsignacionVar = require('../build/controllers/instruc/asignacionVar')

var cadena  = '';
var errores = [];

/* generated by jison-lex 0.3.4 */
var lexer = (function(){
var lexer = ({

EOF:1,

parseError:function parseError(str, hash) {
        if (this.yy.parser) {
            this.yy.parser.parseError(str, hash);
        } else {
            throw new Error(str);
        }
    },

// resets the lexer, sets new input
setInput:function (input, yy) {
        this.yy = yy || this.yy || {};
        this._input = input;
        this._more = this._backtrack = this.done = false;
        this.yylineno = this.yyleng = 0;
        this.yytext = this.matched = this.match = '';
        this.conditionStack = ['INITIAL'];
        this.yylloc = {
            first_line: 1,
            first_column: 0,
            last_line: 1,
            last_column: 0
        };
        if (this.options.ranges) {
            this.yylloc.range = [0,0];
        }
        this.offset = 0;
        return this;
    },

// consumes and returns one char from the input
input:function () {
        var ch = this._input[0];
        this.yytext += ch;
        this.yyleng++;
        this.offset++;
        this.match += ch;
        this.matched += ch;
        var lines = ch.match(/(?:\r\n?|\n).*/g);
        if (lines) {
            this.yylineno++;
            this.yylloc.last_line++;
        } else {
            this.yylloc.last_column++;
        }
        if (this.options.ranges) {
            this.yylloc.range[1]++;
        }

        this._input = this._input.slice(1);
        return ch;
    },

// unshifts one char (or a string) into the input
unput:function (ch) {
        var len = ch.length;
        var lines = ch.split(/(?:\r\n?|\n)/g);

        this._input = ch + this._input;
        this.yytext = this.yytext.substr(0, this.yytext.length - len);
        //this.yyleng -= len;
        this.offset -= len;
        var oldLines = this.match.split(/(?:\r\n?|\n)/g);
        this.match = this.match.substr(0, this.match.length - 1);
        this.matched = this.matched.substr(0, this.matched.length - 1);

        if (lines.length - 1) {
            this.yylineno -= lines.length - 1;
        }
        var r = this.yylloc.range;

        this.yylloc = {
            first_line: this.yylloc.first_line,
            last_line: this.yylineno + 1,
            first_column: this.yylloc.first_column,
            last_column: lines ?
                (lines.length === oldLines.length ? this.yylloc.first_column : 0)
                 + oldLines[oldLines.length - lines.length].length - lines[0].length :
              this.yylloc.first_column - len
        };

        if (this.options.ranges) {
            this.yylloc.range = [r[0], r[0] + this.yyleng - len];
        }
        this.yyleng = this.yytext.length;
        return this;
    },

// When called from action, caches matched text and appends it on next action
more:function () {
        this._more = true;
        return this;
    },

// When called from action, signals the lexer that this rule fails to match the input, so the next matching rule (regex) should be tested instead.
reject:function () {
        if (this.options.backtrack_lexer) {
            this._backtrack = true;
        } else {
            return this.parseError('Lexical error on line ' + (this.yylineno + 1) + '. You can only invoke reject() in the lexer when the lexer is of the backtracking persuasion (options.backtrack_lexer = true).\n' + this.showPosition(), {
                text: "",
                token: null,
                line: this.yylineno
            });

        }
        return this;
    },

// retain first n characters of the match
less:function (n) {
        this.unput(this.match.slice(n));
    },

// displays already matched input, i.e. for error messages
pastInput:function () {
        var past = this.matched.substr(0, this.matched.length - this.match.length);
        return (past.length > 20 ? '...':'') + past.substr(-20).replace(/\n/g, "");
    },

// displays upcoming input, i.e. for error messages
upcomingInput:function () {
        var next = this.match;
        if (next.length < 20) {
            next += this._input.substr(0, 20-next.length);
        }
        return (next.substr(0,20) + (next.length > 20 ? '...' : '')).replace(/\n/g, "");
    },

// displays the character position where the lexing error occurred, i.e. for error messages
showPosition:function () {
        var pre = this.pastInput();
        var c = new Array(pre.length + 1).join("-");
        return pre + this.upcomingInput() + "\n" + c + "^";
    },

// test the lexed token: return FALSE when not a match, otherwise return token
test_match:function(match, indexed_rule) {
        var token,
            lines,
            backup;

        if (this.options.backtrack_lexer) {
            // save context
            backup = {
                yylineno: this.yylineno,
                yylloc: {
                    first_line: this.yylloc.first_line,
                    last_line: this.last_line,
                    first_column: this.yylloc.first_column,
                    last_column: this.yylloc.last_column
                },
                yytext: this.yytext,
                match: this.match,
                matches: this.matches,
                matched: this.matched,
                yyleng: this.yyleng,
                offset: this.offset,
                _more: this._more,
                _input: this._input,
                yy: this.yy,
                conditionStack: this.conditionStack.slice(0),
                done: this.done
            };
            if (this.options.ranges) {
                backup.yylloc.range = this.yylloc.range.slice(0);
            }
        }

        lines = match[0].match(/(?:\r\n?|\n).*/g);
        if (lines) {
            this.yylineno += lines.length;
        }
        this.yylloc = {
            first_line: this.yylloc.last_line,
            last_line: this.yylineno + 1,
            first_column: this.yylloc.last_column,
            last_column: lines ?
                         lines[lines.length - 1].length - lines[lines.length - 1].match(/\r?\n?/)[0].length :
                         this.yylloc.last_column + match[0].length
        };
        this.yytext += match[0];
        this.match += match[0];
        this.matches = match;
        this.yyleng = this.yytext.length;
        if (this.options.ranges) {
            this.yylloc.range = [this.offset, this.offset += this.yyleng];
        }
        this._more = false;
        this._backtrack = false;
        this._input = this._input.slice(match[0].length);
        this.matched += match[0];
        token = this.performAction.call(this, this.yy, this, indexed_rule, this.conditionStack[this.conditionStack.length - 1]);
        if (this.done && this._input) {
            this.done = false;
        }
        if (token) {
            return token;
        } else if (this._backtrack) {
            // recover context
            for (var k in backup) {
                this[k] = backup[k];
            }
            return false; // rule action called reject() implying the next rule should be tested instead.
        }
        return false;
    },

// return next match in input
next:function () {
        if (this.done) {
            return this.EOF;
        }
        if (!this._input) {
            this.done = true;
        }

        var token,
            match,
            tempMatch,
            index;
        if (!this._more) {
            this.yytext = '';
            this.match = '';
        }
        var rules = this._currentRules();
        for (var i = 0; i < rules.length; i++) {
            tempMatch = this._input.match(this.rules[rules[i]]);
            if (tempMatch && (!match || tempMatch[0].length > match[0].length)) {
                match = tempMatch;
                index = i;
                if (this.options.backtrack_lexer) {
                    token = this.test_match(tempMatch, rules[i]);
                    if (token !== false) {
                        return token;
                    } else if (this._backtrack) {
                        match = false;
                        continue; // rule action called reject() implying a rule MISmatch.
                    } else {
                        // else: this is a lexer rule which consumes input without producing a token (e.g. whitespace)
                        return false;
                    }
                } else if (!this.options.flex) {
                    break;
                }
            }
        }
        if (match) {
            token = this.test_match(match, rules[index]);
            if (token !== false) {
                return token;
            }
            // else: this is a lexer rule which consumes input without producing a token (e.g. whitespace)
            return false;
        }
        if (this._input === "") {
            return this.EOF;
        } else {
            return this.parseError('Lexical error on line ' + (this.yylineno + 1) + '. Unrecognized text.\n' + this.showPosition(), {
                text: "",
                token: null,
                line: this.yylineno
            });
        }
    },

// return next match that has a token
lex:function lex () {
        var r = this.next();
        if (r) {
            return r;
        } else {
            return this.lex();
        }
    },

// activates a new lexer condition state (pushes the new lexer condition state onto the condition stack)
begin:function begin (condition) {
        this.conditionStack.push(condition);
    },

// pop the previously active lexer condition state off the condition stack
popState:function popState () {
        var n = this.conditionStack.length - 1;
        if (n > 0) {
            return this.conditionStack.pop();
        } else {
            return this.conditionStack[0];
        }
    },

// produce the lexer rule set which is active for the currently active lexer condition state
_currentRules:function _currentRules () {
        if (this.conditionStack.length && this.conditionStack[this.conditionStack.length - 1]) {
            return this.conditions[this.conditionStack[this.conditionStack.length - 1]].rules;
        } else {
            return this.conditions["INITIAL"].rules;
        }
    },

// return the currently active lexer condition state; when an index argument is provided it produces the N-th previous condition state, if available
topState:function topState (n) {
        n = this.conditionStack.length - 1 - Math.abs(n || 0);
        if (n >= 0) {
            return this.conditionStack[n];
        } else {
            return "INITIAL";
        }
    },

// alias for begin(condition)
pushState:function pushState (condition) {
        this.begin(condition);
    },

// return the number of states currently on the stack
stateStackSize:function stateStackSize() {
        return this.conditionStack.length;
    },
options: {"case-insensitive":true},
performAction: function anonymous(yy,yy_,$avoiding_name_collisions,YY_START) {
var YYSTATE=YY_START;
switch($avoiding_name_collisions) {
case 0:// Ignorar espacios en blanco
break;
case 1:
break;
case 2:
break;
case 3:return 38;
break;
case 4:return 39;
break;
case 5:return 42;
break;
case 6:return 40;
break;
case 7:return 41;
break;
case 8:return 'R_IF';
break;
case 9:return 'R_ELSE';
break;
case 10:return 'R_SWITCH';
break;
case 11:return 'R_CASE';
break;
case 12:return 'R_DEFAULT';
break;
case 13:return 'R_BREAK';
break;
case 14:return 'R_FOR';
break;
case 15:return 'R_WHILE';
break;
case 16:return 'R_DO';
break;
case 17:return 'R_CONTINUE';
break;
case 18:return 'R_RETURN';
break;
case 19:return 'R_VOID';
break;
case 20:return 'R_INC';
break;
case 21:return 'R_DEC';
break;
case 22:return 11;
break;
case 23:return 'R_DOBLEMENOR'
break;
case 24:return 'R_TOLOWER';
break;
case 25:return 'R_TOUPPER';
break;
case 26:return 'R_LENGTH';
break;
case 27:return 'R_C_STR';
break;
case 28:return 'R_STD';
break;
case 29:return 'R_TOSTRING';
break;
case 30:return 'R_EXECUTE';
break;
case 31:return 'R_TYPEOF';
break;
case 32:return 'R_ROUND';
break;
case 33:return 'R_ENDL';
break;
case 34:return 36;
break;
case 35:return 37;
break;
case 36:return 24;
break;
case 37:return 23;
break;
case 38:return 29;
break;
case 39:return 17;
break;
case 40:return 28;
break;
case 41:return 27;
break;
case 42:return 25;
break;
case 43:return 26;
break;
case 44:return 30;
break;
case 45:return 31;
break;
case 46:return 18;
break;
case 47:return 19;
break;
case 48:return 20;
break;
case 49:return 21;
break;
case 50:return 22;
break;
case 51:return 'R_POW';
break;
case 52:return 'R_COMA';
break;
case 53:return 8;
break;
case 54:return 12;
break;
case 55:return 14;
break;
case 56:return 'R_LLAVEIZQ';
break;
case 57:return 'R_LLAVEDER';
break;
case 58:return 'R_CORCHETEIZQ';
break;
case 59:return 'R_CORCHETEDER';
break;
case 60:return 'R_TERNARIO';
break;
case 61:return 'R_DOSPUNTOS';
break;
case 62:return 16;
break;
case 63:return 35;
break;
case 64:return 33;
break;
case 65:return 32;
break;
case 66: cadena = ''; this.begin("string"); 
break;
case 67: cadena += yy_.yytext; 
break;
case 68: cadena += "\""; 
break;
case 69: cadena += "\n"; 
break;
case 70: cadena += " ";  
break;
case 71: cadena += "\t"; 
break;
case 72: cadena += "\\"; 
break;
case 73: cadena += "\'"; 
break;
case 74: cadena += "\r"; 
break;
case 75: yy_.yytext = cadena; this.popState(); return 34; 
break;
case 76:return 5;
break;
case 77: errores.push({ tipo: "Lexico", error: yy_.yytext, linea: yy_.yylloc.first_line, columna: yy_.yylloc.first_column+1 }); return 'ERROR_LEX'; 
break;
}
},
rules: [/^(?:\s+)/i,/^(?:\/\/.*)/i,/^(?:[/][*][^*]*[*]+([^/*][^*]*[*]+)*[/])/i,/^(?:int\b)/i,/^(?:double\b)/i,/^(?:char\b)/i,/^(?:string\b)/i,/^(?:bool\b)/i,/^(?:if\b)/i,/^(?:else\b)/i,/^(?:switch\b)/i,/^(?:case\b)/i,/^(?:default\b)/i,/^(?:break\b)/i,/^(?:for\b)/i,/^(?:while\b)/i,/^(?:do\b)/i,/^(?:continue\b)/i,/^(?:return\b)/i,/^(?:void\b)/i,/^(?:\+\+)/i,/^(?:--)/i,/^(?:cout\b)/i,/^(?:<<)/i,/^(?:tolower\b)/i,/^(?:toupper\b)/i,/^(?:length\b)/i,/^(?:c_str\b)/i,/^(?:std\b)/i,/^(?:toString\b)/i,/^(?:execute\b)/i,/^(?:typeOf\b)/i,/^(?:round\b)/i,/^(?:endl\b)/i,/^(?:true\b)/i,/^(?:false\b)/i,/^(?:!=)/i,/^(?:==)/i,/^(?:!)/i,/^(?:=)/i,/^(?:<=)/i,/^(?:>=)/i,/^(?:>)/i,/^(?:<)/i,/^(?:&&)/i,/^(?:\|\|)/i,/^(?:\+)/i,/^(?:-)/i,/^(?:\*)/i,/^(?:\/)/i,/^(?:%)/i,/^(?:pow\b)/i,/^(?:,)/i,/^(?:;)/i,/^(?:\()/i,/^(?:\))/i,/^(?:\{)/i,/^(?:\})/i,/^(?:\[)/i,/^(?:\])/i,/^(?:\?)/i,/^(?::)/i,/^(?:([a-zA-Z])([a-zA-Z0-9_])*)/i,/^(?:[']\\\\[']|[']\\"[']|[']\\'[']|[']\\n[']|[']\\t[']|[']\\r[']|['].?['])/i,/^(?:[0-9]+\.[0-9]+)/i,/^(?:[0-9]+)/i,/^(?:["])/i,/^(?:[^"\\]+)/i,/^(?:\\")/i,/^(?:\\n)/i,/^(?:\s)/i,/^(?:\\t)/i,/^(?:\\\\)/i,/^(?:\\\\')/i,/^(?:\\r)/i,/^(?:["])/i,/^(?:$)/i,/^(?:.)/i],
conditions: {"string":{"rules":[67,68,69,70,71,72,73,74,75],"inclusive":false},"INITIAL":{"rules":[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63,64,65,66,76,77],"inclusive":true}}
});
return lexer;
})();
parser.lexer = lexer;
function Parser () {
  this.yy = {};
}
Parser.prototype = parser;parser.Parser = Parser;
return new Parser;
})();


if (typeof require !== 'undefined' && typeof exports !== 'undefined') {
exports.parser = gramatica;
exports.Parser = gramatica.Parser;
exports.parse = function () { return gramatica.parse.apply(gramatica, arguments); };
exports.main = function commonjsMain (args) {
    if (!args[1]) {
        console.log('Usage: '+args[0]+' FILE');
        process.exit(1);
    }
    var source = require('fs').readFileSync(require('path').normalize(args[1]), "utf8");
    return exports.parser.parse(source);
};
if (typeof module !== 'undefined' && require.main === module) {
  exports.main(process.argv.slice(1));
}
}