import { Instruccion } from "../abstracto/instruccion";
import Errores from "../excep/errores";
import tablaSimbolo from "../simbol/tablaSimbolos";
import Arbol from "../simbol/arbol";
import Tipo, { tipoDato } from "../simbol/tipo";
import Break from "./Break";
import Continue from "./Continue";
import Return from "./return";

export default class If extends Instruccion {

    private condicion: Instruccion;
    private instrucciones: Instruccion[];
    private instruccionesElse: Instruccion[] | undefined;
    private condicionElseIf: Instruccion | undefined;

    constructor(cond: Instruccion, inst: Instruccion[], instElse: Instruccion[] | undefined, condicionElseIf: Instruccion | undefined, linea: number, columna: number) {
        super(new Tipo(tipoDato.VOID), linea, columna);
        this.condicion = cond;
        this.instruccionesElse = instElse;
        this.instrucciones = inst;
        this.condicionElseIf = condicionElseIf;
    }

    interpretar(arbol: Arbol, tabla: tablaSimbolo) {
        let cond = this.condicion.interpretar(arbol, tabla);
        if (cond instanceof Errores) return cond;

        if (this.condicion.tipoDato.getTipo() != tipoDato.BOOL) {
            arbol.Print("\nError Semantico: La condicion no es booleana linea:" + this.linea + " columna: " + (this.columna + 1));
            return new Errores("Semantico", "La condicion no es booleana", this.linea, this.columna);
        }

        if(cond){
            let nuevaTabla = new tablaSimbolo(tabla);
            nuevaTabla.setNombre("if");

            for(let i of this.instrucciones){
                if(i instanceof Break) return i;
                if(i instanceof Continue) return i;
                if(i instanceof Return) return i;
                if(i instanceof Errores) return i;

                let result = i.interpretar(arbol, nuevaTabla);
                if(result instanceof Break) return result;
                if(result instanceof Continue) return result;
                if(result instanceof Return) return result;
                if(result instanceof Errores) return result;
            }
        }else{
            if(this.instruccionesElse != undefined){
                let nuevaTabla = new tablaSimbolo(tabla);
                nuevaTabla.setNombre("else");

                for(let i of this.instruccionesElse){
                    if(i instanceof Break) return i;
                    if(i instanceof Continue) return i;
                    if(i instanceof Return) return i;
                    if(i instanceof Errores) return i;

                    let result = i.interpretar(arbol, nuevaTabla);

                    if(result instanceof Break) return result;
                    if(result instanceof Continue) return result;
                    if(result instanceof Return) return result;
                    if(result instanceof Errores) return result;

                }

            }else if(this.condicionElseIf != undefined){
                
                let i = this.condicionElseIf.interpretar(arbol, tabla);
                if(i instanceof Errores) return i;
                if(i instanceof Return) return i;
                if(i instanceof Break) return i;
                if(i instanceof Continue) return i;
            }
        }

    }

}