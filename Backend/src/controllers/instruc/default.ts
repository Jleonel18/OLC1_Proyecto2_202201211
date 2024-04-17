import { Instruccion } from "../abstracto/instruccion";
import Errores from "../excep/errores";
import tablaSimbolo from "../simbol/tablaSimbolos";
import Arbol from "../simbol/arbol";
import Tipo, { tipoDato } from "../simbol/tipo";
import Break from "./Break";
import Continue from "./Continue";

export default class Default extends Instruccion {

    private instrucciones: Instruccion[]

    constructor( instrucciones: Instruccion[], linea: number, columna: number) {
        super(new Tipo(tipoDato.VOID), linea, columna);
        this.instrucciones = instrucciones;
    }

    interpretar(arbol: Arbol, tabla: tablaSimbolo) {

        let nuevaTabla = new tablaSimbolo(tabla);
        nuevaTabla.setNombre("default");

        for (let i of this.instrucciones) {

            if (i instanceof Break) {
                return i;
            }

            let resultado = i.interpretar(arbol, nuevaTabla);

            if (resultado instanceof Break) {
                return resultado;
            }

            if (resultado instanceof Continue) {
                arbol.Print("\nError Semantico: Continue no valido en un default linea:"+ this.linea+" columna: " +(this.columna+1));
                return new Errores("Semantico", "Continue no valido", this.linea, this.columna);
            }
        }
    }

}