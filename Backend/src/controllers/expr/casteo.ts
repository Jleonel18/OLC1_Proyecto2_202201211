import { Instruccion } from "../abstracto/instruccion";
import Errores from "../excep/errores";
import Arbol from "../simbol/arbol";
import tablaSimbolo from "../simbol/tablaSimbolos";
import Tipo, { tipoDato } from "../simbol/tipo";
import { Operadores } from "./Aritmeticas";

export default class Casteo extends Instruccion {

    private operandoUnico: Instruccion | undefined
    private tipoD: Tipo

    constructor(operador: Tipo, fila: number, columna: number, operando: Instruccion) {
        super(new Tipo(tipoDato.VOID), fila, columna)
        this.tipoD = operador
        this.operandoUnico = operando
    }

    interpretar(arbol: Arbol, tabla: tablaSimbolo) {
        switch (this.tipoD.getTipo()) {
            case tipoDato.ENTERO:
                return this.castearEntero(this.operandoUnico?.interpretar(arbol, tabla));
            case tipoDato.DECIMAL:
                return this.castearDouble(this.operandoUnico?.interpretar(arbol, tabla));
            case tipoDato.CARACTER:
                return this.castearCaracter(this.operandoUnico?.interpretar(arbol, tabla));
            case tipoDato.CADENA:
                return this.castearCadena(this.operandoUnico?.interpretar(arbol, tabla));
        }
    }

    castearEntero(operando: any) {
        let tipo = this.operandoUnico?.tipoDato.getTipo();
        switch (tipo) {
            case tipoDato.DECIMAL:
                this.tipoD = new Tipo(tipoDato.ENTERO);
                return parseInt(operando);
            case tipoDato.CARACTER:
                this.tipoD = new Tipo(tipoDato.ENTERO);
                return parseInt(operando.charCodeAt(0));
            default:
                return new Errores("Error Semantico", "No se puede castear el valor", this.linea, this.columna)
        }

    }

    castearDouble(operando: any) {
        let tipo = this.operandoUnico?.tipoDato.getTipo();
        switch (tipo) {
            case tipoDato.ENTERO:
                this.tipoD = new Tipo(tipoDato.DECIMAL);
                return parseFloat(operando);
            case tipoDato.CARACTER:
                this.tipoD = new Tipo(tipoDato.DECIMAL);
                return parseFloat(operando.charCodeAt(0));
            default:
                return new Errores("Error Semantico", "No se puede castear el valor", this.linea, this.columna)
        }
    }

    castearCaracter(operando: any) {
        let tipo = this.operandoUnico?.tipoDato.getTipo();
        switch (tipo) {
            case tipoDato.ENTERO:
                this.tipoD = new Tipo(tipoDato.CARACTER);
                return String.fromCharCode(operando);
            case tipoDato.DECIMAL:
                this.tipoD = new Tipo(tipoDato.CARACTER);
                return String.fromCharCode(operando);
            default:
                return new Errores("Error Semantico", "No se puede castear el valor", this.linea, this.columna)
        }
    }

    castearCadena(operando: any) {
        let tipo = this.operandoUnico?.tipoDato.getTipo();
        switch (tipo) {
            case tipoDato.ENTERO:
                this.tipoD = new Tipo(tipoDato.CADENA);
                return operando.toString();
            case tipoDato.DECIMAL:
                this.tipoD = new Tipo(tipoDato.CADENA);
                return operando.toString();
            case tipoDato.CARACTER:
                this.tipoD = new Tipo(tipoDato.CADENA);
                return operando.toString();
            default:
                return new Errores("Error Semantico", "No se puede castear el valor", this.linea, this.columna)
        }
    }

}