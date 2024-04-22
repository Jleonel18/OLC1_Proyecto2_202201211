export default class reporteSimbolo {
    private id: any
    private tipoVar: any
    private tipoDato: any
    private entorno: any
    private linea: number
    private columna: number

    constructor(id: any, tipoVar: any, tipoDato: any, entorno: any, linea: number, columna: number) {
        this.id = id
        this.tipoVar = tipoVar
        this.tipoDato = tipoDato
        this.entorno = entorno
        this.linea = linea
        this.columna = columna
    }
}