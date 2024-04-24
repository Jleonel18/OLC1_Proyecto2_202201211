"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const instruccion_1 = require("../abstracto/instruccion");
const errores_1 = __importDefault(require("../excep/errores"));
const contadorSingleton_1 = __importDefault(require("../simbol/contadorSingleton"));
const Simbolo_1 = __importDefault(require("../simbol/Simbolo"));
const tipo_1 = require("../simbol/tipo");
class Declaracion extends instruccion_1.Instruccion {
    constructor(tipo, linea, columna, id, valor) {
        super(tipo, linea, columna);
        this.identificador = id;
        this.valor = valor;
    }
    interpretar(arbol, tabla) {
        let vFinal = this.valor.interpretar(arbol, tabla);
        if (vFinal instanceof errores_1.default)
            return vFinal;
        if (this.valor.tipoDato.getTipo() == tipo_1.tipoDato.ENTERO && this.tipoDato.getTipo() == tipo_1.tipoDato.DECIMAL) {
            this.identificador.forEach(id => {
                vFinal = parseFloat(vFinal);
                if (!tabla.setVariable(new Simbolo_1.default(this.tipoDato, id, vFinal))) {
                    arbol.Print("Error Semantico: No se puede declarar variable ya existene:" + this.linea + " columna: " + (this.columna + 1));
                    return new errores_1.default("Semantico", "No se puede declarar variable que ya existe", this.linea, this.columna);
                }
            });
        }
        else {
            if (this.valor.tipoDato.getTipo() != this.tipoDato.getTipo()) {
                arbol.Print("Error Semantico: El tipo de dato no coincide con la variable. Linea:" + this.linea + " columna: " + (this.columna + 1));
                return new errores_1.default("SEMANTICO", "El tipo de dato no coincide con la variable.", this.linea, this.columna);
            }
            this.identificador.forEach(elemento => {
                if (!tabla.setVariable(new Simbolo_1.default(this.tipoDato, elemento, vFinal))) {
                    arbol.Print("Error Semantico: Variable ya existente en el sistema. Linea::" + this.linea + " columna: " + (this.columna + 1));
                    return new errores_1.default("SEMANTICO", "Variable ya existente en el sistema.", this.linea, this.columna);
                }
            });
        }
    }
    obtenerAST(anterior) {
        let result = "";
        let contador = contadorSingleton_1.default.getInstance();
        let declar = `n${contador.getContador()}`;
        let tipoD = `n${contador.getContador()}`;
        let ids = `n${contador.getContador()}`;
        let conjuntoID = [];
        for (let i = 0; i < this.identificador.length; i++) {
            conjuntoID.push(`n${contador.getContador()}`);
        }
        let igual = `n${contador.getContador()}`;
        let valor = `n${contador.getContador()}`;
        let puntocoma = `n${contador.getContador()}`;
        result += `${declar}[label="Declaracion"];\n`;
        if (this.tipoDato.getTipo() == tipo_1.tipoDato.ENTERO) {
            result += `${tipoD}[label="int"];\n`;
        }
        else if (this.tipoDato.getTipo() == tipo_1.tipoDato.DECIMAL) {
            result += `${tipoD}[label="double"];\n`;
        }
        else if (this.tipoDato.getTipo() == tipo_1.tipoDato.BOOL) {
            result += `${tipoD}[label="bool"];\n`;
        }
        else if (this.tipoDato.getTipo() == tipo_1.tipoDato.CADENA) {
            result += `${tipoD}[label="std::string"];\n`;
        }
        else if (this.tipoDato.getTipo() == tipo_1.tipoDato.CARACTER) {
            result += `${tipoD}[label="char"];\n`;
        }
        result += `${ids}[label="IDS"];\n`;
        for (let i = 0; i < this.identificador.length; i++) {
            result += `${conjuntoID[i]} [label = "${this.identificador[i]}"];\n`;
        }
        result += `${igual}[label="="];\n`;
        result += `${valor}[label="Expresion"];\n`;
        result += `${puntocoma}[label=";"];\n`;
        result += `${anterior} -> ${declar};\n`;
        result += `${declar} -> ${ids};\n`;
        result += `${declar} -> ${tipoD};\n`;
        for (let i = 0; i < this.identificador.length; i++) {
            result += `${ids} -> ${conjuntoID[i]};\n`;
        }
        result += `${declar} -> ${igual};\n`;
        result += `${declar} -> ${valor};\n`;
        result += `${declar} -> ${puntocoma};\n`;
        this.valor.obtenerAST(valor);
        return result;
    }
}
exports.default = Declaracion;
