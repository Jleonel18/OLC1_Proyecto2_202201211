import tablaSimbolo from "./tablaSimbolos";
import { Instruccion } from "../abstracto/instruccion";

export default class Arbol {
    private instrucciones: Array<Instruccion>
    private consola: string
    private tablaGlobal: tablaSimbolo

    constructor(instrucciones: Array<Instruccion>) {
        this.instrucciones = instrucciones
        this.consola = ""
        this.tablaGlobal = new tablaSimbolo()
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

}