"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Simbolo {
    constructor(tipo, id, valor) {
        this.tipo = tipo;
        this.id = id.toLocaleLowerCase();
        this.valor = valor;
    }
    getTipo() {
        return this.tipo;
    }
    setTipo(tipo) {
        this.tipo = tipo;
    }
    getId() {
        return this.id;
    }
    setId(id) {
        this.id = id;
    }
    getValor() {
        return this.valor;
    }
    setValor(valor) {
        this.valor = valor;
    }
}
exports.default = Simbolo;
