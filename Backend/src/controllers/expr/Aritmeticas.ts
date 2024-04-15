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
            case Operadores.POTENCIA:
                return this.potencia(opIzq, opDer)
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
                    case tipoDato.CADENA:
                        this.tipoDato = new Tipo(tipoDato.CADENA)
                        return parseInt(op1) + op2
                    case tipoDato.BOOL:
                        this.tipoDato = new Tipo(tipoDato.ENTERO)
                        if(op2 == true){
                            return parseInt(op1) + 1
                        }else{
                            return parseInt(op1) + 0
                        }
                    case tipoDato.CARACTER:
                        this.tipoDato = new Tipo(tipoDato.ENTERO)
                        return parseInt(op1) + parseInt(op2.charCodeAt(1))
                        
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
                    case tipoDato.CADENA:
                        this.tipoDato = new Tipo(tipoDato.CADENA)
                        return parseFloat(op1) + op2
                    case tipoDato.BOOL:
                        this.tipoDato = new Tipo(tipoDato.DECIMAL)
                        if(op2 == true){
                            return parseFloat(op1) + 1
                        }else{
                            return parseFloat(op1) + 0
                        }
                    case tipoDato.CARACTER:
                        this.tipoDato = new Tipo(tipoDato.DECIMAL)
                        return parseFloat(op1) + parseFloat(op2.charCodeAt(1))
                    default:
                        return new Errores("Semantico", "Suma Invalida", this.linea, this.columna)
                }

            case tipoDato.BOOL:
                switch(tipo2){
                    case tipoDato.ENTERO:
                        this.tipoDato = new Tipo(tipoDato.ENTERO)
                        if(op1 == true){
                            return 1 + parseInt(op2)
                        }else{
                            return 0 + parseInt(op2)
                        }
                    case tipoDato.DECIMAL:
                        this.tipoDato = new Tipo(tipoDato.DECIMAL)
                        if(op1 == true){
                            return 1 + parseFloat(op2)
                        }else{
                            return 0 + parseFloat(op2)
                        }
                    case tipoDato.CADENA:
                        this.tipoDato = new Tipo(tipoDato.CADENA)
                        if(op1 == true){
                            return 'true' + op2
                        }else{
                            return 'false' + op2
                        }
                    default:
                        return new Errores("Semantico", "Suma Invalida", this.linea, this.columna)
                }
            case tipoDato.CARACTER:
                switch(tipo2){
                    case tipoDato.ENTERO:
                        this.tipoDato = new Tipo(tipoDato.ENTERO)
                        return parseInt(op1.charCodeAt(1)) + parseInt(op2)
                    case tipoDato.DECIMAL:
                        this.tipoDato = new Tipo(tipoDato.DECIMAL)
                        return parseInt(op1.charCodeAt(1)) + parseFloat(op2)
                    case tipoDato.CADENA:
                        this.tipoDato = new Tipo(tipoDato.CADENA)
                        return op1 + op2
                    case tipoDato.CARACTER:
                        this.tipoDato = new Tipo(tipoDato.CADENA)
                        return op1 + op2
                    default:
                        return new Errores("Semantico", "Suma Invalida", this.linea, this.columna)
                }
            case tipoDato.CADENA:
                switch(tipo2){
                    case tipoDato.ENTERO:
                        this.tipoDato = new Tipo(tipoDato.CADENA)
                        return op1 + parseInt(op2)
                    case tipoDato.DECIMAL:
                        this.tipoDato = new Tipo(tipoDato.CADENA)
                        return op1 + parseFloat(op2)
                    case tipoDato.CADENA:
                        this.tipoDato = new Tipo(tipoDato.CADENA)
                        return op1 + op2
                    case tipoDato.BOOL:
                        this.tipoDato = new Tipo(tipoDato.CADENA)
                        if(op2 == true){
                            return op1 + 'true'
                        }else{
                            return op1 + 'false'
                        }
                    case tipoDato.CARACTER:
                        this.tipoDato = new Tipo(tipoDato.CADENA)
                        return op1 + op2
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
                    case tipoDato.CARACTER:
                        this.tipoDato = new Tipo(tipoDato.ENTERO)
                        return parseInt(op1) - parseInt(op2.charCodeAt(1))
                    case tipoDato.BOOL:
                        this.tipoDato = new Tipo(tipoDato.ENTERO)
                        if(op2 == 'true'){
                            return parseInt(op1) - 1
                        }else{
                            return parseInt(op1) - 0
                        }
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
                    case tipoDato.CARACTER:
                        this.tipoDato = new Tipo(tipoDato.DECIMAL)
                        return parseFloat(op1) - parseFloat(op2.charCodeAt())
                    case tipoDato.BOOL:
                        this.tipoDato = new Tipo(tipoDato.DECIMAL)
                        if(op2 == 'true'){
                            return parseFloat(op1) - 1
                        }else{
                            return parseFloat(op1) - 0
                        }
                    default:
                        return new Errores("Semantico", "Resta Invalida", this.linea, this.columna)
                }
            case tipoDato.CARACTER:
                switch (tipo2) {
                    case tipoDato.ENTERO:
                        this.tipoDato = new Tipo(tipoDato.ENTERO)
                        return parseInt(op1.charCodeAt(1)) - parseInt(op2)
                    case tipoDato.DECIMAL:
                        this.tipoDato = new Tipo(tipoDato.DECIMAL)
                        return parseInt(op1.charCodeAt(1)) - parseFloat(op2)
                    default:
                        return new Errores("Semantico", "Resta Invalida", this.linea, this.columna)
                }
            case tipoDato.BOOL:
                switch (tipo2) {
                    case tipoDato.ENTERO:
                        this.tipoDato = new Tipo(tipoDato.ENTERO)
                        if(op1 == 'true'){
                            return 1 - parseInt(op2)
                        }else{
                            return 0 - parseInt(op2)
                        }
                    case tipoDato.DECIMAL:
                        this.tipoDato = new Tipo(tipoDato.DECIMAL)
                        if(op1 == 'true'){
                            return 1 - parseFloat(op2)
                        }else{
                            return 0 - parseFloat(op2)
                        }
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
                    case tipoDato.CARACTER:
                        this.tipoDato = new Tipo(tipoDato.ENTERO)
                        return parseInt(op1) * parseInt(op2.charCodeAt(1))
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
                    case tipoDato.CARACTER:
                        this.tipoDato = new Tipo(tipoDato.DECIMAL)
                        return parseFloat(op1) * parseFloat(op2.charCodeAt(1))
                    default:
                        return new Errores("Semantico", "Resta Invalida", this.linea, this.columna)
                }
            case tipoDato.CARACTER:
                switch (tipo2) {
                    case tipoDato.ENTERO:
                        this.tipoDato = new Tipo(tipoDato.ENTERO)
                        return parseInt(op1.charCodeAt(1)) * parseInt(op2)
                    case tipoDato.DECIMAL:
                        this.tipoDato = new Tipo(tipoDato.DECIMAL)
                        return parseInt(op1.charCodeAt(1)) * parseFloat(op2)
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
                    case tipoDato.CARACTER:
                        this.tipoDato = new Tipo(tipoDato.ENTERO)
                        return parseInt(op1) / parseInt(op2.charCodeAt(1))
                    default:
                        return new Errores("Semantico", "Resta Invalida", this.linea, this.columna)
                }
            case tipoDato.DECIMAL:
                switch (tipo2) {
                    case tipoDato.ENTERO:
                        this.tipoDato = new Tipo(tipoDato.DECIMAL)
                        return parseFloat(op1) / parseFloat(op2)
                    case tipoDato.DECIMAL:
                        this.tipoDato = new Tipo(tipoDato.DECIMAL)
                        return parseFloat(op1) / parseFloat(op2)
                    case tipoDato.CARACTER:
                        this.tipoDato = new Tipo(tipoDato.DECIMAL)
                        return parseFloat(op1) / parseFloat(op2.charCodeAt(1))
                    default:
                        return new Errores("Semantico", "Resta Invalida", this.linea, this.columna)
                }
            case tipoDato.CARACTER:
                switch (tipo2) {
                    case tipoDato.ENTERO:
                        this.tipoDato = new Tipo(tipoDato.ENTERO)
                        return parseInt(op1.charCodeAt(1)) / parseInt(op2)
                    case tipoDato.DECIMAL:
                        this.tipoDato = new Tipo(tipoDato.DECIMAL)
                        return parseInt(op1.charCodeAt(1)) / parseFloat(op2)
                    default:
                        return new Errores("Semantico", "Resta Invalida", this.linea, this.columna)
                }
            default:
                return new Errores("Semantico", "Resta Invalida", this.linea, this.columna)
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
                        this.tipoDato = new Tipo(tipoDato.DECIMAL)
                        return parseFloat(op1) % parseFloat(op2)
                    default:
                        return new Errores("Semantico", "Modulo Invalido", this.linea, this.columna)
                }
            case tipoDato.DECIMAL:
                switch (tipo2) {
                    case tipoDato.ENTERO:
                        this.tipoDato = new Tipo(tipoDato.DECIMAL)
                        return parseFloat(op1) % parseFloat(op2)
                    case tipoDato.DECIMAL:
                        this.tipoDato = new Tipo(tipoDato.DECIMAL)
                        return parseFloat(op1) % parseFloat(op2)
                    default:
                        return new Errores("Semantico", "Modulo Invalido", this.linea, this.columna)
                }
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
    
    potencia(op1: any, op2: any) {
        let tipo1 = this.operando1?.tipoDato.getTipo()
        let tipo2 = this.operando2?.tipoDato.getTipo()
        switch (tipo1) {
            case tipoDato.ENTERO:
                switch (tipo2) {
                    case tipoDato.ENTERO:
                        this.tipoDato = new Tipo(tipoDato.ENTERO)
                        return Math.pow(parseInt(op1), parseInt(op2))
                    case tipoDato.DECIMAL:
                        this.tipoDato = new Tipo(tipoDato.DECIMAL)
                        return Math.pow(parseInt(op1), parseFloat(op2))
                    default:
                        return new Errores("Semantico", "Potencia Invalida", this.linea, this.columna)
                }
            case tipoDato.DECIMAL:
                switch (tipo2) {
                    case tipoDato.ENTERO:
                        this.tipoDato = new Tipo(tipoDato.DECIMAL)
                        return Math.pow(parseFloat(op1), parseInt(op2))
                    case tipoDato.DECIMAL:
                        this.tipoDato = new Tipo(tipoDato.DECIMAL)
                        return Math.pow(parseFloat(op1), parseFloat(op2))
                    default:
                        return new Errores("Semantico", "Potencia Invalida", this.linea, this.columna)
                }
            default:
                return new Errores("Semantico", "Potencia Invalida", this.linea, this.columna)
        }
    }

}

export enum Operadores {
    SUMA,
    RESTA,
    MULTIPLICACION,
    DIVISION,
    MODULO,
    NEG,
    POTENCIA
}