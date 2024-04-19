export class Node {
    public hijos: Array<Node>
    public valor: string;

    constructor(valor: string) {
        this.valor = valor
        this.hijos = []
    }

    addHijo(value: string) {
        this.hijos.push(new Node(value))
    }

    addHijos(hijos: Array<Node>){
        for(let item of hijos){
            this.hijos.push(item);
        }
    }

    addHijosNodo(hijo: Node){
        this.hijos.push(hijo);
    }
}