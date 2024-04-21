import { Instruccion } from "../abstracto/instruccion";
import Errores from "../excep/errores";
import Arbol from "../simbol/arbol";
import Simbolo from "../simbol/Simbolo";
import TablaSimbolos from "../simbol/tablaSimbolos";
import Tipo, { tipoDato } from "../simbol/tipo";

export default class accesoVector extends Instruccion {
    private id: string
    private expresion: Instruccion
    private expresion2: Instruccion

    constructor(id: string, expresion: Instruccion, expresion2: Instruccion, linea: number, columna:number) {
        super(new Tipo(tipoDato.VOID), linea, columna)
        this.id = id
        this.expresion = expresion
        this.expresion2 = expresion2
    }

    interpretar(arbol: Arbol, tabla: TablaSimbolos) {
        let expAsignada = this.expresion.interpretar(arbol, tabla)
        if(expAsignada instanceof Errores) return expAsignada;

        let expAsignada2 = this.expresion2.interpretar(arbol, tabla)
        if(expAsignada2 instanceof Errores) return expAsignada2;

        if(this.expresion.tipoDato.getTipo() != tipoDato.ENTERO){ 
            arbol.Print("Error Semantico: La expresion debe de ser de tipo Entero. linea:" + this.linea + " columna: " + (this.columna + 1))
            return new Errores("Semantico", "La expresion debe de ser de tipo Entero", this.linea, this.columna)
        }
        if(this.expresion2.tipoDato.getTipo() != tipoDato.ENTERO){

            arbol.Print("Error Semantico: La expresion debe de ser de tipo Entero. linea:" + this.linea + " columna: " + (this.columna + 1))
            return new Errores("Semantico", "La expresion debe de ser de tipo int", this.linea, this.columna)

        }
        
        let valor = tabla.getVariable(this.id)

        if(valor != null) {
            this.tipoDato = valor.getTipo()
            let arrr = valor.getValor()

            if(parseInt(expAsignada) < 0 || parseInt(expAsignada) > arrr.length - 1){
                arbol.Print("Error Semantico: La posición 1 se encuentra fuera de rango. linea:" + this.linea + " columna: " + (this.columna + 1)); 
                return new Errores("Semantico", "La posición 1 se encuentra fuera de rango", this.linea, this.columna);
            }
            if(parseInt(expAsignada) < 0 || parseInt(expAsignada2) > arrr[0].length - 1) {
                arbol.Print("Error Semantico: La posición 2 se encuentra fuera de rango. linea:" + this.linea + " columna: " + (this.columna + 1));
                return new Errores("Semantico", "La posición 2 se encuentra fuera de rango.", this.linea, this.columna)
            }

            return valor.getValor()[expAsignada][expAsignada2]
        }

        arbol.Print("Error Semantico: La variable " +this.id+" no existe. linea:" + this.linea + " columna: " + (this.columna + 1));
        return new Errores("Semantico", "La variable " +this.id+" no existe ", this.linea, this.columna)
        
    }

    obtenerAST(anterior: string): string {
        return "";
    }
}