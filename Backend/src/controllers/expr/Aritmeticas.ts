import { Instruccion } from "../abstracto/instruccion";
import Errores from "../excep/errores";
import Arbol from "../simbol/arbol";
import tablaSimbolo from "../simbol/tablaSimbolos";
import Tipo, { tipoDato } from "../simbol/tipo";

export default class Aritmeticas extends Instruccion {
    private operando1: Instruccion | undefined
    private operando2: Instruccion | undefined
    private operacion: Operadores
    private operandoUnico: Instruccion | undefined

    constructor(operador: Operadores, fila: number, columna: number, op1: Instruccion, op2?: Instruccion) {
        super(new Tipo(tipoDato.ENTERO), fila, columna)
        this.operacion = operador
        if (!op2) this.operandoUnico = op1
        else {
            this.operando1 = op1
            this.operando2 = op2
        }
    }

    interpretar(arbol: Arbol, tabla: tablaSimbolo) {
        let opIzq, opDer, Unico = null
        if (this.operandoUnico != null) {
            Unico = this.operandoUnico.interpretar(arbol, tabla)
            if (Unico instanceof Errores) return Unico
        } else {
            opIzq = this.operando1?.interpretar(arbol, tabla)
            if (opIzq instanceof Errores) return opIzq
            opDer = this.operando2?.interpretar(arbol, tabla)
            if (opDer instanceof Errores) return opDer
        }

        switch (this.operacion) {
            case Operadores.SUMA:
                return this.suma(opIzq, opDer)
            case Operadores.RESTA:
                return this.resta(opIzq, opDer)
            case Operadores.MULTIPLICACION:
                return this.multiplicacion(opIzq, opDer)
            case Operadores.NEG:
                return this.negacion(Unico)
            case Operadores.DIVISION:
                return this.division(opIzq, opDer)
            case Operadores.MODULO:
                return this.modulo(opIzq, opDer)
            default:
                return new Errores("Semantico", "Operador Aritmetico Invalido", this.linea, this.columna)
        }
    }

    suma(op1: any, op2: any) {
        let tipo1 = this.operando1?.tipoDato.getTipo()
        let tipo2 = this.operando2?.tipoDato.getTipo()
        switch (tipo1) {
            case tipoDato.ENTERO:
                switch (tipo2) {
                    case tipoDato.ENTERO:
                        this.tipoDato = new Tipo(tipoDato.ENTERO)
                        return parseInt(op1) + parseInt(op2)
                    case tipoDato.DECIMAL:
                        this.tipoDato = new Tipo(tipoDato.DECIMAL)
                        return parseFloat(op1) + parseFloat(op2)
                    default:
                        return new Errores("Semantico", "Suma Invalida", this.linea, this.columna)
                }
            case tipoDato.DECIMAL:
                switch (tipo2) {
                    case tipoDato.ENTERO:
                        this.tipoDato = new Tipo(tipoDato.DECIMAL)
                        return parseFloat(op1) + parseFloat(op2)
                    case tipoDato.DECIMAL:
                        this.tipoDato = new Tipo(tipoDato.DECIMAL)
                        return parseFloat(op1) + parseFloat(op2)
                    default:
                        return new Errores("Semantico", "Suma Invalida", this.linea, this.columna)
                }
            default:
                return new Errores("Semantico", "Suma Invalida", this.linea, this.columna)
        }

    }

    resta(op1: any, op2: any) {
        let tipo1 = this.operando1?.tipoDato.getTipo()
        let tipo2 = this.operando2?.tipoDato.getTipo()
        switch (tipo1) {
            case tipoDato.ENTERO:
                switch (tipo2) {
                    case tipoDato.ENTERO:
                        this.tipoDato = new Tipo(tipoDato.ENTERO)
                        return parseInt(op1) - parseInt(op2)
                    case tipoDato.DECIMAL:
                        this.tipoDato = new Tipo(tipoDato.DECIMAL)
                        return parseFloat(op1) - parseFloat(op2)
                    default:
                        return new Errores("Semantico", "Resta Invalida", this.linea, this.columna)
                }
            case tipoDato.DECIMAL:
                switch (tipo2) {
                    case tipoDato.ENTERO:
                        this.tipoDato = new Tipo(tipoDato.DECIMAL)
                        return parseFloat(op1) - parseFloat(op2)
                    case tipoDato.DECIMAL:
                        this.tipoDato = new Tipo(tipoDato.DECIMAL)
                        return parseFloat(op1) - parseFloat(op2)
                    default:
                        return new Errores("Semantico", "Resta Invalida", this.linea, this.columna)
                }
            default:
                return new Errores("Semantico", "Resta Invalida", this.linea, this.columna)
        }

    }

