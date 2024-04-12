import { Instruccion } from "../abstracto/instruccion";
import Errores from "../excep/errores";
import Arbol from "../simbol/arbol";
import tablaSimbolo from "../simbol/tablaSimbolos";
import Tipo, { tipoDato } from "../simbol/tipo";

export default class Relacionales extends Instruccion {

    private operando1: Instruccion | undefined
    private operando2: Instruccion | undefined
    private operacion: Operadores
    private operandoUnico: Instruccion | undefined

    constructor(operador: Operadores, fila: number, columna: number, op1: Instruccion, op2?: Instruccion) {
        super(new Tipo(tipoDato.BOOL), fila, columna)
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
            case Operadores.IGUAL:
                return this.igual(opIzq, opDer)
            case Operadores.DIFERENTE:
                return this.diferente(opIzq, opDer)
            case Operadores.MAYOR:
                return this.mayor(opIzq, opDer)
            case Operadores.MENOR:
                return this.menor(opIzq, opDer)
            case Operadores.MAYORIGUAL:
                return this.mayorIgual(opIzq, opDer)
            case Operadores.MENORIGUAL:
                return this.menorIgual(opIzq, opDer)
        }
    }

    igual(op1: any, op2: any) {
        let tipo1 = this.operando1?.tipoDato.getTipo()
        let tipo2 = this.operando2?.tipoDato.getTipo()

        switch (tipo1) {
            case tipoDato.ENTERO:
                switch (tipo2) {
                    case tipoDato.ENTERO:
                        this.tipoDato = new Tipo(tipoDato.BOOL)
                        return op1 == op2
                    case tipoDato.DECIMAL:
                        this.tipoDato = new Tipo(tipoDato.BOOL)
                        return op1 == op2
                    default:
                        return new Errores("Semantico", "No se puede comparar un ENTERO con un " + tipo2, this.linea, this.columna)
                }
            case tipoDato.DECIMAL:
                switch (tipo2) {
                    case tipoDato.ENTERO:
                        this.tipoDato = new Tipo(tipoDato.BOOL)
                        return op1 == op2
                    case tipoDato.DECIMAL:
                        this.tipoDato = new Tipo(tipoDato.BOOL)
                        return op1 == op2
                    default:
                        return new Errores("Semantico", "No se puede comparar un DECIMAL con un " + tipo2, this.linea, this.columna)
                }
            case tipoDato.CADENA:
                switch (tipo2) {
                    case tipoDato.CADENA:
                        this.tipoDato = new Tipo(tipoDato.BOOL)
                        return op1 == op2
                    default:
                        return new Errores("Semantico", "No se puede comparar una CADENA con un " + tipo2, this.linea, this.columna)
                }
            case tipoDato.BOOL:
                switch (tipo2) {
                    case tipoDato.BOOL:
                        this.tipoDato = new Tipo(tipoDato.BOOL)
                        return op1 == op2
                    default:
                        return new Errores("Semantico", "No se puede comparar un BOOL con un " + tipo2, this.linea, this.columna)
                }
            case tipoDato.CARACTER:
                switch (tipo2) {
                    case tipoDato.CARACTER:
                        this.tipoDato = new Tipo(tipoDato.BOOL)
                        return op1 == op2
                    case tipoDato.CADENA:
                        this.tipoDato = new Tipo(tipoDato.BOOL)
                        return op1 == op2
                    default:
                        return new Errores("Semantico", "No se puede comparar un CARACTER con un " + tipo2, this.linea, this.columna)
                }
        }
    }

    diferente(op1: any, op2: any) {

        let tipo1 = this.operando1?.tipoDato.getTipo()
        let tipo2 = this.operando2?.tipoDato.getTipo()

        switch (tipo1) {
            case tipoDato.ENTERO:
                switch (tipo2) {
                    case tipoDato.ENTERO:
                        this.tipoDato = new Tipo(tipoDato.BOOL)
                        return op1 != op2
                    case tipoDato.DECIMAL:
                        this.tipoDato = new Tipo(tipoDato.BOOL)
                        return op1 != op2
                    default:
                        return new Errores("Semantico", "No se puede comparar un DECIMAL con un " + tipo2, this.linea, this.columna)
                }
            case tipoDato.DECIMAL:
                switch (tipo2) {
                    case tipoDato.ENTERO:
                        this.tipoDato = new Tipo(tipoDato.BOOL)
                        return op1 != op2
                    case tipoDato.DECIMAL:
                        this.tipoDato = new Tipo(tipoDato.BOOL)
                        return op1 != op2
                    default:
                        return new Errores("Semantico", "No se puede comparar un ENTERO con un " + tipo2, this.linea, this.columna)
                }
            case tipoDato.CADENA:
                switch (tipo2) {
                    case tipoDato.CADENA:
                        this.tipoDato = new Tipo(tipoDato.BOOL)
                        return op1 != op2
                    default:
                        return new Errores("Semantico", "No se puede comparar una CADENA con un " + tipo2, this.linea, this.columna)
                }
            case tipoDato.BOOL:
                switch (tipo2) {
                    case tipoDato.BOOL:
                        this.tipoDato = new Tipo(tipoDato.BOOL)
                        return op1 != op2
                    default: 
                        return new Errores("Semantico", "No se puede comparar un BOOL con un " + tipo2, this.linea, this.columna)
                }
            case tipoDato.CARACTER:
                switch (tipo2) {
                    case tipoDato.CARACTER:
                        this.tipoDato = new Tipo(tipoDato.BOOL)
                        return op1 != op2
                    case tipoDato.CADENA:
                        this.tipoDato = new Tipo(tipoDato.BOOL)
                        return op1 != op2
                    default:
                        return new Errores("Semantico", "No se puede comparar un CARACTER con un " + tipo2, this.linea, this.columna)
                }
        }
    }

    mayor(op1: any, op2: any) {

        let tipo1 = this.operando1?.tipoDato.getTipo()
        let tipo2 = this.operando2?.tipoDato.getTipo()

        switch (tipo1) {
            case tipoDato.ENTERO:
                switch (tipo2) {
                    case tipoDato.ENTERO:
                        this.tipoDato = new Tipo(tipoDato.BOOL)
                        return parseInt(op1) > parseInt(op2)
                    case tipoDato.DECIMAL:
                        this.tipoDato = new Tipo(tipoDato.BOOL)
                        return parseInt(op1) > parseFloat(op2)
                    default:
                        return new Errores("Semantico", "No se puede comparar un ENTERO con un " + tipo2, this.linea, this.columna)
                }
            case tipoDato.DECIMAL:
                switch (tipo2) {
                    case tipoDato.ENTERO:
                        this.tipoDato = new Tipo(tipoDato.BOOL)
                        return parseFloat(op1) > parseInt(op2)
                    case tipoDato.DECIMAL:
                        this.tipoDato = new Tipo(tipoDato.BOOL)
                        return parseFloat(op1) > parseFloat(op2)
                    default:
                        return new Errores("Semantico", "No se puede comparar un DECIMAL con un " + tipo2, this.linea, this.columna)
                }
            default:
                return new Errores("Semantico", "Comparación inválida " + tipo2, this.linea, this.columna)
        }
    }

    menor(op1: any, op2: any) {

        let tipo1 = this.operando1?.tipoDato.getTipo()
        let tipo2 = this.operando2?.tipoDato.getTipo()

        switch (tipo1) {
            case tipoDato.ENTERO:
                switch (tipo2) {
                    case tipoDato.ENTERO:
                        this.tipoDato = new Tipo(tipoDato.BOOL)
                        
                        return parseInt(op1) < parseInt(op2)
                    case tipoDato.DECIMAL:
                        this.tipoDato = new Tipo(tipoDato.BOOL)
                        return parseInt(op1) < parseFloat(op2)
                    default:
                        return new Errores("Semantico", "No se puede comparar un ENTERO con un " + tipo2, this.linea, this.columna)
                }
            case tipoDato.DECIMAL:
                switch (tipo2) {
                    case tipoDato.ENTERO:
                        this.tipoDato = new Tipo(tipoDato.BOOL)
                        return parseFloat(op1) < parseInt(op2)
                    case tipoDato.DECIMAL:
                        this.tipoDato = new Tipo(tipoDato.BOOL)
                        return parseFloat(op1) < parseFloat(op2)
                    default:
                        return new Errores("Semantico", "No se puede comparar un DECIMAL con un " + tipo2, this.linea, this.columna)
                }
            default:
                return new Errores("Semantico", "Comparación inválida " + tipo2, this.linea, this.columna)
        }

    }

    menorIgual(op1: any, op2: any) {

        let tipo1 = this.operando1?.tipoDato.getTipo()
        let tipo2 = this.operando2?.tipoDato.getTipo()

        switch (tipo1) {
            case tipoDato.ENTERO:
                switch (tipo2) {
                    case tipoDato.ENTERO:
                        this.tipoDato = new Tipo(tipoDato.BOOL)
                        return parseInt(op1) <= parseInt(op2)
                    case tipoDato.DECIMAL:
                        this.tipoDato = new Tipo(tipoDato.BOOL)
                        return parseInt(op1) <= parseFloat(op2)
                    default:
                        return new Errores("Semantico", "No se puede comparar un DECIMAL con un " + tipo2, this.linea, this.columna)
                }
            case tipoDato.DECIMAL:
                switch (tipo2) {
                    case tipoDato.ENTERO:
                        this.tipoDato = new Tipo(tipoDato.BOOL)
                        return parseFloat(op1) <= parseInt(op2)
                    case tipoDato.DECIMAL:
                        this.tipoDato = new Tipo(tipoDato.BOOL)
                        return parseFloat(op1) <= parseFloat(op2)
                    default:
                        return new Errores("Semantico", "No se puede comparar un DECIMAL con un " + tipo2, this.linea, this.columna)
                }
            default:
                return new Errores("Semantico", "Comparación inválida " + tipo2, this.linea, this.columna)
        }

    }

    mayorIgual(op1: any, op2: any) {

        let tipo1 = this.operando1?.tipoDato.getTipo()
        let tipo2 = this.operando2?.tipoDato.getTipo()

        switch (tipo1) {
            case tipoDato.ENTERO:
                switch (tipo2) {
                    case tipoDato.ENTERO:
                        this.tipoDato = new Tipo(tipoDato.BOOL)
                        return parseInt(op1) >= parseInt(op2)
                    case tipoDato.DECIMAL:
                        this.tipoDato = new Tipo(tipoDato.BOOL)
                        return parseInt(op1) >= parseFloat(op2)
                    default:
                        return new Errores("Semantico", "No se puede comparar un ENTERO con un " + tipo2, this.linea, this.columna)
                }
            case tipoDato.DECIMAL:
                switch (tipo2) {
                    case tipoDato.ENTERO:
                        this.tipoDato = new Tipo(tipoDato.BOOL)
                        return parseFloat(op1) >= parseInt(op2)
                    case tipoDato.DECIMAL:
                        this.tipoDato = new Tipo(tipoDato.BOOL)
                        return parseFloat(op1) >= parseFloat(op2)
                    default:
                        return new Errores("Semantico", "No se puede comparar un DECIMAL con un " + tipo2, this.linea, this.columna)
                }
            default:
                return new Errores("Semantico", "Comparación inválida " + tipo2, this.linea, this.columna)
        }

    }

}


export enum Operadores {
    IGUAL,
    DIFERENTE,
    MENOR,
    MAYOR,
    MENORIGUAL,
    MAYORIGUAL,
}