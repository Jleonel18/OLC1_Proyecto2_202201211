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
    analizar(req, res) {
        try {
            let parser = require('../../gramatica/gramatica.js');
            let contenido = req.body.message;
            let resultado = parser.parse(contenido);
            res.json({ message: contenido, "parseado": resultado });
        }
        catch (error) {
            res.json({ message: "Error en el analisis" });
            console.log(error);
        }
    }
}
exports.indexController = new controller();
