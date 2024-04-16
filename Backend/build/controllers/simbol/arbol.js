"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const tablaSimbolos_1 = __importDefault(require("./tablaSimbolos"));
class Arbol {
    constructor(instrucciones) {
        this.instrucciones = instrucciones;
        this.consola = "";
        this.tablaGlobal = new tablaSimbolos_1.default();
    }
    Print(contenido) {
        this.consola = `${this.consola}${contenido}\n`;
    }
    PrintSeguido(contenido) {
        this.consola = `${this.consola}${contenido}`;
    }
    getConsola() {
        return this.consola;
    }
    setConsola(console) {
        this.consola = console;
    }
    getInstrucciones() {
        return this.instrucciones;
    }
    setInstrucciones(instrucciones) {
        this.instrucciones = instrucciones;
    }
    getTablaGlobal() {
        return this.tablaGlobal;
    }
    setTablaGlobal(tabla) {
        this.tablaGlobal = tabla;
    }
}
exports.default = Arbol;
