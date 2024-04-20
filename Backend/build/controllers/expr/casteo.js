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
class Casteo extends instruccion_1.Instruccion {
    constructor(operador, fila, columna, operando) {
        super(new tipo_1.default(tipo_1.tipoDato.VOID), fila, columna);
        this.tipoD = operador;
        this.operandoUnico = operando;
    }
    interpretar(arbol, tabla) {
        var _a;
        let expresion = (_a = this.operandoUnico) === null || _a === void 0 ? void 0 : _a.interpretar(arbol, tabla);
        switch (this.tipoD.getTipo()) {
            case tipo_1.tipoDato.ENTERO:
                return this.castearEntero(expresion);
            case tipo_1.tipoDato.DECIMAL:
                return this.castearDouble(expresion);
            case tipo_1.tipoDato.CARACTER:
                return this.castearCaracter(expresion);
            case tipo_1.tipoDato.CADENA:
                return this.castearCadena(expresion);
        }
    }
    castearEntero(operando) {
        var _a;
        let tipo = (_a = this.operandoUnico) === null || _a === void 0 ? void 0 : _a.tipoDato.getTipo();
        switch (tipo) {
            case tipo_1.tipoDato.DECIMAL:
                this.tipoDato = new tipo_1.default(tipo_1.tipoDato.ENTERO);
                return parseInt(operando);
            case tipo_1.tipoDato.CARACTER:
                this.tipoDato = new tipo_1.default(tipo_1.tipoDato.ENTERO);
                return parseInt(operando.charCodeAt(1));
            default:
                return new errores_1.default("Error Semantico", "No se puede castear el valor", this.linea, this.columna);
        }
    }
    castearDouble(operando) {
        var _a;
        let tipo = (_a = this.operandoUnico) === null || _a === void 0 ? void 0 : _a.tipoDato.getTipo();
        switch (tipo) {
            case tipo_1.tipoDato.ENTERO:
                this.tipoDato = new tipo_1.default(tipo_1.tipoDato.DECIMAL);
                return parseFloat(operando);
            case tipo_1.tipoDato.CARACTER:
                this.tipoDato = new tipo_1.default(tipo_1.tipoDato.DECIMAL);
                return parseFloat(operando.charCodeAt(1));
            default:
                return new errores_1.default("Error Semantico", "No se puede castear el valor", this.linea, this.columna);
        }
    }
    castearCaracter(operando) {
        var _a;
        let tipo = (_a = this.operandoUnico) === null || _a === void 0 ? void 0 : _a.tipoDato.getTipo();
        switch (tipo) {
            case tipo_1.tipoDato.ENTERO:
                this.tipoDato = new tipo_1.default(tipo_1.tipoDato.CARACTER);
                return String.fromCharCode(parseInt(operando));
            case tipo_1.tipoDato.DECIMAL:
                this.tipoDato = new tipo_1.default(tipo_1.tipoDato.CARACTER);
                return String.fromCharCode(parseFloat(operando));
            default:
                return new errores_1.default("Error Semantico", "No se puede castear el valor", this.linea, this.columna);
        }
    }
    castearCadena(operando) {
        var _a;
        let tipo = (_a = this.operandoUnico) === null || _a === void 0 ? void 0 : _a.tipoDato.getTipo();
        switch (tipo) {
            case tipo_1.tipoDato.ENTERO:
                this.tipoDato = new tipo_1.default(tipo_1.tipoDato.CADENA);
                return parseInt(operando).toString();
            case tipo_1.tipoDato.DECIMAL:
                this.tipoDato = new tipo_1.default(tipo_1.tipoDato.CADENA);
                return parseFloat(operando).toString();
            case tipo_1.tipoDato.CARACTER:
                this.tipoDato = new tipo_1.default(tipo_1.tipoDato.CADENA);
                return operando.toString();
            default:
                return new errores_1.default("Error Semantico", "No se puede castear el valor", this.linea, this.columna);
        }
    }
    obtenerAST(anterior) {
        var _a;
        let contador = contadorSingleton_1.default.getInstance();
        let result = "";
        let padre = `n${contador.getContador()}`;
        let par1 = `n${contador.getContador()}`;
        let tipo = `n${contador.getContador()}`;
        let par2 = `n${contador.getContador()}`;
        let valor = `n${contador.getContador()}`;
        let puntocoma = `n${contador.getContador()}`;
        result += `${padre}[label="casteo"];\n`;
        result += `${par1}[label="("];\n`;
        if (this.tipoD.getTipo() == tipo_1.tipoDato.ENTERO) {
            result += `${tipo}[label="int"];\n`;
        }
        else if (this.tipoD.getTipo() == tipo_1.tipoDato.DECIMAL) {
            result += `${tipo}[label="double"];\n`;
        }
        else if (this.tipoD.getTipo() == tipo_1.tipoDato.CARACTER) {
            result += `${tipo}[label="char"];\n`;
        }
        else if (this.tipoD.getTipo() == tipo_1.tipoDato.CADENA) {
            result += `${tipo}[label="std::string"];\n`;
        }
        else if (this.tipoD.getTipo() == tipo_1.tipoDato.BOOL) {
            result += `${tipo}[label="bool"];\n`;
        }
        result += `${par2}[label="("];\n`;
        result += `${valor}[label="Expresion"];\n`;
        result += `${puntocoma}[label=";"];\n`;
        result += `${anterior} -> ${padre};\n`;
        result += `${padre} -> ${par1};\n`;
        result += `${padre} -> ${tipo};\n`;
        result += `${padre} -> ${par2};\n`;
        result += `${padre} -> ${valor};\n`;
        result += `${padre} -> ${puntocoma};\n`;
        result += (_a = this.operandoUnico) === null || _a === void 0 ? void 0 : _a.obtenerAST(valor);
        return result;
    }
}
exports.default = Casteo;
