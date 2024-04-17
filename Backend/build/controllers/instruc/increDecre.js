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
class IncreDecre extends instruccion_1.Instruccion {
    constructor(id, linea, columna, instruc) {
        super(new tipo_1.default(tipo_1.tipoDato.VOID), linea, columna);
        this.id = id;
        this.instruc = instruc;
    }
    interpretar(arbol, tabla) {
        //console.log("paso por aquiii")
        let valor = tabla.getVariable(this.id.toLocaleLowerCase());
        if (valor == null) {
            arbol.Print("\nError Semantico: Variable no existente. linea:" + this.linea + " columna: " + (this.columna + 1));
            return new errores_1.default("SEMANTICO", "Variable no existente", this.linea, this.columna);
        }
        //console.log("el valor es:",valor.getTipo().getTipo());
        if (valor.getTipo().getTipo() != tipo_1.tipoDato.ENTERO && valor.getTipo().getTipo() != tipo_1.tipoDato.DECIMAL) {
            arbol.Print("\nError Semantico: No se puede incrementar o decrementar una variable que no sea de tipo numero. linea:" + this.linea + " columna: " + (this.columna + 1));
            return new errores_1.default("SEMANTICO", "No se puede incrementar o decrementar una variable que no sea de tipo numero", this.linea, this.columna);
        }
        if (this.instruc == true && valor.getTipo().getTipo() != tipo_1.tipoDato.ENTERO) {
            valor.setValor(parseInt(valor.getValor()) + 1);
        }
        else if (valor.getTipo().getTipo() != tipo_1.tipoDato.ENTERO && this.instruc == false) {
            valor.setValor(parseInt(valor.getValor()) - 1);
        }
        else if (valor.getTipo().getTipo() != tipo_1.tipoDato.DECIMAL && this.instruc == true) {
            valor.setValor(parseFloat(valor.getValor()) + 1);
        }
        else if (valor.getTipo().getTipo() != tipo_1.tipoDato.DECIMAL && this.instruc == false) {
            valor.setValor(parseFloat(valor.getValor()) - 1);
        }
    }
}
exports.default = IncreDecre;
