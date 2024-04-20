import { Instruccion } from "../abstracto/instruccion";
import Errores from "../excep/errores";
import tablaSimbolo from "../simbol/tablaSimbolos";
import Arbol from "../simbol/arbol";
import Tipo, { tipoDato } from "../simbol/tipo";
import ContadorSingleton from "../simbol/contadorSingleton";

export default class Continue extends Instruccion {

    constructor(linea: number, columna: number) {
        super(new Tipo(tipoDato.VOID), linea, columna);
    }

    interpretar(arbol: Arbol, tabla: tablaSimbolo) {
        return;
    }

    obtenerAST(anterior: string): string {


        let contador = ContadorSingleton.getInstance();
        let result = "";

        let continuee = `n${contador.getContador()}`;
        let puntocoma = `n${contador.getContador()}`;

        result += `${continuee}[label="continue"];\n`;
        result += `${puntocoma}[label=";"];\n`;

        result += `${anterior} -> ${continuee};\n`;
        result += `${anterior} -> ${puntocoma};\n`;

        return result;
    }
}