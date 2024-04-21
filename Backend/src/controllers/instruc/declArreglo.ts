import e from "express";
import { Instruccion } from "../abstracto/instruccion";
import Errores from "../excep/errores";
import Arbol from "../simbol/arbol";
import ContadorSingleton from "../simbol/contadorSingleton";
import Simbolo from "../simbol/Simbolo";
import tablaSimbolo from "../simbol/tablaSimbolos";
import Tipo, { tipoDato } from "../simbol/tipo";

export default class DeclaracionArreglo extends Instruccion {

    private primerTipo: Tipo;
    private segundoTipo?: Tipo | undefined;
    private identificador: string;
    private dimenValores: Instruccion[] | Instruccion;
    private booleano: boolean;

    constructor(booleano: boolean, primerTipo: Tipo, identificador: string, dimenValores: Instruccion[] | Instruccion, linea: number, columna: number, segundoTipo?: Tipo | undefined) {
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

                //console.log("paso por aqui");

                if (this.primerTipo.getTipo() != tipoDato.CARACTER) {
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

    obtenerAST(anterior: string): string {
        let result = "";

        let contador = ContadorSingleton.getInstance();

        if (this.booleano == false && this.segundoTipo != undefined) {

            let tipoArr = `n${contador.getContador()}`;
            let padreID = `n${contador.getContador()}`;
            let ident = `n${contador.getContador()}`;
            let corcP1 = `n${contador.getContador()}`;
            let corcP2 = `n${contador.getContador()}`;
            let igual = `n${contador.getContador()}`;
            let nNew = `n${contador.getContador()}`;
            let tipo2 = `n${contador.getContador()}`;
            let corcS1 = `n${contador.getContador()}`;
            let exp = `n${contador.getContador()}`;
            let corcS2 = `n${contador.getContador()}`;
            let puntoComa = `n${contador.getContador()}`;

            if (this.primerTipo.getTipo() == tipoDato.ENTERO) {
                result += `${tipoArr}[label="int"];\n`;
            } else if (this.primerTipo.getTipo() == tipoDato.DECIMAL) {
                result += `${tipoArr}[label="double"];\n`;
            } else if (this.primerTipo.getTipo() == tipoDato.CADENA) {
                result += `${tipoArr}[label="std::string"];\n`;
            } else if (this.primerTipo.getTipo() == tipoDato.BOOL) {
                result += `${tipoArr}[label="bool"];\n`;
            } else if (this.primerTipo.getTipo() == tipoDato.CARACTER) {
                result += `${tipoArr}[label="char"];\n`;
            }

            result += `${padreID}[label="ID"];\n`;
            result += `${ident}[label="${this.identificador}"];\n`;
            result += `${corcP1}[label="["];\n`;
            result += `${corcP2}[label="]"];\n`;
            result += `${igual}[label="="];\n`;
            result += `${nNew}[label="new"];\n`;

            if(this.segundoTipo.getTipo() == tipoDato.ENTERO){
                result += `${tipo2}[label="int"];\n`;
            }else if(this.segundoTipo.getTipo() == tipoDato.DECIMAL){
                result += `${tipo2}[label="double"];\n`;
            }else if(this.segundoTipo.getTipo() == tipoDato.CADENA){
                result += `${tipo2}[label="std::string"];\n`;
            }else if(this.segundoTipo.getTipo() == tipoDato.BOOL){
                result += `${tipo2}[label="bool"];\n`;
            }else if(this.segundoTipo.getTipo() == tipoDato.CARACTER){
                result += `${tipo2}[label="char"];\n`;
            }

            result += `${corcS1}[label="["];\n`;
            result += `${exp}[label="Expresion"];\n`;
            result += `${corcS2}[label="]"];\n`;
            result += `${puntoComa}[label=";"];\n`;

            result += anterior + " -> " + tipoArr + ";\n";
            result += anterior + " -> " + padreID + ";\n";
            result += padreID + " -> " + ident + ";\n";
            result += anterior + " -> " + corcP1 + ";\n";
            result += anterior + " -> " + corcP2 + ";\n";
            result += anterior + " -> " + igual + ";\n";
            result += anterior + " -> " + nNew + ";\n";
            result += anterior + " -> " + tipo2 + ";\n";
            result += anterior + " -> " + corcS1 + ";\n";
            result += anterior + " -> " + exp + ";\n";
            result += anterior + " -> " + corcS2 + ";\n";
            result += anterior + " -> " + puntoComa + ";\n";

            if(!Array.isArray(this.dimenValores)){
                result += this.dimenValores.obtenerAST(exp);
            }

        }else if(this.booleano == false && this.segundoTipo == undefined){

            let tipoArr = `n${contador.getContador()}`;
            let padreID = `n${contador.getContador()}`;
            let ident = `n${contador.getContador()}`;
            let corcP1 = `n${contador.getContador()}`;
            let corcP2 = `n${contador.getContador()}`;
            let igual = `n${contador.getContador()}`;
            let corcS1 = `n${contador.getContador()}`;
            let arreglo = [];
            let padreDatos = `n${contador.getContador()}`;
            if(Array.isArray(this.dimenValores)){
                for(let i=0; i<this.dimenValores.length; i++){
                    arreglo.push(`n${contador.getContador()}`);
                }
            }

            let corcS2 = `n${contador.getContador()}`;
            let puntoComa = `n${contador.getContador()}`;

            if (this.primerTipo.getTipo() == tipoDato.ENTERO) {
                result += `${tipoArr}[label="int"];\n`;
            } else if (this.primerTipo.getTipo() == tipoDato.DECIMAL) {
                result += `${tipoArr}[label="double"];\n`;
            } else if (this.primerTipo.getTipo() == tipoDato.CADENA) {
                result += `${tipoArr}[label="std::string"];\n`;
            } else if (this.primerTipo.getTipo() == tipoDato.BOOL) {
                result += `${tipoArr}[label="bool"];\n`;
            } else if (this.primerTipo.getTipo() == tipoDato.CARACTER) {
                result += `${tipoArr}[label="char"];\n`;
            }

            result += `${padreID}[label="ID"];\n`;
            result += `${ident}[label="${this.identificador}"];\n`;
            result += `${corcP1}[label="["];\n`;
            result += `${corcP2}[label="]"];\n`;
            result += `${igual}[label="="];\n`;

            result += `${corcS1}[label="["];\n`;
            result += `${padreDatos}[label="Expresiones"];\n`;
            if(Array.isArray(this.dimenValores)){
                for(let i=0; i<this.dimenValores.length; i++){
                    result += `${arreglo[i]}[label="Expresion"];\n`;
                }
            }

            result += `${corcS2}[label="]"];\n`;
            result += `${puntoComa}[label=";"];\n`;

            result += anterior + " -> " + tipoArr + ";\n";
            result += anterior + " -> " + padreID + ";\n";
            result += padreID + " -> " + ident + ";\n";
            result += anterior + " -> " + corcP1 + ";\n";
            result += anterior + " -> " + corcP2 + ";\n";
            result += anterior + " -> " + igual + ";\n";
            result += anterior + " -> " + corcS1 + ";\n";
            result += anterior + " -> " + padreDatos + ";\n";

            if(Array.isArray(this.dimenValores)){
                for(let i=0; i<this.dimenValores.length; i++){
                    result += `${padreDatos} -> ${arreglo[i]};\n`;
                }
            }

            result += anterior + " -> " + corcS2 + ";\n";
            result += anterior + " -> " + puntoComa + ";\n";

            if(Array.isArray(this.dimenValores)){
                for(let i=0; i<this.dimenValores.length; i++){
                    result += this.dimenValores[i].obtenerAST(arreglo[i]);
                }
            }

        }else if(this.booleano == true){

            let tipoArr = `n${contador.getContador()}`;
            let padreID = `n${contador.getContador()}`;
            let ident = `n${contador.getContador()}`;
            let corcP1 = `n${contador.getContador()}`;
            let corcP2 = `n${contador.getContador()}`;
            let igual = `n${contador.getContador()}`;

            let exp = `n${contador.getContador()}`;
            let puntoComa = `n${contador.getContador()}`;

            if (this.primerTipo.getTipo() == tipoDato.CARACTER) {
                result += `${tipoArr}[label="char"];\n`;
            }else if (this.primerTipo.getTipo() == tipoDato.BOOL) {
                result += `${tipoArr}[label="bool"];\n`;
            }else if (this.primerTipo.getTipo() == tipoDato.CADENA) {
                result += `${tipoArr}[label="std::string"];\n`;
            }else if (this.primerTipo.getTipo() == tipoDato.DECIMAL) {
                result += `${tipoArr}[label="double"];\n`;
            }else if (this.primerTipo.getTipo() == tipoDato.ENTERO) {
                result += `${tipoArr}[label="int"];\n`;
            }

            result += `${padreID}[label="ID"];\n`;  
            result += `${ident}[label="${this.identificador}"];\n`;
            result += `${corcP1}[label="["];\n`;
            result += `${corcP2}[label="]"];\n`;
            result += `${igual}[label="="];\n`;

            if(!Array.isArray(this.dimenValores)){
                result += `${exp}[label="Expresion"];\n`;
            }

            result += `${puntoComa}[label=";"];\n`;

            result += anterior + " -> " + tipoArr + ";\n";
            result += anterior + " -> " + padreID + ";\n";
            result += padreID + " -> " + ident + ";\n";
            result += anterior + " -> " + corcP1 + ";\n";
            result += anterior + " -> " + corcP2 + ";\n";
            result += anterior + " -> " + igual + ";\n";
            result += anterior + " -> " + exp + ";\n";
            result += anterior + " -> " + puntoComa + ";\n";

            if(!Array.isArray(this.dimenValores)){
                result += this.dimenValores.obtenerAST(exp);
            }

        }






        return result;
    }

}