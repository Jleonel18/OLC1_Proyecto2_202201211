import { Instruccion } from "../abstracto/instruccion";
import Errores from "../excep/errores";
import Arbol from "../simbol/arbol";
import ContadorSingleton from "../simbol/contadorSingleton";
import tablaSimbolo from "../simbol/tablaSimbolos";
import Tipo, { tipoDato } from "../simbol/tipo";
import { Operadores } from "./Aritmeticas";

export default class Casteo extends Instruccion {

    private operandoUnico: Instruccion | undefined
    private tipoD: Tipo

    constructor(operador: Tipo, fila: number, columna: number, operando: Instruccion) {
        super(new Tipo(tipoDato.VOID), fila, columna)
        this.tipoD = operador
        this.operandoUnico = operando
    }

    interpretar(arbol: Arbol, tabla: tablaSimbolo) {
        let expresion = this.operandoUnico?.interpretar(arbol, tabla)
        switch (this.tipoD.getTipo()) {
            case tipoDato.ENTERO:
                return this.castearEntero(expresion);
            case tipoDato.DECIMAL:
                return this.castearDouble(expresion);
            case tipoDato.CARACTER:
                return this.castearCaracter(expresion);
            case tipoDato.CADENA:
                return this.castearCadena(expresion);
        }
    }

    castearEntero(operando: any) {
        let tipo = this.operandoUnico?.tipoDato.getTipo();
        switch (tipo) {
            case tipoDato.DECIMAL:
                this.tipoDato = new Tipo(tipoDato.ENTERO);
                return parseInt(operando);
            case tipoDato.CARACTER:
                this.tipoDato = new Tipo(tipoDato.ENTERO);
                return parseInt(operando.charCodeAt(1));
            default:
                return new Errores("Error Semantico", "No se puede castear el valor", this.linea, this.columna)
        }

    }

    castearDouble(operando: any) {
        let tipo = this.operandoUnico?.tipoDato.getTipo();
        switch (tipo) {
            case tipoDato.ENTERO:
                this.tipoDato = new Tipo(tipoDato.DECIMAL);
                return parseFloat(operando);
            case tipoDato.CARACTER:
                this.tipoDato = new Tipo(tipoDato.DECIMAL);
                return parseFloat(operando.charCodeAt(1));
            default:
                return new Errores("Error Semantico", "No se puede castear el valor", this.linea, this.columna)
        }
    }

    castearCaracter(operando: any) {
        let tipo = this.operandoUnico?.tipoDato.getTipo();
        switch (tipo) {
            case tipoDato.ENTERO:
                this.tipoDato = new Tipo(tipoDato.CARACTER);
                return String.fromCharCode(parseInt(operando));
            case tipoDato.DECIMAL:
                this.tipoDato = new Tipo(tipoDato.CARACTER);
                return String.fromCharCode(parseFloat(operando));
            default:
                return new Errores("Error Semantico", "No se puede castear el valor", this.linea, this.columna)
        }
    }

    castearCadena(operando: any) {
        let tipo = this.operandoUnico?.tipoDato.getTipo();
        switch (tipo) {
            case tipoDato.ENTERO:
                this.tipoDato = new Tipo(tipoDato.CADENA);
                return parseInt(operando).toString();
            case tipoDato.DECIMAL:
                this.tipoDato = new Tipo(tipoDato.CADENA);
                return parseFloat(operando).toString();
            case tipoDato.CARACTER:
                this.tipoDato = new Tipo(tipoDato.CADENA);
                return operando.toString();
            default:
                return new Errores("Error Semantico", "No se puede castear el valor", this.linea, this.columna)
        }
    }

    obtenerAST(anterior: string): string {


        let contador = ContadorSingleton.getInstance();
        let result = "";

        let padre = `n${contador.getContador()}`;
        let par1 = `n${contador.getContador()}`;
        let tipo = `n${contador.getContador()}`;
        let par2 = `n${contador.getContador()}`;
        let valor = `n${contador.getContador()}`;
        let puntocoma = `n${contador.getContador()}`;

        result += `${padre}[label="casteo"];\n`;
        result += `${par1}[label="("];\n`;
        if(this.tipoD.getTipo() == tipoDato.ENTERO){
            result += `${tipo}[label="int"];\n`;
        }else if(this.tipoD.getTipo() == tipoDato.DECIMAL){
            result += `${tipo}[label="double"];\n`;
        }else if(this.tipoD.getTipo() == tipoDato.CARACTER){
            result += `${tipo}[label="char"];\n`;
        }else if(this.tipoD.getTipo() == tipoDato.CADENA){
            result += `${tipo}[label="std::string"];\n`;
        }else if(this.tipoD.getTipo() == tipoDato.BOOL){
            result += `${tipo}[label="bool"];\n`;
        }

        result += `${par2}[label="("];\n`;
        result += `${valor}[label="Expresion"];\n`;
        result += `${puntocoma}[label=";"];\n`;


        result += `${anterior} -> ${padre};\n`;
        result += `${padre} -> ${par1};\n`;
        result += `${padre} -> ${tipo};\n`;
        result += `${padre} -> ${par2};\n`;
        result += `${padre} -> ${valor};\n`;
        result += `${padre} -> ${puntocoma};\n`;

        result += this.operandoUnico?.obtenerAST(valor);

        return result;
    }

}