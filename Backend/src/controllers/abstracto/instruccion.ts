import Arbol from "../simbol/arbol";
import tablaSimbolos from "../simbol/tablaSimbolos";
import Tipo from "../simbol/tipo";

export abstract class Instruccion {
    public tipoDato: Tipo
    public linea: number
    public columna: number

    constructor(tipo: Tipo, linea: number, columna: number) {
        this.tipoDato = tipo
        this.linea = linea
        this.columna = columna
    }

    abstract interpretar(arbol: Arbol, tabla: tablaSimbolos): any

}