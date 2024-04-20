"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Operadores = void 0;
const instruccion_1 = require("../abstracto/instruccion");
const errores_1 = __importDefault(require("../excep/errores"));
const contadorSingleton_1 = __importDefault(require("../simbol/contadorSingleton"));
const tipo_1 = __importStar(require("../simbol/tipo"));
class Aritmeticas extends instruccion_1.Instruccion {
    constructor(operador, fila, columna, op1, op2) {
        super(new tipo_1.default(tipo_1.tipoDato.ENTERO), fila, columna);
        this.operacion = operador;
        if (!op2)
            this.operandoUnico = op1;
        else {
            this.operando1 = op1;
            this.operando2 = op2;
        }
    }
    interpretar(arbol, tabla) {
        var _a, _b;
        let opIzq, opDer, Unico = null;
        if (this.operandoUnico != null) {
            Unico = this.operandoUnico.interpretar(arbol, tabla);
            if (Unico instanceof errores_1.default)
                return Unico;
        }
        else {
            opIzq = (_a = this.operando1) === null || _a === void 0 ? void 0 : _a.interpretar(arbol, tabla);
            if (opIzq instanceof errores_1.default)
                return opIzq;
            opDer = (_b = this.operando2) === null || _b === void 0 ? void 0 : _b.interpretar(arbol, tabla);
            if (opDer instanceof errores_1.default)
                return opDer;
        }
        switch (this.operacion) {
            case Operadores.SUMA:
                return this.suma(opIzq, opDer);
            case Operadores.RESTA:
                return this.resta(opIzq, opDer);
            case Operadores.MULTIPLICACION:
                return this.multiplicacion(opIzq, opDer);
            case Operadores.NEG:
                return this.negacion(Unico);
            case Operadores.DIVISION:
                return this.division(opIzq, opDer);
            case Operadores.MODULO:
                return this.modulo(opIzq, opDer);
            case Operadores.POTENCIA:
                return this.potencia(opIzq, opDer);
            default:
                arbol.Print("\n Operador Aritmetico Invalido:" + this.linea + " y columna " + (this.columna + 1));
                return new errores_1.default("Semantico", "Operador Aritmetico Invalido", this.linea, this.columna);
        }
    }
    suma(op1, op2) {
        var _a, _b;
        let tipo1 = (_a = this.operando1) === null || _a === void 0 ? void 0 : _a.tipoDato.getTipo();
        let tipo2 = (_b = this.operando2) === null || _b === void 0 ? void 0 : _b.tipoDato.getTipo();
        switch (tipo1) {
            case tipo_1.tipoDato.ENTERO:
                switch (tipo2) {
                    case tipo_1.tipoDato.ENTERO:
                        this.tipoDato = new tipo_1.default(tipo_1.tipoDato.ENTERO);
                        return parseInt(op1) + parseInt(op2);
                    case tipo_1.tipoDato.DECIMAL:
                        this.tipoDato = new tipo_1.default(tipo_1.tipoDato.DECIMAL);
                        return parseFloat(op1) + parseFloat(op2);
                    case tipo_1.tipoDato.CADENA:
                        this.tipoDato = new tipo_1.default(tipo_1.tipoDato.CADENA);
                        return parseInt(op1) + op2;
                    case tipo_1.tipoDato.BOOL:
                        this.tipoDato = new tipo_1.default(tipo_1.tipoDato.ENTERO);
                        if (op2 == true) {
                            return parseInt(op1) + 1;
                        }
                        else {
                            return parseInt(op1) + 0;
                        }
                    case tipo_1.tipoDato.CARACTER:
                        this.tipoDato = new tipo_1.default(tipo_1.tipoDato.ENTERO);
                        return parseInt(op1) + parseInt(op2.charCodeAt(1));
                    default:
                        return new errores_1.default("Semantico", "Suma Invalida", this.linea, this.columna);
                }
            case tipo_1.tipoDato.DECIMAL:
                switch (tipo2) {
                    case tipo_1.tipoDato.ENTERO:
                        this.tipoDato = new tipo_1.default(tipo_1.tipoDato.DECIMAL);
                        return parseFloat(op1) + parseFloat(op2);
                    case tipo_1.tipoDato.DECIMAL:
                        this.tipoDato = new tipo_1.default(tipo_1.tipoDato.DECIMAL);
                        return parseFloat(op1) + parseFloat(op2);
                    case tipo_1.tipoDato.CADENA:
                        this.tipoDato = new tipo_1.default(tipo_1.tipoDato.CADENA);
                        return parseFloat(op1) + op2;
                    case tipo_1.tipoDato.BOOL:
                        this.tipoDato = new tipo_1.default(tipo_1.tipoDato.DECIMAL);
                        if (op2 == true) {
                            return parseFloat(op1) + 1;
                        }
                        else {
                            return parseFloat(op1) + 0;
                        }
                    case tipo_1.tipoDato.CARACTER:
                        this.tipoDato = new tipo_1.default(tipo_1.tipoDato.DECIMAL);
                        return parseFloat(op1) + parseFloat(op2.charCodeAt(1));
                    default:
                        return new errores_1.default("Semantico", "Suma Invalida", this.linea, this.columna);
                }
            case tipo_1.tipoDato.BOOL:
                switch (tipo2) {
                    case tipo_1.tipoDato.ENTERO:
                        this.tipoDato = new tipo_1.default(tipo_1.tipoDato.ENTERO);
                        if (op1 == true) {
                            return 1 + parseInt(op2);
                        }
                        else {
                            return 0 + parseInt(op2);
                        }
                    case tipo_1.tipoDato.DECIMAL:
                        this.tipoDato = new tipo_1.default(tipo_1.tipoDato.DECIMAL);
                        if (op1 == true) {
                            return 1 + parseFloat(op2);
                        }
                        else {
                            return 0 + parseFloat(op2);
                        }
                    case tipo_1.tipoDato.CADENA:
                        this.tipoDato = new tipo_1.default(tipo_1.tipoDato.CADENA);
                        if (op1 == true) {
                            return 'true' + op2;
                        }
                        else {
                            return 'false' + op2;
                        }
                    default:
                        return new errores_1.default("Semantico", "Suma Invalida", this.linea, this.columna);
                }
            case tipo_1.tipoDato.CARACTER:
                switch (tipo2) {
                    case tipo_1.tipoDato.ENTERO:
                        this.tipoDato = new tipo_1.default(tipo_1.tipoDato.ENTERO);
                        return parseInt(op1.charCodeAt(1)) + parseInt(op2);
                    case tipo_1.tipoDato.DECIMAL:
                        this.tipoDato = new tipo_1.default(tipo_1.tipoDato.DECIMAL);
                        return parseInt(op1.charCodeAt(1)) + parseFloat(op2);
                    case tipo_1.tipoDato.CADENA:
                        this.tipoDato = new tipo_1.default(tipo_1.tipoDato.CADENA);
                        return op1 + op2;
                    case tipo_1.tipoDato.CARACTER:
                        this.tipoDato = new tipo_1.default(tipo_1.tipoDato.CADENA);
                        return op1 + op2;
                    default:
                        return new errores_1.default("Semantico", "Suma Invalida", this.linea, this.columna);
                }
            case tipo_1.tipoDato.CADENA:
                switch (tipo2) {
                    case tipo_1.tipoDato.ENTERO:
                        this.tipoDato = new tipo_1.default(tipo_1.tipoDato.CADENA);
                        return op1 + parseInt(op2);
                    case tipo_1.tipoDato.DECIMAL:
                        this.tipoDato = new tipo_1.default(tipo_1.tipoDato.CADENA);
                        return op1 + parseFloat(op2);
                    case tipo_1.tipoDato.CADENA:
                        this.tipoDato = new tipo_1.default(tipo_1.tipoDato.CADENA);
                        return op1 + op2;
                    case tipo_1.tipoDato.BOOL:
                        this.tipoDato = new tipo_1.default(tipo_1.tipoDato.CADENA);
                        if (op2 == true) {
                            return op1 + 'true';
                        }
                        else {
                            return op1 + 'false';
                        }
                    case tipo_1.tipoDato.CARACTER:
                        this.tipoDato = new tipo_1.default(tipo_1.tipoDato.CADENA);
                        return op1 + op2;
                    default:
                        return new errores_1.default("Semantico", "Suma Invalida", this.linea, this.columna);
                }
            default:
                return new errores_1.default("Semantico", "Suma Invalida", this.linea, this.columna);
        }
    }
    resta(op1, op2) {
        var _a, _b;
        let tipo1 = (_a = this.operando1) === null || _a === void 0 ? void 0 : _a.tipoDato.getTipo();
        let tipo2 = (_b = this.operando2) === null || _b === void 0 ? void 0 : _b.tipoDato.getTipo();
        switch (tipo1) {
            case tipo_1.tipoDato.ENTERO:
                switch (tipo2) {
                    case tipo_1.tipoDato.ENTERO:
                        this.tipoDato = new tipo_1.default(tipo_1.tipoDato.ENTERO);
                        return parseInt(op1) - parseInt(op2);
                    case tipo_1.tipoDato.DECIMAL:
                        this.tipoDato = new tipo_1.default(tipo_1.tipoDato.DECIMAL);
                        return parseFloat(op1) - parseFloat(op2);
                    case tipo_1.tipoDato.CARACTER:
                        this.tipoDato = new tipo_1.default(tipo_1.tipoDato.ENTERO);
                        return parseInt(op1) - parseInt(op2.charCodeAt(1));
                    case tipo_1.tipoDato.BOOL:
                        this.tipoDato = new tipo_1.default(tipo_1.tipoDato.ENTERO);
                        if (op2 == 'true') {
                            return parseInt(op1) - 1;
                        }
                        else {
                            return parseInt(op1) - 0;
                        }
                    default:
                        return new errores_1.default("Semantico", "Resta Invalida", this.linea, this.columna);
                }
            case tipo_1.tipoDato.DECIMAL:
                switch (tipo2) {
                    case tipo_1.tipoDato.ENTERO:
                        this.tipoDato = new tipo_1.default(tipo_1.tipoDato.DECIMAL);
                        return parseFloat(op1) - parseFloat(op2);
                    case tipo_1.tipoDato.DECIMAL:
                        this.tipoDato = new tipo_1.default(tipo_1.tipoDato.DECIMAL);
                        return parseFloat(op1) - parseFloat(op2);
                    case tipo_1.tipoDato.CARACTER:
                        this.tipoDato = new tipo_1.default(tipo_1.tipoDato.DECIMAL);
                        return parseFloat(op1) - parseFloat(op2.charCodeAt());
                    case tipo_1.tipoDato.BOOL:
                        this.tipoDato = new tipo_1.default(tipo_1.tipoDato.DECIMAL);
                        if (op2 == 'true') {
                            return parseFloat(op1) - 1;
                        }
                        else {
                            return parseFloat(op1) - 0;
                        }
                    default:
                        return new errores_1.default("Semantico", "Resta Invalida", this.linea, this.columna);
                }
            case tipo_1.tipoDato.CARACTER:
                switch (tipo2) {
                    case tipo_1.tipoDato.ENTERO:
                        this.tipoDato = new tipo_1.default(tipo_1.tipoDato.ENTERO);
                        return parseInt(op1.charCodeAt(1)) - parseInt(op2);
                    case tipo_1.tipoDato.DECIMAL:
                        this.tipoDato = new tipo_1.default(tipo_1.tipoDato.DECIMAL);
                        return parseInt(op1.charCodeAt(1)) - parseFloat(op2);
                    default:
                        return new errores_1.default("Semantico", "Resta Invalida", this.linea, this.columna);
                }
            case tipo_1.tipoDato.BOOL:
                switch (tipo2) {
                    case tipo_1.tipoDato.ENTERO:
                        this.tipoDato = new tipo_1.default(tipo_1.tipoDato.ENTERO);
                        if (op1 == 'true') {
                            return 1 - parseInt(op2);
                        }
                        else {
                            return 0 - parseInt(op2);
                        }
                    case tipo_1.tipoDato.DECIMAL:
                        this.tipoDato = new tipo_1.default(tipo_1.tipoDato.DECIMAL);
                        if (op1 == 'true') {
                            return 1 - parseFloat(op2);
                        }
                        else {
                            return 0 - parseFloat(op2);
                        }
                    default:
                        return new errores_1.default("Semantico", "Resta Invalida", this.linea, this.columna);
                }
            default:
                return new errores_1.default("Semantico", "Resta Invalida", this.linea, this.columna);
        }
    }
    multiplicacion(op1, op2) {
        var _a, _b;
        let tipo1 = (_a = this.operando1) === null || _a === void 0 ? void 0 : _a.tipoDato.getTipo();
        let tipo2 = (_b = this.operando2) === null || _b === void 0 ? void 0 : _b.tipoDato.getTipo();
        switch (tipo1) {
            case tipo_1.tipoDato.ENTERO:
                switch (tipo2) {
                    case tipo_1.tipoDato.ENTERO:
                        this.tipoDato = new tipo_1.default(tipo_1.tipoDato.ENTERO);
                        return parseInt(op1) * parseInt(op2);
                    case tipo_1.tipoDato.DECIMAL:
                        this.tipoDato = new tipo_1.default(tipo_1.tipoDato.DECIMAL);
                        return parseFloat(op1) * parseFloat(op2);
                    case tipo_1.tipoDato.CARACTER:
                        this.tipoDato = new tipo_1.default(tipo_1.tipoDato.ENTERO);
                        return parseInt(op1) * parseInt(op2.charCodeAt(1));
                    default:
                        return new errores_1.default("Semantico", "Resta Invalida", this.linea, this.columna);
                }
            case tipo_1.tipoDato.DECIMAL:
                switch (tipo2) {
                    case tipo_1.tipoDato.ENTERO:
                        this.tipoDato = new tipo_1.default(tipo_1.tipoDato.DECIMAL);
                        return parseFloat(op1) * parseFloat(op2);
                    case tipo_1.tipoDato.DECIMAL:
                        this.tipoDato = new tipo_1.default(tipo_1.tipoDato.DECIMAL);
                        return parseFloat(op1) * parseFloat(op2);
                    case tipo_1.tipoDato.CARACTER:
                        this.tipoDato = new tipo_1.default(tipo_1.tipoDato.DECIMAL);
                        return parseFloat(op1) * parseFloat(op2.charCodeAt(1));
                    default:
                        return new errores_1.default("Semantico", "Resta Invalida", this.linea, this.columna);
                }
            case tipo_1.tipoDato.CARACTER:
                switch (tipo2) {
                    case tipo_1.tipoDato.ENTERO:
                        this.tipoDato = new tipo_1.default(tipo_1.tipoDato.ENTERO);
                        return parseInt(op1.charCodeAt(1)) * parseInt(op2);
                    case tipo_1.tipoDato.DECIMAL:
                        this.tipoDato = new tipo_1.default(tipo_1.tipoDato.DECIMAL);
                        return parseInt(op1.charCodeAt(1)) * parseFloat(op2);
                    default:
                        return new errores_1.default("Semantico", "Resta Invalida", this.linea, this.columna);
                }
            default:
                return new errores_1.default("Semantico", "Resta Invalida", this.linea, this.columna);
        }
    }
    division(op1, op2) {
        var _a, _b;
        let tipo1 = (_a = this.operando1) === null || _a === void 0 ? void 0 : _a.tipoDato.getTipo();
        let tipo2 = (_b = this.operando2) === null || _b === void 0 ? void 0 : _b.tipoDato.getTipo();
        switch (tipo1) {
            case tipo_1.tipoDato.ENTERO:
                switch (tipo2) {
                    case tipo_1.tipoDato.ENTERO:
                        this.tipoDato = new tipo_1.default(tipo_1.tipoDato.ENTERO);
                        return parseInt(op1) / parseInt(op2);
                    case tipo_1.tipoDato.DECIMAL:
                        this.tipoDato = new tipo_1.default(tipo_1.tipoDato.DECIMAL);
                        return parseFloat(op1) / parseFloat(op2);
                    case tipo_1.tipoDato.CARACTER:
                        this.tipoDato = new tipo_1.default(tipo_1.tipoDato.ENTERO);
                        return parseInt(op1) / parseInt(op2.charCodeAt(1));
                    default:
                        return new errores_1.default("Semantico", "Resta Invalida", this.linea, this.columna);
                }
            case tipo_1.tipoDato.DECIMAL:
                switch (tipo2) {
                    case tipo_1.tipoDato.ENTERO:
                        this.tipoDato = new tipo_1.default(tipo_1.tipoDato.DECIMAL);
                        return parseFloat(op1) / parseFloat(op2);
                    case tipo_1.tipoDato.DECIMAL:
                        this.tipoDato = new tipo_1.default(tipo_1.tipoDato.DECIMAL);
                        return parseFloat(op1) / parseFloat(op2);
                    case tipo_1.tipoDato.CARACTER:
                        this.tipoDato = new tipo_1.default(tipo_1.tipoDato.DECIMAL);
                        return parseFloat(op1) / parseFloat(op2.charCodeAt(1));
                    default:
                        return new errores_1.default("Semantico", "Resta Invalida", this.linea, this.columna);
                }
            case tipo_1.tipoDato.CARACTER:
                switch (tipo2) {
                    case tipo_1.tipoDato.ENTERO:
                        this.tipoDato = new tipo_1.default(tipo_1.tipoDato.ENTERO);
                        return parseInt(op1.charCodeAt(1)) / parseInt(op2);
                    case tipo_1.tipoDato.DECIMAL:
                        this.tipoDato = new tipo_1.default(tipo_1.tipoDato.DECIMAL);
                        return parseInt(op1.charCodeAt(1)) / parseFloat(op2);
                    default:
                        return new errores_1.default("Semantico", "Resta Invalida", this.linea, this.columna);
                }
            default:
                return new errores_1.default("Semantico", "Resta Invalida", this.linea, this.columna);
        }
    }
    modulo(op1, op2) {
        var _a, _b;
        let tipo1 = (_a = this.operando1) === null || _a === void 0 ? void 0 : _a.tipoDato.getTipo();
        let tipo2 = (_b = this.operando2) === null || _b === void 0 ? void 0 : _b.tipoDato.getTipo();
        switch (tipo1) {
            case tipo_1.tipoDato.ENTERO:
                switch (tipo2) {
                    case tipo_1.tipoDato.ENTERO:
                        this.tipoDato = new tipo_1.default(tipo_1.tipoDato.ENTERO);
                        return parseInt(op1) % parseInt(op2);
                    case tipo_1.tipoDato.DECIMAL:
                        this.tipoDato = new tipo_1.default(tipo_1.tipoDato.DECIMAL);
                        return parseFloat(op1) % parseFloat(op2);
                    default:
                        return new errores_1.default("Semantico", "Modulo Invalido", this.linea, this.columna);
                }
            case tipo_1.tipoDato.DECIMAL:
                switch (tipo2) {
                    case tipo_1.tipoDato.ENTERO:
                        this.tipoDato = new tipo_1.default(tipo_1.tipoDato.DECIMAL);
                        return parseFloat(op1) % parseFloat(op2);
                    case tipo_1.tipoDato.DECIMAL:
                        this.tipoDato = new tipo_1.default(tipo_1.tipoDato.DECIMAL);
                        return parseFloat(op1) % parseFloat(op2);
                    default:
                        return new errores_1.default("Semantico", "Modulo Invalido", this.linea, this.columna);
                }
            default:
                return new errores_1.default("Semantico", "Modulo Invalido", this.linea, this.columna);
        }
    }
    negacion(op1) {
        var _a;
        let opU = (_a = this.operandoUnico) === null || _a === void 0 ? void 0 : _a.tipoDato.getTipo();
        switch (opU) {
            case tipo_1.tipoDato.ENTERO:
                this.tipoDato = new tipo_1.default(tipo_1.tipoDato.ENTERO);
                return parseInt(op1) * -1;
            case tipo_1.tipoDato.DECIMAL:
                this.tipoDato = new tipo_1.default(tipo_1.tipoDato.DECIMAL);
                return parseFloat(op1) * -1;
            default:
                return new errores_1.default("Semantico", "Negacion Unaria invalida", this.linea, this.columna);
        }
    }
    potencia(op1, op2) {
        var _a, _b;
        let tipo1 = (_a = this.operando1) === null || _a === void 0 ? void 0 : _a.tipoDato.getTipo();
        let tipo2 = (_b = this.operando2) === null || _b === void 0 ? void 0 : _b.tipoDato.getTipo();
        switch (tipo1) {
            case tipo_1.tipoDato.ENTERO:
                switch (tipo2) {
                    case tipo_1.tipoDato.ENTERO:
                        this.tipoDato = new tipo_1.default(tipo_1.tipoDato.ENTERO);
                        return Math.pow(parseInt(op1), parseInt(op2));
                    case tipo_1.tipoDato.DECIMAL:
                        this.tipoDato = new tipo_1.default(tipo_1.tipoDato.DECIMAL);
                        return Math.pow(parseInt(op1), parseFloat(op2));
                    default:
                        return new errores_1.default("Semantico", "Potencia Invalida", this.linea, this.columna);
                }
            case tipo_1.tipoDato.DECIMAL:
                switch (tipo2) {
                    case tipo_1.tipoDato.ENTERO:
                        this.tipoDato = new tipo_1.default(tipo_1.tipoDato.DECIMAL);
                        return Math.pow(parseFloat(op1), parseInt(op2));
                    case tipo_1.tipoDato.DECIMAL:
                        this.tipoDato = new tipo_1.default(tipo_1.tipoDato.DECIMAL);
                        return Math.pow(parseFloat(op1), parseFloat(op2));
                    default:
                        return new errores_1.default("Semantico", "Potencia Invalida", this.linea, this.columna);
                }
            default:
                return new errores_1.default("Semantico", "Potencia Invalida", this.linea, this.columna);
        }
    }
    obtenerAST(anterior) {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o;
        let contador = contadorSingleton_1.default.getInstance();
        let result = "";
        if (this.operacion == Operadores.NEG) {
            let nodoNeg = `n${contador.getContador()}`;
            let nodoExp = `n${contador.getContador()}`;
            result += `${nodoNeg}[label=\"Negacion Unaria\"];\n`;
            result += `${nodoExp}[label=\"Expresion\"];\n`;
            result += `${anterior}->${nodoNeg};\n`;
            result += `${anterior}-> ${nodoExp};\n`;
            result += (_a = this.operandoUnico) === null || _a === void 0 ? void 0 : _a.obtenerAST(nodoExp);
            //return result;
        }
        else if (this.operacion == Operadores.SUMA) {
            let exp1 = `n${contador.getContador()}`;
            let nodoOp = `n${contador.getContador()}`;
            let exp2 = `n${contador.getContador()}`;
            result += `${exp1}[label= \"Expresion\"];\n`;
            result += `${nodoOp}[label=\"+\"];\n`;
            result += `${exp2}[label=\"Expresion\"];\n`;
            result += `${anterior}->${exp1};\n`;
            result += `${anterior}->${nodoOp};\n`;
            result += `${anterior}->${exp2};\n`;
            result += (_b = this.operando1) === null || _b === void 0 ? void 0 : _b.obtenerAST(exp1);
            result += (_c = this.operando2) === null || _c === void 0 ? void 0 : _c.obtenerAST(exp2);
        }
        else if (this.operacion == Operadores.RESTA) {
            let exp1 = `n${contador.getContador()}`;
            let nodoOp = `n${contador.getContador()}`;
            let exp2 = `n${contador.getContador()}`;
            result += `${exp1}[label= \"Expresion\"];\n`;
            result += `${nodoOp}[label=\"-\"];\n`;
            result += `${exp2}[label=\"Expresion\"];\n`;
            result += `${anterior}->${exp1};\n`;
            result += `${anterior}->${nodoOp};\n`;
            result += `${anterior}->${exp2};\n`;
            result += (_d = this.operando1) === null || _d === void 0 ? void 0 : _d.obtenerAST(exp1);
            result += (_e = this.operando2) === null || _e === void 0 ? void 0 : _e.obtenerAST(exp2);
        }
        else if (this.operacion == Operadores.MULTIPLICACION) {
            let exp1 = `n${contador.getContador()}`;
            let nodoOp = `n${contador.getContador()}`;
            let exp2 = `n${contador.getContador()}`;
            result += `${exp1}[label= \"Expresion\"];\n`;
            result += `${nodoOp}[label=\"*\"];\n`;
            result += `${exp2}[label=\"Expresion\"];\n`;
            result += `${anterior}->${exp1};\n`;
            result += `${anterior}->${nodoOp};\n`;
            result += `${anterior}->${exp2};\n`;
            result += (_f = this.operando1) === null || _f === void 0 ? void 0 : _f.obtenerAST(exp1);
            result += (_g = this.operando2) === null || _g === void 0 ? void 0 : _g.obtenerAST(exp2);
        }
        else if (this.operacion == Operadores.DIVISION) {
            let exp1 = `n${contador.getContador()}`;
            let nodoOp = `n${contador.getContador()}`;
            let exp2 = `n${contador.getContador()}`;
            result += `${exp1}[label= \"Expresion\"];\n`;
            result += `${nodoOp}[label=\"/\"];\n`;
            result += `${exp2}[label=\"Expresion\"];\n`;
            result += `${anterior}->${exp1};\n`;
            result += `${anterior}->${nodoOp};\n`;
            result += `${anterior}->${exp2};\n`;
            result += (_h = this.operando1) === null || _h === void 0 ? void 0 : _h.obtenerAST(exp1);
            result += (_j = this.operando2) === null || _j === void 0 ? void 0 : _j.obtenerAST(exp2);
        }
        else if (this.operacion == Operadores.MODULO) {
            let exp1 = `n${contador.getContador()}`;
            let nodoOp = `n${contador.getContador()}`;
            let exp2 = `n${contador.getContador()}`;
            result += `${exp1}[label= \"Expresion\"];\n`;
            result += `${nodoOp}[label=\"%\"];\n`;
            result += `${exp2}[label=\"Expresion\"];\n`;
            result += `${anterior}->${exp1};\n`;
            result += `${anterior}->${nodoOp};\n`;
            result += `${anterior}->${exp2};\n`;
            result += (_k = this.operando1) === null || _k === void 0 ? void 0 : _k.obtenerAST(exp1);
            result += (_l = this.operando2) === null || _l === void 0 ? void 0 : _l.obtenerAST(exp2);
        }
        else if (this.operacion == Operadores.POTENCIA) {
            let exp1 = `n${contador.getContador()}`;
            let exp2 = `n${contador.getContador()}`;
            let par1 = `n${contador.getContador()}`;
            let par2 = `n${contador.getContador()}`;
            let nodoPow = `n${contador.getContador()}`;
            let nodoComa = `n${contador.getContador()}`;
            result += `${nodoPow}[label="pow"];\n`;
            result += `${par1}[label="("];\n`;
            result += `${exp1}[label="Expresion"];\n`;
            result += `${nodoComa}[label=","];\n`;
            result += `${exp2}[label="Expresion"];\n`;
            result += `${par2}[label=")"];\n`;
            result += `${anterior}->${nodoPow};\n`;
            result += `${anterior}->${par1};\n`;
            result += `${anterior}->${exp1};\n`;
            result += `${anterior}->${nodoComa};\n`;
            result += `${anterior}->${exp2};\n`;
            result += `${anterior}->${par2};\n`;
            result += (_m = this.operando1) === null || _m === void 0 ? void 0 : _m.obtenerAST(exp1);
            result += (_o = this.operando2) === null || _o === void 0 ? void 0 : _o.obtenerAST(exp2);
        }
        return result;
    }
}
exports.default = Aritmeticas;
var Operadores;
(function (Operadores) {
    Operadores[Operadores["SUMA"] = 0] = "SUMA";
    Operadores[Operadores["RESTA"] = 1] = "RESTA";
    Operadores[Operadores["MULTIPLICACION"] = 2] = "MULTIPLICACION";
    Operadores[Operadores["DIVISION"] = 3] = "DIVISION";
    Operadores[Operadores["MODULO"] = 4] = "MODULO";
    Operadores[Operadores["NEG"] = 5] = "NEG";
    Operadores[Operadores["POTENCIA"] = 6] = "POTENCIA";
})(Operadores || (exports.Operadores = Operadores = {}));
