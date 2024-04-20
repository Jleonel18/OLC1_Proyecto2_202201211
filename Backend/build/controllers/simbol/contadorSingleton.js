"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ContadorSingleton {
    constructor() {
        this.contador = 0;
    }
    static getInstance() {
        if (!ContadorSingleton.instance) {
            ContadorSingleton.instance = new ContadorSingleton();
        }
        return ContadorSingleton.instance;
    }
    getContador() {
        this.contador++;
        return this.contador;
    }
}
exports.default = ContadorSingleton;
