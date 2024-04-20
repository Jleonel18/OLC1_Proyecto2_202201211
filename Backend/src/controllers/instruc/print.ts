import { Instruccion } from "../abstracto/instruccion";
import Arbol from "../simbol/arbol";
import tablaSimbolo from "../simbol/tablaSimbolos";
import Tipo, { tipoDato } from "../simbol/tipo";
import Errores from "../excep/errores";
import ContadorSingleton from "../simbol/contadorSingleton";

export default class Print extends Instruccion {
    private expresion: Instruccion

    constructor(exp: Instruccion, linea: number, col: number) {
        super(new Tipo(tipoDato.VOID), linea, col)
        this.expresion = exp
    }

    interpretar(arbol: Arbol, tabla: tablaSimbolo) {
        let valor = this.expresion.interpretar(arbol, tabla)
        if (valor instanceof Errores) return valor
        arbol.Print(valor)
    }

    obtenerAST(anterior: string): string {
        let result = "";
        let contador = ContadorSingleton.getInstance();
        let cout = `n${contador.getContador()}`;
        let dobleSigno = `n${contador.getContador()}`;
        let nodoExpresion = `n${contador.getContador()}`;
        let dobleSigno2 = `n${contador.getContador()}`;
        let endl = `n${contador.getContador()}`;
        let puntoComa = `n${contador.getContador()}`;
        
        result += `${cout}[label="cout"];\n`;
        result += `${dobleSigno}[label="<<"];\n`;
        result += `${nodoExpresion}[label="Expresion"];\n`;
        result += `${dobleSigno2}[label="<<"];\n`;
        result += `${endl}[label="endl"];\n`;
        result += `${puntoComa}[label=";"];\n`;

        result += `${anterior} -> ${cout};\n`;
        result += `${anterior} -> ${dobleSigno};\n`;
        result += `${anterior} -> ${nodoExpresion};\n`;
        result += `${anterior} -> ${dobleSigno2};\n`;
        result += `${anterior} -> ${endl};\n`;
        result += `${anterior} -> ${puntoComa};\n`;

        result += this.expresion.obtenerAST(nodoExpresion);

        return result;
        
    }
}