import { Instruccion } from "../abstracto/instruccion";
import Errores from "../excep/errores";
import Arbol from "../simbol/arbol";
import Simbolo from "../simbol/Simbolo";
import tablaSimbolo from "../simbol/tablaSimbolos";
import Tipo, { tipoDato } from "../simbol/tipo";

export default class Declaracion extends Instruccion{

    private identificador: string
    private valor: Instruccion
    
    constructor(tipo: Tipo, linea: number, columna: number, id: string, valor: Instruccion){
        super(tipo, linea, columna)
        this.identificador = id
        this.valor = valor
    }

    interpretar(arbol: Arbol, tabla: tablaSimbolo) {
        
        let valorFinal = this.valor.interpretar(arbol,tabla);

        if(valorFinal instanceof Errores) return valorFinal;

        if(this.valor.tipoDato.getTipo() != this.tipoDato.getTipo()){
            return new Errores("Error semántico", "No es posible declarar variable", this.linea, this.columna);
        }

        if(!tabla.setVariable(new Simbolo(this.tipoDato, this.identificador, valorFinal))){
            return new Errores("Error semántico", "Variable ya declarada", this.linea, this.columna);
        }

    }

}