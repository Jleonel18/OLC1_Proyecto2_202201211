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
        
        let vFinal = this.valor.interpretar(arbol, tabla)
        if (vFinal instanceof Errores) return vFinal;

        if(this.valor.tipoDato.getTipo() == tipoDato.ENTERO && this.tipoDato.getTipo() == tipoDato.DECIMAL){

            this.identificador.forEach(id => {

                vFinal = parseFloat(vFinal);
                if (!tabla.setVariable(new Simbolo(this.tipoDato, id, vFinal))){
                    arbol.Print("Error Semantico: No se puede declarar variable ya existene:"+ this.linea+" columna: " +(this.columna+1));
                    
                    return new Errores("Semantico", "No se puede declarar variable que ya existe", this.linea, this.columna)
                }   
            });
        }
        else{
            if (this.valor.tipoDato.getTipo() != this.tipoDato.getTipo()) {
                arbol.Print("Error Semantico: El tipo de dato no coincide con la variable. Linea:"+ this.linea+" columna: " +(this.columna+1));
                return new Errores("SEMANTICO", "El tipo de dato no coincide con la variable.", this.linea, this.columna)
            }
            
            this.identificador.forEach(elemento => {

                if (!tabla.setVariable(new Simbolo(this.tipoDato, elemento, vFinal))){
                    arbol.Print("Error Semantico: Variable ya existente en el sistema. Linea::"+ this.linea+" columna: " +(this.columna+1));
                    return new Errores("SEMANTICO", "Variable ya existente en el sistema.", this.linea, this.columna)
                }   
            })
            
        }
    }

    obtenerAST(anterior: string): string {
        let result = "";
        let contador = ContadorSingleton.getInstance();

        let declar = `n${contador.getContador()}`;

        let tipoD = `n${contador.getContador()}`;
        let ids = `n${contador.getContador()}`;

        let conjuntoID = [];
        for(let i= 0; i < this.identificador.length; i++){
            conjuntoID.push(`n${contador.getContador()}`);

        }
        let igual = `n${contador.getContador()}`;
        let valor = `n${contador.getContador()}`;
        let puntocoma = `n${contador.getContador()}`;

        result += `${declar}[label="Declaracion"];\n`
        if(this.tipoDato.getTipo() == tipoDato.ENTERO){
            result += `${tipoD}[label="int"];\n`
        }else if(this.tipoDato.getTipo() == tipoDato.DECIMAL){
            result += `${tipoD}[label="double"];\n`
        }else if(this.tipoDato.getTipo() == tipoDato.BOOL){
            result += `${tipoD}[label="bool"];\n`
        }else if(this.tipoDato.getTipo() == tipoDato.CADENA){
            result += `${tipoD}[label="std::string"];\n`
        }else if(this.tipoDato.getTipo() == tipoDato.CARACTER){
            result += `${tipoD}[label="char"];\n`
        }

        result += `${ids}[label="IDS"];\n`

        for(let i= 0; i < this.identificador.length; i++){
            result += `${conjuntoID[i]} [label = "${this.identificador[i]}"];\n`
        }

        result += `${igual}[label="="];\n`
        result += `${valor}[label="Expresion"];\n`
        result += `${puntocoma}[label=";"];\n`

        result += `${anterior} -> ${declar};\n`
        result += `${declar} -> ${ids};\n`
        result += `${declar} -> ${tipoD};\n`
        
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