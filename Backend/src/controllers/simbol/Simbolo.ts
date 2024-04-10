import Tipo from "./tipo";

export default class Simbolo{
    private tipo: Tipo
    private id: string
    private valor: any

    constructor(tipo: Tipo, id: string, valor: any){
        this.tipo = tipo
        this.id = id.toLowerCase()
        this.valor = valor
    }

    public getTipo(): Tipo{
        return this.tipo
    }

    public getId(): string{
        return this.id
    }

    public getValor(): any{
        return this.valor
    }

    public setValor(valor: any){
        this.valor = valor
    }

    public setTipo(tipo: Tipo){
        this.tipo = tipo
    }

    public setId(id: string){
        this.id = id
    }

}