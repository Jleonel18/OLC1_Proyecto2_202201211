import { Instruccion } from "../abstracto/instruccion";
import Errores from "../excep/errores";
import Arbol from "../simbol/arbol";
import ContadorSingleton from "../simbol/contadorSingleton";
import tablaSimbolo from "../simbol/tablaSimbolos";
import Tipo, { tipoDato } from "../simbol/tipo";

export default class FNativas extends Instruccion{

    private operacion : Operadores
    private operandoUnico: Instruccion | undefined;

    constructor(operador: Operadores, fila: number, columna: number, op1: Instruccion){
        super(new Tipo(tipoDato.ENTERO), fila, columna)
        this.operacion = operador
        this.operandoUnico = op1
    }

    interpretar(arbol: Arbol, tabla: tablaSimbolo) {
        let Unico = null
        if (this.operandoUnico != null) {
            Unico = this.operandoUnico.interpretar(arbol, tabla)
            if (Unico instanceof Errores) return Unico
        }

        switch (this.operacion) {
            case Operadores.LENGTH:
                if(Array.isArray(Unico)){
                    return this.longitudArreglo(Unico);
                }
                return this.longitud(Unico);
            case Operadores.TOUPPER:
                return this.toUpper(Unico);
            case Operadores.TOLOWER:
                return this.toLower(Unico);
            case Operadores.ROUND:
                return this.round(Unico);
            case Operadores.TYPEOF:
                return this.typeof(Unico);
            case Operadores.TOSTRING:
                return this.aString(Unico);
            case Operadores.C_STR:
                return this.aStr(Unico);
            default:
                arbol.Print("\n Error Semántico: Operador inexistente en la linea " + this.linea + " y columna " + (this.columna+1));
                return new Errores("Semantico", "Operador Logico Invalido", this.linea, this.columna)
        }
    }

    longitud(op1: any) {
        let tipo1 = this.operandoUnico?.tipoDato.getTipo()
        switch (tipo1) {
            case tipoDato.CADENA:
                this.tipoDato = new Tipo(tipoDato.ENTERO)
                return op1.length;
            default:
                return new Errores("Semantico", "Solo es posible con Cadenas", this.linea, this.columna)
        }
    }

    toUpper(op1: any) {
        let tipo1 = this.operandoUnico?.tipoDato.getTipo()
        switch (tipo1) {
            case tipoDato.CADENA:
                this.tipoDato = new Tipo(tipoDato.CADENA)
                return op1.toUpperCase()
            default:
                return new Errores("Semantico", "Solo es posible Cadenas", this.linea, this.columna)
        }
    }

    toLower(op1: any) {
        let tipo1 = this.operandoUnico?.tipoDato.getTipo()
        switch (tipo1) {
            case tipoDato.CADENA:
                this.tipoDato = new Tipo(tipoDato.CADENA)
                return op1.toLowerCase()
            default:
                return new Errores("Semantico", "Solo es posible cadenas", this.linea, this.columna)
        }
    }

    round(op1: any) {
        let tipo1 = this.operandoUnico?.tipoDato.getTipo()
        switch (tipo1) {
            case tipoDato.DECIMAL:
                this.tipoDato = new Tipo(tipoDato.ENTERO)
                return Math.round(op1)
            case tipoDato.ENTERO:
                this.tipoDato = new Tipo(tipoDato.ENTERO)
                return op1
            default:
                return new Errores("Semantico", "Solo se pueden redondear Decimales", this.linea, this.columna)
        }
    }

    typeof(op1: any) {
        let tipo1 = this.operandoUnico?.tipoDato.getTipo()
        switch (tipo1) {
            case tipoDato.ENTERO:
                this.tipoDato = new Tipo(tipoDato.CADENA)
                return "ENTERO"
            case tipoDato.DECIMAL:
                this.tipoDato = new Tipo(tipoDato.CADENA)
                return "DECIMAL"
            case tipoDato.CADENA:
                this.tipoDato = new Tipo(tipoDato.CADENA)
                return "CADENA"
            case tipoDato.BOOL:
                this.tipoDato = new Tipo(tipoDato.CADENA)
                return "BOOL"
            case tipoDato.CARACTER:
                this.tipoDato = new Tipo(tipoDato.CADENA)
                return "CARACTER"
            default:
                return new Errores("Semantico", "No es posible convertir tipo de dato", this.linea, this.columna)
        }
    }

    aString(op1: any) {
        let tipo1 = this.operandoUnico?.tipoDato.getTipo()
        switch (tipo1) {
            case tipoDato.ENTERO:
                this.tipoDato = new Tipo(tipoDato.CADENA)
                return op1.toString()
            case tipoDato.DECIMAL:
                this.tipoDato = new Tipo(tipoDato.CADENA)
                return op1.toString()
            case tipoDato.CARACTER:
                this.tipoDato = new Tipo(tipoDato.CADENA)
                return op1.toString()
            case tipoDato.BOOL:
                this.tipoDato = new Tipo(tipoDato.CADENA)
                return op1.toString()
            default:
                return new Errores("Semantico", "No es posible convertir tipo de dato", this.linea, this.columna)
        }
    }

