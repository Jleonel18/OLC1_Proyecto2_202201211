"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const instruccion_1 = require("../abstracto/instruccion");
const errores_1 = __importDefault(require("../excep/errores"));
const Simbolo_1 = __importDefault(require("../simbol/Simbolo"));
const tipo_1 = require("../simbol/tipo");
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
        if (this.valor.tipoDato.getTipo() == tipo_1.tipoDato.ENTERO && this.tipoDato.getTipo() == tipo_1.tipoDato.DECIMAL) {
            this.identificador.forEach(id => {
                valorFinal = parseFloat(valorFinal);
                if (!tabla.setVariable(new Simbolo_1.default(this.tipoDato, id, valorFinal))) {
                    return new errores_1.default("Semantico", "No se puede declarar variable que ya existe", this.linea, this.columna);
                }
            });
        }
        else {
            if (this.valor.tipoDato.getTipo() != this.tipoDato.getTipo()) {
                return new errores_1.default("SEMANTICO", "No se puede declarar variable", this.linea, this.columna);
            }
            this.identificador.forEach(elemento => {
                if (!tabla.setVariable(new Simbolo_1.default(this.tipoDato, elemento, valorFinal))) {
                    return new errores_1.default("SEMANTICO", "variable ya existe!", this.linea, this.columna);
                }
            });
        }
    }
}
exports.default = Declaracion;
