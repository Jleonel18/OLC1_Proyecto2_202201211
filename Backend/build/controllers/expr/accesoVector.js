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
class accesoVector extends instruccion_1.Instruccion {
    constructor(id, expresion, expresion2, linea, columna) {
        super(new tipo_1.default(tipo_1.tipoDato.VOID), linea, columna);
        this.id = id;
        this.expresion = expresion;
        this.expresion2 = expresion2;
    }
    interpretar(arbol, tabla) {
        let expAsignada = this.expresion.interpretar(arbol, tabla);
        if (expAsignada instanceof errores_1.default)
            return expAsignada;
        let expAsignada2 = this.expresion2.interpretar(arbol, tabla);
        if (expAsignada2 instanceof errores_1.default)
            return expAsignada2;
        if (this.expresion.tipoDato.getTipo() != tipo_1.tipoDato.ENTERO) {
            arbol.Print("Error Semantico: La expresion debe de ser de tipo Entero. linea:" + this.linea + " columna: " + (this.columna + 1));
            return new errores_1.default("Semantico", "La expresion debe de ser de tipo Entero", this.linea, this.columna);
        }
        if (this.expresion2.tipoDato.getTipo() != tipo_1.tipoDato.ENTERO) {
            arbol.Print("Error Semantico: La expresion debe de ser de tipo Entero. linea:" + this.linea + " columna: " + (this.columna + 1));
            return new errores_1.default("Semantico", "La expresion debe de ser de tipo int", this.linea, this.columna);
        }
        let valor = tabla.getVariable(this.id);
        if (valor != null) {
            this.tipoDato = valor.getTipo();
            let arrr = valor.getValor();
            if (parseInt(expAsignada) < 0 || parseInt(expAsignada) > arrr.length - 1) {
                arbol.Print("Error Semantico: La posición 1 se encuentra fuera de rango. linea:" + this.linea + " columna: " + (this.columna + 1));
                return new errores_1.default("Semantico", "La posición 1 se encuentra fuera de rango", this.linea, this.columna);
            }
            if (parseInt(expAsignada) < 0 || parseInt(expAsignada2) > arrr[0].length - 1) {
                arbol.Print("Error Semantico: La posición 2 se encuentra fuera de rango. linea:" + this.linea + " columna: " + (this.columna + 1));
                return new errores_1.default("Semantico", "La posición 2 se encuentra fuera de rango.", this.linea, this.columna);
            }
            return valor.getValor()[expAsignada][expAsignada2];
        }
        arbol.Print("Error Semantico: La variable " + this.id + " no existe. linea:" + this.linea + " columna: " + (this.columna + 1));
        return new errores_1.default("Semantico", "La variable " + this.id + " no existe ", this.linea, this.columna);
    }
    obtenerAST(anterior) {
        return "";
    }
}
exports.default = accesoVector;
