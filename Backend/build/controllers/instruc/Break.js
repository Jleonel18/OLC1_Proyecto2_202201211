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
const contadorSingleton_1 = __importDefault(require("../simbol/contadorSingleton"));
class Break extends instruccion_1.Instruccion {
    constructor(linea, columna) {
        super(new tipo_1.default(tipo_1.tipoDato.VOID), linea, columna);
    }
    interpretar(arbol, tabla) {
        return;
    }
    obtenerAST(anterior) {
        let contador = contadorSingleton_1.default.getInstance();
        let result = "";
        let breakk = `n${contador.getContador()}`;
        let puntocoma = `n${contador.getContador()}`;
        result += `${breakk}[label="Break"];\n`;
        result += `${puntocoma}[label=";"];\n`;
        result += `${anterior} -> ${breakk};\n`;
        result += `${anterior} -> ${puntocoma};\n`;
        return result;
    }
}
exports.default = Break;
