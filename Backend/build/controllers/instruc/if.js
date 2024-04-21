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
const return_1 = __importDefault(require("./return"));
class If extends instruccion_1.Instruccion {
    constructor(cond, inst, instElse, condicionElseIf, linea, columna) {
        super(new tipo_1.default(tipo_1.tipoDato.VOID), linea, columna);
        this.condicion = cond;
        this.instruccionesElse = instElse;
        this.instrucciones = inst;
        this.condicionElseIf = condicionElseIf;
    }
    interpretar(arbol, tabla) {
        let cond = this.condicion.interpretar(arbol, tabla);
        if (cond instanceof errores_1.default)
            return cond;
        if (this.condicion.tipoDato.getTipo() != tipo_1.tipoDato.BOOL) {
            arbol.Print("\nError Semantico: La condicion no es booleana linea:" + this.linea + " columna: " + (this.columna + 1));
            return new errores_1.default("Semantico", "La condicion no es booleana", this.linea, this.columna);
        }
        if (cond) {
            let nuevaTabla = new tablaSimbolos_1.default(tabla);
            nuevaTabla.setNombre("if");
            for (let i of this.instrucciones) {
                if (i instanceof Break_1.default)
                    return i;
                if (i instanceof Continue_1.default)
                    return i;
                if (i instanceof return_1.default)
                    return i;
                if (i instanceof errores_1.default)
                    return i;
                let result = i.interpretar(arbol, nuevaTabla);
                if (result instanceof Break_1.default)
                    return result;
                if (result instanceof Continue_1.default)
                    return result;
                if (result instanceof return_1.default)
                    return result;
                if (result instanceof errores_1.default)
                    return result;
            }
        }
        else {
            if (this.instruccionesElse != undefined) {
                let nuevaTabla = new tablaSimbolos_1.default(tabla);
                nuevaTabla.setNombre("else");
                for (let i of this.instruccionesElse) {
                    if (i instanceof Break_1.default)
                        return i;
                    if (i instanceof Continue_1.default)
                        return i;
                    if (i instanceof return_1.default)
                        return i;
                    if (i instanceof errores_1.default)
                        return i;
                    let result = i.interpretar(arbol, nuevaTabla);
                    if (result instanceof Break_1.default)
                        return result;
                    if (result instanceof Continue_1.default)
                        return result;
                    if (result instanceof return_1.default)
                        return result;
                    if (result instanceof errores_1.default)
                        return result;
                }
            }
            else if (this.condicionElseIf != undefined) {
                let i = this.condicionElseIf.interpretar(arbol, tabla);
                if (i instanceof errores_1.default)
                    return i;
                if (i instanceof return_1.default)
                    return i;
                if (i instanceof Break_1.default)
                    return i;
                if (i instanceof Continue_1.default)
                    return i;
            }
        }
    }
    obtenerAST(anterior) {
        return "";
    }
}
exports.default = If;
