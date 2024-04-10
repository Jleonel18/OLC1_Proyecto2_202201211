"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Simbolo {
    constructor(tipo, id, valor) {
        this.tipo = tipo;
        this.id = id.toLowerCase();
        this.valor = valor;
    }
    getTipo() {
        return this.tipo;
    }
    getId() {
        return this.id;
    }
    getValor() {
        return this.valor;
    }
    setValor(valor) {
        this.valor = valor;
    }
    setTipo(tipo) {
        this.tipo = tipo;
    }
    setId(id) {
        this.id = id;
    }
}
exports.default = Simbolo;
