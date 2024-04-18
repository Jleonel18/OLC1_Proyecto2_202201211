"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const instruccion_1 = require("../abstracto/instruccion");
const errores_1 = __importDefault(require("../excep/errores"));
const Simbolo_1 = __importDefault(require("../simbol/Simbolo"));
const tipo_1 = require("../simbol/tipo");
class DeclaracionArreglo extends instruccion_1.Instruccion {
    constructor(primerTipo, identificador, dimenValores, linea, columna, segundoTipo) {
        super(primerTipo, linea, columna);
        this.primerTipo = primerTipo;
        this.segundoTipo = segundoTipo;
        this.identificador = identificador;
        this.dimenValores = dimenValores;
    }
    interpretar(arbol, tabla) {
        var _a;
        if (Array.isArray(this.dimenValores)) {
            let arregloPivote = [];
            for (let i = 0; i < this.dimenValores.length; i++) {
                let valor = this.dimenValores[i].interpretar(arbol, tabla);
                if (valor instanceof errores_1.default)
                    return valor;
                if (this.primerTipo.getTipo() != this.dimenValores[i].tipoDato.getTipo()) {
                    arbol.Print("\nError Semántico: El tipo de dato no es igual al tipo de dato del arreglo. Linea: " + this.linea + " Columna: " + (this.columna + 1));
                    return new errores_1.default('Semantico', `El tipo de dato no es igual al tipo de dato del arreglo`, this.linea, this.columna);
                }
                arregloPivote[i] = valor;
            }
            if (!tabla.setVariable(new Simbolo_1.default(this.tipoDato, this.identificador, arregloPivote))) {
                arbol.Print("\nError Semántico: No se puede declarar variable porque ya existia. Linea: " + this.linea + " Columna: " + (this.columna + 1));
                return new errores_1.default("Semántico", "No se puede declarar variable porque ya existia", this.linea, this.columna);
            }
        }
        else if (!Array.isArray(this.dimenValores)) {
            if (this.primerTipo.getTipo() != ((_a = this.segundoTipo) === null || _a === void 0 ? void 0 : _a.getTipo())) {
                arbol.Print("\nError Semántico: El tipo de dato no es igual al tipo de dato del arreglo. Linea: " + this.linea + " Columna: " + (this.columna + 1));
                return new errores_1.default('Semantico', `El tipo de dato no es igual al tipo de dato del arreglo`, this.linea, this.columna);
            }
            let size = this.dimenValores.interpretar(arbol, tabla);
            if (this.dimenValores.tipoDato.getTipo() != tipo_1.tipoDato.ENTERO) {
                arbol.Print("\nError Semántico: El tamaño del arreglo debe ser un número entero. Linea: " + this.linea + " Columna: " + (this.columna + 1));
                return new errores_1.default("Semántico", "El tamaño del arreglo debe ser un número entero.", this.linea, this.columna);
            }
            let arregloPivote = [];
            for (let i = 0; i < size; i++) {
                arregloPivote[i] = [];
            }
            if (!tabla.setVariable(new Simbolo_1.default(this.tipoDato, this.identificador, arregloPivote))) {
                arbol.Print("\nError Semántico: No se puede declarar variable porque ya existia. Linea: " + this.linea + " Columna: " + (this.columna + 1));
                return new errores_1.default("Semántico", "No se puede declarar variable porque ya existia", this.linea, this.columna);
            }
        }
        else {
            arbol.Print("\nError Semántico: No se puede declarar el arreglo. Linea: " + this.linea + " Columna: " + (this.columna + 1));
            return new errores_1.default("Semántico", "No se puede declarar el arreglo", this.linea, this.columna);
        }
    }
}
exports.default = DeclaracionArreglo;
