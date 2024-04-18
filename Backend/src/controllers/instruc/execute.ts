import { Instruccion } from "../abstracto/instruccion";
import Errores from "../excep/errores";
import Arbol from "../simbol/arbol";
import tablaSimbolo from "../simbol/tablaSimbolos";
import Tipo, { tipoDato } from "../simbol/tipo";
import Declaracion from "./declaracion";
import Metodo from "./metodo";

export default class Execute extends Instruccion {

    private id: string;
    private parametros: Instruccion[];

    constructor(id: string, parametros: Instruccion[], linea: number, columna: number) {
        super(new Tipo(tipoDato.VOID), linea, columna);
        this.id = id;
        this.parametros = parametros;
    }

    interpretar(arbol: Arbol, tabla: tablaSimbolo) {
        let busqueda = arbol.getFuncion(this.id);
        if (busqueda == null) {
            arbol.Print(`Error Semántico: No existe la función ${this.id}. Linea: ${this.linea} Columna: ${this.columna}`);
            return new Errores('Semántico', `No existe la función ${this.id}`, this.linea, this.columna);
        }

        if (busqueda instanceof Metodo) {
            let nuevaTabla = new tablaSimbolo(arbol.getTablaGlobal());
            nuevaTabla.setNombre("Execute");

            if (busqueda.parametros.length != this.parametros.length) {
                arbol.Print(`Error Semántico: La cantidad de parametros no coincide con la función ${this.id}. Linea: ${this.linea} Columna: ${this.columna}`);
                return new Errores('Semántico', `La cantidad de parametros no coincide con la función ${this.id}`, this.linea, this.columna);
            }

            for (let i = 0; i < busqueda.parametros.length; i++) {

                let declaraciParam = new Declaracion(busqueda.parametros[i].tipo, this.linea, this.columna, busqueda.parametros[i].id, this.parametros[i]);

                let result = declaraciParam.interpretar(arbol, nuevaTabla);

                if (result instanceof Errores) {
                    return result;
                }

            }

            let resultFunc: any = busqueda.interpretar(arbol, nuevaTabla);
            if (resultFunc instanceof Errores) {
                return resultFunc;
            }

        }
    }

}