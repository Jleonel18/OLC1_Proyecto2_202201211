import { Instruccion } from "../abstracto/instruccion";
import Errores from "../excep/errores";
import Arbol from "../simbol/arbol";
import ContadorSingleton from "../simbol/contadorSingleton";
import tablaSimbolo from "../simbol/tablaSimbolos";
import Tipo, { tipoDato } from "../simbol/tipo";


export default class Logicos extends Instruccion {

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
            case Operadores.AND:
                return this.and(opIzq, opDer);
            case Operadores.OR:
                return this.or(opIzq, opDer);
            case Operadores.NOT:
                return this.not(Unico);
            default:
                arbol.Print("\nError Semántico: Operador inexistente en la linea " + this.linea + " y columna " + (this.columna + 1));
                return new Errores("Semantico", "Operador Logico Invalido", this.linea, this.columna)

        }

    }

    and(op1: any, op2: any) {
        let tipo1 = this.operando1?.tipoDato.getTipo()
        let tipo2 = this.operando2?.tipoDato.getTipo()
        switch (tipo1) {
            case tipoDato.BOOL:
                switch (tipo2) {
                    case tipoDato.BOOL:
                        this.tipoDato = new Tipo(tipoDato.BOOL)
                        return op1 && op2
                    default:
                        return new Errores("Semantico", "Tipo de dato no es booleano", this.linea, this.columna)
                }
            default:
                return new Errores("Semantico", "Tipo de dato no es booleano", this.linea, this.columna)
        }

    }

    or(op1: any, op2: any) {
        let tipo1 = this.operando1?.tipoDato.getTipo()
        let tipo2 = this.operando2?.tipoDato.getTipo()
        switch (tipo1) {
            case tipoDato.BOOL:
                switch (tipo2) {
                    case tipoDato.BOOL:
                        this.tipoDato = new Tipo(tipoDato.BOOL)
                        return op1 || op2
                    default:
                        return new Errores("Semantico", "Tipo de dato no es booleano", this.linea, this.columna)
                }
            default:
                return new Errores("Semantico", "Tipo de dato no es booleano", this.linea, this.columna)
        }

    }

    not(op1: any) {
        let tipo1 = this.operandoUnico?.tipoDato.getTipo()
        switch (tipo1) {
            case tipoDato.BOOL:
                this.tipoDato = new Tipo(tipoDato.BOOL)
                return !op1
            default:
                return new Errores("Semantico", "Tipo de dato no es booleano", this.linea, this.columna)
        }

    }

    obtenerAST(anterior: string): string {

        let result = "";

        let contador = ContadorSingleton.getInstance();

        if (this.operacion == Operadores.AND) {

            let exp1 = `n${contador.getContador()}`;
            let exp2 = `n${contador.getContador()}`;
            let operador = `n${contador.getContador()}`;
            result += `${exp1}[label=\"Expresion\"];\n`;
            result += `${exp2}[label=\"Expresion\"];\n`;
            result += `${operador}[label=\"&&\"];\n`;

            result += `${anterior} -> ${exp1};\n`;
            result += `${anterior} -> ${operador};\n`;
            result += `${anterior} -> ${exp2};\n`;

            result += this.operando1?.obtenerAST(exp1);
            result += this.operando2?.obtenerAST(exp2);

        }else if(this.operacion == Operadores.OR){

            let exp1 = `n${contador.getContador()}`;
            let exp2 = `n${contador.getContador()}`;
            let operador = `n${contador.getContador()}`;
            result += `${exp1}[label=\"Expresion\"];\n`;
            result += `${exp2}[label=\"Expresion\"];\n`;
            result += `${operador}[label=\"||\"];\n`;

            result += `${anterior} -> ${exp1};\n`;
            result += `${anterior} -> ${operador};\n`;
            result += `${anterior} -> ${exp2};\n`;

            result += this.operando1?.obtenerAST(exp1);
            result += this.operando2?.obtenerAST(exp2);

        }else if(this.operacion == Operadores.NOT){

            let nodoNot = `n${contador.getContador()}`;
            let nodoExp = `n${contador.getContador()}`;
            result += `${nodoNot}[label="!"];\n`;
            result += `${nodoExp}[label="Expresion"];\n`;

            result += `${anterior} -> ${nodoNot};\n`;
            result += `${anterior} -> ${nodoExp};\n`;

            result += this.operandoUnico?.obtenerAST(nodoExp);

        }

        return result;
    }


}

export enum Operadores {
    AND,
    OR,
    NOT
}