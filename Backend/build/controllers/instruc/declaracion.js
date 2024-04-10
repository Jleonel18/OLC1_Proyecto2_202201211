"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const instruccion_1 = require("../abstracto/instruccion");
const errores_1 = __importDefault(require("../excep/errores"));
const Simbolo_1 = __importDefault(require("../simbol/Simbolo"));
class Declaracion extends instruccion_1.Instruccion {
    constructor(tipo, linea, columna, id, valor) {
        super(tipo, linea, columna);
        this.identificador = id;
        this.valor = valor;
    }
    interpretar(arbol, tabla) {
        let valorFinal = this.valor.interpretar(arbol, tabla);
        if (valorFinal instanceof errores_1.default)
            return valorFinal;
        if (this.valor.tipoDato.getTipo() != this.tipoDato.getTipo()) {
            return new errores_1.default("Error semántico", "No es posible declarar variable", this.linea, this.columna);
        }
        if (!tabla.setVariable(new Simbolo_1.default(this.tipoDato, this.identificador, valorFinal))) {
            return new errores_1.default("Error semántico", "Variable ya declarada", this.linea, this.columna);
        }
    }
}
exports.default = Declaracion;
