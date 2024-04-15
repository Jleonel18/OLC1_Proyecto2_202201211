import { Instruccion } from "../abstracto/instruccion";
import Errores from "../excep/errores";
import tablaSimbolo from "../simbol/tablaSimbolos";
import Arbol from "../simbol/arbol";
import Tipo, { tipoDato } from "../simbol/tipo";
import Break from "./Break";
import Continue from "./Continue";
import Case from "./case";
import Default from "./default";

export default class Switch extends Instruccion {
    private condicion: Instruccion;

    private instruccionesCase: Instruccion[];

    constructor(cond: Instruccion, instCase: Instruccion[], linea: number, columna: number) {
        super(new Tipo(tipoDato.VOID), linea, columna);
        this.condicion = cond;
        this.instruccionesCase = instCase;
    }

    interpretar(arbol: Arbol, tabla: tablaSimbolo) {
        let cond = this.condicion.interpretar(arbol, tabla);
        if (cond instanceof Errores) return cond;

        let bandera = false;

        let nuevaTabla = new tablaSimbolo(tabla);
        nuevaTabla.setNombre("switch");

        for( let i of this.instruccionesCase){
            //console.log("i es:",i);
            let resultado = i;

            if(resultado instanceof Case){
                //console.log("el resultado.condicion es:",resultado.condicion.interpretar(arbol, nuevaTabla));
                if(resultado.condicion.interpretar(arbol,nuevaTabla) == cond){
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
        }

    }
}