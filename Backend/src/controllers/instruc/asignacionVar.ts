import { Instruccion } from "../abstracto/instruccion";
import Errores from "../excep/errores";
import Arbol from "../simbol/arbol";
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
        if (valor == null) return new Errores("SEMANTICO", "Variable no existente", this.linea, this.columna)

        if (this.exp.tipoDato.getTipo() != valor.getTipo().getTipo()) return new Errores("SEMANTICO", "Asignacion incorrecta", this.linea, this.columna)

        this.tipoDato = valor.getTipo()
        valor.setValor(NewValor)


    }
}