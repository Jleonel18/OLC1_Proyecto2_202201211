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
            default:
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
                    default:
                        return new errores_1.default("Semantico", "Division Invalida", this.linea, this.columna);
                }
            case tipo_1.tipoDato.DECIMAL:
                switch (tipo2) {
                    case tipo_1.tipoDato.ENTERO:
                        this.tipoDato = new tipo_1.default(tipo_1.tipoDato.DECIMAL);
                        return parseFloat(op1) / parseFloat(op2);
                    case tipo_1.tipoDato.DECIMAL:
                        this.tipoDato = new tipo_1.default(tipo_1.tipoDato.DECIMAL);
                        return parseFloat(op1) / parseFloat(op2);
                    default:
                        return new errores_1.default("Semantico", "Division Invalida", this.linea, this.columna);
                }
            default:
                return new errores_1.default("Semantico", "Division Invalida", this.linea, this.columna);
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
                        return new errores_1.default("Semantico", "Modulo Invalido", this.linea, this.columna);
                    default:
                        return new errores_1.default("Semantico", "Modulo Invalido", this.linea, this.columna);
                }
            case tipo_1.tipoDato.DECIMAL:
                return new errores_1.default("Semantico", "Modulo Invalido", this.linea, this.columna);
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
})(Operadores || (exports.Operadores = Operadores = {}));
