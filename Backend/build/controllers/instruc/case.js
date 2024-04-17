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
const tablaSimbolos_1 = __importDefault(require("../simbol/tablaSimbolos"));
const tipo_1 = __importStar(require("../simbol/tipo"));
const Break_1 = __importDefault(require("./Break"));
const Continue_1 = __importDefault(require("./Continue"));
class Case extends instruccion_1.Instruccion {
    constructor(condicion, instrucciones, linea, columna) {
        super(new tipo_1.default(tipo_1.tipoDato.VOID), linea, columna);
        this.condicion = condicion;
        this.instrucciones = instrucciones;
    }
    interpretar(arbol, tabla) {
        var _a;
        let cond = this.condicion.interpretar(arbol, tabla);
        if (cond instanceof errores_1.default)
            return cond;
        if (((_a = this.condicionGlobal) === null || _a === void 0 ? void 0 : _a.interpretar(arbol, tabla)) == cond) {
            let nuevaTabla = new tablaSimbolos_1.default(tabla);
            nuevaTabla.setNombre("case");
            for (let i of this.instrucciones) {
                if (i instanceof Break_1.default) {
                    return i;
                }
                let resultado = i.interpretar(arbol, nuevaTabla);
                if (resultado instanceof Break_1.default) {
                    return resultado;
                }
                if (resultado instanceof Continue_1.default) {
                    arbol.Print("\nError Semantico: Continue no valido. linea:" + this.linea + " columna: " + (this.columna + 1));
                    return new errores_1.default("Semantico", "Continue no valido", this.linea, this.columna);
                }
            }
        }
    }
}
exports.default = Case;
