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
const metodo_1 = __importDefault(require("./metodo"));
const declaracion_1 = __importDefault(require("./declaracion"));
class Llamada extends instruccion_1.Instruccion {
    constructor(id, parametros, linea, columna) {
        super(new tipo_1.default(tipo_1.tipoDato.VOID), linea, columna);
        this.id = id;
        this.parametros = parametros;
    }
    interpretar(arbol, tabla) {
        let busqueda = arbol.getFuncion(this.id);
        if (busqueda == null) {
            arbol.Print(`Error Semántico: No existe la función ${this.id}. Linea: ${this.linea} Columna: ${(this.columna + 1)}`);
            return new errores_1.default('Semántico', `No existe la función ${this.id}`, this.linea, this.columna);
        }
        if (busqueda instanceof metodo_1.default) {
            if (busqueda.tipo.getTipo() == tipo_1.tipoDato.VOID) {
                let nuevaTabla = new tablaSimbolos_1.default(arbol.getTablaGlobal());
                nuevaTabla.setNombre("Llamada metodo " + this.id);
                if (busqueda.parametros.length != this.parametros.length) {
                    arbol.Print(`Error Semántico: La cantidad de parametros no coincide con la función ${this.id}. Linea: ${this.linea} Columna: ${(this.columna + 1)}`);
                    return new errores_1.default('Semántico', `La cantidad de parametros no coincide con la función ${this.id}`, this.linea, this.columna);
                }
                for (let i = 0; i < busqueda.parametros.length; i++) {
                    let daclaraParam = new declaracion_1.default(busqueda.parametros[i].tipo, this.linea, this.columna, [busqueda.parametros[i].id], this.parametros[i]);
                    let result = daclaraParam.interpretar(arbol, nuevaTabla);
                    if (result instanceof errores_1.default)
                        return result;
                }
                let resultFunc = busqueda.interpretar(arbol, nuevaTabla);
                if (resultFunc instanceof errores_1.default)
                    return resultFunc;
            }
            else {
                let nuevaTabla = new tablaSimbolos_1.default(arbol.getTablaGlobal());
                nuevaTabla.setNombre("Llamada metodo " + this.id);
                if (busqueda.parametros.length != this.parametros.length) {
                    arbol.Print(`Error Semántico: La cantidad de parametros no coincide con la función ${this.id}. Linea: ${this.linea} Columna: ${(this.columna + 1)}`);
                    return new errores_1.default('Semántico', `La cantidad de parametros no coincide con la función ${this.id}`, this.linea, this.columna);
                }
                for (let i = 0; i < busqueda.parametros.length; i++) {
                    let daclaraParam = new declaracion_1.default(busqueda.parametros[i].tipo, this.linea, this.columna, [busqueda.parametros[i].id], this.parametros[i]);
                    let result = daclaraParam.interpretar(arbol, nuevaTabla);
                    if (result instanceof errores_1.default)
                        return result;
                }
                let resultFunc = busqueda.interpretar(arbol, nuevaTabla);
                if (resultFunc instanceof errores_1.default)
                    return resultFunc;
                this.tipoDato.setTipo(busqueda.valorRetorno.tipoDato.getTipo());
                //console.log("el valor de retorno es:",busqueda.valorRetorno.tipoDato.getTipo());
                this.tipoDato.setTipo(busqueda.valorRetorno.tipoDato.getTipo());
                return busqueda.valorRetorno.interpretar(arbol, nuevaTabla);
            }
        }
    }
}
exports.default = Llamada;
