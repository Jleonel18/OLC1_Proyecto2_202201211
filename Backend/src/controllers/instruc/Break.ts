import { Instruccion } from "../abstracto/instruccion";
import Errores from "../excep/errores";
import tablaSimbolo from "../simbol/tablaSimbolos";
import Arbol from "../simbol/arbol";
import Tipo, { tipoDato } from "../simbol/tipo";

export default class Break extends Instruccion{

    constructor(linea:number, columna:number){
        super(new Tipo(tipoDato.VOID), linea, columna);
    }

    interpretar(arbol: Arbol, tabla: tablaSimbolo) {
        return;
    }
}