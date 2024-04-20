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
            //console.log("entro al if")
            this.identificador.forEach(id => {
                valorFinal = parseFloat(valorFinal);
                if (!tabla.setVariable(new Simbolo_1.default(this.tipoDato, id, valorFinal))) {
                    arbol.Print("\nError Semántico. Variable ya existente. Linea: " + this.linea + " Columna: " + this.columna);
                    return new errores_1.default("Semántico", "No se puede declarar variable que ya existe", this.linea, this.columna);
                }
            });
        }
        else {
            if (this.valor.tipoDato.getTipo() != this.tipoDato.getTipo()) {
                arbol.Print("\nError Semántico. Tipo de dato incorrecto. Linea: " + this.linea + " Columna: " + this.columna);
                return new errores_1.default("Semántico", "No se puede declarar variable", this.linea, this.columna);
            }
            for (let elemento of this.identificador) {
                if (!tabla.setVariable(new Simbolo_1.default(this.tipoDato, elemento, valorFinal))) {
                    arbol.Print("\nError Semántico. Variable ya existente. Linea: " + this.linea + " Columna: " + this.columna);
                    return new errores_1.default("Semántico", "variable ya existe!", this.linea, this.columna);
                }
            }
        }
    }
    obtenerAST(anterior) {
        let result = "";
        return result;
    }
}
exports.default = Declaracion;
