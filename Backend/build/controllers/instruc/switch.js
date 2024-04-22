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
const arbol_1 = __importDefault(require("../simbol/arbol"));
const tipo_1 = __importStar(require("../simbol/tipo"));
const Break_1 = __importDefault(require("./Break"));
const Continue_1 = __importDefault(require("./Continue"));
const return_1 = __importDefault(require("./return"));
const contadorSingleton_1 = __importDefault(require("../simbol/contadorSingleton"));
class Switch extends instruccion_1.Instruccion {
    constructor(cond, instCase, instDefault, linea, columna) {
        super(new tipo_1.default(tipo_1.tipoDato.VOID), linea, columna);
        this.condicion = cond;
        this.instruccionesCase = instCase;
        this.instruccionDefault = instDefault;
    }
    interpretar(arbol, tabla) {
        let cond = this.condicion.interpretar(arbol, tabla);
        if (cond instanceof errores_1.default)
            return cond;
        let nuevaTabla = new tablaSimbolos_1.default(tabla);
        nuevaTabla.setNombre("switch");
        arbol_1.default.lista_simbolos.push(nuevaTabla);
        if (this.instruccionesCase != undefined) {
            for (let i of this.instruccionesCase) {
                i.condicionGlobal = this.condicion;
                let res = i.interpretar(arbol, nuevaTabla);
                if (res instanceof Break_1.default)
                    return;
                if (res instanceof Continue_1.default) {
                    arbol.Print("\nError Semantico: Continue no valido. linea:" + this.linea + " columna: " + (this.columna + 1));
                    return new errores_1.default("Semantico", "Continue no valido", this.linea, this.columna);
                }
                if (res instanceof errores_1.default)
                    return res;
            }
        }
        if (this.instruccionDefault != undefined) {
            let res = this.instruccionDefault.interpretar(arbol, nuevaTabla);
            if (res instanceof Break_1.default)
                return;
            if (res instanceof Continue_1.default)
                return;
            if (res instanceof errores_1.default)
                return res;
            if (res instanceof return_1.default)
                return res;
        }
        /*for( let i of this.instruccionesCase){

            let resultado = i;

            if(resultado instanceof Case){

                let cond2 = resultado.condicion.interpretar(arbol, nuevaTabla);

                if(cond2 == cond) {
                    let res = resultado.interpretar(arbol, nuevaTabla);
                    if(res instanceof Break) return;
                    if(res instanceof Continue) break;
                    bandera = true;
                }

            } if(resultado instanceof Default && bandera == false){
                let res = resultado.interpretar(arbol, nuevaTabla);
                if(res instanceof Break) return;
                if(res instanceof Continue) break;
            }
        }*/
    }
    obtenerAST(anterior) {
        let reult = "";
        let contador = contadorSingleton_1.default.getInstance();
        let contDefault = undefined;
        let contCase = [];
        let switchN = `n${contador.getContador()}`;
        let par1 = `n${contador.getContador()}`;
        let exp = `n${contador.getContador()}`;
        let par2 = `n${contador.getContador()}`;
        let llav1 = `n${contador.getContador()}`;
        let padreCase = `n${contador.getContador()}`;
        if (this.instruccionesCase != undefined) {
            for (let i = 0; i < this.instruccionesCase.length; i++) {
                contCase.push(`n${contador.getContador()}`);
            }
        }
        if (this.instruccionDefault != undefined) {
            contDefault = `n${contador.getContador()}`;
        }
        reult += `${switchN}[label="Switch"];\n`;
        reult += `${par1}[label="("];\n`;
        reult += `${exp}[label="Expresion"];\n`;
        reult += `${par2}[label=")"];\n`;
        reult += `${llav1}[label="{"];\n`;
        reult += `${padreCase}[label="cases_default"];\n`;
        if (this.instruccionesCase != undefined) {
            for (let i = 0; i < this.instruccionesCase.length; i++) {
                reult += `${contCase[i]}[label="Case"];\n`;
            }
        }
        if (this.instruccionDefault != undefined) {
            reult += `${contDefault}[label="Default"];\n`;
        }
        reult += `${anterior} -> ${switchN};\n`;
        reult += `${anterior} -> ${par1};\n`;
        reult += `${anterior} -> ${exp};\n`;
        reult += `${anterior} -> ${par2};\n`;
        reult += `${anterior} -> ${llav1};\n`;
        reult += `${anterior} -> ${padreCase};\n`;
        if (this.instruccionesCase != undefined) {
            for (let i = 0; i < this.instruccionesCase.length; i++) {
                reult += `${padreCase} -> ${contCase[i]};\n`;
            }
        }
        if (this.instruccionDefault != undefined) {
            reult += `${padreCase} -> ${contDefault};\n`;
        }
        reult += this.condicion.obtenerAST(exp);
        if (this.instruccionesCase != undefined) {
            for (let i = 0; i < this.instruccionesCase.length; i++) {
                reult += this.instruccionesCase[i].obtenerAST(contCase[i]);
            }
        }
        if (this.instruccionDefault != undefined) {
            reult += this.instruccionDefault.obtenerAST(contDefault);
        }
        return reult;
    }
}
exports.default = Switch;
