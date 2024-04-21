"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const instruccion_1 = require("../abstracto/instruccion");
const errores_1 = __importDefault(require("../excep/errores"));
const Simbolo_1 = __importDefault(require("../simbol/Simbolo"));
const tipo_1 = require("../simbol/tipo");
class declVector extends instruccion_1.Instruccion {
    constructor(linea, columna, tipo1, id, expresion, expresion2, datos, tipo2) {
        super(tipo1, linea, columna);
        this.tipo1 = tipo1;
        this.tipo2 = tipo2;
        this.id = id;
        this.expresion = expresion;
        this.expresion2 = expresion2;
        this.datos = datos;
    }
    interpretar(arbol, tabla) {
        var _a;
        if (!Array.isArray(this.expresion) && !Array.isArray(this.expresion2)) {
            if (this.tipo1.getTipo() != ((_a = this.tipo2) === null || _a === void 0 ? void 0 : _a.getTipo()))
                return new errores_1.default("Semantico", "Los tipos son diferentes para la declaracion del vector", this.linea, this.columna);
            let qt1 = this.expresion.interpretar(arbol, tabla);
            let qt2 = this.expresion2.interpretar(arbol, tabla);
            if (qt1 instanceof errores_1.default)
                return qt1;
            if (qt2 instanceof errores_1.default)
                return qt2;
            if (this.expresion.tipoDato.getTipo() != tipo_1.tipoDato.ENTERO) {
                arbol.Print("Error Semantico: La variable para el tamaño del vector no es de tipo Entero. linea:" + this.linea + " columna: " + (this.columna + 1));
                return new errores_1.default("Semántico", "La variable para el tamaño del vector no es de tipo Entero", this.linea, this.columna);
            }
            if (this.expresion2.tipoDato.getTipo() != tipo_1.tipoDato.ENTERO) {
                arbol.Print("Error Semantico: La variable para el tamaño del vector no es de tipo Entero. linea:" + this.linea + " columna: " + (this.columna + 1));
                return new errores_1.default("Semántico", "La variable para el tamaño del vector no es de tipo Entero", this.linea, this.columna);
            }
            qt1 = parseInt(qt1);
            qt2 = parseInt(qt2);
            let nuevoArray = new Array(qt1);
            let valorA;
            if (this.tipo1.getTipo() == tipo_1.tipoDato.ENTERO) {
                valorA = 0;
            }
            else if (this.tipo1.getTipo() == tipo_1.tipoDato.DECIMAL) {
                valorA = 0.0;
            }
            else if (this.tipo1.getTipo() == tipo_1.tipoDato.BOOL) {
                valorA = true;
            }
            else if (this.tipo1.getTipo() == tipo_1.tipoDato.CARACTER) {
                valorA = '0';
            }
            else if (this.tipo1.getTipo() == tipo_1.tipoDato.CADENA) {
                valorA = "";
            }
            for (let i = 0; i < qt1; i++) {
                nuevoArray[i] = new Array(qt2);
            }
            for (let i = 0; i < qt1; i++) {
                for (let j = 0; j < qt2; j++) {
                    nuevoArray[i][j] = valorA;
                }
            }
            if (!tabla.setVariable(new Simbolo_1.default(this.tipoDato, this.id, nuevoArray))) {
                arbol.Print("Error Semantico: No se puede declarar el vector, porque ya existe la variable " + this.id + ". linea:" + this.linea + " columna: " + (this.columna + 1));
                return new errores_1.default("Semantico", "No se puede declarar el vector, porque ya existe la variable " + this.id, this.linea, this.columna);
            }
        }
        else if (this.datos.length > 0) {
            let arrr = new Array(this.datos.length);
            for (let i = 0; i < this.datos.length; i++) {
                if (Array.isArray(this.datos[i])) {
                    arrr[i] = new Array(this.datos[i].length);
                    for (let j = 0; j < this.datos[i].length; j++) {
                        let valor = this.datos[i][j].interpretar(arbol, tabla);
                        if (valor instanceof errores_1.default)
                            return valor;
                        if (this.tipo1.getTipo() != this.datos[i][j].tipoDato.getTipo()) {
                            return new errores_1.default("Semantico", "Tipo de dato distinto al del vector", this.linea, this.columna);
                        }
                        arrr[i][j] = valor;
                    }
                }
                else {
                    return new errores_1.default("Semantico", "Debe de ser un vector", this.linea, this.columna);
                }
            }
            if (!tabla.setVariable(new Simbolo_1.default(this.tipoDato, this.id, arrr))) {
                return new errores_1.default("Semantico", "No se puede declarar el vector, porque ya existe el ID " + this.id, this.linea, this.columna);
            }
        }
    }
    obtenerAST(anterior) {
        return "";
    }
}
exports.default = declVector;
