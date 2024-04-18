"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const instruccion_1 = require("../abstracto/instruccion");
const errores_1 = __importDefault(require("../excep/errores"));
const Simbolo_1 = __importDefault(require("../simbol/Simbolo"));
const tipo_1 = require("../simbol/tipo");
class DeclaracionArreglo extends instruccion_1.Instruccion {
    constructor(booleano, primerTipo, identificador, dimenValores, linea, columna, segundoTipo) {
        super(primerTipo, linea, columna);
        this.primerTipo = primerTipo;
        this.segundoTipo = segundoTipo;
        this.identificador = identificador;
        this.dimenValores = dimenValores;
        this.booleano = booleano;
    }
    interpretar(arbol, tabla) {
        var _a, _b, _c, _d, _e, _f;
        if (Array.isArray(this.dimenValores)) {
            let arregloPivote = [];
            for (let i = 0; i < this.dimenValores.length; i++) {
                let valor = this.dimenValores[i].interpretar(arbol, tabla);
                if (valor instanceof errores_1.default)
                    return valor;
                if (this.primerTipo.getTipo() != this.dimenValores[i].tipoDato.getTipo()) {
                    arbol.Print("\nError Semántico: El tipo de dato no es igual al tipo de dato del arreglo. Linea: " + this.linea + " Columna: " + (this.columna + 1));
                    return new errores_1.default('Semantico', `El tipo de dato no es igual al tipo de dato del arreglo`, this.linea, this.columna);
                }
                arregloPivote[i] = valor;
            }
            if (!tabla.setVariable(new Simbolo_1.default(this.tipoDato, this.identificador, arregloPivote))) {
                arbol.Print("\nError Semántico: No se puede declarar variable porque ya existia. Linea: " + this.linea + " Columna: " + (this.columna + 1));
                return new errores_1.default("Semántico", "No se puede declarar variable porque ya existia", this.linea, this.columna);
            }
        }
        else if (!Array.isArray(this.dimenValores)) {
            if (this.booleano == true) {
                //console.log("paso por aqui");
                if (this.primerTipo.getTipo() != tipo_1.tipoDato.CARACTER) {
                    arbol.Print("\nError Semántico: El tipo de dato no es igual al tipo de dato del arreglo. Linea: " + this.linea + " Columna: " + (this.columna + 1));
                    return new errores_1.default('Semantico', `El tipo de dato no es igual al tipo de dato del arreglo`, this.linea, this.columna);
                }
                let arregloPivote = [];
                //console.log("aquiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiii")
                arregloPivote = this.dimenValores.interpretar(arbol, tabla).slice();
                //console.log("el arreglo pivote es:",arregloPivote);
                if (!tabla.setVariable(new Simbolo_1.default(this.tipoDato, this.identificador, arregloPivote))) {
                    arbol.Print("\nError Semántico: No se puede declarar variable porque ya existia. Linea: " + this.linea + " Columna: " + (this.columna + 1));
                    return new errores_1.default("Semántico", "No se puede declarar variable porque ya existia", this.linea, this.columna);
                }
            }
            else {
                if (this.primerTipo.getTipo() != ((_a = this.segundoTipo) === null || _a === void 0 ? void 0 : _a.getTipo())) {
                    arbol.Print("\nError Semántico: El tipo de dato no es igual al tipo de dato del arreglo. Linea: " + this.linea + " Columna: " + (this.columna + 1));
                    return new errores_1.default('Semantico', `El tipo de dato no es igual al tipo de dato del arreglo`, this.linea, this.columna);
                }
                let size = this.dimenValores.interpretar(arbol, tabla);
                if (this.dimenValores.tipoDato.getTipo() != tipo_1.tipoDato.ENTERO) {
                    arbol.Print("\nError Semántico: El tamaño del arreglo debe ser un número entero. Linea: " + this.linea + " Columna: " + (this.columna + 1));
                    return new errores_1.default("Semántico", "El tamaño del arreglo debe ser un número entero.", this.linea, this.columna);
                }
                let arregloPivote = [];
                for (let i = 0; i < size; i++) {
                    if (((_b = this.segundoTipo) === null || _b === void 0 ? void 0 : _b.getTipo()) == tipo_1.tipoDato.ENTERO) {
                        arregloPivote[i] = 0;
                    }
                    else if (((_c = this.segundoTipo) === null || _c === void 0 ? void 0 : _c.getTipo()) == tipo_1.tipoDato.DECIMAL) {
                        arregloPivote[i] = 0.0;
                    }
                    else if (((_d = this.segundoTipo) === null || _d === void 0 ? void 0 : _d.getTipo()) == tipo_1.tipoDato.CADENA) {
                        arregloPivote[i] = "";
                    }
                    else if (((_e = this.segundoTipo) === null || _e === void 0 ? void 0 : _e.getTipo()) == tipo_1.tipoDato.BOOL) {
                        arregloPivote[i] = true;
                    }
                    else if (((_f = this.segundoTipo) === null || _f === void 0 ? void 0 : _f.getTipo()) == tipo_1.tipoDato.CARACTER) {
                        arregloPivote[i] = '0';
                    }
                }
                if (!tabla.setVariable(new Simbolo_1.default(this.tipoDato, this.identificador, arregloPivote))) {
                    arbol.Print("\nError Semántico: No se puede declarar variable porque ya existia. Linea: " + this.linea + " Columna: " + (this.columna + 1));
                    return new errores_1.default("Semántico", "No se puede declarar variable porque ya existia", this.linea, this.columna);
                }
            }
        }
        else {
            arbol.Print("\nError Semántico: No se puede declarar el arreglo. Linea: " + this.linea + " Columna: " + (this.columna + 1));
            return new errores_1.default("Semántico", "No se puede declarar el arreglo", this.linea, this.columna);
        }
    }
}
exports.default = DeclaracionArreglo;
