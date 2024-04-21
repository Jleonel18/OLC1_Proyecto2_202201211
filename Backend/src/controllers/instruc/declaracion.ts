import { Instruccion } from "../abstracto/instruccion";
import Errores from "../excep/errores";
import Arbol from "../simbol/arbol";
import ContadorSingleton from "../simbol/contadorSingleton";
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

    obtenerAST(anterior: string): string {
        let result = "";
        let contador = ContadorSingleton.getInstance();

        let declar = `n${contador.getContador()}`;

        let ids = `n${contador.getContador()}`;

        let conjuntoID = [];
        for(let i= 0; i < this.identificador.length; i++){
            conjuntoID.push(`n${contador.getContador()}`);

        }
        let igual = `n${contador.getContador()}`;
        let valor = `n${contador.getContador()}`;
        let puntocoma = `n${contador.getContador()}`;

        result += `${declar}[label="Declaracion"];\n`
        result += `${ids}[label="IDS"];\n`

        for(let i= 0; i < this.identificador.length; i++){
            result += `${conjuntoID[i]} [label = "${this.identificador[i]}"];\n`
        }

        result += `${igual}[label="="];\n`
        result += `${valor}[label="Expresion"];\n`
        result += `${puntocoma}[label=";"];\n`

        result += `${anterior} -> ${declar};\n`
        result += `${declar} -> ${ids};\n`
        
        for(let i= 0; i < this.identificador.length; i++){
            result += `${ids} -> ${conjuntoID[i]};\n`
        }

        result += `${declar} -> ${igual};\n`
        result += `${declar} -> ${valor};\n`
        result += `${declar} -> ${puntocoma};\n`

        this.valor.obtenerAST(valor);

        return result;
    }

}