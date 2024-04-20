import { Instruccion } from "../abstracto/instruccion";
import Errores from "../excep/errores";
import Arbol from "../simbol/arbol";
import ContadorSingleton from "../simbol/contadorSingleton";
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
                arbol.Print("\n Operador Aritmetico Invalido:" + this.linea + " y columna " + (this.columna + 1))
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
                        if (op2 == true) {
                            return parseInt(op1) + 1
                        } else {
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
                        if (op2 == true) {
                            return parseFloat(op1) + 1
                        } else {
                            return parseFloat(op1) + 0
                        }
                    case tipoDato.CARACTER:
                        this.tipoDato = new Tipo(tipoDato.DECIMAL)
                        return parseFloat(op1) + parseFloat(op2.charCodeAt(1))
                    default:
                        return new Errores("Semantico", "Suma Invalida", this.linea, this.columna)
                }

            case tipoDato.BOOL:
                switch (tipo2) {
                    case tipoDato.ENTERO:
                        this.tipoDato = new Tipo(tipoDato.ENTERO)
                        if (op1 == true) {
                            return 1 + parseInt(op2)
                        } else {
                            return 0 + parseInt(op2)
                        }
                    case tipoDato.DECIMAL:
                        this.tipoDato = new Tipo(tipoDato.DECIMAL)
                        if (op1 == true) {
                            return 1 + parseFloat(op2)
                        } else {
                            return 0 + parseFloat(op2)
                        }
                    case tipoDato.CADENA:
                        this.tipoDato = new Tipo(tipoDato.CADENA)
                        if (op1 == true) {
                            return 'true' + op2
                        } else {
                            return 'false' + op2
                        }
                    default:
                        return new Errores("Semantico", "Suma Invalida", this.linea, this.columna)
                }
            case tipoDato.CARACTER:
                switch (tipo2) {
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
                switch (tipo2) {
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
                        if (op2 == true) {
                            return op1 + 'true'
                        } else {
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
                        if (op2 == 'true') {
                            return parseInt(op1) - 1
                        } else {
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
                        if (op2 == 'true') {
                            return parseFloat(op1) - 1
                        } else {
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
                        if (op1 == 'true') {
                            return 1 - parseInt(op2)
                        } else {
                            return 0 - parseInt(op2)
                        }
                    case tipoDato.DECIMAL:
                        this.tipoDato = new Tipo(tipoDato.DECIMAL)
                        if (op1 == 'true') {
                            return 1 - parseFloat(op2)
                        } else {
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

    obtenerAST(anterior: string): string {

        let contador = ContadorSingleton.getInstance();
        let result = ""
        if (this.operacion == Operadores.NEG) {

            let nodoNeg = `n${contador.getContador()}`
            let nodoExp = `n${contador.getContador()}`
            result += `${nodoNeg}[label=\"Negacion Unaria\"];\n`
            result += `${nodoExp}[label=\"Expresion\"];\n`
            result += `${anterior}->${nodoNeg};\n`
            result += `${anterior}-> ${nodoExp};\n`
            result += this.operandoUnico?.obtenerAST(nodoExp)
            //return result;
        } else if (this.operacion == Operadores.SUMA) {

            let exp1 = `n${contador.getContador()}`
            let nodoOp = `n${contador.getContador()}`
            let exp2 = `n${contador.getContador()}`

            result += `${exp1}[label= \"Expresion\"];\n`
            result += `${nodoOp}[label=\"+\"];\n`
            result += `${exp2}[label=\"Expresion\"];\n`
            result += `${anterior} -> ${exp1};\n`
            result += `${anterior} -> ${nodoOp};\n`
            result += `${anterior} -> ${exp2};\n`
            result += this.operando1?.obtenerAST(exp1)
            result += this.operando2?.obtenerAST(exp2)

        }else if(this.operacion == Operadores.RESTA){

            let exp1 = `n${contador.getContador()}`
            let nodoOp = `n${contador.getContador()}`
            let exp2 = `n${contador.getContador()}`

            result += `${exp1}[label= \"Expresion\"];\n`
            result += `${nodoOp}[label=\"-\"];\n`
            result += `${exp2}[label=\"Expresion\"];\n`
            result += `${anterior} -> ${exp1};\n`
            result += `${anterior} -> ${nodoOp};\n`
            result += `${anterior} -> ${exp2};\n`
            result += this.operando1?.obtenerAST(exp1)
            result += this.operando2?.obtenerAST(exp2)

        }else if(this.operacion == Operadores.MULTIPLICACION){

            let exp1 = `n${contador.getContador()}`
            let nodoOp = `n${contador.getContador()}`
            let exp2 = `n${contador.getContador()}`

            result += `${exp1}[label= \"Expresion\"];\n`
            result += `${nodoOp}[label=\"*\"];\n`
            result += `${exp2}[label=\"Expresion\"];\n`
            result += `${anterior} -> ${exp1};\n`
            result += `${anterior} -> ${nodoOp};\n`
            result += `${anterior} -> ${exp2};\n`
            result += this.operando1?.obtenerAST(exp1)
            result += this.operando2?.obtenerAST(exp2)
        }else if(this.operacion == Operadores.DIVISION){

            let exp1 = `n${contador.getContador()}`
            let nodoOp = `n${contador.getContador()}`
            let exp2 = `n${contador.getContador()}`

            result += `${exp1}[label= \"Expresion\"];\n`
            result += `${nodoOp}[label=\"/\"];\n`
            result += `${exp2}[label=\"Expresion\"];\n`
            result += `${anterior} -> ${exp1};\n`
            result += `${anterior} -> ${nodoOp};\n`
            result += `${anterior} -> ${exp2};\n`
            result += this.operando1?.obtenerAST(exp1)
            result += this.operando2?.obtenerAST(exp2)

        }else if(this.operacion == Operadores.MODULO){

            let exp1 = `n${contador.getContador()}`
            let nodoOp = `n${contador.getContador()}`
            let exp2 = `n${contador.getContador()}`

            result += `${exp1}[label= \"Expresion\"];\n`
            result += `${nodoOp}[label=\"%\"];\n`
            result += `${exp2}[label=\"Expresion\"];\n`
            result += `${anterior} -> ${exp1};\n`
            result += `${anterior} -> ${nodoOp};\n`
            result += `${anterior} -> ${exp2};\n`
            result += this.operando1?.obtenerAST(exp1)
            result += this.operando2?.obtenerAST(exp2)
        }else if(this.operacion == Operadores.POTENCIA){

            let exp1 = `n${contador.getContador()}`
            let exp2 = `n${contador.getContador()}`
            let par1 = `n${contador.getContador()}`
            let par2 = `n${contador.getContador()}`
            let nodoPow = `n${contador.getContador()}`
            let nodoComa = `n${contador.getContador()}`
            result += `${nodoPow}[label="pow"];\n`
            result += `${par1}[label="("];\n`
            result += `${exp1}[label="Expresion"];\n`
            result += `${nodoComa}[label=","];\n`
            result += `${exp2}[label="Expresion"];\n`
            result += `${par2}[label=")"];\n`
            result += `${anterior} -> ${nodoPow};\n`
            result += `${anterior} -> ${par1};\n`
            result += `${anterior} -> ${exp1};\n`
            result += `${anterior} -> ${nodoComa};\n`
            result += `${anterior} -> ${exp2};\n`
            result += `${anterior} -> ${par2};\n`

            result += this.operando1?.obtenerAST(exp1)
            result += this.operando2?.obtenerAST(exp2)

        }

        return result;


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