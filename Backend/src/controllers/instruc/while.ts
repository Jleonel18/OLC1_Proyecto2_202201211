import { Instruccion } from "../abstracto/instruccion";
import Errores from "../excep/errores";
import tablaSimbolo from "../simbol/tablaSimbolos";
import Arbol from "../simbol/arbol";
import Tipo, { tipoDato } from "../simbol/tipo";
import Break from "./Break";
import Continue from "./Continue";

export default class While extends Instruccion{
    private condicion: Instruccion;
    private instrucciones : Instruccion[];

    constructor(condicion: Instruccion, instruccion:Instruccion[], linea: number, columna: number){
        super(new Tipo(tipoDato.VOID), linea, columna);
        this.condicion = condicion;
        this.instrucciones = instruccion;
    }

    interpretar(arbol: Arbol, tabla: tablaSimbolo) {

        let cond = this.condicion.interpretar(arbol, tabla);
        if(cond instanceof Errores) return cond;

        if(this.condicion.tipoDato.getTipo()!= tipoDato.BOOL){
            arbol.Print("\nError Semantico: La condicion no es booleana. linea:"+ this.linea+" columna: " +(this.columna+1));
            return new Errores("Semantico", "La condicion no es booleana", this.linea, this.columna);
        }

        while(this.condicion.interpretar(arbol,tabla)){
            let nuevaTabla = new tablaSimbolo(tabla);
            nuevaTabla.setNombre("while");
            for (let i of this.instrucciones){
                
                if(i instanceof Break){
                    return;
                }

                if(i instanceof Continue){
                    break;
                }
                
                let resultado = i.interpretar(arbol, nuevaTabla);

                if(resultado instanceof Break) return;
                if(resultado instanceof Continue) break;
                
            }
        }
    }
}