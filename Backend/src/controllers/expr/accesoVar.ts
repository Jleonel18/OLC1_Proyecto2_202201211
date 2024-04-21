import { Instruccion } from "../abstracto/instruccion";
import Errores from "../excep/errores";
import Arbol from "../simbol/arbol";
import ContadorSingleton from "../simbol/contadorSingleton";
import Simbolo from "../simbol/Simbolo";
import tablaSimbolo from "../simbol/tablaSimbolos";
import Tipo, { tipoDato } from "../simbol/tipo";

export default class AccesoVar extends Instruccion {
    private id: string
    private valor: any | null = null;

    constructor(id: string, linea: number, columna: number) {
        super(new Tipo(tipoDato.VOID), linea, columna)
        this.id = id
    }

    interpretar(arbol: Arbol, tabla: tablaSimbolo) {
        let valorVariable: Simbolo = <Simbolo> tabla.getVariable(this.id)
        this.valor = valorVariable.getValor();
        if (valorVariable == null){
            arbol.Print("\nError Semántico: Variable inexistente: "+ this.id + " en la linea " + this.linea + " y columna " + (this.columna+1));
            return new Errores("Error semantico", "Variable inexistente", this.linea, this.columna)
        } 
        this.tipoDato = valorVariable.getTipo()
        return valorVariable.getValor()
    }

    obtenerAST(anterior: string): string {

        let result = "";
        let contador = ContadorSingleton.getInstance();

        let declar = `n${contador.getContador()}`;

        result += ` ${declar}[label="${this.valor}"];\n`;

        result += ` ${anterior} -> ${declar};\n`;

        return result;
    }
}