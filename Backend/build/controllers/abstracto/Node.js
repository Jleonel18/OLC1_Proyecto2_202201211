"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Node = void 0;
class Node {
    constructor(valor) {
        this.valor = valor;
        this.hijos = [];
    }
    addHijo(value) {
        this.hijos.push(new Node(value));
    }
    addHijos(hijos) {
        for (let item of hijos) {
            this.hijos.push(item);
        }
    }
    addHijosNodo(hijo) {
        this.hijos.push(hijo);
    }
}
exports.Node = Node;
