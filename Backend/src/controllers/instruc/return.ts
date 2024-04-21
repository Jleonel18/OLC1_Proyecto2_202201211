import { Instruccion } from "../abstracto/instruccion";
import Errores from "../excep/errores";
import tablaSimbolo from "../simbol/tablaSimbolos";
import Arbol from "../simbol/arbol";
import Tipo, { tipoDato } from "../simbol/tipo";
import ContadorSingleton from "../simbol/contadorSingleton";

export default class Return extends Instruccion{

    public expresion: Instruccion | undefined;

    constructor(linea:number, columna:number,expresion?: Instruccion){
        super(new Tipo(tipoDato.VOID), linea, columna);
        this.expresion = expresion;
    }

    interpretar(arbol: Arbol, tabla: tablaSimbolo) {
        if(this.expresion != undefined){
            let result = this.expresion.interpretar(arbol, tabla);
            if(result instanceof Errores) return result;
        }
        return this;
    }

    obtenerAST(anterior: string): string {

        let contador = ContadorSingleton.getInstance();
        let result = "";

        let returnn = `n${contador.getContador()}`;
        let exp = `n${contador.getContador()}`;

        let puntocoma = `n${contador.getContador()}`;

        result += `${returnn}[label="Return"];\n`;
        if(this.expresion != undefined){
            result += `${exp}[label="Expresion"];\n`;
        }

        result += `${puntocoma}[label=";"];\n`;

        result += `${anterior} -> ${returnn};\n`;
        if(this.expresion != undefined){
            result += `${anterior} -> ${exp};\n`;
        }

        result += `${anterior} -> ${puntocoma};\n`;

        if(this.expresion != undefined){
            result += this.expresion.obtenerAST(exp);
        }
        

        return result;
    }
}