    multiplicacion(op1: any, op2: any) {

        let tipo1 = this.operando1?.tipoDato.getTipo()
        let tipo2 = this.operando2?.tipoDato.getTipo()
        switch (tipo1) {
            case tipoDato.ENTERO:
                switch (tipo2) {
                    case tipoDato.ENTERO:
                        this.tipoDato = new Tipo(tipoDato.ENTERO)
                        return parseInt(op1) * parseInt(op2)
                    case tipoDato.DECIMAL:
                        this.tipoDato = new Tipo(tipoDato.DECIMAL)
                        return parseFloat(op1) * parseFloat(op2)
                    default:
                        return new Errores("Semantico", "Resta Invalida", this.linea, this.columna)
                }
            case tipoDato.DECIMAL:
                switch (tipo2) {
                    case tipoDato.ENTERO:
                        this.tipoDato = new Tipo(tipoDato.DECIMAL)
                        return parseFloat(op1) * parseFloat(op2)
                    case tipoDato.DECIMAL:
                        this.tipoDato = new Tipo(tipoDato.DECIMAL)
                        return parseFloat(op1) * parseFloat(op2)
                    default:
                        return new Errores("Semantico", "Resta Invalida", this.linea, this.columna)
                }
            default:
                return new Errores("Semantico", "Resta Invalida", this.linea, this.columna)
        }

    }

    division(op1: any, op2: any) {
        let tipo1 = this.operando1?.tipoDato.getTipo()
        let tipo2 = this.operando2?.tipoDato.getTipo()
        switch (tipo1) {
            case tipoDato.ENTERO:
                switch (tipo2) {
                    case tipoDato.ENTERO:
                        this.tipoDato = new Tipo(tipoDato.ENTERO)
                        return parseInt(op1) / parseInt(op2)
                    case tipoDato.DECIMAL:
                        this.tipoDato = new Tipo(tipoDato.DECIMAL)
                        return parseFloat(op1) / parseFloat(op2)
                    default:
                        return new Errores("Semantico", "Division Invalida", this.linea, this.columna)
                }
            case tipoDato.DECIMAL:
                switch (tipo2) {
                    case tipoDato.ENTERO:
                        this.tipoDato = new Tipo(tipoDato.DECIMAL)
                        return parseFloat(op1) / parseFloat(op2)
                    case tipoDato.DECIMAL:
                        this.tipoDato = new Tipo(tipoDato.DECIMAL)
                        return parseFloat(op1) / parseFloat(op2)
                    default:
                        return new Errores("Semantico", "Division Invalida", this.linea, this.columna)
                }
            default:
                return new Errores("Semantico", "Division Invalida", this.linea, this.columna)
        }
    }

    modulo(op1: any, op2: any) {
        let tipo1 = this.operando1?.tipoDato.getTipo()
        let tipo2 = this.operando2?.tipoDato.getTipo()
        switch (tipo1) {
            case tipoDato.ENTERO:
                switch (tipo2) {
                    case tipoDato.ENTERO:
                        this.tipoDato = new Tipo(tipoDato.ENTERO)
                        return parseInt(op1) % parseInt(op2)
                    case tipoDato.DECIMAL:
                        return new Errores("Semantico", "Modulo Invalido", this.linea, this.columna)
                    default:
                        return new Errores("Semantico", "Modulo Invalido", this.linea, this.columna)
                }
            case tipoDato.DECIMAL:
                return new Errores("Semantico", "Modulo Invalido", this.linea, this.columna)
            default:
                return new Errores("Semantico", "Modulo Invalido", this.linea, this.columna)
        }
    }

    negacion(op1: any) {
        let opU = this.operandoUnico?.tipoDato.getTipo()
        switch (opU) {
            case tipoDato.ENTERO:
                this.tipoDato = new Tipo(tipoDato.ENTERO)
                return parseInt(op1) * -1
            case tipoDato.DECIMAL:
                this.tipoDato = new Tipo(tipoDato.DECIMAL)
                return parseFloat(op1) * -1
            default:
                return new Errores("Semantico", "Negacion Unaria invalida", this.linea, this.columna)
        }
    }

}

export enum Operadores {
    SUMA,
    RESTA,
    MULTIPLICACION,
    DIVISION,
    MODULO,
    NEG
}