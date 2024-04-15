import { Instruccion } from "../abstracto/instruccion";
import Errores from "../excep/errores";
import tablaSimbolo from "../simbol/tablaSimbolos";
import Arbol from "../simbol/arbol";
import Tipo, { tipoDato } from "../simbol/tipo";
import Break from "./Break";
import Continue from "./Continue";

export default class If extends Instruccion {

    private condicion: Instruccion;
    private instrucciones: Instruccion[];
    private instruccionesElse: Instruccion[] | Instruccion;

    constructor(cond: Instruccion, inst: Instruccion[], instElse: Instruccion[] | Instruccion, linea: number, columna: number) {
        super(new Tipo(tipoDato.VOID), linea, columna);
        this.condicion = cond;
        this.instruccionesElse = instElse;
        this.instrucciones = inst;
    }

    interpretar(arbol: Arbol, tabla: tablaSimbolo) {
        let cond = this.condicion.interpretar(arbol, tabla);
        if (cond instanceof Errores) return cond;

        if (this.condicion.tipoDato.getTipo() != tipoDato.BOOL) {
            return new Errores("Semantico", "La condicion no es booleana", this.linea, this.columna);
        }

        let nuevaTabla = new tablaSimbolo(tabla);
        nuevaTabla.setNombre("if");

        if (cond) {
            for (let i of this.instrucciones) {

                if (i instanceof Break) {
                    return i;
                }

                if (i instanceof Continue) {
                    return i;
                }

                let resultado = i.interpretar(arbol, nuevaTabla);
            }
        } else {
            if(Array.isArray(this.instruccionesElse)){
                for (let i of this.instruccionesElse) {
                    if (i instanceof Break) {
                        return i;
                    }
    
                    if (i instanceof Continue) {
                        return i;
                    }
    
                    let resultado = i.interpretar(arbol, nuevaTabla);
                }
                
            }else{
                let resultado = this.instruccionesElse.interpretar(arbol, nuevaTabla);

                if(resultado instanceof Errores){
                    return resultado;
                }

                if(resultado instanceof Break){
                    return resultado;
                }
                if(resultado instanceof Continue){
                    return resultado;
                }
            }
            
        }
    }

}