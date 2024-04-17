"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.indexController = exports.lista_errores = void 0;
const arbol_1 = __importDefault(require("./simbol/arbol"));
const tablaSimbolos_1 = __importDefault(require("./simbol/tablaSimbolos"));
const errores_1 = __importDefault(require("./excep/errores"));
exports.lista_errores = [];
class controller {
    prueba(req, res) {
        res.json({ message: 'Hola mundo' });
    }
    metodoPost(req, res) {
        //console.log(req.body);
        res.json({ message: 'Metodo post' });
    }
    interpretar(req, res) {
        exports.lista_errores = new Array;
        try {
            let parser = require('../../gramatica/gramatica');
            let ast = new arbol_1.default(parser.parse(req.body.message));
            let tabla = new tablaSimbolos_1.default();
            tabla.setNombre("Global");
            ast.setTablaGlobal(tabla);
            ast.setConsola("");
            for (let i of ast.getInstrucciones()) {
                if (i instanceof errores_1.default) {
                    //console.log("entro aqui") 
                    exports.lista_errores.push(i);
                }
                var resultado = i.interpretar(ast, tabla);
                if (resultado instanceof errores_1.default) {
                    //console.log("aqui entro xd")
                    exports.lista_errores.push(resultado);
                }
                console.log(resultado);
            }
            console.log(tabla);
            res.send({ message: ast.getConsola() });
            console.log(ast.getConsola());
            /*console.log("la lista de errores es:",lista_errores.length);
            for(let it of lista_errores){
                console.log("-------------------------")
                console.log(it.getTipoError())
                console.log(it.getDesc())

                console.log("-------------------------")

            }*/
        }
        catch (error) {
            res.json({ message: "Error en el analisis" });
            console.log(error);
        }
    }
}
exports.indexController = new controller();
