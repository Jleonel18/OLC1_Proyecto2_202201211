import { Instruccion } from "../abstracto/instruccion";
import Errores from "../excep/errores";
import Arbol from "../simbol/arbol";
import ContadorSingleton from "../simbol/contadorSingleton";
import Simbolo from "../simbol/Simbolo";
import tablaSimbolo from "../simbol/tablaSimbolos";
import Tipo, { tipoDato } from '../simbol/tipo'

export default class AsignacionVar extends Instruccion {
    private id: string
    private exp: Instruccion

    constructor(id: string, exp: Instruccion, linea: number, col: number) {
        super(new Tipo(tipoDato.VOID), linea, col)
        this.id = id
        this.exp = exp
    }

    interpretar(arbol: Arbol, tabla: tablaSimbolo) {
        let NewValor = this.exp.interpretar(arbol, tabla)
        if (NewValor instanceof Errores) return NewValor

        let valor = tabla.getVariable(this.id.toLocaleLowerCase())
        if (valor == null){ 
            arbol.Print("\nError Semantico: Variable no existente: "+ this.id + " en la linea " + this.linea + " y columna " + (this.columna+1));
            return new Errores("SEMANTICO", "Variable no existente", this.linea, this.columna)

        }

        if (this.exp.tipoDato.getTipo() != valor.getTipo().getTipo()){
            arbol.Print("\nError Semantico: Asignacion incorrecta: "+ this.id + " en la linea " + this.linea + " y columna " + (this.columna+1));
            return new Errores("SEMANTICO", "Asignacion incorrecta", this.linea, this.columna)
        } 

        this.tipoDato = valor.getTipo()
        valor.setValor(NewValor)


    }

    obtenerAST(anterior: string): string {

        let contador = ContadorSingleton.getInstance();
        let result = "";


        let padre = `n${contador.getContador()}`;
        let variable = `n${contador.getContador()}`;
        let varNombre = `n${contador.getContador()}`;
        let igual = `n${contador.getContador()}`;
        let asignacion = `n${contador.getContador()}`;

        result += ` ${padre}[label="Asignacion"];\n`;
        result += `${variable}[label="ID"];\n`;
        result += `${varNombre}[label="${this.id}"];\n`;
        result += `${igual}[label="="];\n`;
        result += `${asignacion}[label="Expresion"];\n`;

        result += ` ${anterior} -> ${padre};\n`;
        result += `${padre} -> ${variable};\n`;
        result += `${variable} -> ${varNombre};\n`;
        result += `${padre} -> ${igual};\n`;
        result += `${padre} -> ${asignacion};\n`;

        result += this.exp.obtenerAST(asignacion);

        return result;
    }

}