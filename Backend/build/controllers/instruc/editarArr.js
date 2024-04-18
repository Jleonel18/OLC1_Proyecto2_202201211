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
class EditarArr extends instruccion_1.Instruccion {
    constructor(posicion, identificador, editar, linea, columna) {
        super(new tipo_1.default(tipo_1.tipoDato.ENTERO), linea, columna);
        this.posicion = posicion;
        this.identificador = identificador;
        this.editar = editar;
    }
    interpretar(arbol, tabla) {
        let valorV = tabla.getVariable(this.identificador);
        let posicionArr = this.posicion.interpretar(arbol, tabla);
        if (valorV === null) {
            arbol.Print("\nError Semántico: No se puede editar el arreglo porque no existe. Linea: " + this.linea + " Columna: " + (this.columna + 1));
            return new errores_1.default("Semántico", "No se puede editar el arreglo porque no existe", this.linea, this.columna);
        }
        const vVector = valorV.getValor();
        this.tipoDato = valorV.getTipo();
        let valorNew = this.editar.interpretar(arbol, tabla);
        if (!Array.isArray(vVector)) {
            arbol.Print("\nError Semántico: No se puede editar el arreglo porque no es un arreglo. Linea: " + this.linea + " Columna: " + (this.columna + 1));
            return new errores_1.default("Semántico", "No se puede editar el arreglo porque no es un arreglo", this.linea, this.columna);
        }
        if (posicionArr < 0 || posicionArr >= vVector.length) {
            arbol.Print("\nError Semántico: Posición fuera de rango. Linea: " + this.linea + " Columna: " + (this.columna + 1));
            return new errores_1.default("Semántico", "Posición fuera de rango.", this.linea, this.columna);
        }
        vVector[posicionArr] = valorNew;
    }
}
exports.default = EditarArr;
