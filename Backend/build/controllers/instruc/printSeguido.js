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
const tipo_1 = __importStar(require("../simbol/tipo"));
const errores_1 = __importDefault(require("../excep/errores"));
const contadorSingleton_1 = __importDefault(require("../simbol/contadorSingleton"));
class Print extends instruccion_1.Instruccion {
    constructor(exp, linea, col) {
        super(new tipo_1.default(tipo_1.tipoDato.VOID), linea, col);
        this.expresion = exp;
    }
    interpretar(arbol, tabla) {
        let valor = this.expresion.interpretar(arbol, tabla);
        if (valor instanceof errores_1.default)
            return valor;
        arbol.PrintSeguido(valor);
    }
    obtenerAST(anterior) {
        let result = "";
        let contador = contadorSingleton_1.default.getInstance();
        let cout = `n${contador.getContador()}`;
        let dobleSigno = `n${contador.getContador()}`;
        let nodoExpresion = `n${contador.getContador()}`;
        let puntoComa = `n${contador.getContador()}`;
        result += `${cout}[label="cout"];\n`;
        result += `${dobleSigno}[label="<<"];\n`;
        result += `${nodoExpresion}[label="Expresion"];\n`;
        result += `${puntoComa}[label=";"];\n`;
        result += `${anterior} -> ${cout};\n`;
        result += `${anterior} -> ${dobleSigno};\n`;
        result += `${anterior} -> ${nodoExpresion};\n`;
        result += `${anterior} -> ${puntoComa};\n`;
        result += this.expresion.obtenerAST(nodoExpresion);
        return result;
    }
}
exports.default = Print;
