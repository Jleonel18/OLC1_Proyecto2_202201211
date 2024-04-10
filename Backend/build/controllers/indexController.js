"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.indexController = void 0;
const arbol_1 = __importDefault(require("./simbol/arbol"));
const tablaSimbolos_1 = __importDefault(require("./simbol/tablaSimbolos"));
class controller {
    prueba(req, res) {
        //console.log("Aqui estoy")
        res.json({ message: 'Hola mundo' });
    }
    metodoPost(req, res) {
        //console.log(req.body);
        res.json({ message: 'Metodo post' });
    }
    interpretar(req, res) {
        try {
            let parser = require('../../gramatica/gramatica');
            let ast = new arbol_1.default(parser.parse(req.body.message));
            let tabla = new tablaSimbolos_1.default();
            tabla.setNombre("Global");
            ast.setTablaGlobal(tabla);
            ast.setConsola("");
            for (let i of ast.getInstrucciones()) {
                var resultado = i.interpretar(ast, tabla);
                console.log(resultado);
            }
            res.send({ message: "analizado con exito" });
        }
        catch (error) {
            res.json({ message: "Error en el analisis" });
            console.log(error);
        }
    }
}
exports.indexController = new controller();
