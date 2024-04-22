import { Instruccion } from "../abstracto/instruccion";
import Errores from "../excep/errores";
import Arbol from "../simbol/arbol";
import ContadorSingleton from "../simbol/contadorSingleton";
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
            Arbol.lista_simbolos.push(nuevaTabla);

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

    obtenerAST(anterior: string): string {

        let contador = ContadorSingleton.getInstance();
        let result = "";


        let executee = `n${contador.getContador()}`;
        let ident = `n${contador.getContador()}`;
        let par1 = `n${contador.getContador()}`;
        let padreParametros = `n${contador.getContador()}`;
        let contParametros = [];

        for (let i = 0; i < this.parametros.length; i++) {
            contParametros.push(`n${contador.getContador()}`);
        }

        let par2 = `n${contador.getContador()}`;
        let puntocoma = `n${contador.getContador()}`;

        result += `${executee}[label="Execute"];\n`;
        result += `${ident}[label="${this.id}"];\n`;
        result += `${par1}[label="("];\n`;
        result += `${padreParametros}[label="Parametros"];\n`;
        result += `${par2}[label=")"];\n`;
        result += `${puntocoma}[label=";"];\n`;

        for(let i = 0; i < this.parametros.length; i++){
            result += `${contParametros[i]}[label="Expresion"];\n`;
        }

        result += `${anterior} -> ${executee};\n`;
        result += `${anterior} -> ${ident};\n`;
        result += `${anterior} -> ${par1};\n`;
        result += `${anterior} -> ${padreParametros};\n`;
        for(let i = 0; i < this.parametros.length; i++){
            result += `${padreParametros} -> ${contParametros[i]};\n`;
        }
        result += `${anterior} -> ${par2};\n`;
        result += `${anterior} -> ${puntocoma};\n`;

        for (let i = 0; i < this.parametros.length; i++) {
            result += this.parametros[i].obtenerAST(contParametros[i]);
        }

        return result;
    }

}