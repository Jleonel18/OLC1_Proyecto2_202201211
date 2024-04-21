import { Instruccion } from "../abstracto/instruccion";
import Errores from "../excep/errores";
import Arbol from "../simbol/arbol";
import ContadorSingleton from "../simbol/contadorSingleton";
import Simbolo from "../simbol/Simbolo";
import tablaSimbolo from "../simbol/tablaSimbolos";
import Tipo, { tipoDato } from "../simbol/tipo";

export default class EditarArr extends Instruccion{
    private posicion: Instruccion;
    private identificador: string;
    private editar: Instruccion;

    constructor(posicion: Instruccion, identificador: string, editar: Instruccion, linea: number, columna: number){
        super(new Tipo(tipoDato.ENTERO), linea, columna);
        this.posicion = posicion;
        this.identificador = identificador;
        this.editar = editar;
    }

    interpretar(arbol: Arbol, tabla: tablaSimbolo) {
        let valorV = tabla.getVariable(this.identificador);
        let posicionArr = this.posicion.interpretar(arbol, tabla);

        if(valorV === null){
            arbol.Print("\nError Semántico: No se puede editar el arreglo porque no existe. Linea: "+this.linea+" Columna: "+(this.columna+1));
            return new Errores("Semántico", "No se puede editar el arreglo porque no existe", this.linea, this.columna);
        }

        const vVector = valorV.getValor();
        this.tipoDato = valorV.getTipo();

        let valorNew = this.editar.interpretar(arbol, tabla);

        if(!Array.isArray(vVector)){
            arbol.Print("\nError Semántico: No se puede editar el arreglo porque no es un arreglo. Linea: "+this.linea+" Columna: "+(this.columna+1));
            return new Errores("Semántico", "No se puede editar el arreglo porque no es un arreglo", this.linea, this.columna);
        }

        if(posicionArr < 0 || posicionArr >= vVector.length){
            arbol.Print("\nError Semántico: Posición fuera de rango. Linea: "+this.linea+" Columna: "+(this.columna+1));
            return new Errores("Semántico", "Posición fuera de rango.", this.linea, this.columna);
        }

        vVector[posicionArr] = valorNew;
        
    }

    obtenerAST(anterior: string): string {

        let result ="";
        let contador = ContadorSingleton.getInstance();

        let padreID = `n${contador.getContador()}`;
        let ident = `n${contador.getContador()}`;
        let corc1 = `n${contador.getContador()}`;
        let pos = `n${contador.getContador()}`;
        let corc2 = `n${contador.getContador()}`;
        let igual = `n${contador.getContador()}`;
        let exp = `n${contador.getContador()}`;
        let puntocoma = `n${contador.getContador()}`;

        result += `${padreID}[label="ID"];\n`;
        result += `${ident}[label="${this.identificador}"];\n`;
        result += `${corc1}[label="["];\n`;
        result += `${pos}[label="Expresion"];\n`;
        result += `${corc2}[label="]"];\n`;
        result += `${igual}[label="="];\n`;
        result += `${exp}[label="Expresion"];\n`;
        result += `${puntocoma}[label=";"];\n`;

        result += anterior + " -> " + padreID + ";\n";
        result += padreID + " -> " + ident + ";\n";
        result += anterior + " -> " + corc1 + ";\n";
        result += anterior + " -> " + pos + ";\n";
        result += anterior + " -> " + corc2 + ";\n";
        result += anterior + " -> " + igual + ";\n";
        result += anterior + " -> " + exp + ";\n";
        result += anterior + " -> " + puntocoma + ";\n";

        result += this.posicion.obtenerAST(pos);
        result += this.editar.obtenerAST(exp);
        
        return result;
    }
}