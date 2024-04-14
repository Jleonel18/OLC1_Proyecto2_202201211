import { Instruccion } from "../abstracto/instruccion";
import Errores from "../excep/errores";
import tablaSimbolo from "../simbol/tablaSimbolos";
import Arbol from "../simbol/arbol";
import Tipo, { tipoDato } from "../simbol/tipo";
import Break from "./Break";

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
        //console.log("paso aqui");
        //console.log(this.declaracion.interpretar(arbol, tabla));
        this.declaracion.interpretar(arbol, tabla);
        //console.log("---------------------")
        
        let cond = this.condicion.interpretar(arbol, tabla);
        if(cond instanceof Errores) return cond;

        if(this.condicion.tipoDato.getTipo()!= tipoDato.BOOL){
            return new Errores("Semantico", "La condicion no es booleana", this.linea, this.columna);
        }

        while(this.condicion.interpretar(arbol,tabla)){
            let nuevaTabla = new tablaSimbolo(tabla);
            nuevaTabla.setNombre("for");
            for(let i of this.instrucciones){
                if(i instanceof Break) return;
                let resultado = i.interpretar(arbol, nuevaTabla);
                if(resultado instanceof Break) return;
            }
            this.incremento.interpretar(arbol, nuevaTabla);
        }

    }
}