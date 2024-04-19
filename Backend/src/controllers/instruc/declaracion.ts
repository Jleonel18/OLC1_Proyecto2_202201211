import { Instruccion } from "../abstracto/instruccion";
import Errores from "../excep/errores";
import Arbol from "../simbol/arbol";
import Simbolo from "../simbol/Simbolo";
import tablaSimbolo from "../simbol/tablaSimbolos";
import Tipo, { tipoDato } from '../simbol/tipo'

export default class Declaracion extends Instruccion {


    private identificador: string[]
    private valor: Instruccion 

    constructor(tipo: Tipo, linea: number, columna: number, id: string[], valor: Instruccion) {
        super(tipo, linea, columna)
        this.identificador = id
        this.valor = valor
    }

    interpretar(arbol: Arbol, tabla: tablaSimbolo) {
        
        let valorFinal = this.valor.interpretar(arbol, tabla)
        if (valorFinal instanceof Errores) return valorFinal

        if(this.valor.tipoDato.getTipo() == tipoDato.ENTERO && this.tipoDato.getTipo() == tipoDato.DECIMAL){
            //console.log("entro al if")
            this.identificador.forEach(id => {
                valorFinal = parseFloat(valorFinal);
                if (!tabla.setVariable(new Simbolo(this.tipoDato, id, valorFinal))){
                    arbol.Print("\nError Semántico. Variable ya existente. Linea: " + this.linea + " Columna: " + this.columna)
                    return new Errores("Semántico", "No se puede declarar variable que ya existe", this.linea, this.columna)
                }   
            });
        }else{

            if (this.valor.tipoDato.getTipo() != this.tipoDato.getTipo()) {
                arbol.Print("\nError Semántico. Tipo de dato incorrecto. Linea: " + this.linea + " Columna: " + this.columna)
                return new Errores("Semántico", "No se puede declarar variable", this.linea, this.columna)
            }

            for(let elemento of this.identificador){
                if (!tabla.setVariable(new Simbolo(this.tipoDato, elemento, valorFinal))){
                    arbol.Print("\nError Semántico. Variable ya existente. Linea: " + this.linea + " Columna: " + this.columna)
                    return new Errores("Semántico", "variable ya existe!", this.linea, this.columna)
                }  
            }
            
        }
        
        
        
    }

}