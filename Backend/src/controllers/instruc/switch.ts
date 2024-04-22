import { Instruccion } from "../abstracto/instruccion";
import Errores from "../excep/errores";
import tablaSimbolo from "../simbol/tablaSimbolos";
import Arbol from "../simbol/arbol";
import Tipo, { tipoDato } from "../simbol/tipo";
import Break from "./Break";
import Continue from "./Continue";
import Case from "./case";
import Default from "./default";
import Return from "./return";
import ContadorSingleton from "../simbol/contadorSingleton";

export default class Switch extends Instruccion {
    private condicion: Instruccion;

    private instruccionesCase: Case[] | undefined;
    private instruccionDefault: Instruccion | undefined;

    constructor(cond: Instruccion, instCase: Case[], instDefault: Instruccion, linea: number, columna: number) {
        super(new Tipo(tipoDato.VOID), linea, columna);
        this.condicion = cond;
        this.instruccionesCase = instCase;
        this.instruccionDefault = instDefault;
    }

    interpretar(arbol: Arbol, tabla: tablaSimbolo) {
        let cond = this.condicion.interpretar(arbol, tabla);
        if (cond instanceof Errores) return cond;

        let nuevaTabla = new tablaSimbolo(tabla);
        nuevaTabla.setNombre("switch");
        Arbol.lista_simbolos.push(nuevaTabla);

        if (this.instruccionesCase != undefined) {

            for (let i of this.instruccionesCase) {
                i.condicionGlobal = this.condicion;
                let res = i.interpretar(arbol, nuevaTabla);
                if (res instanceof Break) return;
                if (res instanceof Continue) {
                    arbol.Print("\nError Semantico: Continue no valido. linea:" + this.linea + " columna: " + (this.columna + 1));
                    return new Errores("Semantico", "Continue no valido", this.linea, this.columna);
                }

                if (res instanceof Errores) return res;
            }

        }

        if (this.instruccionDefault != undefined) {
            let res = this.instruccionDefault.interpretar(arbol, nuevaTabla);
            if (res instanceof Break) return;
            if (res instanceof Continue) return;
            if (res instanceof Errores) return res;
            if (res instanceof Return) return res;
        }


        /*for( let i of this.instruccionesCase){

            let resultado = i;

            if(resultado instanceof Case){

                let cond2 = resultado.condicion.interpretar(arbol, nuevaTabla);

                if(cond2 == cond) {
                    let res = resultado.interpretar(arbol, nuevaTabla);
                    if(res instanceof Break) return;
                    if(res instanceof Continue) break;
                    bandera = true;
                }

            } if(resultado instanceof Default && bandera == false){
                let res = resultado.interpretar(arbol, nuevaTabla);
                if(res instanceof Break) return;
                if(res instanceof Continue) break;
            }
        }*/

    }

    obtenerAST(anterior: string): string {
        let reult = "";

        let contador = ContadorSingleton.getInstance();
        let contDefault: any = undefined;
        let contCase = [];
        let switchN = `n${contador.getContador()}`;
        let par1 = `n${contador.getContador()}`;
        let exp = `n${contador.getContador()}`;
        let par2 = `n${contador.getContador()}`;
        let llav1 = `n${contador.getContador()}`;
        let padreCase = `n${contador.getContador()}`;

        if (this.instruccionesCase != undefined) {
            for (let i = 0; i < this.instruccionesCase.length; i++) {
                contCase.push(`n${contador.getContador()}`);
            }
        }

        if (this.instruccionDefault != undefined) {
            contDefault = `n${contador.getContador()}`;
        }

        reult += `${switchN}[label="Switch"];\n`;
        reult += `${par1}[label="("];\n`;
        reult += `${exp}[label="Expresion"];\n`;
        reult += `${par2}[label=")"];\n`;
        reult += `${llav1}[label="{"];\n`;
        reult += `${padreCase}[label="cases_default"];\n`;

        if (this.instruccionesCase != undefined) {
            for (let i = 0; i < this.instruccionesCase.length; i++) {
                reult += `${contCase[i]}[label="Case"];\n`;
            }
        }

        if (this.instruccionDefault != undefined) {
            reult += `${contDefault}[label="Default"];\n`;
        }

        reult += `${anterior} -> ${switchN};\n`;
        reult += `${anterior} -> ${par1};\n`;
        reult += `${anterior} -> ${exp};\n`;
        reult += `${anterior} -> ${par2};\n`;
        reult += `${anterior} -> ${llav1};\n`;
        reult += `${anterior} -> ${padreCase};\n`;

        if(this.instruccionesCase != undefined){
            for (let i = 0; i < this.instruccionesCase.length; i++) {
                reult += `${padreCase} -> ${contCase[i]};\n`;
            }
        }

        if (this.instruccionDefault != undefined) {
            reult += `${padreCase} -> ${contDefault};\n`;
        }

        reult += this.condicion.obtenerAST(exp);

        if(this.instruccionesCase != undefined){
            for (let i = 0; i < this.instruccionesCase.length; i++) {
                reult += this.instruccionesCase[i].obtenerAST(contCase[i]);
            }
        }

        if(this.instruccionDefault != undefined){
            reult += this.instruccionDefault.obtenerAST(contDefault);
        }


        return reult;
    }
}