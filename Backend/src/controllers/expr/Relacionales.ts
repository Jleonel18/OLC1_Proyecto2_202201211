import { Instruccion } from "../abstracto/instruccion";
import Errores from "../excep/errores";
import Arbol from "../simbol/arbol";
import ContadorSingleton from "../simbol/contadorSingleton";
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
                    case tipoDato.BOOL:

                        if(op2 == true){
                            return parseInt(op1) == 1;
                        }else{
                            return parseInt(op1) == 0;
                        }
                    case tipoDato.CARACTER:

                        this.tipoDato = new Tipo(tipoDato.BOOL)
                        return parseInt(op1) == op2.charCodeAt(1)

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
                    case tipoDato.BOOL:
                        if(op2 == true){
                            return parseFloat(op1) == 1;
                        }else{
                            return parseFloat(op1) == 0;
                        }
                    case tipoDato.CARACTER:
                        this.tipoDato = new Tipo(tipoDato.BOOL)
                        return parseFloat(op1) == op2.charCodeAt(1)
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
                    case tipoDato.ENTERO:
                        if(op1 == true){
                            return 1 == op2;
                        }else{
                            return 0 == op2;
                        }
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
                    case tipoDato.ENTERO:
                        this.tipoDato = new Tipo(tipoDato.BOOL)
                        return op1.charCodeAt(1) == parseInt(op2)
                    case tipoDato.DECIMAL:
                        this.tipoDato = new Tipo(tipoDato.BOOL)
                        return op1.charCodeAt(1) == parseFloat(op2)
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
                    case tipoDato.BOOL:
                        if(op2 == true){
                            return parseInt(op1) != 1;
                        }else{
                            return parseInt(op1) != 0;
                        }
                    case tipoDato.CARACTER:
                        this.tipoDato = new Tipo(tipoDato.BOOL)
                        return parseInt(op1) != op2.charCodeAt(1)
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
                    case tipoDato.BOOL:
                        if(op2 == true){
                            return parseFloat(op1) != 1;
                        }else{
                            return parseFloat(op1) != 0;
                        }
                    case tipoDato.CARACTER:
                        this.tipoDato = new Tipo(tipoDato.BOOL)
                        return parseFloat(op1) != op2.charCodeAt(1)
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
                    case tipoDato.ENTERO:
                        if(op1 == true){
                            return 1 != parseInt(op2);
                        }else{
                            return 0 != parseInt(op2);
                        }
                    case tipoDato.DECIMAL:
                        if(op1 == true){
                            return 1 != parseFloat(op2);
                        }else{
                            return 0 != parseFloat(op2);
                        }
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
                    case tipoDato.ENTERO:
                        this.tipoDato = new Tipo(tipoDato.BOOL)
                        return op1.charCodeAt(1) != parseInt(op2)
                    case tipoDato.DECIMAL:
                        this.tipoDato = new Tipo(tipoDato.BOOL)
                        return op1.charCodeAt(1) != parseFloat(op2)
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
                    case tipoDato.BOOL:
                        if(op2 == true){
                            return parseInt(op1) > 1;
                        }else{
                            return parseInt(op1) > 0;
                        }
                    case tipoDato.CARACTER:
                        this.tipoDato = new Tipo(tipoDato.BOOL)
                        return parseInt(op1) > op2.charCodeAt(1)
                    
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
                    case tipoDato.BOOL:
                        if(op2 == true){
                            return parseFloat(op1) > 1;
                        }else{
                            return parseFloat(op1) > 0;
                        }
                    case tipoDato.CARACTER:
                        this.tipoDato = new Tipo(tipoDato.BOOL)
                        return parseFloat(op1) > op2.charCodeAt(1)
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
                    case tipoDato.BOOL:
                        if(op2 == true){
                            return parseInt(op1) < 1;
                        }else{
                            return parseInt(op1) < 0;
                        }
                    case tipoDato.CARACTER:
                        this.tipoDato = new Tipo(tipoDato.BOOL)
                        return parseInt(op1) < op2.charCodeAt(1)
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
                    case tipoDato.BOOL:
                        if(op2 == true){
                            return parseFloat(op1) < 1;
                        }else{
                            return parseFloat(op1) < 0;
                        }
                    case tipoDato.CARACTER:
                        this.tipoDato = new Tipo(tipoDato.BOOL)
                        return parseFloat(op1) < op2.charCodeAt(1)
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
                    case tipoDato.BOOL:
                        if(op2 == true){
                            return parseInt(op1) <= 1;
                        }else{
                            return parseInt(op1) <= 0;
                        }
                    case tipoDato.CARACTER:
                        this.tipoDato = new Tipo(tipoDato.BOOL)
                        return parseInt(op1) <= op2.charCodeAt(1)
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
                    case tipoDato.BOOL:
                        if(op2 == true){
                            return parseFloat(op1) <= 1;
                        }else{
                            return parseFloat(op1) <= 0;
                        }
                    case tipoDato.CARACTER:
                        this.tipoDato = new Tipo(tipoDato.BOOL)
                        return parseFloat(op1) <= op2.charCodeAt(1)
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
                    case tipoDato.BOOL:
                        if(op2 == true){
                            return parseInt(op1) >= 1;
                        }else{
                            return parseInt(op1) >= 0;
                        }
                    case tipoDato.CARACTER:
                        this.tipoDato = new Tipo(tipoDato.BOOL)
                        return parseInt(op1) >= op2.charCodeAt(1)
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
                    case tipoDato.BOOL:
                        if(op2 == true){
                            return parseFloat(op1) >= 1;
                        }else{
                            return parseFloat(op1) >= 0;
                        }
                    case tipoDato.CARACTER:
                        this.tipoDato = new Tipo(tipoDato.BOOL)
                        return parseFloat(op1) >= op2.charCodeAt(1)
                    default:
                        return new Errores("Semantico", "No se puede comparar un DECIMAL con un " + tipo2, this.linea, this.columna)
                }
            default:
                return new Errores("Semantico", "Comparación inválida " + tipo2, this.linea, this.columna)
        }

    }

    obtenerAST(anterior: string): string {
        
        let contador = ContadorSingleton.getInstance();
        let result =""

        if(this.operacion == Operadores.IGUAL){

            let exp1 = `n${contador.getContador()}`
            let exp2 = `n${contador.getContador()}`
            let operando = `n${contador.getContador()}`

            result += `${exp1}[label = "Expresion"];\n`
            result += `${operando}[label = "=="];\n`
            result += `${exp2}[label = "Expresion"];\n`
            
            result += `${anterior} -> ${exp1};\n`
            result += `${anterior} -> ${operando};\n`
            result += `${anterior} -> ${exp2};\n`

            result += this.operando1?.obtenerAST(exp1)
            result += this.operando2?.obtenerAST(exp2)

        }else if(this.operacion == Operadores.DIFERENTE){

            let exp1 = `n${contador.getContador()}`
            let exp2 = `n${contador.getContador()}`
            let operando = `n${contador.getContador()}`

            result += `${exp1}[label = "Expresion"];\n`
            result += `${operando}[label = "!="];\n`
            result += `${exp2}[label = "Expresion"];\n`

            result += `${anterior} -> ${exp1};\n`
            result += `${anterior} -> ${operando};\n`
            result += `${anterior} -> ${exp2};\n`

            result += this.operando1?.obtenerAST(exp1)
            result += this.operando2?.obtenerAST(exp2)

        }else if(this.operacion == Operadores.MAYOR){

            let exp1 = `n${contador.getContador()}`
            let exp2 = `n${contador.getContador()}`
            let operando = `n${contador.getContador()}`

            result += `${exp1}[label = "Expresion"];\n`
            result += `${operando}[label = ">"];\n`
            result += `${exp2}[label = "Expresion"];\n`

            result += `${anterior} -> ${exp1};\n`
            result += `${anterior} -> ${operando};\n`
            result += `${anterior} -> ${exp2};\n`

            result += this.operando1?.obtenerAST(exp1)
            result += this.operando2?.obtenerAST(exp2)

        }else if(this.operacion == Operadores.MENOR){

            let exp1 = `n${contador.getContador()}`
            let exp2 = `n${contador.getContador()}`
            let operando = `n${contador.getContador()}`

            result += `${exp1}[label = "Expresion"];\n`
            result += `${operando}[label = "<"];\n`
            result += `${exp2}[label = "Expresion"];\n`

            result += `${anterior} -> ${exp1};\n`
            result += `${anterior} -> ${operando};\n`
            result += `${anterior} -> ${exp2};\n`

            result += this.operando1?.obtenerAST(exp1)
            result += this.operando2?.obtenerAST(exp2)

        }else if(this.operacion == Operadores.MAYORIGUAL){

            let exp1 = `n${contador.getContador()}`
            let exp2 = `n${contador.getContador()}`
            let operando = `n${contador.getContador()}`

            result += `${exp1}[label = "Expresion"];\n`
            result += `${operando}[label = ">="];\n`
            result += `${exp2}[label = "Expresion"];\n`

            result += `${anterior} -> ${exp1};\n`
            result += `${anterior} -> ${operando};\n`
            result += `${anterior} -> ${exp2};\n`

            result += this.operando1?.obtenerAST(exp1)
            result += this.operando2?.obtenerAST(exp2)

        

        }else if(this.operacion == Operadores.MENORIGUAL){

            let exp1 = `n${contador.getContador()}`
            let exp2 = `n${contador.getContador()}`
            let operando = `n${contador.getContador()}`

            result += `${exp1}[label = "Expresion"];\n`
            result += `${operando}[label = "<="];\n`
            result += `${exp2}[label = "Expresion"];\n`

            result += `${anterior} -> ${exp1};\n`
            result += `${anterior} -> ${operando};\n`
            result += `${anterior} -> ${exp2};\n`

            result += this.operando1?.obtenerAST(exp1)
            result += this.operando2?.obtenerAST(exp2)

        }

        return result;
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