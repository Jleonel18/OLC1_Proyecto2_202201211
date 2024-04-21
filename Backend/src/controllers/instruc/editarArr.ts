import { Instruccion } from "../abstracto/instruccion";
import Errores from "../excep/errores";
import Arbol from "../simbol/arbol";
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
        return "";
    }
}