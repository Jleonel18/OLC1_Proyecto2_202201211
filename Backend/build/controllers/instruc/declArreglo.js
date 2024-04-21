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
    obtenerAST(anterior) {
        let result = "";
        let contador = contadorSingleton_1.default.getInstance();
        if (this.booleano == false && this.segundoTipo != undefined) {
            let tipoArr = `n${contador.getContador()}`;
            let padreID = `n${contador.getContador()}`;
            let ident = `n${contador.getContador()}`;
            let corcP1 = `n${contador.getContador()}`;
            let corcP2 = `n${contador.getContador()}`;
            let igual = `n${contador.getContador()}`;
            let nNew = `n${contador.getContador()}`;
            let tipo2 = `n${contador.getContador()}`;
            let corcS1 = `n${contador.getContador()}`;
            let exp = `n${contador.getContador()}`;
            let corcS2 = `n${contador.getContador()}`;
            let puntoComa = `n${contador.getContador()}`;
            if (this.primerTipo.getTipo() == tipo_1.tipoDato.ENTERO) {
                result += `${tipoArr}[label="int"];\n`;
            }
            else if (this.primerTipo.getTipo() == tipo_1.tipoDato.DECIMAL) {
                result += `${tipoArr}[label="double"];\n`;
            }
            else if (this.primerTipo.getTipo() == tipo_1.tipoDato.CADENA) {
                result += `${tipoArr}[label="std::string"];\n`;
            }
            else if (this.primerTipo.getTipo() == tipo_1.tipoDato.BOOL) {
                result += `${tipoArr}[label="bool"];\n`;
            }
            else if (this.primerTipo.getTipo() == tipo_1.tipoDato.CARACTER) {
                result += `${tipoArr}[label="char"];\n`;
            }
            result += `${padreID}[label="ID"];\n`;
            result += `${ident}[label="${this.identificador}"];\n`;
            result += `${corcP1}[label="["];\n`;
            result += `${corcP2}[label="]"];\n`;
            result += `${igual}[label="="];\n`;
            result += `${nNew}[label="new"];\n`;
            if (this.segundoTipo.getTipo() == tipo_1.tipoDato.ENTERO) {
                result += `${tipo2}[label="int"];\n`;
            }
            else if (this.segundoTipo.getTipo() == tipo_1.tipoDato.DECIMAL) {
                result += `${tipo2}[label="double"];\n`;
            }
            else if (this.segundoTipo.getTipo() == tipo_1.tipoDato.CADENA) {
                result += `${tipo2}[label="std::string"];\n`;
            }
            else if (this.segundoTipo.getTipo() == tipo_1.tipoDato.BOOL) {
                result += `${tipo2}[label="bool"];\n`;
            }
            else if (this.segundoTipo.getTipo() == tipo_1.tipoDato.CARACTER) {
                result += `${tipo2}[label="char"];\n`;
            }
            result += `${corcS1}[label="["];\n`;
            result += `${exp}[label="Expresion"];\n`;
            result += `${corcS2}[label="]"];\n`;
            result += `${puntoComa}[label=";"];\n`;
            result += anterior + " -> " + tipoArr + ";\n";
            result += anterior + " -> " + padreID + ";\n";
            result += padreID + " -> " + ident + ";\n";
            result += anterior + " -> " + corcP1 + ";\n";
            result += anterior + " -> " + corcP2 + ";\n";
            result += anterior + " -> " + igual + ";\n";
            result += anterior + " -> " + nNew + ";\n";
            result += anterior + " -> " + tipo2 + ";\n";
            result += anterior + " -> " + corcS1 + ";\n";
            result += anterior + " -> " + exp + ";\n";
            result += anterior + " -> " + corcS2 + ";\n";
            result += anterior + " -> " + puntoComa + ";\n";
            if (!Array.isArray(this.dimenValores)) {
                result += this.dimenValores.obtenerAST(exp);
            }
        }
        else if (this.booleano == false && this.segundoTipo == undefined) {
            let tipoArr = `n${contador.getContador()}`;
            let padreID = `n${contador.getContador()}`;
            let ident = `n${contador.getContador()}`;
            let corcP1 = `n${contador.getContador()}`;
            let corcP2 = `n${contador.getContador()}`;
            let igual = `n${contador.getContador()}`;
            let corcS1 = `n${contador.getContador()}`;
            let arreglo = [];
            let padreDatos = `n${contador.getContador()}`;
            if (Array.isArray(this.dimenValores)) {
                for (let i = 0; i < this.dimenValores.length; i++) {
                    arreglo.push(`n${contador.getContador()}`);
                }
            }
            let corcS2 = `n${contador.getContador()}`;
            let puntoComa = `n${contador.getContador()}`;
            if (this.primerTipo.getTipo() == tipo_1.tipoDato.ENTERO) {
                result += `${tipoArr}[label="int"];\n`;
            }
            else if (this.primerTipo.getTipo() == tipo_1.tipoDato.DECIMAL) {
                result += `${tipoArr}[label="double"];\n`;
            }
            else if (this.primerTipo.getTipo() == tipo_1.tipoDato.CADENA) {
                result += `${tipoArr}[label="std::string"];\n`;
            }
            else if (this.primerTipo.getTipo() == tipo_1.tipoDato.BOOL) {
                result += `${tipoArr}[label="bool"];\n`;
            }
            else if (this.primerTipo.getTipo() == tipo_1.tipoDato.CARACTER) {
                result += `${tipoArr}[label="char"];\n`;
            }
            result += `${padreID}[label="ID"];\n`;
            result += `${ident}[label="${this.identificador}"];\n`;
            result += `${corcP1}[label="["];\n`;
            result += `${corcP2}[label="]"];\n`;
            result += `${igual}[label="="];\n`;
            result += `${corcS1}[label="["];\n`;
            result += `${padreDatos}[label="Expresiones"];\n`;
            if (Array.isArray(this.dimenValores)) {
                for (let i = 0; i < this.dimenValores.length; i++) {
                    result += `${arreglo[i]}[label="Expresion"];\n`;
                }
            }
            result += `${corcS2}[label="]"];\n`;
            result += `${puntoComa}[label=";"];\n`;
            result += anterior + " -> " + tipoArr + ";\n";
            result += anterior + " -> " + padreID + ";\n";
            result += padreID + " -> " + ident + ";\n";
            result += anterior + " -> " + corcP1 + ";\n";
            result += anterior + " -> " + corcP2 + ";\n";
            result += anterior + " -> " + igual + ";\n";
            result += anterior + " -> " + corcS1 + ";\n";
            result += anterior + " -> " + padreDatos + ";\n";
            if (Array.isArray(this.dimenValores)) {
                for (let i = 0; i < this.dimenValores.length; i++) {
                    result += `${padreDatos} -> ${arreglo[i]};\n`;
                }
            }
            result += anterior + " -> " + corcS2 + ";\n";
            result += anterior + " -> " + puntoComa + ";\n";
            if (Array.isArray(this.dimenValores)) {
                for (let i = 0; i < this.dimenValores.length; i++) {
                    result += this.dimenValores[i].obtenerAST(arreglo[i]);
                }
            }
        }
        else if (this.booleano == true) {
            let tipoArr = `n${contador.getContador()}`;
            let padreID = `n${contador.getContador()}`;
            let ident = `n${contador.getContador()}`;
            let corcP1 = `n${contador.getContador()}`;
            let corcP2 = `n${contador.getContador()}`;
            let igual = `n${contador.getContador()}`;
            let exp = `n${contador.getContador()}`;
            let puntoComa = `n${contador.getContador()}`;
            if (this.primerTipo.getTipo() == tipo_1.tipoDato.CARACTER) {
                result += `${tipoArr}[label="char"];\n`;
            }
            else if (this.primerTipo.getTipo() == tipo_1.tipoDato.BOOL) {
                result += `${tipoArr}[label="bool"];\n`;
            }
            else if (this.primerTipo.getTipo() == tipo_1.tipoDato.CADENA) {
                result += `${tipoArr}[label="std::string"];\n`;
            }
            else if (this.primerTipo.getTipo() == tipo_1.tipoDato.DECIMAL) {
                result += `${tipoArr}[label="double"];\n`;
            }
            else if (this.primerTipo.getTipo() == tipo_1.tipoDato.ENTERO) {
                result += `${tipoArr}[label="int"];\n`;
            }
            result += `${padreID}[label="ID"];\n`;
            result += `${ident}[label="${this.identificador}"];\n`;
            result += `${corcP1}[label="["];\n`;
            result += `${corcP2}[label="]"];\n`;
            result += `${igual}[label="="];\n`;
            if (!Array.isArray(this.dimenValores)) {
                result += `${exp}[label="Expresion"];\n`;
            }
            result += `${puntoComa}[label=";"];\n`;
            result += anterior + " -> " + tipoArr + ";\n";
            result += anterior + " -> " + padreID + ";\n";
            result += padreID + " -> " + ident + ";\n";
            result += anterior + " -> " + corcP1 + ";\n";
            result += anterior + " -> " + corcP2 + ";\n";
            result += anterior + " -> " + igual + ";\n";
            result += anterior + " -> " + exp + ";\n";
            result += anterior + " -> " + puntoComa + ";\n";
            if (!Array.isArray(this.dimenValores)) {
                result += this.dimenValores.obtenerAST(exp);
            }
        }
        return result;
    }
}
exports.default = DeclaracionArreglo;
