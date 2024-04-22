import { Instruccion } from "../abstracto/instruccion";
import Errores from "../excep/errores";
import tablaSimbolo from "../simbol/tablaSimbolos";
import Arbol from "../simbol/arbol";
import Tipo, { tipoDato } from "../simbol/tipo";
import Break from "./Break";
import Continue from "./Continue";
import Return from "./return";
import ContadorSingleton from "../simbol/contadorSingleton";

export default class If extends Instruccion {

    private condicion: Instruccion;
    private instrucciones: Instruccion[];
    private instruccionesElse: Instruccion[] | undefined;
    private condicionElseIf: Instruccion | undefined;

    constructor(cond: Instruccion, inst: Instruccion[], instElse: Instruccion[] | undefined, condicionElseIf: Instruccion | undefined, linea: number, columna: number) {
        super(new Tipo(tipoDato.VOID), linea, columna);
        this.condicion = cond;
        this.instruccionesElse = instElse;
        this.instrucciones = inst;
        this.condicionElseIf = condicionElseIf;
    }

    interpretar(arbol: Arbol, tabla: tablaSimbolo) {
        let cond = this.condicion.interpretar(arbol, tabla);
        if (cond instanceof Errores) return cond;

        if (this.condicion.tipoDato.getTipo() != tipoDato.BOOL) {
            arbol.Print("\nError Semantico: La condicion no es booleana linea:" + this.linea + " columna: " + (this.columna + 1));
            return new Errores("Semantico", "La condicion no es booleana", this.linea, this.columna);
        }

        if(cond){
            let nuevaTabla = new tablaSimbolo(tabla);
            nuevaTabla.setNombre("if");
            Arbol.lista_simbolos.push(nuevaTabla);

            for(let i of this.instrucciones){
                if(i instanceof Break) return i;
                if(i instanceof Continue) return i;
                if(i instanceof Return) return i;
                if(i instanceof Errores) return i;

                let result = i.interpretar(arbol, nuevaTabla);
                if(result instanceof Break) return result;
                if(result instanceof Continue) return result;
                if(result instanceof Return) return result;
                if(result instanceof Errores) return result;
            }
        }else{
            if(this.instruccionesElse != undefined){
                let nuevaTabla = new tablaSimbolo(tabla);
                nuevaTabla.setNombre("else");
                Arbol.lista_simbolos.push(nuevaTabla);

                for(let i of this.instruccionesElse){
                    if(i instanceof Break) return i;
                    if(i instanceof Continue) return i;
                    if(i instanceof Return) return i;
                    if(i instanceof Errores) return i;

                    let result = i.interpretar(arbol, nuevaTabla);

                    if(result instanceof Break) return result;
                    if(result instanceof Continue) return result;
                    if(result instanceof Return) return result;
                    if(result instanceof Errores) return result;

                }

            }else if(this.condicionElseIf != undefined){
                
                let i = this.condicionElseIf.interpretar(arbol, tabla);
                if(i instanceof Errores) return i;
                if(i instanceof Return) return i;
                if(i instanceof Break) return i;
                if(i instanceof Continue) return i;
            }
        }

    }

    obtenerAST(anterior: string): string {

        let contador = ContadorSingleton.getInstance();
        let result = "";

        let contInstruc = [];
        let contInstrucElse = [];
        let contInstrucElseIf = "";
        let llav1Else = "";
        let padreInstElse = "";
        let rElse = "";
        let llav2Else ="";
        let rElseIf = "";

        let rIf = `n${contador.getContador()}`;
        let par1 = `n${contador.getContador()}`;
        let cond = `n${contador.getContador()}`;
        let par2 = `n${contador.getContador()}`;
        let llav1 = `n${contador.getContador()}`;
        let padreInstIf = `n${contador.getContador()}`;

        for(let i = 0; i < this.instrucciones.length; i++){
            contInstruc.push(`n${contador.getContador()}`);
        }

        let llav2 = `n${contador.getContador()}`;

        if(this.instruccionesElse != undefined){
            rElse = `n${contador.getContador()}`;
            llav1Else = `n${contador.getContador()}`;
            padreInstElse = `n${contador.getContador()}`;
            for(let i = 0; i < this.instruccionesElse.length; i++){
                contInstrucElse.push(`n${contador.getContador()}`);
            }
            llav2Else = `n${contador.getContador()}`;
        }

        if(this.condicionElseIf != undefined){
            contInstrucElseIf = `n${contador.getContador()}`;
            rElseIf = `n${contador.getContador()}`;
        }

        result += `${rIf}[label="If"];\n`;
        result += `${par1}[label="("];\n`;
        result += `${cond}[label="Expresion"];\n`;
        result += `${par2}[label=")"];\n`;
        result += `${llav1}[label="{"];\n`;
        result += `${padreInstIf}[label="Instrucciones"];\n`;

        for(let i = 0; i < contInstruc.length; i++){
            result += `${contInstruc[i]}[label="Instruccion"];\n`;
        }

        result += `${llav2}[label="}"];\n`;

        if(this.instruccionesElse != undefined){

            result += `${rElse}[label="Else"];\n`;
            result += `${llav1Else}[label="{"];\n`;
            result += `${padreInstElse}[label="Instrucciones"];\n`;

            for(let i = 0; i < contInstrucElse.length; i++){
                result += `${contInstrucElse[i]}[label="Instruccion"];\n`;
            }

            result += `${llav2Else}[label="}"];\n`;

        }

        if(this.condicionElseIf != undefined){
            result += `${contInstrucElseIf}[label="else If"];\n`;
        }

        result += `${anterior} -> ${rIf};\n`;
        result += `${anterior} -> ${par1};\n`;
        result += `${anterior} -> ${cond};\n`;
        result += `${anterior} -> ${par2};\n`;
        result += `${anterior} -> ${llav1};\n`;
        result += `${anterior} -> ${padreInstIf};\n`;

        for(let i = 0; i < contInstruc.length; i++){
            result += `${padreInstIf} -> ${contInstruc[i]};\n`;
        }

        if(this.instruccionesElse != undefined){
            result += `${anterior} -> ${rElse};\n`;
            result += `${anterior} -> ${llav1Else};\n`;
            result += `${anterior} -> ${padreInstElse};\n`;

            for(let i = 0; i < contInstrucElse.length; i++){
                result += `${padreInstElse} -> ${contInstrucElse[i]};\n`;
            }

            result += `${anterior} -> ${llav2Else};\n`;
        }

        if(this.condicionElseIf != undefined){
            result += `${anterior} -> ${contInstrucElseIf};\n`;
        }

        result += `${anterior} -> ${llav2};\n`;

        result += this.condicion.obtenerAST(cond);

        for(let i = 0; i < contInstruc.length; i++){
            result += this.instrucciones[i].obtenerAST(contInstruc[i]);
        }

        if(this.instruccionesElse != undefined){
            for(let i = 0; i < contInstrucElse.length; i++){
                result += this.instruccionesElse[i].obtenerAST(contInstrucElse[i]);
            }
        }

        if(this.condicionElseIf != undefined){
            result += this.condicionElseIf.obtenerAST(contInstrucElseIf);
        }

        return result;

    }

}