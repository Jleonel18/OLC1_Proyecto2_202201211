import { Instruccion } from "../abstracto/instruccion";
import Errores from "../excep/errores";
import tablaSimbolo from "../simbol/tablaSimbolos";
import Arbol from "../simbol/arbol";
import Tipo, { tipoDato } from "../simbol/tipo";
import Break from "./Break";
import Continue from "./Continue";
import Return from "./return";
import ContadorSingleton from "../simbol/contadorSingleton";

export default class While extends Instruccion{
    private condicion: Instruccion;
    private instrucciones : Instruccion[];

    constructor(condicion: Instruccion, instruccion:Instruccion[], linea: number, columna: number){
        super(new Tipo(tipoDato.VOID), linea, columna);
        this.condicion = condicion;
        this.instrucciones = instruccion;
    }

    interpretar(arbol: Arbol, tabla: tablaSimbolo) {

        let cond = this.condicion.interpretar(arbol, tabla);
        if(cond instanceof Errores) return cond;

        if(this.condicion.tipoDato.getTipo()!= tipoDato.BOOL){
            arbol.Print("\nError Semantico: La condicion no es booleana. linea:"+ this.linea+" columna: " +(this.columna+1));
            return new Errores("Semantico", "La condicion no es booleana", this.linea, this.columna);
        }

        while(this.condicion.interpretar(arbol,tabla)){
            let nuevaTabla = new tablaSimbolo(tabla);
            nuevaTabla.setNombre("while");
            Arbol.lista_simbolos.push(nuevaTabla);
            for (let i of this.instrucciones){
                
                if(i instanceof Break){
                    return;
                }

                if(i instanceof Continue){
                    break;
                }

                if(i instanceof Errores){
                    return i;
                }

                if(i instanceof Return){
                    return i;
                }
                
                let resultado = i.interpretar(arbol, nuevaTabla);

                if(resultado instanceof Break) return;
                if(resultado instanceof Continue) break;
                if(resultado instanceof Return) return resultado;
                
            }
        }
    }

    obtenerAST(anterior: string): string {
        let result = "";
        let contador = ContadorSingleton.getInstance();
        let contInstruc = [];

        let padre = `n${contador.getContador()}`;
        let nWhile = `n${contador.getContador()}`;
        let par1 = `n${contador.getContador()}`;
        let cond = `n${contador.getContador()}`;
        let par2 = `n${contador.getContador()}`;
        let llav1 = `n${contador.getContador()}`;
        let padreIns = `n${contador.getContador()}`;

        for(let i = 0; i < this.instrucciones.length; i++){
            contInstruc.push(`n${contador.getContador()}`);
        }

        let llav2 = `n${contador.getContador()}`;

        result += ` ${padre}[label="ciclo"];\n`;
        result += ` ${nWhile}[label="while"];\n`;
        result += ` ${par1}[label="("];\n`;
        result += ` ${cond}[label="Expresion"];\n`;
        result += ` ${par2}[label=")"];\n`;
        result += ` ${llav1}[label="{"];\n`;
        result += ` ${padreIns}[label="Instrucciones"];\n`;

        for(let i = 0; i < this.instrucciones.length; i++){
            result += ` ${contInstruc[i]}[label="Instruccion"];\n`;
        }

        result += ` ${llav2}[label="}"];\n`;

        result += ` ${anterior} -> ${padre};\n`;
        result += ` ${padre} -> ${nWhile};\n`;
        result += ` ${padre} -> ${par1};\n`;
        result += ` ${padre} -> ${cond};\n`;
        result += ` ${padre} -> ${par2};\n`;
        result += ` ${padre} -> ${llav1};\n`;
        result += ` ${padre} -> ${padreIns};\n`;

        for(let i = 0; i < this.instrucciones.length; i++){
            result += ` ${padreIns} -> ${contInstruc[i]};\n`;
        }

        result += ` ${padre} -> ${llav2};\n`;

        for(let i = 0; i < this.instrucciones.length; i++){
            result += this.instrucciones[i].obtenerAST(contInstruc[i]);
        }

        result += this.condicion.obtenerAST(cond);
        

        return result;
    }
}