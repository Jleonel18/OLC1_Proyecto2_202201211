import { Instruccion } from "../abstracto/instruccion";
import Errores from "../excep/errores";
import tablaSimbolo from "../simbol/tablaSimbolos";
import Arbol from "../simbol/arbol";
import Tipo, { tipoDato } from "../simbol/tipo";

export default class OpTernario extends Instruccion{
    private condicion: Instruccion;
    private expresion1: Instruccion;
    private expresion2: Instruccion;

    constructor(condicion: Instruccion, expresion1: Instruccion, expresion2: Instruccion, linea: number, columna: number){
        super(new Tipo(tipoDato.VOID), linea, columna);
        this.condicion = condicion;
        this.expresion1 = expresion1;
        this.expresion2 = expresion2;
    }

    interpretar(arbol: Arbol, tabla: tablaSimbolo) {

        let cond = this.condicion.interpretar(arbol, tabla);
        if(cond instanceof Errores) return cond;

        let exp1 = this.expresion1.interpretar(arbol, tabla);
        if(exp1 instanceof Errores) return exp1;

        let exp2 = this.expresion2.interpretar(arbol, tabla);
        if(exp2 instanceof Errores) return exp2;

        if(this.condicion.tipoDato.getTipo() != tipoDato.BOOL){
            arbol.Print("\nError Semantico: La condicion no es booleana. linea:"+ this.linea+" columna: " +(this.columna+1));
            return new Errores("Semantico", "La condicion no es booleana", this.linea, this.columna);
        }

        if(cond){
            this.tipoDato = this.expresion1.tipoDato;
            return exp1;
        }else{

            this.tipoDato = this.expresion2.tipoDato;
            return exp2;
        }
    }

    obtenerAST(anterior: string): string {
        return "";
    }
}