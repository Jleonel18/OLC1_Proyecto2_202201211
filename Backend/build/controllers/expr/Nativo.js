"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const instruccion_1 = require("../abstracto/instruccion");
const contadorSingleton_1 = __importDefault(require("../simbol/contadorSingleton"));
class Nativo extends instruccion_1.Instruccion {
    constructor(tipo, valor, fila, columna) {
        super(tipo, fila, columna);
        this.valor = valor;
    }
    interpretar(arbol, tabla) {
        return this.valor;
    }
    obtenerAST(anterior) {
        let contador = contadorSingleton_1.default.getInstance();
        let nodoN = `n${contador.getContador()}`;
        let nodoV = `n${contador.getContador()}`;
        let result = `${nodoN}[label="Dato Nativo"];\n`;
        result += `${nodoV}[label="${this.valor}"];\n`;
        result += `${nodoN}->${nodoV};\n`;
        result += `${anterior}->${nodoN};\n`;
        return result;
    }
}
exports.default = Nativo;
