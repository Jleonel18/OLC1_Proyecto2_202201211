import { Instruccion } from "../abstracto/instruccion";
import Errores from "../excep/errores";
import tablaSimbolo from "../simbol/tablaSimbolos";
import Arbol from "../simbol/arbol";
import Tipo, { tipoDato } from "../simbol/tipo";
import Break from "./Break";
import Continue from "./Continue";
import Return from "./return";
import ContadorSingleton from "../simbol/contadorSingleton";

export default class For extends Instruccion{
    private condicion: Instruccion;
    private instrucciones: Instruccion[];
    private incremento: Instruccion;
    private declaracion: Instruccion

    constructor(declaracion: Instruccion,condicion: Instruccion, incremento: Instruccion,insctrucciones: Instruccion[], linea: number, columna: number){
        super(new Tipo(tipoDato.VOID), linea, columna);
        this.declaracion = declaracion;
        this.condicion = condicion;
        this.instrucciones = insctrucciones;
        this.incremento = incremento;
    }

    interpretar(arbol: Arbol, tabla: tablaSimbolo) {

        let nuevaTabla = new tablaSimbolo(tabla);

        this.declaracion.interpretar(arbol, nuevaTabla);
        
        let cond = this.condicion.interpretar(arbol, nuevaTabla);
        if(cond instanceof Errores) return cond;

        if(this.condicion.tipoDato.getTipo()!= tipoDato.BOOL){
            arbol.Print("\nError Semantico: La condicion no es booleana en la linea "+this.linea+" y columna "+(this.columna+1));
            return new Errores("Semantico", "La condicion no es booleana", this.linea, this.columna);
        }

        while(this.condicion.interpretar(arbol,nuevaTabla)){
            let nuevaTabla2 = new tablaSimbolo(nuevaTabla);
            nuevaTabla.setNombre("for");
            for(let i of this.instrucciones){
                
                if(i instanceof Break) return;
                if(i instanceof Continue) break;
                if(i instanceof Return) {
                    //console.log("Retorno en for")
                    return i;
                }

                let resultado = i.interpretar(arbol, nuevaTabla2);

                if(resultado instanceof Break) return;
                if(resultado instanceof Continue) break;
                if(resultado instanceof Return){
                    //console.log("Retorno en for", resultado);
                    return resultado;
                
                }
            }
            this.incremento.interpretar(arbol, nuevaTabla2);
        }

    }

    obtenerAST(anterior: string): string {

        let contador = ContadorSingleton.getInstance();
        let result = "";
        let contInstruc = [];

        let padre = `n${contador.getContador()}`;
        let nFor = `n${contador.getContador()}`;
        let par1 = `n${contador.getContador()}`;
        let decl = `n${contador.getContador()}`;
        let cond = `n${contador.getContador()}`;
        let inc = `n${contador.getContador()}`;
        let par2 = `n${contador.getContador()}`;
        let llav1 = `n${contador.getContador()}`;
        let padreIns = `n${contador.getContador()}`;

        for(let i = 0; i < this.instrucciones.length; i++){
            contInstruc.push(`n${contador.getContador()}`);
        }

        let llav2 = `n${contador.getContador()}`;

        result += `${padre}[label="ciclo"];\n`;
        result += `${nFor}[label="for"];\n`;
        result += `${par1}[label="("];\n`;
        result += `${decl}[label="expresion"];\n`;
        result += `${cond}[label="condicion"];\n`; 
        result += `${inc}[label="expresion"];\n`;
        result += `${par2}[label=")"];\n`;
        result += `${llav1}[label="{"];\n`;
        result += `${padreIns}[label="Instrucciones"];\n`;

        for(let i = 0; i < contInstruc.length; i++){
            result += ` ${contInstruc[i]}[label="Instruccion"];\n`;
        }

        result += `${llav2}[label="}"];\n`;

        result += `${anterior} -> ${padre};\n`;
        result += `${padre} -> ${nFor};\n`;
        result += `${padre} -> ${par1};\n`;
        result += `${padre} -> ${decl};\n`;
        result += `${padre} -> ${cond};\n`;
        result += `${padre} -> ${inc};\n`;
        result += `${padre} -> ${par2};\n`;
        result += `${padre} -> ${llav1};\n`;
        result += `${padre} -> ${padreIns};\n`;

        for(let i = 0; i < contInstruc.length; i++){
            result += `${padreIns} -> ${contInstruc[i]};\n`;
        }

        result += `${padre} -> ${llav2};\n`;

        result += this.declaracion.obtenerAST(decl);
        result += this.condicion.obtenerAST(cond);
        result += this.incremento.obtenerAST(inc);

        for(let i = 0; i < contInstruc.length; i++){
            result += this.instrucciones[i].obtenerAST(contInstruc[i]);
        }

        return result;
    }
}