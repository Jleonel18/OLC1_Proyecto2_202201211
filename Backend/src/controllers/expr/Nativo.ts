import { Instruccion } from "../abstracto/instruccion";
import Arbol from "../simbol/arbol";
import ContadorSingleton from "../simbol/contadorSingleton";
import tablaSimbolo from "../simbol/tablaSimbolos";
import Tipo, { tipoDato } from "../simbol/tipo";

export default class Nativo extends Instruccion {
    valor: any

    constructor(tipo: Tipo, valor: any, fila: number, columna: number) {
        super(tipo, fila, columna)
        this.valor = valor
    }

    interpretar(arbol: Arbol, tabla: tablaSimbolo) {
        return this.valor
    }

    obtenerAST(anterior: string): string {
        let contador = ContadorSingleton.getInstance();
        let nodoN = `n${contador.getContador()}`
        let nodoV = `n${contador.getContador()}`
        let result = `${nodoN}[label="Dato Nativo"];\n`
        result += `${nodoV}[label="${this.valor}"];\n`
        result += `${nodoN}->${nodoV};\n`
        result += `${anterior}->${nodoN};\n`
        return result
    }
}