"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const instruccion_1 = require("../abstracto/instruccion");
const errores_1 = __importDefault(require("../excep/errores"));
const tipo_1 = require("../simbol/tipo");
const return_1 = __importDefault(require("./return"));
class Metodo extends instruccion_1.Instruccion {
    constructor(id, tipo, parametros, instrucciones, linea, columna) {
        super(tipo, linea, columna);
        this.parametros = [];
        this.valorRetorno = instruccion_1.Instruccion;
        this.id = id;
        this.parametros = parametros;
        this.tipo = tipo;
        this.instrucciones = instrucciones;
    }
    interpretar(arbol, tabla) {
        if (this.tipo.getTipo() == tipo_1.tipoDato.VOID) {
            for (let i of this.instrucciones) {
                let resultado = i.interpretar(arbol, tabla);
                if (resultado instanceof errores_1.default) {
                    return resultado;
                }
                if (resultado instanceof return_1.default) {
                    //console.log("Retorno en metodo")
                    if (resultado.expresion != undefined) {
                        return resultado;
                    }
                    return;
                }
            }
        }
        else {
            let existeReturn = false;
            for (let i of this.instrucciones) {
                if (i instanceof return_1.default) {
                    existeReturn = true;
                    if (i.expresion != undefined) {
                        this.valorRetorno = i.expresion;
                        console.log("lo que quiero probar es:" + i.expresion.tipoDato.getTipo() + " " + this.tipo.getTipo());
                        /*if(this.tipo.getTipo() != i.expresion.tipoDato.getTipo()){
                            arbol.Print("Error Semantico: El tipo de retorno no coincide con el tipo de la función. linea:"+ this.linea+" columna: " +(this.columna+1));
                            return new Errores("Semantico", "El tipo de retorno no coincide con el tipo de la función", this.linea, this.columna);
                        }*/
                        return i.expresion;
                    }
                    else {
                        arbol.Print("Error Semantico: El return debe retornar un valor. linea:" + this.linea + " columna: " + (this.columna + 1));
                        return new errores_1.default("Semantico", "El metodo no retorna un valor", this.linea, this.columna);
                    }
                }
                let resultado = i.interpretar(arbol, tabla);
                if (resultado instanceof errores_1.default) {
                    return resultado;
                }
                if (resultado instanceof return_1.default) {
                    if (resultado.expresion != undefined) {
                        console.log(resultado.expresion.tipoDato.getTipo());
                        existeReturn = true;
                        this.valorRetorno = resultado.expresion;
                        //console.log("lo que quiero probar es:"+resultado.expresion.tipoDato.getTipo());
                        //console.log("this.tipo.getTipo():"+this.tipo.getTipo()+" resultado.tipoDato.getTipo():"+resultado.expresion.tipoDato.getTipo());
                        if (this.tipo.getTipo() != resultado.expresion.tipoDato.getTipo()) {
                            arbol.Print("Error Semantico: El tipo de retorno no coincide con el tipo de la función. linea:" + this.linea + " columna: " + (this.columna + 1));
                            return new errores_1.default("Semantico", "El tipo de retorno no coincide con el tipo de la función", this.linea, this.columna);
                        }
                        //console.log(resultado.expresion.tipoDato.getTipo());
                        return resultado.expresion;
                    }
                    else {
                        arbol.Print("Error Semantico: El return debe retornar un valor. linea:" + this.linea + " columna: " + (this.columna + 1));
                        return new errores_1.default("Semantico", "El metodo no retorna un valor", this.linea, this.columna);
                    }
                }
            }
            if (existeReturn == false) {
                arbol.Print("Error Semantico: No existe un return en la función. linea:" + this.linea + " columna: " + (this.columna + 1));
                return new errores_1.default("Semantico", "No existe un return en la función", this.linea, this.columna);
            }
        }
    }
}
exports.default = Metodo;
