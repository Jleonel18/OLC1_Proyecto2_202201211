"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Errores {
    constructor(tipo, desc, fila, col) {
        this.tipoError = tipo;
        this.desc = desc;
        this.fila = fila;
        this.col = col;
    }
}
exports.default = Errores;
