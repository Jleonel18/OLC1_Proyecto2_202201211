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
const case_1 = __importDefault(require("./case"));
const default_1 = __importDefault(require("./default"));
class Switch extends instruccion_1.Instruccion {
    constructor(cond, instCase, linea, columna) {
        super(new tipo_1.default(tipo_1.tipoDato.VOID), linea, columna);
        this.condicion = cond;
        this.instruccionesCase = instCase;
    }
    interpretar(arbol, tabla) {
        let cond = this.condicion.interpretar(arbol, tabla);
        if (cond instanceof errores_1.default)
            return cond;
        let bandera = false;
        let nuevaTabla = new tablaSimbolos_1.default(tabla);
        nuevaTabla.setNombre("switch");
        for (let i of this.instruccionesCase) {
            //console.log("i es:",i);
            let resultado = i;
            if (resultado instanceof case_1.default) {
                //console.log("el resultado.condicion es:",resultado.condicion.interpretar(arbol, nuevaTabla));
                if (resultado.condicion.interpretar(arbol, nuevaTabla) == cond) {
                    let res = resultado.interpretar(arbol, nuevaTabla);
                    if (res instanceof Break_1.default)
                        return;
                    if (res instanceof Continue_1.default)
                        break;
                    bandera = true;
                }
            }
            if (resultado instanceof default_1.default && bandera == false) {
                let res = resultado.interpretar(arbol, nuevaTabla);
                if (res instanceof Break_1.default)
                    return;
                if (res instanceof Continue_1.default)
                    break;
            }
        }
    }
}
exports.default = Switch;