    aStr(op1: any) {
        let tipo1 = this.operandoUnico?.tipoDato.getTipo();
        if(tipo1 == tipoDato.CADENA){
            this.tipoDato = new Tipo(tipoDato.CARACTER);
            //console.log("estoy en c_str");
           //console.log("est igual:",this.tipoDato.getTipo() == tipoDato.CARACTER);
            return op1.split('');
        }else{
            return new Errores("Semantico", "No es posible convertir tipo de dato", this.linea, this.columna);
        }
    }

    longitudArreglo(op1: any) {
        this.tipoDato = new Tipo(tipoDato.ENTERO);
        return op1.length;
    }

    obtenerAST(anterior: string): string {

        let contador = ContadorSingleton.getInstance();
        let result = "";

        if(this.operacion == Operadores.LENGTH){

            let nativa = `n${contador.getContador()}`;
            let expr = `n${contador.getContador()}`;
            let punto = `n${contador.getContador()}`;
            let operUnico = `n${contador.getContador()}`;
            let par1 = `n${contador.getContador()}`;
            let par2 = `n${contador.getContador()}`;
            let puntocoma = `n${contador.getContador()}`;
    
            result += `${nativa}[label="Nativas"];\n`;
            result += `${expr}[label="Expresion"];\n`;
            result += `${punto}[label="."];\n`;
            result += `${operUnico}[label="length"];\n`;
            result += `${par1}[label="("];\n`;
            result += `${par2}[label=")"];\n`;
            result += `${puntocoma}[label=";"];\n`;

            result += `${anterior} -> ${nativa};\n`;
            result += `${nativa} -> ${expr}\n;`;
            result += `${nativa} -> ${punto}\n;`;
            result += `${nativa} -> ${operUnico};\n`;
            result += `${nativa} -> ${par1}\n;`;
            result += `${nativa} -> ${par2}\n;`;
            result += `${nativa} -> ${puntocoma};\n`;

            result += this.operandoUnico?.obtenerAST(expr);


        }else if(this.operacion == Operadores.TOUPPER){

            let nativa = `n${contador.getContador()}`;
            let operUnico = `n${contador.getContador()}`;
            let par1 = `n${contador.getContador()}`;
            let expr = `n${contador.getContador()}`;
            let par2 = `n${contador.getContador()}`;
            let puntocoma = `n${contador.getContador()}`;

            result += `${nativa}[label="Nativas"];\n`;
            result += `${operUnico}[label="toUpper"];\n`;
            result += `${par1}[label="("];\n`;
            result += `${expr}[label="Expresion"];\n`;
            result += `${par2}[label=")"];\n`;
            result += `${puntocoma}[label=";"];\n`;

            result += `${anterior} -> ${nativa};\n`;
            result += `${nativa} -> ${operUnico};\n`;
            result += `${nativa} -> ${par1};\n`;
            result += `${nativa} -> ${expr};\n`;
            result += `${nativa} -> ${par2};\n`;
            result += `${nativa} -> ${puntocoma};\n`;

            result += this.operandoUnico?.obtenerAST(expr);

        }else if(this.operacion == Operadores.TOLOWER){

            let nativa = `n${contador.getContador()}`;
            let operUnico = `n${contador.getContador()}`;
            let par1 = `n${contador.getContador()}`;
            let expr = `n${contador.getContador()}`;
            let par2 = `n${contador.getContador()}`;
            let puntocoma = `n${contador.getContador()}`;

            result += `${nativa}[label="Nativas"];\n`;
            result += `${operUnico}[label="toLower"];\n`;
            result += `${par1}[label="("];\n`;
            result += `${expr}[label="Expresion"];\n`;
            result += `${par2}[label=")"];\n`;
            result += `${puntocoma}[label=";"];\n`;

            result += `${anterior} -> ${nativa};\n`;
            result += `${nativa} -> ${operUnico};\n`;
            result += `${nativa} -> ${par1};\n`;
            result += `${nativa} -> ${expr};\n`;
            result += `${nativa} -> ${par2};\n`;
            result += `${nativa} -> ${puntocoma};\n`;

            result += this.operandoUnico?.obtenerAST(expr);

        }else if(this.operacion == Operadores.ROUND){

            let nativa = `n${contador.getContador()}`;
            let operUnico = `n${contador.getContador()}`;
            let par1 = `n${contador.getContador()}`;
            let expr = `n${contador.getContador()}`;
            let par2 = `n${contador.getContador()}`;
            let puntocoma = `n${contador.getContador()}`;

            result += `${nativa}[label="Nativas"];\n`;
            result += `${operUnico}[label="round"];\n`;
            result += `${par1}[label="("];\n`;
            result += `${expr}[label="Expresion"];\n`;
            result += `${par2}[label=")"];\n`;
            result += `${puntocoma}[label=";"];\n`;

            result += `${anterior} -> ${nativa};\n`;
            result += `${nativa} -> ${operUnico};\n`;
            result += `${nativa} -> ${par1};\n`;
            result += `${nativa} -> ${expr};\n`;
            result += `${nativa} -> ${par2};\n`;
            result += `${nativa} -> ${puntocoma};\n`;

            result += this.operandoUnico?.obtenerAST(expr);

        }else if(this.operacion == Operadores.TYPEOF){

            let nativa = `n${contador.getContador()}`;
            let operUnico = `n${contador.getContador()}`;
            let par1 = `n${contador.getContador()}`;
            let expr = `n${contador.getContador()}`;
            let par2 = `n${contador.getContador()}`;
            let puntocoma = `n${contador.getContador()}`;

            result += `${nativa}[label="Nativas"];\n`;
            result += `${operUnico}[label="typeof"];\n`;
            result += `${par1}[label="("];\n`;
            result += `${expr}[label="Expresion"];\n`;
            result += `${par2}[label=")"];\n`;
            result += `${puntocoma}[label=";"];\n`;

            result += `${anterior} -> ${nativa};\n`;
            result += `${nativa} -> ${operUnico};\n`;
            result += `${nativa} -> ${par1};\n`;
            result += `${nativa} -> ${expr};\n`;
            result += `${nativa} -> ${par2};\n`;
            result += `${nativa} -> ${puntocoma};\n`;

            result += this.operandoUnico?.obtenerAST(expr);

        }else if(this.operacion == Operadores.TOSTRING){

            let nativa = `n${contador.getContador()}`;
            let std = `n${contador.getContador()}`;
            let dosp1 = `n${contador.getContador()}`;
            let dosp2 = `n${contador.getContador()}`;
            let operUnico = `n${contador.getContador()}`;
            let par1 = `n${contador.getContador()}`;
            let expr = `n${contador.getContador()}`;
            let par2 = `n${contador.getContador()}`;
            let puntocoma = `n${contador.getContador()}`;

            result += `${nativa}[label="Nativas"];\n`;
            result += `${std}[label="std"];\n`;
            result += `${dosp1}[label=":"];\n`;
            result += `${dosp2}[label=":"];\n`;
            result += `${operUnico}[label="toString"];\n`;
            result += `${par1}[label="("];\n`;
            result += `${expr}[label="Expresion"];\n`;
            result += `${par2}[label=")"];\n`;
            result += `${puntocoma}[label=";"];\n`;

            result += `${anterior} -> ${nativa};\n`;
            result += `${nativa} -> ${std};\n`;
            result += `${nativa} -> ${dosp1};\n`;
            result += `${nativa} -> ${dosp2};\n`;
            result += `${nativa} -> ${operUnico};\n`;
            result += `${nativa} -> ${par1};\n`;
            result += `${nativa} -> ${expr};\n`;
            result += `${nativa} -> ${par2};\n`;
            result += `${nativa} -> ${puntocoma};\n`;

            result += this.operandoUnico?.obtenerAST(expr);

        }else if(this.operacion == Operadores.C_STR){

            let nativa = `n${contador.getContador()}`;
            let expr = `n${contador.getContador()}`;
            let punto = `n${contador.getContador()}`;
            let operUnico = `n${contador.getContador()}`;
            let par1 = `n${contador.getContador()}`;
            let par2 = `n${contador.getContador()}`;
            let puntocoma = `n${contador.getContador()}`;

            result += `${nativa}[label="Nativas"];\n`;
            result += `${expr}[label="Expresion"];\n`;
            result += `${punto}[label="."];\n`;
            result += `${operUnico}[label="c_str"];\n`;
            result += `${par1}[label="("];\n`;
            result += `${par2}[label=")"];\n`;
            result += `${puntocoma}[label=";"];\n`;

            result += `${anterior} -> ${nativa};\n`;
            result += `${nativa} -> ${expr}\n;`;
            result += `${nativa} -> ${punto}\n;`;
            result += `${nativa} -> ${operUnico};\n`;
            result += `${nativa} -> ${par1}\n;`;
            result += `${nativa} -> ${par2}\n;`;
            result += `${nativa} -> ${puntocoma};\n`;

            result += this.operandoUnico?.obtenerAST(expr);

        }

        return result;
    }

}

export enum Operadores {
    LENGTH,
    TOUPPER,
    TOLOWER,
    ROUND,
    TYPEOF,
    TOSTRING,
    C_STR
}