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
class DeclaracionVacia extends instruccion_1.Instruccion {
    constructor(tipo, linea, columna, id) {
        super(tipo, linea, columna);
        this.identificador = id;
    }
    interpretar(arbol, tabla) {
        let valorFinal;
        this.identificador.forEach(elemento => {
            switch (this.tipoDato.getTipo()) {
                case tipo_1.tipoDato.ENTERO:
                    valorFinal = 0;
                    break;
                case tipo_1.tipoDato.CADENA:
                    valorFinal = "";
                    break;
                case tipo_1.tipoDato.BOOL:
                    valorFinal = true;
                    break;
                case tipo_1.tipoDato.CARACTER:
                    valorFinal = '0';
                    break;
                case tipo_1.tipoDato.DECIMAL:
                    valorFinal = 0.0;
                    break;
                default:
                    arbol.Print("\nError semántico: No es posible declarar variable: " + this.tipoDato.getTipo() + " en la linea " + this.linea + " y columna " + (this.columna + 1));
                    return new errores_1.default("Error semántico", "No es posible declarar variable.", this.linea, this.columna);
            }
            if (!tabla.setVariable(new Simbolo_1.default(this.tipoDato, elemento, valorFinal))) {
                arbol.Print("\nError semántico: No se puede declarar variable porque ya existia en la linea " + this.linea + " y columna " + (this.columna + 1));
                return new errores_1.default("SEMANTICO", "No se puede declarar variable porque ya existia", this.linea, this.columna);
            }
        });
    }
    obtenerAST(anterior) {
        let contador = contadorSingleton_1.default.getInstance();
        let result = "";
        let declar = `n${contador.getContador()}`;
        let ids = `n${contador.getContador()}`;
        let conjuntoID = [];
        for (let i = 0; i < this.identificador.length; i++) {
            conjuntoID.push(`n${contador.getContador()}`);
        }
        let puntocoma = `n${contador.getContador()}`;
        result += ` ${declar}[label="Declaracion"];\n`;
        result += ` ${ids}[label="IDS"];\n`;
        for (let i = 0; i < this.identificador.length; i++) {
            result += ` ${conjuntoID[i]} [label = "${this.identificador[i]}"];\n`;
        }
        result += `${puntocoma}[label=";"];\n`;
        result += `${anterior} -> ${declar};\n`;
        result += `${declar} -> ${ids};\n`;
        for (let i = 0; i < this.identificador.length; i++) {
            result += `${ids} -> ${conjuntoID[i]};\n`;
        }
        result += `${declar} -> ${puntocoma};\n`;
        return result;
    }
}
exports.default = DeclaracionVacia;
