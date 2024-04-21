"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const instruccion_1 = require("../abstracto/instruccion");
const errores_1 = __importDefault(require("../excep/errores"));
const contadorSingleton_1 = __importDefault(require("../simbol/contadorSingleton"));
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
                        //console.log("lo que quiero probar es:"+i.expresion.tipoDato.getTipo()+" "+this.tipo.getTipo());
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
                        //console.log(resultado.expresion.tipoDato.getTipo());
                        existeReturn = true;
                        this.valorRetorno = resultado.expresion;
                        //console.log("lo que quiero probar es:"+resultado.expresion.tipoDato.getTipo());
                        //console.log("this.tipo.getTipo():"+this.tipo.getTipo()+" resultado.tipoDato.getTipo():"+resultado.expresion.tipoDato.getTipo());
                        /*if(this.tipo.getTipo() != resultado.expresion.tipoDato.getTipo()){
                           arbol.Print("Error Semantico: El tipo de retorno no coincide con el tipo de la función. linea:"+ this.linea+" columna: " +(this.columna+1));
                            return new Errores("Semantico", "El tipo de retorno no coincide con el tipo de la función", this.linea, this.columna);
                        }*/
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
    obtenerAST(anterior) {
        let result = "";
        let contador = contadorSingleton_1.default.getInstance();
        let contTipoParametro = [];
        let contParametros = [];
        let contInstrucciones = [];
        let padre = `n${contador.getContador()}`;
        let tipoFuncion = `n${contador.getContador()}`;
        let padreId = `n${contador.getContador()}`;
        let ident = `n${contador.getContador()}`;
        let par1 = `n${contador.getContador()}`;
        let parm = `n${contador.getContador()}`;
        for (let i = 0; i < this.parametros.length; i++) {
            contTipoParametro.push(`n${contador.getContador()}`);
            contParametros.push(`n${contador.getContador()}`);
        }
        let par2 = `n${contador.getContador()}`;
        let llav1 = `n${contador.getContador()}`;
        let padreInstr = `n${contador.getContador()}`;
        for (let i = 0; i < this.instrucciones.length; i++) {
            contInstrucciones.push(`n${contador.getContador()}`);
        }
        let llav2 = `n${contador.getContador()}`;
        result += `${padre}[label="metodo/funcion"];\n`;
        if (this.tipo.getTipo() == tipo_1.tipoDato.VOID) {
            result += `${tipoFuncion}[label="void"];\n`;
        }
        else if (this.tipo.getTipo() == tipo_1.tipoDato.ENTERO) {
            result += `${tipoFuncion}[label="int"];\n`;
        }
        else if (this.tipo.getTipo() == tipo_1.tipoDato.DECIMAL) {
            result += `${tipoFuncion}[label="double"];\n`;
        }
        else if (this.tipo.getTipo() == tipo_1.tipoDato.CADENA) {
            result += `${tipoFuncion}[label="std::string"];\n`;
        }
        else if (this.tipo.getTipo() == tipo_1.tipoDato.BOOL) {
            result += `${tipoFuncion}[label="bool"];\n`;
        }
        result += `${padreId}[label="ID"];\n`;
        result += `${ident}[label="${this.id}"];\n`;
        result += `${par1}[label="("];\n`;
        result += `${parm}[label="parametros"];\n`;
        for (let i = 0; i < this.parametros.length; i++) {
            if (this.parametros[i].tipo.getTipo() == tipo_1.tipoDato.ENTERO) {
                result += `${contTipoParametro[i]}[label="int"];\n`;
            }
            else if (this.parametros[i].tipo.getTipo() == tipo_1.tipoDato.DECIMAL) {
                result += `${contTipoParametro[i]}[label="double"];\n`;
            }
            else if (this.parametros[i].tipo.getTipo() == tipo_1.tipoDato.CADENA) {
                result += `${contTipoParametro[i]}[label="std::string"];\n`;
            }
            else if (this.parametros[i].tipo.getTipo() == tipo_1.tipoDato.BOOL) {
                result += `${contTipoParametro[i]}[label="bool"];\n`;
            }
            else if (this.parametros[i].tipo.getTipo() == tipo_1.tipoDato.VOID) {
                result += `${contTipoParametro[i]}[label="void"];\n`;
            }
            else if (this.parametros[i].tipo.getTipo() == tipo_1.tipoDato.CARACTER) {
                result += `${contTipoParametro[i]}[label="char"];\n`;
            }
            result += `${contParametros[i]}[label="${this.parametros[i].id}"];\n`;
        }
        result += `${par2}[label=")"];\n`;
        result += `${llav1}[label="{"];\n`;
        result += `${padreInstr}[label="instrucciones"];\n`;
        for (let i = 0; i < this.instrucciones.length; i++) {
            result += `${contInstrucciones[i]}[label="instruccion"];\n`;
        }
        result += `${llav2}[label="}"];\n`;
        result += `${padre} -> ${tipoFuncion};\n`;
        result += `${padre} -> ${padreId};\n`;
        result += `${padreId} -> ${ident};\n`;
        result += `${padre} -> ${par1};\n`;
        result += `${padre} -> ${parm};\n`;
        for (let i = 0; i < this.parametros.length; i++) {
            result += `${parm} -> ${contTipoParametro[i]};\n`;
            result += `${parm} -> ${contParametros[i]};\n`;
        }
        result += `${padre} -> ${par2};\n`;
        result += `${padre} -> ${llav1};\n`;
        result += `${padre} -> ${padreInstr};\n`;
        for (let i = 0; i < this.instrucciones.length; i++) {
            result += `${padreInstr} -> ${contInstrucciones[i]};\n`;
        }
        result += `${padre} -> ${llav2};\n`;
        result += `${anterior} -> ${padre};\n`;
        for (let i = 0; i < this.instrucciones.length; i++) {
            result += this.instrucciones[i].obtenerAST(contInstrucciones[i]);
        }
        return result;
    }
}
exports.default = Metodo;
