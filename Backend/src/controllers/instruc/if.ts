import { Instruccion } from "../abstracto/instruccion";
import Errores from "../excep/errores";
import tablaSimbolo from "../simbol/tablaSimbolos";
import Arbol from "../simbol/arbol";
import Tipo, { tipoDato } from "../simbol/tipo";

export default class If extends Instruccion{

    private condicion: Instruccion;
    private instrucciones : Instruccion[];

    constructor(cond: Instruccion, inst: Instruccion[], linea: number, columna: number){
        super(new Tipo(tipoDato.VOID), linea, columna);
        this.condicion = cond;
        this.instrucciones = inst;
    }

    interpretar(arbol: Arbol, tabla: tablaSimbolo) {
        let cond = this.condicion.interpretar(arbol, tabla);
        if(cond instanceof Errores) return cond;

        if(this.condicion.tipoDato.getTipo()!= tipoDato.BOOL){
            return new Errores("Semantico", "La condicion no es booleana", this.linea, this.columna);
        }

        let nuevaTabla = new tablaSimbolo(tabla);
        nuevaTabla.setNombre("if");

        if(cond){
            for(let i of this.instrucciones){
                let resultado = i.interpretar(arbol, nuevaTabla);
            }
        }
    }

}