"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const instruccion_1 = require("../abstracto/instruccion");
const errores_1 = __importDefault(require("../excep/errores"));
class Metodo extends instruccion_1.Instruccion {
    constructor(id, tipo, parametros, instrucciones, linea, columna) {
        super(tipo, linea, columna);
        this.parametros = [];
        this.id = id;
        this.parametros = parametros;
        this.instrucciones = instrucciones;
    }
    interpretar(arbol, tabla) {
        for (let i of this.instrucciones) {
            let resultado = i.interpretar(arbol, tabla);
            if (resultado instanceof errores_1.default) {
                return resultado;
            }
        }
    }
}
exports.default = Metodo;
