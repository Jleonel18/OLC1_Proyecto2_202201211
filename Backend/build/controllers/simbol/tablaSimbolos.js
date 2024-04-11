"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class tablaSimbolo {
    constructor(anterior) {
        this.tablaAnterior = anterior;
        this.tablaActual = new Map();
        this.nombre = "";
    }
    getAnterior() {
        return this.tablaAnterior;
    }
    setAnterior(anterior) {
        this.tablaAnterior = anterior;
    }
    getTabla() {
        return this.tablaActual;
    }
    setTabla(tabla) {
        this.tablaActual = tabla;
    }
    getVariable(id) {
        for (let i = this; i != null; i = i.getAnterior()) {
            let buscar = i.getTabla().get(id.toLocaleLowerCase());
            if (buscar != null) {
                return buscar;
            }
        }
        return null;
    }
    setVariable(simbolo) {
        let busqueda = this.getTabla().get(simbolo.getId().toLocaleLowerCase());
        if (busqueda == null) {
            this.tablaActual.set(simbolo.getId().toLocaleLowerCase(), simbolo);
            return true;
        }
        return false;
    }
    getNombre() {
        return this.nombre;
    }
    setNombre(nombre) {
        this.nombre = nombre;
    }
}
exports.default = tablaSimbolo;
