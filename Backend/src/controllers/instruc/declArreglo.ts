import { Instruccion } from "../abstracto/instruccion";
import Errores from "../excep/errores";
import Arbol from "../simbol/arbol";
import Simbolo from "../simbol/Simbolo";
import tablaSimbolo from "../simbol/tablaSimbolos";
import Tipo, { tipoDato } from "../simbol/tipo";

export default class DeclaracionArreglo extends Instruccion {

    private primerTipo: Tipo;
    private segundoTipo?: Tipo | undefined;
    private identificador: string;
    private dimenValores: Instruccion[] | Instruccion;
    private booleano: boolean;

    constructor(booleano: boolean,primerTipo: Tipo, identificador: string, dimenValores: Instruccion[] | Instruccion, linea: number, columna: number, segundoTipo?: Tipo | undefined) {
        super(primerTipo, linea, columna)
        this.primerTipo = primerTipo;
        this.segundoTipo = segundoTipo;
        this.identificador = identificador;
        this.dimenValores = dimenValores;
        this.booleano = booleano;
    }

    interpretar(arbol: Arbol, tabla: tablaSimbolo) {

        if (Array.isArray(this.dimenValores)) {
            let arregloPivote: any = [];
            for (let i = 0; i < this.dimenValores.length; i++) {
                let valor = this.dimenValores[i].interpretar(arbol, tabla);
                if (valor instanceof Errores) return valor;
                if (this.primerTipo.getTipo() != this.dimenValores[i].tipoDato.getTipo()) {
                    arbol.Print("\nError Semántico: El tipo de dato no es igual al tipo de dato del arreglo. Linea: " + this.linea + " Columna: " + (this.columna + 1));
                    return new Errores('Semantico', `El tipo de dato no es igual al tipo de dato del arreglo`, this.linea, this.columna);
                }
                arregloPivote[i] = valor;
            }

            if (!tabla.setVariable(new Simbolo(this.tipoDato, this.identificador, arregloPivote))) {
                arbol.Print("\nError Semántico: No se puede declarar variable porque ya existia. Linea: " + this.linea + " Columna: " + (this.columna + 1));
                return new Errores("Semántico", "No se puede declarar variable porque ya existia", this.linea, this.columna)
            }
        } else if (!Array.isArray(this.dimenValores)) {

            if (this.booleano == true) {

                console.log("paso por aqui");
                
                if(this.primerTipo.getTipo() != tipoDato.CARACTER){
                    arbol.Print("\nError Semántico: El tipo de dato no es igual al tipo de dato del arreglo. Linea: " + this.linea + " Columna: " + (this.columna + 1));
                    return new Errores('Semantico', `El tipo de dato no es igual al tipo de dato del arreglo`, this.linea, this.columna);
                }

                let arregloPivote: any = [];
                //console.log("aquiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiii")
                arregloPivote = this.dimenValores.interpretar(arbol, tabla).slice();

                //console.log("el arreglo pivote es:",arregloPivote);

                if (!tabla.setVariable(new Simbolo(this.tipoDato, this.identificador, arregloPivote))) {
                    arbol.Print("\nError Semántico: No se puede declarar variable porque ya existia. Linea: " + this.linea + " Columna: " + (this.columna + 1));
                    return new Errores("Semántico", "No se puede declarar variable porque ya existia", this.linea, this.columna)
                }
                

            } else {

                if (this.primerTipo.getTipo() != this.segundoTipo?.getTipo()) {
                    arbol.Print("\nError Semántico: El tipo de dato no es igual al tipo de dato del arreglo. Linea: " + this.linea + " Columna: " + (this.columna + 1));
                    return new Errores('Semantico', `El tipo de dato no es igual al tipo de dato del arreglo`, this.linea, this.columna);
                }

                let size = this.dimenValores.interpretar(arbol, tabla);
                if (this.dimenValores.tipoDato.getTipo() != tipoDato.ENTERO) {
                    arbol.Print("\nError Semántico: El tamaño del arreglo debe ser un número entero. Linea: " + this.linea + " Columna: " + (this.columna + 1));
                    return new Errores("Semántico", "El tamaño del arreglo debe ser un número entero.", this.linea, this.columna)
                }

                let arregloPivote: any = [];

                for (let i = 0; i < size; i++) {
                    if (this.segundoTipo?.getTipo() == tipoDato.ENTERO) {
                        arregloPivote[i] = 0;
                    } else if (this.segundoTipo?.getTipo() == tipoDato.DECIMAL) {
                        arregloPivote[i] = 0.0;
                    } else if (this.segundoTipo?.getTipo() == tipoDato.CADENA) {
                        arregloPivote[i] = "";
                    } else if (this.segundoTipo?.getTipo() == tipoDato.BOOL) {
                        arregloPivote[i] = true;
                    } else if (this.segundoTipo?.getTipo() == tipoDato.CARACTER) {
                        arregloPivote[i] = '0';
                    }

                }

                if (!tabla.setVariable(new Simbolo(this.tipoDato, this.identificador, arregloPivote))) {
                    arbol.Print("\nError Semántico: No se puede declarar variable porque ya existia. Linea: " + this.linea + " Columna: " + (this.columna + 1));
                    return new Errores("Semántico", "No se puede declarar variable porque ya existia", this.linea, this.columna)
                }

            }



        } else {
            arbol.Print("\nError Semántico: No se puede declarar el arreglo. Linea: " + this.linea + " Columna: " + (this.columna + 1));
            return new Errores("Semántico", "No se puede declarar el arreglo", this.linea, this.columna)
        }

    }

}