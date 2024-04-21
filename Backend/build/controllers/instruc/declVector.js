"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const instruccion_1 = require("../abstracto/instruccion");
const errores_1 = __importDefault(require("../excep/errores"));
const Simbolo_1 = __importDefault(require("../simbol/Simbolo"));
const tipo_1 = require("../simbol/tipo");
class DeclVector extends instruccion_1.Instruccion {
    constructor(linea, columna, tipo1, id, expresion, expresion2, datosVector, tipo2) {
        super(tipo1, linea, columna);
        this.tipo1 = tipo1;
        this.tipo2 = tipo2;
        this.id = id;
        this.expresion = expresion;
        this.expresion2 = expresion2;
        this.datosVector = datosVector;
    }
    interpretar(arbol, tabla) {
        var _a;
        if (!Array.isArray(this.expresion) && !Array.isArray(this.expresion2)) {
            if (this.tipo1.getTipo() != ((_a = this.tipo2) === null || _a === void 0 ? void 0 : _a.getTipo())) {
                arbol.Print("Error Semantico: Los tipos son diferentes para la declaracion del vector. linea:" + this.linea + " columna: " + (this.columna + 1));
                return new errores_1.default("Semantico", "Los tipos son diferentes para la declaracion del vector", this.linea, this.columna);
            }
            let qt1 = this.expresion.interpretar(arbol, tabla);
            let qt2 = this.expresion2.interpretar(arbol, tabla);
            if (qt1 instanceof errores_1.default)
                return qt1;
            if (qt2 instanceof errores_1.default)
                return qt2;
            if (this.expresion.tipoDato.getTipo() != tipo_1.tipoDato.ENTERO) {
                arbol.Print("Error Semántico: La variable para el tamaño del vector no es de tipo Entero. linea:" + this.linea + " columna: " + (this.columna + 1));
                return new errores_1.default("Semántico", "La variable para el tamaño del vector no es de tipo Entero", this.linea, this.columna);
            }
            if (this.expresion2.tipoDato.getTipo() != tipo_1.tipoDato.ENTERO) {
                arbol.Print("Error Semántico: La variable para el tamaño del vector no es de tipo Entero. linea:" + this.linea + " columna: " + (this.columna + 1));
                return new errores_1.default("Semántico", "La variable para el tamaño del vector no es de tipo Entero", this.linea, this.columna);
            }
            qt1 = parseInt(qt1);
            qt2 = parseInt(qt2);
            let nuevoArreglo = new Array(qt1);
            let valor;
            if (this.tipo1.getTipo() == tipo_1.tipoDato.ENTERO) {
                valor = 0;
            }
            else if (this.tipo1.getTipo() == tipo_1.tipoDato.DECIMAL) {
                valor = 0.0;
            }
            else if (this.tipo1.getTipo() == tipo_1.tipoDato.CARACTER) {
                valor = '0';
            }
            else if (this.tipo1.getTipo() == tipo_1.tipoDato.BOOL) {
                valor = true;
            }
            else if (this.tipo1.getTipo() == tipo_1.tipoDato.CADENA) {
                valor = "";
            }
            for (let i = 0; i < qt1; i++) {
                nuevoArreglo[i] = new Array(qt2);
            }
            for (let i = 0; i < qt1; i++) {
                for (let j = 0; j < qt2; j++) {
                    nuevoArreglo[i][j] = valor;
                }
            }
            if (!tabla.setVariable(new Simbolo_1.default(this.tipoDato, this.id, nuevoArreglo))) {
                arbol.Print("Error Semantico: No se puede declarar el vector, porque ya existe " + this.id + ". linea:" + this.linea + " columna: " + (this.columna + 1));
                return new errores_1.default("Semantico", "No se puede declarar el vector, porque ya existe " + this.id, this.linea, this.columna);
            }
        }
        else if (this.datosVector.length > 0) {
            let nuevoArreglo = new Array(this.datosVector.length);
            for (let i = 0; i < this.datosVector.length; i++) {
                if (Array.isArray(this.datosVector[i])) {
                    nuevoArreglo[i] = new Array(this.datosVector[i].length);
                    for (let j = 0; j < this.datosVector[i].length; j++) {
                        let valor = this.datosVector[i][j].interpretar(arbol, tabla);
                        if (valor instanceof errores_1.default)
                            return valor;
                        if (this.tipo1.getTipo() != this.datosVector[i][j].tipoDato.getTipo()) {
                            arbol.Print("Error Semantico: Los tipos de datos no coinciden. linea:" + this.linea + " columna: " + (this.columna + 1));
                            return new errores_1.default("Semantico", "Los tipos de datos no coinciden", this.linea, this.columna);
                        }
                        nuevoArreglo[i][j] = valor;
                    }
                }
                else {
                    arbol.Print("Error Semantico: Debe de ser un vector. linea:" + this.linea + " columna: " + (this.columna + 1));
                    return new errores_1.default("Semantico", "Debe de ser un vector", this.linea, this.columna);
                }
            }
            if (!tabla.setVariable(new Simbolo_1.default(this.tipoDato, this.id, nuevoArreglo))) {
                arbol.Print("Error Semantico:No fue posible declarar el vector, ya existe el ID " + this.id + ". linea:" + this.linea + " columna: " + (this.columna + 1));
                return new errores_1.default("Semantico", "no fue posible declarar el vector, ya existe el ID " + this.id, this.linea, this.columna);
            }
        }
    }
    obtenerAST(anterior) {
        return "";
    }
}
exports.default = DeclVector;
