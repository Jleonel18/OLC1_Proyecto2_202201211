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
const contadorSingleton_1 = __importDefault(require("../simbol/contadorSingleton"));
const tipo_1 = __importStar(require("../simbol/tipo"));
class AsignacionVar extends instruccion_1.Instruccion {
    constructor(id, exp, linea, col) {
        super(new tipo_1.default(tipo_1.tipoDato.VOID), linea, col);
        this.id = id;
        this.exp = exp;
    }
    interpretar(arbol, tabla) {
        let NewValor = this.exp.interpretar(arbol, tabla);
        if (NewValor instanceof errores_1.default)
            return NewValor;
        let valor = tabla.getVariable(this.id.toLocaleLowerCase());
        if (valor == null) {
            arbol.Print("\nError Semantico: Variable no existente: " + this.id + " en la linea " + this.linea + " y columna " + (this.columna + 1));
            return new errores_1.default("SEMANTICO", "Variable no existente", this.linea, this.columna);
        }
        if (this.exp.tipoDato.getTipo() != valor.getTipo().getTipo()) {
            arbol.Print("\nError Semantico: Asignacion incorrecta: " + this.id + " en la linea " + this.linea + " y columna " + (this.columna + 1));
            return new errores_1.default("SEMANTICO", "Asignacion incorrecta", this.linea, this.columna);
        }
        this.tipoDato = valor.getTipo();
        valor.setValor(NewValor);
    }
    obtenerAST(anterior) {
        let contador = contadorSingleton_1.default.getInstance();
        let result = "";
        let padre = `n${contador.getContador()}`;
        let variable = `n${contador.getContador()}`;
        let varNombre = `n${contador.getContador()}`;
        let igual = `n${contador.getContador()}`;
        let asignacion = `n${contador.getContador()}`;
        result += ` ${padre}[label="Asignacion"];\n`;
        result += `${variable}[label="ID"];\n`;
        result += `${varNombre}[label="${this.id}"];\n`;
        result += `${igual}[label="="];\n`;
        result += `${asignacion}[label="Expresion"];\n`;
        result += ` ${anterior} -> ${padre};\n`;
        result += `${padre} -> ${variable};\n`;
        result += `${variable} -> ${varNombre};\n`;
        result += `${padre} -> ${igual};\n`;
        result += `${padre} -> ${asignacion};\n`;
        result += this.exp.obtenerAST(asignacion);
        return result;
    }
}
exports.default = AsignacionVar;
