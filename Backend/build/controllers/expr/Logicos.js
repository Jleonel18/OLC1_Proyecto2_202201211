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
class Logicos extends instruccion_1.Instruccion {
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
            case Operadores.AND:
                return this.and(opIzq, opDer);
            case Operadores.OR:
                return this.or(opIzq, opDer);
            case Operadores.NOT:
                return this.not(Unico);
            default:
                return new errores_1.default("Semantico", "Operador Logico Invalido", this.linea, this.columna);
        }
    }
    and(op1, op2) {
        var _a, _b;
        let tipo1 = (_a = this.operando1) === null || _a === void 0 ? void 0 : _a.tipoDato.getTipo();
        let tipo2 = (_b = this.operando2) === null || _b === void 0 ? void 0 : _b.tipoDato.getTipo();
        switch (tipo1) {
            case tipo_1.tipoDato.BOOL:
                switch (tipo2) {
                    case tipo_1.tipoDato.BOOL:
                        this.tipoDato = new tipo_1.default(tipo_1.tipoDato.BOOL);
                        return op1 && op2;
                    default:
                        return new errores_1.default("Semantico", "Tipo de dato no es booleano", this.linea, this.columna);
                }
            default:
                return new errores_1.default("Semantico", "Tipo de dato no es booleano", this.linea, this.columna);
        }
    }
    or(op1, op2) {
        var _a, _b;
        let tipo1 = (_a = this.operando1) === null || _a === void 0 ? void 0 : _a.tipoDato.getTipo();
        let tipo2 = (_b = this.operando2) === null || _b === void 0 ? void 0 : _b.tipoDato.getTipo();
        switch (tipo1) {
            case tipo_1.tipoDato.BOOL:
                switch (tipo2) {
                    case tipo_1.tipoDato.BOOL:
                        this.tipoDato = new tipo_1.default(tipo_1.tipoDato.BOOL);
                        return op1 || op2;
                    default:
                        return new errores_1.default("Semantico", "Tipo de dato no es booleano", this.linea, this.columna);
                }
            default:
                return new errores_1.default("Semantico", "Tipo de dato no es booleano", this.linea, this.columna);
        }
    }
    not(op1) {
        var _a;
        let tipo1 = (_a = this.operandoUnico) === null || _a === void 0 ? void 0 : _a.tipoDato.getTipo();
        switch (tipo1) {
            case tipo_1.tipoDato.BOOL:
                this.tipoDato = new tipo_1.default(tipo_1.tipoDato.BOOL);
                return !op1;
            default:
                return new errores_1.default("Semantico", "Tipo de dato no es booleano", this.linea, this.columna);
        }
    }
}
exports.default = Logicos;
var Operadores;
(function (Operadores) {
    Operadores[Operadores["AND"] = 0] = "AND";
    Operadores[Operadores["OR"] = 1] = "OR";
    Operadores[Operadores["NOT"] = 2] = "NOT";
})(Operadores || (exports.Operadores = Operadores = {}));
