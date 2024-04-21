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
const contadorSingleton_1 = __importDefault(require("../simbol/contadorSingleton"));
class While extends instruccion_1.Instruccion {
    constructor(condicion, instruccion, linea, columna) {
        super(new tipo_1.default(tipo_1.tipoDato.VOID), linea, columna);
        this.condicion = condicion;
        this.instrucciones = instruccion;
    }
    interpretar(arbol, tabla) {
        let cond = this.condicion.interpretar(arbol, tabla);
        if (cond instanceof errores_1.default)
            return cond;
        if (this.condicion.tipoDato.getTipo() != tipo_1.tipoDato.BOOL) {
            arbol.Print("\nError Semantico: La condicion no es booleana en la linea " + this.linea + " y columna " + (this.columna + 1));
            return new errores_1.default("Semantico", "La condicion no es booleana", this.linea, this.columna);
        }
        do {
            let nuevaTabla = new tablaSimbolos_1.default(tabla);
            nuevaTabla.setNombre("while");
            console.log("paso por aqui");
            for (let i of this.instrucciones) {
                if (i instanceof Break_1.default)
                    return;
                if (i instanceof Continue_1.default)
                    break;
                if (i instanceof errores_1.default)
                    return i;
                if (i instanceof return_1.default)
                    return i;
                let resultado = i.interpretar(arbol, nuevaTabla);
                if (resultado instanceof Break_1.default)
                    return;
                if (resultado instanceof Continue_1.default)
                    break;
                if (resultado instanceof return_1.default)
                    return resultado;
            }
        } while (this.condicion.interpretar(arbol, tabla));
    }
    obtenerAST(anterior) {
        let result = "";
        let contador = contadorSingleton_1.default.getInstance();
        let contInstruc = [];
        let padre = `n${contador.getContador()}`;
        let nDo = `n${contador.getContador()}`;
        let llav1 = `n${contador.getContador()}`;
        let padreIns = `n${contador.getContador()}`;
        for (let i = 0; i < this.instrucciones.length; i++) {
            contInstruc.push(`n${contador.getContador()}`);
        }
        let llav2 = `n${contador.getContador()}`;
        let nWhile = `n${contador.getContador()}`;
        let par1 = `n${contador.getContador()}`;
        let cond = `n${contador.getContador()}`;
        let par2 = `n${contador.getContador()}`;
        let puntocoma = `n${contador.getContador()}`;
        result += ` ${padre}[label="ciclo"];\n`;
        result += ` ${nDo}[label="do"];\n`;
        result += ` ${llav1}[label="{"];\n`;
        result += ` ${padreIns}[label="Instrucciones"];\n`;
        for (let i = 0; i < this.instrucciones.length; i++) {
            result += ` ${contInstruc[i]}[label="Instruccion"];\n`;
        }
        result += ` ${llav2}[label="}"];\n`;
        result += ` ${nWhile}[label="while"];\n`;
        result += ` ${par1}[label="("];\n`;
        result += ` ${cond}[label="expresion"];\n`;
        result += ` ${par2}[label=")"];\n`;
        result += ` ${puntocoma}[label=";"];\n`;
        result += ` ${anterior} -> ${padre};\n`;
        result += ` ${padre} -> ${nDo};\n`;
        result += ` ${padre} -> ${llav1};\n`;
        result += ` ${padre} -> ${padreIns};\n`;
        for (let i = 0; i < this.instrucciones.length; i++) {
            result += ` ${padreIns} -> ${contInstruc[i]};\n`;
        }
        result += ` ${padre} -> ${llav2};\n`;
        result += ` ${padre} -> ${nWhile};\n`;
        result += ` ${padre} -> ${par1};\n`;
        result += ` ${padre} -> ${cond};\n`;
        result += ` ${padre} -> ${par2};\n`;
        result += ` ${padre} -> ${puntocoma};\n`;
        for (let i = 0; i < this.instrucciones.length; i++) {
            result += this.instrucciones[i].obtenerAST(contInstruc[i]);
        }
        result += this.condicion.obtenerAST(cond);
        return result;
    }
}
exports.default = While;
