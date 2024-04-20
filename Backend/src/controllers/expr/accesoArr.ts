import { Instruccion } from "../abstracto/instruccion";
import Errores from "../excep/errores";
import Arbol from "../simbol/arbol";
import Simbolo from "../simbol/Simbolo";
import tablaSimbolo from "../simbol/tablaSimbolos";
import Tipo, { tipoDato } from "../simbol/tipo";

export default class AccesoArr extends Instruccion{

    private posicion: Instruccion;
    private identificador: string;

    constructor(identificador: string, posicion: Instruccion, linea: number, columna: number){
        super(new Tipo(tipoDato.ENTERO), linea, columna);
        this.posicion = posicion;
        this.identificador = identificador;
    }

    interpretar(arbol: Arbol, tabla: tablaSimbolo) {
        let valorV = tabla.getVariable(this.identificador);
        let posicionVar = this.posicion.interpretar(arbol, tabla);

        if(valorV === null){
            arbol.Print("\nError Semántico: La variable no existe. Linea: "+this.linea+" Columna: "+(this.columna+1));
            return new Errores('Semántico', "La variable no existe", this.linea, this.columna);
        }

        const vVector = valorV.getValor();
        this.tipoDato = valorV.getTipo();

        if(!Array.isArray(vVector)){
            arbol.Print("\nError Semántico: La variable no es un arreglo. Linea: "+this.linea+" Columna: "+(this.columna+1));
            return new Errores('Semántico', "La variable no es un arreglo", this.linea, this.columna);
        }

        if(posicionVar <0 || posicionVar >= vVector.length){
            arbol.Print("\nError Semántico: El índice esta fuera de rango. Linea: "+this.linea+" Columna: "+(this.columna+1));
            return new Errores('Semántico', "El índice esta fuera de rango", this.linea, this.columna);
        }

        return vVector[posicionVar]

    }

    obtenerAST(anterior: string): string {
        return "";
    }

}