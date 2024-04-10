import { Instruccion } from "../abstracto/instruccion";
import Arbol from "../simbol/arbol";
import tablaSimbolo from "../simbol/tablaSimbolos";
import Tipo, { tipoDato } from "../simbol/tipo";
import Errores from "../excep/errores";

export default class Print extends Instruccion {
    private expresion: Instruccion

    constructor(exp: Instruccion, linea: number, col: number) {
        super(new Tipo(tipoDato.VOID), linea, col)
        this.expresion = exp
    }

    interpretar(arbol: Arbol, tabla: tablaSimbolo) {
        let valor = this.expresion.interpretar(arbol, tabla)
        if (valor instanceof Errores) return valor
        arbol.Print(valor)
    }
}