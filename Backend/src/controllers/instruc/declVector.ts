import { Instruccion } from "../abstracto/instruccion";
import Errores from "../excep/errores";
import Arbol from "../simbol/arbol";
import Simbolo from "../simbol/Simbolo";
import TablaSimbolos from "../simbol/tablaSimbolos";
import Tipo, { tipoDato } from "../simbol/tipo";

export default class DeclVector extends Instruccion {
    private tipo1: Tipo
    private tipo2?: Tipo
    private id: string
    private expresion : Instruccion[] | Instruccion
    private expresion2 : Instruccion[] | Instruccion
    private datosVector: Instruccion[][]

    constructor(linea: number, columna: number, tipo1: Tipo, id: string, expresion: Instruccion[] | Instruccion, expresion2: Instruccion[] | Instruccion, datosVector: Instruccion[][], tipo2?: Tipo) {
        super(tipo1, linea, columna)
        this.tipo1 = tipo1
        this.tipo2 = tipo2
        this.id = id
        this.expresion = expresion
        this.expresion2 = expresion2
        this.datosVector = datosVector
    }

    interpretar(arbol: Arbol, tabla: TablaSimbolos) {

        if(!Array.isArray(this.expresion) && !Array.isArray(this.expresion2)) {
            if(this.tipo1.getTipo() != this.tipo2?.getTipo()) {
                arbol.Print("Error Semantico: Los tipos son diferentes para la declaracion del vector. linea:" + this.linea + " columna: " + (this.columna + 1));
                return new Errores("Semantico", "Los tipos son diferentes para la declaracion del vector", this.linea, this.columna)
            }
            let qt1 = this.expresion.interpretar(arbol, tabla)
            let qt2 = this.expresion2.interpretar(arbol, tabla)

            if(qt1 instanceof Errores) return qt1
            if(qt2 instanceof Errores) return qt2

            if(this.expresion.tipoDato.getTipo() != tipoDato.ENTERO){ 
                arbol.Print("Error Semántico: La variable para el tamaño del vector no es de tipo Entero. linea:" + this.linea + " columna: " + (this.columna + 1))
                return new Errores("Semántico", "La variable para el tamaño del vector no es de tipo Entero", this.linea, this.columna)
            }
            if(this.expresion2.tipoDato.getTipo() != tipoDato.ENTERO) {
                arbol.Print("Error Semántico: La variable para el tamaño del vector no es de tipo Entero. linea:" + this.linea + " columna: " + (this.columna + 1))
                return new Errores("Semántico", "La variable para el tamaño del vector no es de tipo Entero", this.linea, this.columna)
            }
            
            qt1 = parseInt(qt1)
            qt2 = parseInt(qt2)

            let nuevoArreglo = new Array(qt1);

            let valor: any;

            if(this.tipo1.getTipo() == tipoDato.ENTERO) {
                valor = 0;
            }else if(this.tipo1.getTipo() == tipoDato.DECIMAL) {
                valor = 0.0
            }else if(   this.tipo1.getTipo() == tipoDato.CARACTER) {
                valor = '0';
            }else if(this.tipo1.getTipo() == tipoDato.BOOL) {
                valor = true;
            }else if(this.tipo1.getTipo() == tipoDato.CADENA) {
                valor = "";
            }

            for(let i = 0; i < qt1; i++) {
                nuevoArreglo[i] = new Array(qt2)
            }

            for(let i = 0; i < qt1; i++) {
                for(let j = 0; j < qt2; j++) {
                    nuevoArreglo[i][j] = valor

                }
            }


            if(!tabla.setVariable(new Simbolo(this.tipoDato, this.id, nuevoArreglo))) {
                arbol.Print("Error Semantico: No se puede declarar el vector, porque ya existe "+this.id+". linea:" + this.linea + " columna: " + (this.columna + 1))
                return new Errores("Semantico", "No se puede declarar el vector, porque ya existe "+this.id, this.linea, this.columna)
            }
        }else if(this.datosVector.length > 0) {
            let nuevoArreglo = new Array(this.datosVector.length)

            for (let i = 0; i < this.datosVector.length; i++) {

                if(Array.isArray(this.datosVector[i])) {

                    nuevoArreglo[i] = new Array(this.datosVector[i].length)
                    
                    for (let j = 0; j < this.datosVector[i].length; j++) {
                        
                        let valor = this.datosVector[i][j].interpretar(arbol, tabla)
                        if(valor instanceof Errores) return valor
                        if(this.tipo1.getTipo() != this.datosVector[i][j].tipoDato.getTipo()) {

                            arbol.Print("Error Semantico: Los tipos de datos no coinciden. linea:" + this.linea + " columna: " + (this.columna + 1))
                            return new Errores("Semantico", "Los tipos de datos no coinciden", this.linea, this.columna)
                        }
                        
                        nuevoArreglo[i][j] = valor
                    }
                }else {
                    arbol.Print("Error Semantico: Debe de ser un vector. linea:" + this.linea + " columna: " + (this.columna + 1))
                    return new Errores("Semantico", "Debe de ser un vector", this.linea, this.columna)
                }
                
            }

            if(!tabla.setVariable(new Simbolo(this.tipoDato, this.id, nuevoArreglo))) {
                arbol.Print("Error Semantico:No fue posible declarar el vector, ya existe el ID "+this.id+". linea:" + this.linea + " columna: " + (this.columna + 1))
                return new Errores("Semantico", "no fue posible declarar el vector, ya existe el ID "+this.id, this.linea, this.columna)
            }

        }
    }

    obtenerAST(anterior: string): string {
        return "";
    }


}