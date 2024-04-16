"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Errores {
    constructor(tipo, desc, fila, col) {
        this.tipoError = tipo;
        this.desc = desc;
        this.fila = fila;
        this.col = col;
    }
    // Getters
    getTipoError() {
        return this.tipoError;
    }
    getDesc() {
        return this.desc;
    }
    getFila() {
        return this.fila;
    }
    getCol() {
        return this.col;
    }
    // Setters
    setTipoError(tipo) {
        this.tipoError = tipo;
    }
    setDesc(desc) {
        this.desc = desc;
    }
    setFila(fila) {
        this.fila = fila;
    }
    setCol(col) {
        this.col = col;
    }
}
exports.default = Errores;
