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
        let contador = contadorSingleton_1.default.getInstance();
        let result = "";
        let contInstruc = [];
        let contInstrucElse = [];
        let contInstrucElseIf = "";
        let llav1Else = "";
        let padreInstElse = "";
        let rElse = "";
        let llav2Else = "";
        let rElseIf = "";
        let rIf = `n${contador.getContador()}`;
        let par1 = `n${contador.getContador()}`;
        let cond = `n${contador.getContador()}`;
        let par2 = `n${contador.getContador()}`;
        let llav1 = `n${contador.getContador()}`;
        let padreInstIf = `n${contador.getContador()}`;
        for (let i = 0; i < this.instrucciones.length; i++) {
            contInstruc.push(`n${contador.getContador()}`);
        }
        let llav2 = `n${contador.getContador()}`;
        if (this.instruccionesElse != undefined) {
            rElse = `n${contador.getContador()}`;
            llav1Else = `n${contador.getContador()}`;
            padreInstElse = `n${contador.getContador()}`;
            for (let i = 0; i < this.instruccionesElse.length; i++) {
                contInstrucElse.push(`n${contador.getContador()}`);
            }
            llav2Else = `n${contador.getContador()}`;
        }
        if (this.condicionElseIf != undefined) {
            contInstrucElseIf = `n${contador.getContador()}`;
            rElseIf = `n${contador.getContador()}`;
        }
        result += `${rIf}[label="If"];\n`;
        result += `${par1}[label="("];\n`;
        result += `${cond}[label="Expresion"];\n`;
        result += `${par2}[label=")"];\n`;
        result += `${llav1}[label="{"];\n`;
        result += `${padreInstIf}[label="Instrucciones"];\n`;
        for (let i = 0; i < contInstruc.length; i++) {
            result += `${contInstruc[i]}[label="Instruccion"];\n`;
        }
        result += `${llav2}[label="}"];\n`;
        if (this.instruccionesElse != undefined) {
            result += `${rElse}[label="Else"];\n`;
            result += `${llav1Else}[label="{"];\n`;
            result += `${padreInstElse}[label="Instrucciones"];\n`;
            for (let i = 0; i < contInstrucElse.length; i++) {
                result += `${contInstrucElse[i]}[label="Instruccion"];\n`;
            }
            result += `${llav2Else}[label="}"];\n`;
        }
        if (this.condicionElseIf != undefined) {
            result += `${contInstrucElseIf}[label="else If"];\n`;
        }
        result += `${anterior} -> ${rIf};\n`;
        result += `${anterior} -> ${par1};\n`;
        result += `${anterior} -> ${cond};\n`;
        result += `${anterior} -> ${par2};\n`;
        result += `${anterior} -> ${llav1};\n`;
        result += `${anterior} -> ${padreInstIf};\n`;
        for (let i = 0; i < contInstruc.length; i++) {
            result += `${padreInstIf} -> ${contInstruc[i]};\n`;
        }
        if (this.instruccionesElse != undefined) {
            result += `${anterior} -> ${rElse};\n`;
            result += `${anterior} -> ${llav1Else};\n`;
            result += `${anterior} -> ${padreInstElse};\n`;
            for (let i = 0; i < contInstrucElse.length; i++) {
                result += `${padreInstElse} -> ${contInstrucElse[i]};\n`;
            }
            result += `${anterior} -> ${llav2Else};\n`;
        }
        if (this.condicionElseIf != undefined) {
            result += `${anterior} -> ${contInstrucElseIf};\n`;
        }
        result += `${anterior} -> ${llav2};\n`;
        result += this.condicion.obtenerAST(cond);
        for (let i = 0; i < contInstruc.length; i++) {
            result += this.instrucciones[i].obtenerAST(contInstruc[i]);
        }
        if (this.instruccionesElse != undefined) {
            for (let i = 0; i < contInstrucElse.length; i++) {
                result += this.instruccionesElse[i].obtenerAST(contInstrucElse[i]);
            }
        }
        if (this.condicionElseIf != undefined) {
            result += this.condicionElseIf.obtenerAST(contInstrucElseIf);
        }
        return result;
    }
}
exports.default = If;
