import { Instruccion } from "../abstracto/instruccion";
import Errores from "../excep/errores";
import tablaSimbolo from "../simbol/tablaSimbolos";
import Arbol from "../simbol/arbol";
import Tipo, { tipoDato } from "../simbol/tipo";
import Metodo from "./metodo";
import Declaracion from "./declaracion";

export default class Llamada extends Instruccion {

    private id: string;
    private parametros: Instruccion[];

    constructor(id: string, parametros: Instruccion[], linea: number, columna: number) {
        super(new Tipo(tipoDato.VOID), linea, columna);
        this.id = id;
        this.parametros = parametros;
    }

    interpretar(arbol: Arbol, tabla: tablaSimbolo) {
        let busqueda = arbol.getFuncion(this.id.toLocaleLowerCase());
        if (busqueda == null) {
            arbol.Print(`Error Semántico: No existe la función ${this.id}. Linea: ${this.linea} Columna: ${(this.columna + 1)}`);
            return new Errores('Semántico', `No existe la función ${this.id}`, this.linea, this.columna);
        }
        this.tipoDato.setTipo(busqueda.tipo.getTipo());
        if (busqueda instanceof Metodo) {

            if (busqueda.tipo.getTipo() == tipoDato.VOID) {
                let nuevaTabla = new tablaSimbolo(tabla);
                nuevaTabla.setNombre("Llamada metodo " + this.id);
                if (busqueda.parametros.length != this.parametros.length) {
                    arbol.Print(`Error Semántico: La cantidad de parametros no coincide con la función ${this.id}. Linea: ${this.linea} Columna: ${(this.columna + 1)}`);
                    return new Errores('Semántico', `La cantidad de parametros no coincide con la función ${this.id}`, this.linea, this.columna);
                }

                for (let i = 0; i < busqueda.parametros.length; i++) {
                    let daclaraParam = new Declaracion(busqueda.parametros[i].tipo, this.linea, this.columna, [busqueda.parametros[i].id], this.parametros[i]);

                    let result = daclaraParam.interpretar(arbol, nuevaTabla);

                    if (result instanceof Errores) return result;
                }

                let resultFunc: any = busqueda.interpretar(arbol, nuevaTabla);
                if (resultFunc instanceof Errores) return resultFunc;

            } else {

                let nuevaTabla = new tablaSimbolo(tabla);
                nuevaTabla.setNombre("Llamada función " + this.id);
                if (busqueda.parametros.length != this.parametros.length) {
                    arbol.Print(`Error Semántico: La cantidad de parametros no coincide con la función ${this.id}. Linea: ${this.linea} Columna: ${(this.columna + 1)}`);
                    return new Errores('Semántico', `La cantidad de parametros no coincide con la función ${this.id}`, this.linea, this.columna);
                }

                for (let i = 0; i < busqueda.parametros.length; i++) {
                    let nuevaVar = this.parametros[i].interpretar(arbol, nuevaTabla);
                    let daclaraParam = new Declaracion(busqueda.parametros[i].tipo, this.linea, this.columna, [busqueda.parametros[i].id], this.parametros[i]);

                    let result = daclaraParam.interpretar(arbol, nuevaTabla);

                    if (result instanceof Errores) return result;

                    
                    console.log("la nuevaVar es: "+nuevaVar);
                    let varInterpretada = nuevaTabla.getVariable(busqueda.parametros[i].id);

                    if(varInterpretada != null){
                        if(busqueda.parametros[i].tipo.getTipo() != varInterpretada.getTipo().getTipo()){
                            arbol.Print(`Error Semántico: El tipo de parametro ${i} no coincide con la función ${this.id}. Linea: ${this.linea} Columna: ${(this.columna + 1)}`);
                            return new Errores('Semántico', `El tipo de parametro ${i} no coincide con la función ${this.id}`, this.linea, this.columna);
                        }else{
                            varInterpretada.setValor(nuevaVar);  
                            console.log("la var interpretada es:"+varInterpretada.getValor());
                        }
                    }else{
                        arbol.Print(`Error Semántico: El parametro ${i} no coincide con la función ${this.id}. Linea: ${this.linea} Columna: ${(this.columna + 1)}`);
                        return new Errores('Semántico', `El parametro ${i} no coincide con la función ${this.id}`, this.linea, this.columna);
                    }

                }

                let resultFunc: any = busqueda.interpretar(arbol, nuevaTabla);
                if (resultFunc instanceof Errores) return resultFunc;
                //this.tipoDato.setTipo(busqueda.valorRetorno.tipoDato.getTipo());
                //console.log("el valor de retorno es:",busqueda.valorRetorno.tipoDato.getTipo());
                //this.tipoDato.setTipo(busqueda.valorRetorno.tipoDato.getTipo());
                return busqueda.valorRetorno.interpretar(arbol, nuevaTabla);


            }


        }

    }

}