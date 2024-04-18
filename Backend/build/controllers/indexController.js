"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.indexController = exports.lista_errores = void 0;
const arbol_1 = __importDefault(require("./simbol/arbol"));
const tablaSimbolos_1 = __importDefault(require("./simbol/tablaSimbolos"));
const errores_1 = __importDefault(require("./excep/errores"));
const metodo_1 = __importDefault(require("./instruc/metodo"));
const declaracion_1 = __importDefault(require("./instruc/declaracion"));
const execute_1 = __importDefault(require("./instruc/execute"));
exports.lista_errores = [];
class controller {
    prueba(req, res) {
        res.json({ message: 'Hola mundo' });
    }
    metodoPost(req, res) {
        //console.log(req.body);
        res.json({ message: 'Metodo post' });
    }
    reporteErrores(req, res) {
        try {
            res.send({ message: exports.lista_errores });
        }
        catch (error) {
            console.log(error);
            res.json({ message: "Error al crear el reporte de errores" });
        }
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
            for (let err of exports.lista_errores) {
                ast.Print("Error " + err.getTipoError() + ". " + err.getDesc() + " linea: " + err.getFila() + " columna: " + (err.getCol() + 1));
            }
            let recorrido1 = null;
            for (let i of ast.getInstrucciones()) {
                if (i instanceof metodo_1.default) {
                    //console.log("guardo un metodo")
                    i.id = i.id.toLocaleLowerCase();
                    ast.agregarFunciones(i);
                }
                if (i instanceof declaracion_1.default) {
                    //console.log("guardo una declaracion")
                    i.interpretar(ast, tabla);
                }
                if (i instanceof errores_1.default) {
                    exports.lista_errores.push(i);
                }
                if (i instanceof execute_1.default) {
                    //console.log("guardo un execute")
                    recorrido1 = i;
                }
            }
            /*for(let i of ast.getInstrucciones()){

                if(i instanceof Errores){
                    //console.log("entro aqui")
                    lista_errores.push(i)

                }
                var resultado = i.interpretar(ast, tabla);

                if (resultado instanceof Errores) {
                    //console.log("aqui entro xd")
                    lista_errores.push(resultado)
                }
                console.log(resultado);

            }*/
            if (recorrido1 != null) {
                //console.log("voy a hacer el execute")
                let res = recorrido1.interpretar(ast, tabla);
                if (res instanceof errores_1.default) {
                    exports.lista_errores.push(res);
                }
            }
            console.log(tabla);
            res.send({ message: ast.getConsola() });
            console.log(ast.getConsola());
            console.log("el tamaño de la lista de errores es:", exports.lista_errores.length);
            for (let it of exports.lista_errores) {
                console.log("-------------------------");
                console.log(it.getTipoError());
                console.log(it.getDesc());
                console.log("-------------------------");
            }
        }
        catch (error) {
            res.json({ message: "Error en el analisis" });
            console.log(error);
        }
    }
}
exports.indexController = new controller();
