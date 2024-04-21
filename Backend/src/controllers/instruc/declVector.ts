import { Instruccion } from "../abstracto/instruccion";
import Errores from "../excep/errores";
import Arbol from "../simbol/arbol";
import Simbolo from "../simbol/Simbolo";
import TablaSimbolos from "../simbol/tablaSimbolos";
import Tipo, { tipoDato } from "../simbol/tipo";

export default class declVector extends Instruccion {
    private tipo1: Tipo
    private tipo2?: Tipo
    private id: string
    private expresion: Instruccion[] | Instruccion
    private expresion2: Instruccion[] | Instruccion
    private datos: Instruccion[][]

    constructor(linea: number, columna: number, tipo1: Tipo, id: string, expresion: Instruccion[] | Instruccion, expresion2: Instruccion[] | Instruccion, datos: Instruccion[][], tipo2?: Tipo) {
        super(tipo1, linea, columna)
        this.tipo1 = tipo1
        this.tipo2 = tipo2
        this.id = id
        this.expresion = expresion
        this.expresion2 = expresion2
        this.datos = datos
    }

    interpretar(arbol: Arbol, tabla: TablaSimbolos) {

        if (!Array.isArray(this.expresion) && !Array.isArray(this.expresion2)) {
            if (this.tipo1.getTipo() != this.tipo2?.getTipo()) return new Errores("Semantico", "Los tipos son diferentes para la declaracion del vector", this.linea, this.columna)
            let qt1 = this.expresion.interpretar(arbol, tabla)
            let qt2 = this.expresion2.interpretar(arbol, tabla)

            if (qt1 instanceof Errores) return qt1

            if (qt2 instanceof Errores) return qt2

            if (this.expresion.tipoDato.getTipo() != tipoDato.ENTERO) {
                arbol.Print("Error Semantico: La variable para el tamaño del vector no es de tipo Entero. linea:" + this.linea + " columna: " + (this.columna + 1))
                return new Errores("Semántico", "La variable para el tamaño del vector no es de tipo Entero", this.linea, this.columna)

            }
            if (this.expresion2.tipoDato.getTipo() != tipoDato.ENTERO) {
                arbol.Print("Error Semantico: La variable para el tamaño del vector no es de tipo Entero. linea:" + this.linea + " columna: " + (this.columna + 1))
                return new Errores("Semántico", "La variable para el tamaño del vector no es de tipo Entero", this.linea, this.columna)
            }

            qt1 = parseInt(qt1)
            qt2 = parseInt(qt2)

            let nuevoArray = new Array(qt1);

            let valorA: any;

            if (this.tipo1.getTipo() == tipoDato.ENTERO) {
                valorA = 0
            } else if (this.tipo1.getTipo() == tipoDato.DECIMAL) {
                valorA = 0.0
            } else if (this.tipo1.getTipo() == tipoDato.BOOL) {
                valorA = true
            } else if (this.tipo1.getTipo() == tipoDato.CARACTER) {
                valorA = '0'

            } else if (this.tipo1.getTipo() == tipoDato.CADENA) {
                valorA = ""
            }

            for (let i = 0; i < qt1; i++) {
                nuevoArray[i] = new Array(qt2)
            }

            for (let i = 0; i < qt1; i++) {
                for (let j = 0; j < qt2; j++) {
                    nuevoArray[i][j] = valorA;

                }
            }


            if (!tabla.setVariable(new Simbolo(this.tipoDato, this.id, nuevoArray))) {
                arbol.Print("Error Semantico: No se puede declarar el vector, porque ya existe la variable " + this.id + ". linea:" + this.linea + " columna: " + (this.columna + 1))
                return new Errores("Semantico", "No se puede declarar el vector, porque ya existe la variable " + this.id, this.linea, this.columna)
            }

        } else if (this.datos.length > 0) {
            let arrr = new Array(this.datos.length)

            for (let i = 0; i < this.datos.length; i++) {

                if (Array.isArray(this.datos[i])) {

                    arrr[i] = new Array(this.datos[i].length)

                    for (let j = 0; j < this.datos[i].length; j++) {

                        let valor = this.datos[i][j].interpretar(arbol, tabla)
                        if (valor instanceof Errores) return valor
                        if (this.tipo1.getTipo() != this.datos[i][j].tipoDato.getTipo()) {
                            return new Errores("Semantico", "Tipo de dato distinto al del vector", this.linea, this.columna)
                        }

                        arrr[i][j] = valor
                    }
                } else {
                    return new Errores("Semantico", "Debe de ser un vector", this.linea, this.columna)
                }

            }

            if (!tabla.setVariable(new Simbolo(this.tipoDato, this.id, arrr))) {
                return new Errores("Semantico", "No se puede declarar el vector, porque ya existe el ID " + this.id, this.linea, this.columna)
            }

        }

    }

    obtenerAST(anterior: string): string {
        return "";
    }

}




