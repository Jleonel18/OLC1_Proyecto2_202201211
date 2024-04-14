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
const instruccion_1 = require("../abstracto/instruccion");
const errores_1 = __importDefault(require("../excep/errores"));
const tipo_1 = __importStar(require("../simbol/tipo"));
class Casteo extends instruccion_1.Instruccion {
    constructor(operador, fila, columna, operando) {
        super(new tipo_1.default(tipo_1.tipoDato.VOID), fila, columna);
        this.tipoD = operador;
        this.operandoUnico = operando;
    }
    interpretar(arbol, tabla) {
        var _a, _b, _c, _d;
        switch (this.tipoD.getTipo()) {
            case tipo_1.tipoDato.ENTERO:
                return this.castearEntero((_a = this.operandoUnico) === null || _a === void 0 ? void 0 : _a.interpretar(arbol, tabla));
            case tipo_1.tipoDato.DECIMAL:
                return this.castearDouble((_b = this.operandoUnico) === null || _b === void 0 ? void 0 : _b.interpretar(arbol, tabla));
            case tipo_1.tipoDato.CARACTER:
                return this.castearCaracter((_c = this.operandoUnico) === null || _c === void 0 ? void 0 : _c.interpretar(arbol, tabla));
            case tipo_1.tipoDato.CADENA:
                return this.castearCadena((_d = this.operandoUnico) === null || _d === void 0 ? void 0 : _d.interpretar(arbol, tabla));
        }
    }
    castearEntero(operando) {
        var _a;
        let tipo = (_a = this.operandoUnico) === null || _a === void 0 ? void 0 : _a.tipoDato.getTipo();
        switch (tipo) {
            case tipo_1.tipoDato.DECIMAL:
                this.tipoD = new tipo_1.default(tipo_1.tipoDato.ENTERO);
                return parseInt(operando);
            case tipo_1.tipoDato.CARACTER:
                this.tipoD = new tipo_1.default(tipo_1.tipoDato.ENTERO);
                return parseInt(operando.charCodeAt(0));
            default:
                return new errores_1.default("Error Semantico", "No se puede castear el valor", this.linea, this.columna);
        }
    }
    castearDouble(operando) {
        var _a;
        let tipo = (_a = this.operandoUnico) === null || _a === void 0 ? void 0 : _a.tipoDato.getTipo();
        switch (tipo) {
            case tipo_1.tipoDato.ENTERO:
                this.tipoD = new tipo_1.default(tipo_1.tipoDato.DECIMAL);
                return parseFloat(operando);
            case tipo_1.tipoDato.CARACTER:
                this.tipoD = new tipo_1.default(tipo_1.tipoDato.DECIMAL);
                return parseFloat(operando.charCodeAt(0));
            default:
                return new errores_1.default("Error Semantico", "No se puede castear el valor", this.linea, this.columna);
        }
    }
    castearCaracter(operando) {
        var _a;
        let tipo = (_a = this.operandoUnico) === null || _a === void 0 ? void 0 : _a.tipoDato.getTipo();
        switch (tipo) {
            case tipo_1.tipoDato.ENTERO:
                this.tipoD = new tipo_1.default(tipo_1.tipoDato.CARACTER);
                return String.fromCharCode(operando);
            case tipo_1.tipoDato.DECIMAL:
                this.tipoD = new tipo_1.default(tipo_1.tipoDato.CARACTER);
                return String.fromCharCode(operando);
            default:
                return new errores_1.default("Error Semantico", "No se puede castear el valor", this.linea, this.columna);
        }
    }
    castearCadena(operando) {
        var _a;
        let tipo = (_a = this.operandoUnico) === null || _a === void 0 ? void 0 : _a.tipoDato.getTipo();
        switch (tipo) {
            case tipo_1.tipoDato.ENTERO:
                this.tipoD = new tipo_1.default(tipo_1.tipoDato.CADENA);
                return operando.toString();
            case tipo_1.tipoDato.DECIMAL:
                this.tipoD = new tipo_1.default(tipo_1.tipoDato.CADENA);
                return operando.toString();
            case tipo_1.tipoDato.CARACTER:
                this.tipoD = new tipo_1.default(tipo_1.tipoDato.CADENA);
                return operando.toString();
            default:
                return new errores_1.default("Error Semantico", "No se puede castear el valor", this.linea, this.columna);
        }
    }
}
exports.default = Casteo;
