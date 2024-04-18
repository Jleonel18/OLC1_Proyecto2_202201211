import tablaSimbolo from "./tablaSimbolos";
import { Instruccion } from "../abstracto/instruccion";
import Metodo from "../instruc/metodo";

export default class Arbol {
    private instrucciones: Array<Instruccion>
    private consola: string
    private tablaGlobal: tablaSimbolo
    private funciones: Array<Instruccion>

    constructor(instrucciones: Array<Instruccion>) {
        this.instrucciones = instrucciones
        this.consola = ""
        this.tablaGlobal = new tablaSimbolo()
        this.funciones = new Array<Instruccion>
    }

    public Print(contenido: any) {
        this.consola = `${this.consola}${contenido}\n`;
    }

    public PrintSeguido(contenido: any) {
        this.consola = `${this.consola}${contenido}`;
    }

    public getConsola(): string {
        return this.consola
    }

    public setConsola(console: string): void {
        this.consola = console
    }

    public getInstrucciones(): Array<Instruccion> {
        return this.instrucciones
    }

    public setInstrucciones(instrucciones: Array<Instruccion>): void {
        this.instrucciones = instrucciones
    }

    public getTablaGlobal(): tablaSimbolo {
        return this.tablaGlobal
    }

    public setTablaGlobal(tabla: tablaSimbolo) {
        this.tablaGlobal = tabla
    }
    
    public getFunciones(){
        return this.funciones
    }

    public setFunciones(funciones: Array<Instruccion>){
        this.funciones = funciones
    }

    public agregarFunciones(funcion: Instruccion){
        this.funciones.push(funcion)
    }

    public getFuncion(id: string){
        for(let i of this.getFunciones()){
            if(i instanceof Metodo){
                if(i.id.toLocaleLowerCase() == id){
                    return i
                }
            }
        }
    }

}