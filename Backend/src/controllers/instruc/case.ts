import { Instruccion } from "../abstracto/instruccion";
import Errores from "../excep/errores";
import tablaSimbolo from "../simbol/tablaSimbolos";
import Arbol from "../simbol/arbol";
import Tipo, { tipoDato } from "../simbol/tipo";
import Break from "./Break";
import Continue from "./Continue";

export default class Case extends Instruccion {

    private condicion: Instruccion
    private instrucciones: Instruccion[]
    public condicionGlobal?: Instruccion;

    constructor(condicion: Instruccion, instrucciones: Instruccion[], linea: number, columna: number) {
        super(new Tipo(tipoDato.VOID), linea, columna);
        this.condicion = condicion;
        this.instrucciones = instrucciones;
    }

    interpretar(arbol: Arbol, tabla: tablaSimbolo) {
        let cond = this.condicion.interpretar(arbol, tabla);
        if (cond instanceof Errores) return cond;

        if (this.condicionGlobal?.interpretar(arbol, tabla) == cond) {

            let nuevaTabla = new tablaSimbolo(tabla);
            nuevaTabla.setNombre("case");

            for (let i of this.instrucciones) {

                if (i instanceof Break) {
                    return i;
                }
                
                let resultado = i.interpretar(arbol, nuevaTabla);

                if (resultado instanceof Break) {
                    return resultado;
                }

                if (resultado instanceof Continue) {
                    arbol.Print("\nError Semantico: Continue no valido. linea:" + this.linea + " columna: " + (this.columna + 1));
                    return new Errores("Semantico", "Continue no valido", this.linea, this.columna);
                }
            }

        }

    }

    obtenerAST(anterior: string): string {
        
        let result = "";

        return result;

    }

}