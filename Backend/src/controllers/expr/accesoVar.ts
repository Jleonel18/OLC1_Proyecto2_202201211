import { Instruccion } from "../abstracto/instruccion";
import Errores from "../excep/errores";
import Arbol from "../simbol/arbol";
import Simbolo from "../simbol/Simbolo";
import tablaSimbolo from "../simbol/tablaSimbolos";
import Tipo, { tipoDato } from "../simbol/tipo";

export default class AccesoVar extends Instruccion {
    private id: string

    constructor(id: string, linea: number, columna: number) {
        super(new Tipo(tipoDato.VOID), linea, columna)
        this.id = id
    }

    interpretar(arbol: Arbol, tabla: tablaSimbolo) {
        let valorVariable: Simbolo = <Simbolo> tabla.getVariable(this.id)
        if (valorVariable == null) return new Errores("SEMANTICO", "Acceso invalido", this.linea, this.columna)
        this.tipoDato = valorVariable.getTipo()
        return valorVariable.getValor()
    }
}