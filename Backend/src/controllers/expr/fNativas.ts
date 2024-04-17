import { Instruccion } from "../abstracto/instruccion";
import Errores from "../excep/errores";
import Arbol from "../simbol/arbol";
import tablaSimbolo from "../simbol/tablaSimbolos";
import Tipo, { tipoDato } from "../simbol/tipo";

export default class FNativas extends Instruccion{

    private operacion : Operadores
    private operandoUnico: Instruccion | undefined;

    constructor(operador: Operadores, fila: number, columna: number, op1: Instruccion){
        super(new Tipo(tipoDato.ENTERO), fila, columna)
        this.operacion = operador
        this.operandoUnico = op1
    }

    interpretar(arbol: Arbol, tabla: tablaSimbolo) {
        let Unico = null
        if (this.operandoUnico != null) {
            Unico = this.operandoUnico.interpretar(arbol, tabla)
            if (Unico instanceof Errores) return Unico
        }

        switch (this.operacion) {
            case Operadores.LENGTH:
                return this.longitud(Unico);
            case Operadores.TOUPPER:
                return this.toUpper(Unico);
            case Operadores.TOLOWER:
                return this.toLower(Unico);
            case Operadores.ROUND:
                return this.round(Unico);
            case Operadores.TYPEOF:
                return this.typeof(Unico);
            case Operadores.TOSTRING:
                return this.aString(Unico);
            default:
                arbol.Print("\n Error Semántico: Operador inexistente en la linea " + this.linea + " y columna " + (this.columna+1));
                return new Errores("Semantico", "Operador Logico Invalido", this.linea, this.columna)
        }
    }

    longitud(op1: any) {
        let tipo1 = this.operandoUnico?.tipoDato.getTipo()
        switch (tipo1) {
            case tipoDato.CADENA:
                this.tipoDato = new Tipo(tipoDato.ENTERO)
                return op1.length;
            default:
                return new Errores("Semantico", "Solo es posible con Cadenas", this.linea, this.columna)
        }
    }

    toUpper(op1: any) {
        let tipo1 = this.operandoUnico?.tipoDato.getTipo()
        switch (tipo1) {
            case tipoDato.CADENA:
                this.tipoDato = new Tipo(tipoDato.CADENA)
                return op1.toUpperCase()
            default:
                return new Errores("Semantico", "Solo es posible Cadenas", this.linea, this.columna)
        }
    }

    toLower(op1: any) {
        let tipo1 = this.operandoUnico?.tipoDato.getTipo()
        switch (tipo1) {
            case tipoDato.CADENA:
                this.tipoDato = new Tipo(tipoDato.CADENA)
                return op1.toLowerCase()
            default:
                return new Errores("Semantico", "Solo es posible cadenas", this.linea, this.columna)
        }
    }

    round(op1: any) {
        let tipo1 = this.operandoUnico?.tipoDato.getTipo()
        switch (tipo1) {
            case tipoDato.DECIMAL:
                this.tipoDato = new Tipo(tipoDato.ENTERO)
                return Math.round(op1)
            case tipoDato.ENTERO:
                this.tipoDato = new Tipo(tipoDato.ENTERO)
                return op1
            default:
                return new Errores("Semantico", "Solo se pueden redondear Decimales", this.linea, this.columna)
        }
    }

    typeof(op1: any) {
        let tipo1 = this.operandoUnico?.tipoDato.getTipo()
        switch (tipo1) {
            case tipoDato.ENTERO:
                this.tipoDato = new Tipo(tipoDato.CADENA)
                return "ENTERO"
            case tipoDato.DECIMAL:
                this.tipoDato = new Tipo(tipoDato.CADENA)
                return "DECIMAL"
            case tipoDato.CADENA:
                this.tipoDato = new Tipo(tipoDato.CADENA)
                return "CADENA"
            case tipoDato.BOOL:
                this.tipoDato = new Tipo(tipoDato.CADENA)
                return "BOOL"
            case tipoDato.CARACTER:
                this.tipoDato = new Tipo(tipoDato.CADENA)
                return "CARACTER"
            default:
                return new Errores("Semantico", "No es posible convertir tipo de dato", this.linea, this.columna)
        }
    }

    aString(op1: any) {
        let tipo1 = this.operandoUnico?.tipoDato.getTipo()
        switch (tipo1) {
            case tipoDato.ENTERO:
                this.tipoDato = new Tipo(tipoDato.CADENA)
                return op1.toString()
            case tipoDato.DECIMAL:
                this.tipoDato = new Tipo(tipoDato.CADENA)
                return op1.toString()
            case tipoDato.CARACTER:
                this.tipoDato = new Tipo(tipoDato.CADENA)
                return op1.toString()
            case tipoDato.BOOL:
                this.tipoDato = new Tipo(tipoDato.CADENA)
                return op1.toString()
            default:
                return new Errores("Semantico", "No es posible convertir tipo de dato", this.linea, this.columna)
        }
    }

}

export enum Operadores {
    LENGTH,
    TOUPPER,
    TOLOWER,
    ROUND,
    TYPEOF,
    TOSTRING,
    C_STR
}