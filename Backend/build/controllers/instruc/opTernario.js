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
class OpTernario extends instruccion_1.Instruccion {
    constructor(condicion, expresion1, expresion2, linea, columna) {
        super(new tipo_1.default(tipo_1.tipoDato.VOID), linea, columna);
        this.condicion = condicion;
        this.expresion1 = expresion1;
        this.expresion2 = expresion2;
    }
    interpretar(arbol, tabla) {
        let cond = this.condicion.interpretar(arbol, tabla);
        if (cond instanceof errores_1.default)
            return cond;
        let exp1 = this.expresion1.interpretar(arbol, tabla);
        if (exp1 instanceof errores_1.default)
            return exp1;
        let exp2 = this.expresion2.interpretar(arbol, tabla);
        if (exp2 instanceof errores_1.default)
            return exp2;
        if (this.condicion.tipoDato.getTipo() != tipo_1.tipoDato.BOOL) {
            arbol.Print("\nError Semantico: La condicion no es booleana. linea:" + this.linea + " columna: " + (this.columna + 1));
            return new errores_1.default("Semantico", "La condicion no es booleana", this.linea, this.columna);
        }
        if (cond) {
            this.tipoDato = this.expresion1.tipoDato;
            return exp1;
        }
        else {
            this.tipoDato = this.expresion2.tipoDato;
            return exp2;
        }
    }
    obtenerAST(anterior) {
        return "";
    }
}
exports.default = OpTernario;
