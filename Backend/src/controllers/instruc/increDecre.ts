import { Instruccion } from "../abstracto/instruccion";
import Errores from "../excep/errores";
import Arbol from "../simbol/arbol";
import ContadorSingleton from "../simbol/contadorSingleton";
import Simbolo from "../simbol/Simbolo";
import tablaSimbolo from "../simbol/tablaSimbolos";
import Tipo, { tipoDato } from '../simbol/tipo'

export default class IncreDecre extends Instruccion {
    private id: string;
    private instruc: boolean;

    constructor(id: string, linea: number, columna: number, instruc: boolean) {
        super(new Tipo(tipoDato.VOID), linea, columna);
        this.id = id;
        this.instruc = instruc;
    }

    interpretar(arbol: Arbol, tabla: tablaSimbolo) {
        //console.log("paso por aquiii")
        let valor = tabla.getVariable(this.id.toLocaleLowerCase());
        if (valor == null) {
            arbol.Print("\nError Semantico: Variable no existente. linea:"+ this.linea+" columna: " +(this.columna+1));
            return new Errores("SEMANTICO", "Variable no existente", this.linea, this.columna)
        }
        //console.log("el valor es:",valor.getTipo().getTipo());
        if (valor.getTipo().getTipo() != tipoDato.ENTERO && valor.getTipo().getTipo() != tipoDato.DECIMAL) {
            
            arbol.Print("\nError Semantico: No se puede incrementar o decrementar una variable que no sea de tipo numero. linea:"+ this.linea+" columna: " +(this.columna+1));
            return new Errores("SEMANTICO", "No se puede incrementar o decrementar una variable que no sea de tipo numero", this.linea, this.columna);

        }
        if (this.instruc == true && valor.getTipo().getTipo() != tipoDato.ENTERO) {
            valor.setValor(parseInt(valor.getValor()) + 1);
        } else if(valor.getTipo().getTipo() != tipoDato.ENTERO && this.instruc == false){
            valor.setValor(parseInt(valor.getValor()) - 1);
        }else if(valor.getTipo().getTipo() != tipoDato.DECIMAL && this.instruc == true){
            valor.setValor(parseFloat(valor.getValor()) + 1);
        }else if(valor.getTipo().getTipo() != tipoDato.DECIMAL && this.instruc == false){
            valor.setValor(parseFloat(valor.getValor()) - 1);
        }
    }

    obtenerAST(anterior: string): string {

        let contador = ContadorSingleton.getInstance();
        let result = "";

        let ident = `n${contador.getContador()}`;
        let nombre = `n${contador.getContador()}`;
        let mas1 = `n${contador.getContador()}`;
        let mas2 = `n${contador.getContador()}`;

        result += ` ${ident}[label="ID"];\n`;
        result += ` ${nombre}[label="${this.id}"];\n`;

        if(this.instruc == true){
            result += ` ${mas1}[label="+"];\n`;
            result += ` ${mas2}[label="+"];\n`;
        }else{
            result += ` ${mas1}[label="-"];\n`;
            result += ` ${mas2}[label="-"];\n`;
        }

        result += ` ${anterior} -> ${ident};\n`;
        result += ` ${ident} -> ${nombre};\n`;
        result += `${anterior} -> ${mas1};\n`;
        result += `${anterior} -> ${mas2};\n`;

        return result;
    }
}