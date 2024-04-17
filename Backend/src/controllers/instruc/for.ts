import { Instruccion } from "../abstracto/instruccion";
import Errores from "../excep/errores";
import tablaSimbolo from "../simbol/tablaSimbolos";
import Arbol from "../simbol/arbol";
import Tipo, { tipoDato } from "../simbol/tipo";
import Break from "./Break";
import Continue from "./Continue";

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

                let resultado = i.interpretar(arbol, nuevaTabla2);

                if(resultado instanceof Break) return;
                if(resultado instanceof Continue) break;
            }
            this.incremento.interpretar(arbol, nuevaTabla2);
        }

    }
}