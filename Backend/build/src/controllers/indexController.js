"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.indexController = void 0;
class controller {
    prueba(req, res) {
        //console.log("Aqui estoy")
        res.json({ message: 'Hola mundo' });
    }
    metodoPost(req, res) {
        //console.log(req.body);
        res.json({ message: 'Metodo post' });
    }
}
exports.indexController = new controller();
