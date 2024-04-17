import { Instruccion } from "../abstracto/instruccion";
import Errores from "../excep/errores";
import Arbol from "../simbol/arbol";
import Simbolo from "../simbol/Simbolo";
import tablaSimbolo from "../simbol/tablaSimbolos";
import Tipo, { tipoDato } from "../simbol/tipo";

export default class DeclaracionVacia extends Instruccion{

    private identificador: string []
    
    constructor(tipo: Tipo, linea: number, columna: number, id: string []){
        super(tipo, linea, columna)
        this.identificador = id
    }

    interpretar(arbol: Arbol, tabla: tablaSimbolo) {
        
        let valorFinal: any;
       
        this.identificador.forEach(elemento => {

            switch(this.tipoDato.getTipo()){
                case tipoDato.ENTERO:
                    valorFinal = 0;
                    break;
                case tipoDato.CADENA:
                    valorFinal = "";
                    break;
                case tipoDato.BOOL:
                    valorFinal = true;
                    break;
                case tipoDato.CARACTER:
                    valorFinal = '0';
                    break;
                case tipoDato.DECIMAL:
                    valorFinal = 0.0;
                    break;
                default:
                    arbol.Print("\nError semántico: No es posible declarar variable: "+this.tipoDato.getTipo()+" en la linea "+this.linea+" y columna "+(this.columna+1));
                    return new Errores("Error semántico", "No es posible declarar variable.", this.linea, this.columna);
                
            }
    
             
            if (!tabla.setVariable(new Simbolo(this.tipoDato, elemento, valorFinal))){
                arbol.Print("\nError semántico: No se puede declarar variable porque ya existia en la linea "+this.linea+" y columna "+(this.columna+1));
                return new Errores("SEMANTICO", "No se puede declarar variable porque ya existia", this.linea, this.columna)
            }   
        });

    }

}