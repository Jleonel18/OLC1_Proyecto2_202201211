import {Request, Response} from 'express'
import Arbol from './simbol/arbol';
import tablaSimbolo from './simbol/tablaSimbolos';

class controller{
    public prueba(req: Request, res: Response){
        //console.log("Aqui estoy")
        res.json({message: 'Hola mundo'});
    }

    public metodoPost(req: Request, res: Response){
        //console.log(req.body);
        res.json({message: 'Metodo post'});
    }

    public interpretar(req: Request, res: Response){
        try{
            let parser = require('../../gramatica/gramatica')
            let ast = new Arbol(parser.parse(req.body.message));
            let tabla = new tablaSimbolo();
            tabla.setNombre("Global");
            ast.setTablaGlobal(tabla);
            ast.setConsola("");

            for(let i of ast.getInstrucciones()){
                var resultado = i.interpretar(ast, tabla);
                console.log(resultado);

            }
            console.log(tabla);
            res.send({message: ast.getConsola()});
            console.log(ast.getConsola());

        }catch(error: any){
            res.json({message: "Error en el analisis"});
            console.log(error);
        }
    }
}

export const indexController = new controller();
