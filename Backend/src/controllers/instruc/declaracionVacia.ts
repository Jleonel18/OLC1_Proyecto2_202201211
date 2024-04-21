import { Instruccion } from "../abstracto/instruccion";
import Errores from "../excep/errores";
import Arbol from "../simbol/arbol";
import ContadorSingleton from "../simbol/contadorSingleton";
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

    obtenerAST(anterior: string): string {

        let contador = ContadorSingleton.getInstance();
        let result = "";

        let declar = `n${contador.getContador()}`;
        let ids = `n${contador.getContador()}`;

        let conjuntoID = [];
        for(let i= 0; i < this.identificador.length; i++){
            conjuntoID.push(`n${contador.getContador()}`);
        }

        let puntocoma = `n${contador.getContador()}`;

        result += ` ${declar}[label="Declaracion"];\n`;
        result += ` ${ids}[label="IDS"];\n`;

        for(let i= 0; i < this.identificador.length; i++){
            result += ` ${conjuntoID[i]} [label = "${this.identificador[i]}"];\n`;
        }

        result += `${puntocoma}[label=";"];\n`;

        result += `${anterior} -> ${declar};\n`;
        result += `${declar} -> ${ids};\n`;

        for(let i= 0; i < this.identificador.length; i++){
            result += `${ids} -> ${conjuntoID[i]};\n`;
        }

        result += `${declar} -> ${puntocoma};\n`;

        return result;
    }

}