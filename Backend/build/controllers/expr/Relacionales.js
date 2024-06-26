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
class Relacionales extends instruccion_1.Instruccion {
    constructor(operador, fila, columna, op1, op2) {
        super(new tipo_1.default(tipo_1.tipoDato.BOOL), fila, columna);
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
            case Operadores.IGUAL:
                return this.igual(opIzq, opDer);
            case Operadores.DIFERENTE:
                return this.diferente(opIzq, opDer);
            case Operadores.MAYOR:
                return this.mayor(opIzq, opDer);
            case Operadores.MENOR:
                return this.menor(opIzq, opDer);
            case Operadores.MAYORIGUAL:
                return this.mayorIgual(opIzq, opDer);
            case Operadores.MENORIGUAL:
                return this.menorIgual(opIzq, opDer);
        }
    }
    igual(op1, op2) {
        var _a, _b;
        let tipo1 = (_a = this.operando1) === null || _a === void 0 ? void 0 : _a.tipoDato.getTipo();
        let tipo2 = (_b = this.operando2) === null || _b === void 0 ? void 0 : _b.tipoDato.getTipo();
        switch (tipo1) {
            case tipo_1.tipoDato.ENTERO:
                switch (tipo2) {
                    case tipo_1.tipoDato.ENTERO:
                        this.tipoDato = new tipo_1.default(tipo_1.tipoDato.BOOL);
                        return op1 == op2;
                    case tipo_1.tipoDato.DECIMAL:
                        this.tipoDato = new tipo_1.default(tipo_1.tipoDato.BOOL);
                        return op1 == op2;
                    case tipo_1.tipoDato.BOOL:
                        if (op2 == true) {
                            return parseInt(op1) == 1;
                        }
                        else {
                            return parseInt(op1) == 0;
                        }
                    case tipo_1.tipoDato.CARACTER:
                        this.tipoDato = new tipo_1.default(tipo_1.tipoDato.BOOL);
                        return parseInt(op1) == op2.charCodeAt(1);
                    default:
                        return new errores_1.default("Semantico", "No se puede comparar un ENTERO con un " + tipo2, this.linea, this.columna);
                }
            case tipo_1.tipoDato.DECIMAL:
                switch (tipo2) {
                    case tipo_1.tipoDato.ENTERO:
                        this.tipoDato = new tipo_1.default(tipo_1.tipoDato.BOOL);
                        return op1 == op2;
                    case tipo_1.tipoDato.DECIMAL:
                        this.tipoDato = new tipo_1.default(tipo_1.tipoDato.BOOL);
                        return op1 == op2;
                    case tipo_1.tipoDato.BOOL:
                        if (op2 == true) {
                            return parseFloat(op1) == 1;
                        }
                        else {
                            return parseFloat(op1) == 0;
                        }
                    case tipo_1.tipoDato.CARACTER:
                        this.tipoDato = new tipo_1.default(tipo_1.tipoDato.BOOL);
                        return parseFloat(op1) == op2.charCodeAt(1);
                    default:
                        return new errores_1.default("Semantico", "No se puede comparar un DECIMAL con un " + tipo2, this.linea, this.columna);
                }
            case tipo_1.tipoDato.CADENA:
                switch (tipo2) {
                    case tipo_1.tipoDato.CADENA:
                        this.tipoDato = new tipo_1.default(tipo_1.tipoDato.BOOL);
                        return op1 == op2;
                    default:
                        return new errores_1.default("Semantico", "No se puede comparar una CADENA con un " + tipo2, this.linea, this.columna);
                }
            case tipo_1.tipoDato.BOOL:
                switch (tipo2) {
                    case tipo_1.tipoDato.BOOL:
                        this.tipoDato = new tipo_1.default(tipo_1.tipoDato.BOOL);
                        return op1 == op2;
                    case tipo_1.tipoDato.ENTERO:
                        if (op1 == true) {
                            return 1 == op2;
                        }
                        else {
                            return 0 == op2;
                        }
                    default:
                        return new errores_1.default("Semantico", "No se puede comparar un BOOL con un " + tipo2, this.linea, this.columna);
                }
            case tipo_1.tipoDato.CARACTER:
                switch (tipo2) {
                    case tipo_1.tipoDato.CARACTER:
                        this.tipoDato = new tipo_1.default(tipo_1.tipoDato.BOOL);
                        return op1 == op2;
                    case tipo_1.tipoDato.CADENA:
                        this.tipoDato = new tipo_1.default(tipo_1.tipoDato.BOOL);
                        return op1 == op2;
                    case tipo_1.tipoDato.ENTERO:
                        this.tipoDato = new tipo_1.default(tipo_1.tipoDato.BOOL);
                        return op1.charCodeAt(1) == parseInt(op2);
                    case tipo_1.tipoDato.DECIMAL:
                        this.tipoDato = new tipo_1.default(tipo_1.tipoDato.BOOL);
                        return op1.charCodeAt(1) == parseFloat(op2);
                    default:
                        return new errores_1.default("Semantico", "No se puede comparar un CARACTER con un " + tipo2, this.linea, this.columna);
                }
        }
    }
    diferente(op1, op2) {
        var _a, _b;
        let tipo1 = (_a = this.operando1) === null || _a === void 0 ? void 0 : _a.tipoDato.getTipo();
        let tipo2 = (_b = this.operando2) === null || _b === void 0 ? void 0 : _b.tipoDato.getTipo();
        switch (tipo1) {
            case tipo_1.tipoDato.ENTERO:
                switch (tipo2) {
                    case tipo_1.tipoDato.ENTERO:
                        this.tipoDato = new tipo_1.default(tipo_1.tipoDato.BOOL);
                        return op1 != op2;
                    case tipo_1.tipoDato.DECIMAL:
                        this.tipoDato = new tipo_1.default(tipo_1.tipoDato.BOOL);
                        return op1 != op2;
                    case tipo_1.tipoDato.BOOL:
                        if (op2 == true) {
                            return parseInt(op1) != 1;
                        }
                        else {
                            return parseInt(op1) != 0;
                        }
                    case tipo_1.tipoDato.CARACTER:
                        this.tipoDato = new tipo_1.default(tipo_1.tipoDato.BOOL);
                        return parseInt(op1) != op2.charCodeAt(1);
                    default:
                        return new errores_1.default("Semantico", "No se puede comparar un DECIMAL con un " + tipo2, this.linea, this.columna);
                }
            case tipo_1.tipoDato.DECIMAL:
                switch (tipo2) {
                    case tipo_1.tipoDato.ENTERO:
                        this.tipoDato = new tipo_1.default(tipo_1.tipoDato.BOOL);
                        return op1 != op2;
                    case tipo_1.tipoDato.DECIMAL:
                        this.tipoDato = new tipo_1.default(tipo_1.tipoDato.BOOL);
                        return op1 != op2;
                    case tipo_1.tipoDato.BOOL:
                        if (op2 == true) {
                            return parseFloat(op1) != 1;
                        }
                        else {
                            return parseFloat(op1) != 0;
                        }
                    case tipo_1.tipoDato.CARACTER:
                        this.tipoDato = new tipo_1.default(tipo_1.tipoDato.BOOL);
                        return parseFloat(op1) != op2.charCodeAt(1);
                    default:
                        return new errores_1.default("Semantico", "No se puede comparar un ENTERO con un " + tipo2, this.linea, this.columna);
                }
            case tipo_1.tipoDato.CADENA:
                switch (tipo2) {
                    case tipo_1.tipoDato.CADENA:
                        this.tipoDato = new tipo_1.default(tipo_1.tipoDato.BOOL);
                        return op1 != op2;
                    default:
                        return new errores_1.default("Semantico", "No se puede comparar una CADENA con un " + tipo2, this.linea, this.columna);
                }
            case tipo_1.tipoDato.BOOL:
                switch (tipo2) {
                    case tipo_1.tipoDato.BOOL:
                        this.tipoDato = new tipo_1.default(tipo_1.tipoDato.BOOL);
                        return op1 != op2;
                    case tipo_1.tipoDato.ENTERO:
                        if (op1 == true) {
                            return 1 != parseInt(op2);
                        }
                        else {
                            return 0 != parseInt(op2);
                        }
                    case tipo_1.tipoDato.DECIMAL:
                        if (op1 == true) {
                            return 1 != parseFloat(op2);
                        }
                        else {
                            return 0 != parseFloat(op2);
                        }
                    default:
                        return new errores_1.default("Semantico", "No se puede comparar un BOOL con un " + tipo2, this.linea, this.columna);
                }
            case tipo_1.tipoDato.CARACTER:
                switch (tipo2) {
                    case tipo_1.tipoDato.CARACTER:
                        this.tipoDato = new tipo_1.default(tipo_1.tipoDato.BOOL);
                        return op1 != op2;
                    case tipo_1.tipoDato.CADENA:
                        this.tipoDato = new tipo_1.default(tipo_1.tipoDato.BOOL);
                        return op1 != op2;
                    case tipo_1.tipoDato.ENTERO:
                        this.tipoDato = new tipo_1.default(tipo_1.tipoDato.BOOL);
                        return op1.charCodeAt(1) != parseInt(op2);
                    case tipo_1.tipoDato.DECIMAL:
                        this.tipoDato = new tipo_1.default(tipo_1.tipoDato.BOOL);
                        return op1.charCodeAt(1) != parseFloat(op2);
                    default:
                        return new errores_1.default("Semantico", "No se puede comparar un CARACTER con un " + tipo2, this.linea, this.columna);
                }
        }
    }
    mayor(op1, op2) {
        var _a, _b;
        let tipo1 = (_a = this.operando1) === null || _a === void 0 ? void 0 : _a.tipoDato.getTipo();
        let tipo2 = (_b = this.operando2) === null || _b === void 0 ? void 0 : _b.tipoDato.getTipo();
        switch (tipo1) {
            case tipo_1.tipoDato.ENTERO:
                switch (tipo2) {
                    case tipo_1.tipoDato.ENTERO:
                        this.tipoDato = new tipo_1.default(tipo_1.tipoDato.BOOL);
                        return parseInt(op1) > parseInt(op2);
                    case tipo_1.tipoDato.DECIMAL:
                        this.tipoDato = new tipo_1.default(tipo_1.tipoDato.BOOL);
                        return parseInt(op1) > parseFloat(op2);
                    case tipo_1.tipoDato.BOOL:
                        if (op2 == true) {
                            return parseInt(op1) > 1;
                        }
                        else {
                            return parseInt(op1) > 0;
                        }
                    case tipo_1.tipoDato.CARACTER:
                        this.tipoDato = new tipo_1.default(tipo_1.tipoDato.BOOL);
                        return parseInt(op1) > op2.charCodeAt(1);
                    default:
                        return new errores_1.default("Semantico", "No se puede comparar un ENTERO con un " + tipo2, this.linea, this.columna);
                }
            case tipo_1.tipoDato.DECIMAL:
                switch (tipo2) {
                    case tipo_1.tipoDato.ENTERO:
                        this.tipoDato = new tipo_1.default(tipo_1.tipoDato.BOOL);
                        return parseFloat(op1) > parseInt(op2);
                    case tipo_1.tipoDato.DECIMAL:
                        this.tipoDato = new tipo_1.default(tipo_1.tipoDato.BOOL);
                        return parseFloat(op1) > parseFloat(op2);
                    case tipo_1.tipoDato.BOOL:
                        if (op2 == true) {
                            return parseFloat(op1) > 1;
                        }
                        else {
                            return parseFloat(op1) > 0;
                        }
                    case tipo_1.tipoDato.CARACTER:
                        this.tipoDato = new tipo_1.default(tipo_1.tipoDato.BOOL);
                        return parseFloat(op1) > op2.charCodeAt(1);
                    default:
                        return new errores_1.default("Semantico", "No se puede comparar un DECIMAL con un " + tipo2, this.linea, this.columna);
                }
            default:
                return new errores_1.default("Semantico", "Comparación inválida " + tipo2, this.linea, this.columna);
        }
    }
    menor(op1, op2) {
        var _a, _b;
        let tipo1 = (_a = this.operando1) === null || _a === void 0 ? void 0 : _a.tipoDato.getTipo();
        let tipo2 = (_b = this.operando2) === null || _b === void 0 ? void 0 : _b.tipoDato.getTipo();
        switch (tipo1) {
            case tipo_1.tipoDato.ENTERO:
                switch (tipo2) {
                    case tipo_1.tipoDato.ENTERO:
                        this.tipoDato = new tipo_1.default(tipo_1.tipoDato.BOOL);
                        return parseInt(op1) < parseInt(op2);
                    case tipo_1.tipoDato.DECIMAL:
                        this.tipoDato = new tipo_1.default(tipo_1.tipoDato.BOOL);
                        return parseInt(op1) < parseFloat(op2);
                    case tipo_1.tipoDato.BOOL:
                        if (op2 == true) {
                            return parseInt(op1) < 1;
                        }
                        else {
                            return parseInt(op1) < 0;
                        }
                    case tipo_1.tipoDato.CARACTER:
                        this.tipoDato = new tipo_1.default(tipo_1.tipoDato.BOOL);
                        return parseInt(op1) < op2.charCodeAt(1);
                    default:
                        return new errores_1.default("Semantico", "No se puede comparar un ENTERO con un " + tipo2, this.linea, this.columna);
                }
            case tipo_1.tipoDato.DECIMAL:
                switch (tipo2) {
                    case tipo_1.tipoDato.ENTERO:
                        this.tipoDato = new tipo_1.default(tipo_1.tipoDato.BOOL);
                        return parseFloat(op1) < parseInt(op2);
                    case tipo_1.tipoDato.DECIMAL:
                        this.tipoDato = new tipo_1.default(tipo_1.tipoDato.BOOL);
                        return parseFloat(op1) < parseFloat(op2);
                    case tipo_1.tipoDato.BOOL:
                        if (op2 == true) {
                            return parseFloat(op1) < 1;
                        }
                        else {
                            return parseFloat(op1) < 0;
                        }
                    case tipo_1.tipoDato.CARACTER:
                        this.tipoDato = new tipo_1.default(tipo_1.tipoDato.BOOL);
                        return parseFloat(op1) < op2.charCodeAt(1);
                    default:
                        return new errores_1.default("Semantico", "No se puede comparar un DECIMAL con un " + tipo2, this.linea, this.columna);
                }
            default:
                return new errores_1.default("Semantico", "Comparación inválida " + tipo2, this.linea, this.columna);
        }
    }
    menorIgual(op1, op2) {
        var _a, _b;
        let tipo1 = (_a = this.operando1) === null || _a === void 0 ? void 0 : _a.tipoDato.getTipo();
        let tipo2 = (_b = this.operando2) === null || _b === void 0 ? void 0 : _b.tipoDato.getTipo();
        switch (tipo1) {
            case tipo_1.tipoDato.ENTERO:
                switch (tipo2) {
                    case tipo_1.tipoDato.ENTERO:
                        this.tipoDato = new tipo_1.default(tipo_1.tipoDato.BOOL);
                        return parseInt(op1) <= parseInt(op2);
                    case tipo_1.tipoDato.DECIMAL:
                        this.tipoDato = new tipo_1.default(tipo_1.tipoDato.BOOL);
                        return parseInt(op1) <= parseFloat(op2);
                    case tipo_1.tipoDato.BOOL:
                        if (op2 == true) {
                            return parseInt(op1) <= 1;
                        }
                        else {
                            return parseInt(op1) <= 0;
                        }
                    case tipo_1.tipoDato.CARACTER:
                        this.tipoDato = new tipo_1.default(tipo_1.tipoDato.BOOL);
                        return parseInt(op1) <= op2.charCodeAt(1);
                    default:
                        return new errores_1.default("Semantico", "No se puede comparar un DECIMAL con un " + tipo2, this.linea, this.columna);
                }
            case tipo_1.tipoDato.DECIMAL:
                switch (tipo2) {
                    case tipo_1.tipoDato.ENTERO:
                        this.tipoDato = new tipo_1.default(tipo_1.tipoDato.BOOL);
                        return parseFloat(op1) <= parseInt(op2);
                    case tipo_1.tipoDato.DECIMAL:
                        this.tipoDato = new tipo_1.default(tipo_1.tipoDato.BOOL);
                        return parseFloat(op1) <= parseFloat(op2);
                    case tipo_1.tipoDato.BOOL:
                        if (op2 == true) {
                            return parseFloat(op1) <= 1;
                        }
                        else {
                            return parseFloat(op1) <= 0;
                        }
                    case tipo_1.tipoDato.CARACTER:
                        this.tipoDato = new tipo_1.default(tipo_1.tipoDato.BOOL);
                        return parseFloat(op1) <= op2.charCodeAt(1);
                    default:
                        return new errores_1.default("Semantico", "No se puede comparar un DECIMAL con un " + tipo2, this.linea, this.columna);
                }
            default:
                return new errores_1.default("Semantico", "Comparación inválida " + tipo2, this.linea, this.columna);
        }
    }
    mayorIgual(op1, op2) {
        var _a, _b;
        let tipo1 = (_a = this.operando1) === null || _a === void 0 ? void 0 : _a.tipoDato.getTipo();
        let tipo2 = (_b = this.operando2) === null || _b === void 0 ? void 0 : _b.tipoDato.getTipo();
        switch (tipo1) {
            case tipo_1.tipoDato.ENTERO:
                switch (tipo2) {
                    case tipo_1.tipoDato.ENTERO:
                        this.tipoDato = new tipo_1.default(tipo_1.tipoDato.BOOL);
                        return parseInt(op1) >= parseInt(op2);
                    case tipo_1.tipoDato.DECIMAL:
                        this.tipoDato = new tipo_1.default(tipo_1.tipoDato.BOOL);
                        return parseInt(op1) >= parseFloat(op2);
                    case tipo_1.tipoDato.BOOL:
                        if (op2 == true) {
                            return parseInt(op1) >= 1;
                        }
                        else {
                            return parseInt(op1) >= 0;
                        }
                    case tipo_1.tipoDato.CARACTER:
                        this.tipoDato = new tipo_1.default(tipo_1.tipoDato.BOOL);
                        return parseInt(op1) >= op2.charCodeAt(1);
                    default:
                        return new errores_1.default("Semantico", "No se puede comparar un ENTERO con un " + tipo2, this.linea, this.columna);
                }
            case tipo_1.tipoDato.DECIMAL:
                switch (tipo2) {
                    case tipo_1.tipoDato.ENTERO:
                        this.tipoDato = new tipo_1.default(tipo_1.tipoDato.BOOL);
                        return parseFloat(op1) >= parseInt(op2);
                    case tipo_1.tipoDato.DECIMAL:
                        this.tipoDato = new tipo_1.default(tipo_1.tipoDato.BOOL);
                        return parseFloat(op1) >= parseFloat(op2);
                    case tipo_1.tipoDato.BOOL:
                        if (op2 == true) {
                            return parseFloat(op1) >= 1;
                        }
                        else {
                            return parseFloat(op1) >= 0;
                        }
                    case tipo_1.tipoDato.CARACTER:
                        this.tipoDato = new tipo_1.default(tipo_1.tipoDato.BOOL);
                        return parseFloat(op1) >= op2.charCodeAt(1);
                    default:
                        return new errores_1.default("Semantico", "No se puede comparar un DECIMAL con un " + tipo2, this.linea, this.columna);
                }
            default:
                return new errores_1.default("Semantico", "Comparación inválida " + tipo2, this.linea, this.columna);
        }
    }
    obtenerAST(anterior) {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m;
        let contador = contadorSingleton_1.default.getInstance();
        let result = "";
        if (this.operacion == Operadores.IGUAL) {
            let exp1 = `n${contador.getContador()}`;
            let exp2 = `n${contador.getContador()}`;
            let operando = `n${contador.getContador()}`;
            result += `${exp1}[label = "Expresion"];\n`;
            result += `${operando}[label = "=="];\n`;
            result += `${exp2}[label = "Expresion"];\n`;
            result += `${anterior} -> ${exp1};\n`;
            result += `${anterior} -> ${operando};\n`;
            result += `${anterior} -> ${exp2};\n`;
            result += (_a = this.operando1) === null || _a === void 0 ? void 0 : _a.obtenerAST(exp1);
            result += (_b = this.operando2) === null || _b === void 0 ? void 0 : _b.obtenerAST(exp2);
        }
        else if (this.operacion == Operadores.DIFERENTE) {
            let exp1 = `n${contador.getContador()}`;
            let exp2 = `n${contador.getContador()}`;
            let operando = `n${contador.getContador()}`;
            result += `${exp1}[label = "Expresion"];\n`;
            result += `${operando}[label = "!="];\n`;
            result += `${exp2}[label = "Expresion"];\n`;
            result += `${anterior} -> ${exp1};\n`;
            result += `${anterior} -> ${operando};\n`;
            result += `${anterior} -> ${exp2};\n`;
            result += (_c = this.operando1) === null || _c === void 0 ? void 0 : _c.obtenerAST(exp1);
            result += (_d = this.operando2) === null || _d === void 0 ? void 0 : _d.obtenerAST(exp2);
        }
        else if (this.operacion == Operadores.MAYOR) {
            let exp1 = `n${contador.getContador()}`;
            let exp2 = `n${contador.getContador()}`;
            let operando = `n${contador.getContador()}`;
            result += `${exp1}[label = "Expresion"];\n`;
            result += `${operando}[label = ">"];\n`;
            result += `${exp2}[label = "Expresion"];\n`;
            result += `${anterior} -> ${exp1};\n`;
            result += `${anterior} -> ${operando};\n`;
            result += `${anterior} -> ${exp2};\n`;
            result += (_e = this.operando1) === null || _e === void 0 ? void 0 : _e.obtenerAST(exp1);
            result += (_f = this.operando2) === null || _f === void 0 ? void 0 : _f.obtenerAST(exp2);
        }
        else if (this.operacion == Operadores.MENOR) {
            let exp1 = `n${contador.getContador()}`;
            let exp2 = `n${contador.getContador()}`;
            let operando = `n${contador.getContador()}`;
            result += `${exp1}[label = "Expresion"];\n`;
            result += `${operando}[label = "<"];\n`;
            result += `${exp2}[label = "Expresion"];\n`;
            result += `${anterior} -> ${exp1};\n`;
            result += `${anterior} -> ${operando};\n`;
            result += `${anterior} -> ${exp2};\n`;
            result += (_g = this.operando1) === null || _g === void 0 ? void 0 : _g.obtenerAST(exp1);
            result += (_h = this.operando2) === null || _h === void 0 ? void 0 : _h.obtenerAST(exp2);
        }
        else if (this.operacion == Operadores.MAYORIGUAL) {
            let exp1 = `n${contador.getContador()}`;
            let exp2 = `n${contador.getContador()}`;
            let operando = `n${contador.getContador()}`;
            result += `${exp1}[label = "Expresion"];\n`;
            result += `${operando}[label = ">="];\n`;
            result += `${exp2}[label = "Expresion"];\n`;
            result += `${anterior} -> ${exp1};\n`;
            result += `${anterior} -> ${operando};\n`;
            result += `${anterior} -> ${exp2};\n`;
            result += (_j = this.operando1) === null || _j === void 0 ? void 0 : _j.obtenerAST(exp1);
            result += (_k = this.operando2) === null || _k === void 0 ? void 0 : _k.obtenerAST(exp2);
        }
        else if (this.operacion == Operadores.MENORIGUAL) {
            let exp1 = `n${contador.getContador()}`;
            let exp2 = `n${contador.getContador()}`;
            let operando = `n${contador.getContador()}`;
            result += `${exp1}[label = "Expresion"];\n`;
            result += `${operando}[label = "<="];\n`;
            result += `${exp2}[label = "Expresion"];\n`;
            result += `${anterior} -> ${exp1};\n`;
            result += `${anterior} -> ${operando};\n`;
            result += `${anterior} -> ${exp2};\n`;
            result += (_l = this.operando1) === null || _l === void 0 ? void 0 : _l.obtenerAST(exp1);
            result += (_m = this.operando2) === null || _m === void 0 ? void 0 : _m.obtenerAST(exp2);
        }
        return result;
    }
}
exports.default = Relacionales;
var Operadores;
(function (Operadores) {
    Operadores[Operadores["IGUAL"] = 0] = "IGUAL";
    Operadores[Operadores["DIFERENTE"] = 1] = "DIFERENTE";
    Operadores[Operadores["MENOR"] = 2] = "MENOR";
    Operadores[Operadores["MAYOR"] = 3] = "MAYOR";
    Operadores[Operadores["MENORIGUAL"] = 4] = "MENORIGUAL";
    Operadores[Operadores["MAYORIGUAL"] = 5] = "MAYORIGUAL";
})(Operadores || (exports.Operadores = Operadores = {}));
