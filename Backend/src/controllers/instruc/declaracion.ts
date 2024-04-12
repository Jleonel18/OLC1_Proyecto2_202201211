import { Instruccion } from "../abstracto/instruccion";
import Errores from "../excep/errores";
import Arbol from "../simbol/arbol";
import Simbolo from "../simbol/Simbolo";
import tablaSimbolo from "../simbol/tablaSimbolos";
import Tipo, { tipoDato } from "../simbol/tipo";

export default class Declaracion extends Instruccion{

    private identificador: string []
    private valor: Instruccion 
    
    constructor(tipo: Tipo, linea: number, columna: number, id: string [], valor: Instruccion){
        super(tipo, linea, columna)
        this.identificador = id
        this.valor = valor
    }

    interpretar(arbol: Arbol, tabla: tablaSimbolo) {
        
        let valorFinal = this.valor.interpretar(arbol,tabla);

        if(valorFinal instanceof Errores) return valorFinal;

        if(this.valor.tipoDato.getTipo() == tipoDato.ENTERO && this.tipoDato.getTipo() == tipoDato.DECIMAL){
            this.identificador.forEach(elemento => {
                valorFinal = parseFloat(valorFinal);
                if (!tabla.setVariable(new Simbolo(this.tipoDato, elemento, valorFinal))){
                    return new Errores("SEMANTICO", "No se puede declarar variable porque ya existia", this.linea, this.columna)
                }   
            });
        }

        if(this.valor.tipoDato.getTipo() != this.tipoDato.getTipo()){
            return new Errores("Error semántico", "No es posible declarar variable", this.linea, this.columna);
        }

        this.identificador.forEach(elemento => {
             
            if (!tabla.setVariable(new Simbolo(this.tipoDato, elemento, valorFinal))){
                return new Errores("SEMANTICO", "No se puede declarar variable porque ya existia", this.linea, this.columna)
            }   
        });

    }

}