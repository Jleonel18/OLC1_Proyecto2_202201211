"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const tablaSimbolos_1 = __importDefault(require("./tablaSimbolos"));
const metodo_1 = __importDefault(require("../instruc/metodo"));
class Arbol {
    constructor(instrucciones) {
        this.instrucciones = instrucciones;
        this.consola = "";
        this.tablaGlobal = new tablaSimbolos_1.default();
        this.funciones = new Array;
    }
    Print(contenido) {
        this.consola = `${this.consola}${contenido}\n`;
    }
    agregarTSimbolos(tabla) {
        Arbol.lista_simbolos.push(tabla);
    }
    eliminarTSimbolos() {
        Arbol.lista_simbolos = [];
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
    getFunciones() {
        return this.funciones;
    }
    setFunciones(funciones) {
        this.funciones = funciones;
    }
    agregarFunciones(funcion) {
        this.funciones.push(funcion);
    }
    getFuncion(id) {
        for (let i of this.getFunciones()) {
            if (i instanceof metodo_1.default) {
                if (i.id.toLocaleLowerCase() == id) {
                    return i;
                }
            }
        }
    }
}
Arbol.lista_simbolos = new Array();
exports.default = Arbol;
