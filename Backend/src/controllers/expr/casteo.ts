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
        let expresion = this.operandoUnico?.interpretar(arbol, tabla)
        switch (this.tipoD.getTipo()) {
            case tipoDato.ENTERO:
                return this.castearEntero(expresion);
            case tipoDato.DECIMAL:
                return this.castearDouble(expresion);
            case tipoDato.CARACTER:
                return this.castearCaracter(expresion);
            case tipoDato.CADENA:
                return this.castearCadena(expresion);
        }
    }

    castearEntero(operando: any) {
        let tipo = this.operandoUnico?.tipoDato.getTipo();
        switch (tipo) {
            case tipoDato.DECIMAL:
                this.tipoDato = new Tipo(tipoDato.ENTERO);
                return parseInt(operando);
            case tipoDato.CARACTER:
                this.tipoDato = new Tipo(tipoDato.ENTERO);
                return parseInt(operando.charCodeAt(1));
            default:
                return new Errores("Error Semantico", "No se puede castear el valor", this.linea, this.columna)
        }

    }

    castearDouble(operando: any) {
        let tipo = this.operandoUnico?.tipoDato.getTipo();
        switch (tipo) {
            case tipoDato.ENTERO:
                this.tipoDato = new Tipo(tipoDato.DECIMAL);
                return parseFloat(operando);
            case tipoDato.CARACTER:
                this.tipoDato = new Tipo(tipoDato.DECIMAL);
                return parseFloat(operando.charCodeAt(1));
            default:
                return new Errores("Error Semantico", "No se puede castear el valor", this.linea, this.columna)
        }
    }

    castearCaracter(operando: any) {
        let tipo = this.operandoUnico?.tipoDato.getTipo();
        switch (tipo) {
            case tipoDato.ENTERO:
                this.tipoDato = new Tipo(tipoDato.CARACTER);
                return String.fromCharCode(parseInt(operando));
            case tipoDato.DECIMAL:
                this.tipoDato = new Tipo(tipoDato.CARACTER);
                return String.fromCharCode(parseFloat(operando));
            default:
                return new Errores("Error Semantico", "No se puede castear el valor", this.linea, this.columna)
        }
    }

    castearCadena(operando: any) {
        let tipo = this.operandoUnico?.tipoDato.getTipo();
        switch (tipo) {
            case tipoDato.ENTERO:
                this.tipoDato = new Tipo(tipoDato.CADENA);
                return parseInt(operando).toString();
            case tipoDato.DECIMAL:
                this.tipoDato = new Tipo(tipoDato.CADENA);
                return parseFloat(operando).toString();
            case tipoDato.CARACTER:
                this.tipoDato = new Tipo(tipoDato.CADENA);
                return operando.toString();
            default:
                return new Errores("Error Semantico", "No se puede castear el valor", this.linea, this.columna)
        }
    }

    obtenerAST(anterior: string): string {
        return "";
    }

}