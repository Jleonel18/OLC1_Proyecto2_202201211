import { Instruccion } from "../abstracto/instruccion";
import Errores from "../excep/errores";
import Arbol from "../simbol/arbol";
import tablaSimbolo from "../simbol/tablaSimbolos";
import Tipo, {tipoDato} from "../simbol/tipo";
import Return from "./return";

export default class Metodo extends Instruccion{

    public id: string;
    public parametros:any = [];
    public instrucciones: Instruccion[];

    constructor(id: string, tipo: Tipo, parametros: any[], instrucciones: Instruccion[], linea: number, columna: number){
        super(tipo, linea, columna);
        this.id = id;
        this.parametros = parametros;
        this.instrucciones = instrucciones;
    }

    interpretar(arbol:Arbol, tabla: tablaSimbolo) {
        for(let i of this.instrucciones){

            let resultado = i.interpretar(arbol, tabla);
            if(resultado instanceof Errores){
                return resultado;
            }

            if(resultado instanceof Return){
                //console.log("aqui encuentro el return en metodo;");
                if(resultado.expresion != undefined){
                    return resultado;
                }
                return;
                
            }

        }
    }

}