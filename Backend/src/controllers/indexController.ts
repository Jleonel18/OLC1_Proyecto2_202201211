import {Request, Response} from 'express'
import Arbol from './simbol/arbol';
import tablaSimbolo from './simbol/tablaSimbolos';
import Errores from './excep/errores';

export let lista_errores: Array<Errores> = [];

class controller{
    public prueba(req: Request, res: Response){
        res.json({message: 'Hola mundo'});
    }

    public metodoPost(req: Request, res: Response){
        //console.log(req.body);
        res.json({message: 'Metodo post'});
    }

    public interpretar(req: Request, res: Response){

        lista_errores = new Array<Errores>

        try{
            let parser = require('../../gramatica/gramatica')
            let ast = new Arbol(parser.parse(req.body.message));
            let tabla = new tablaSimbolo();
            tabla.setNombre("Global");
            ast.setTablaGlobal(tabla);
            ast.setConsola("");

            for(let i of ast.getInstrucciones()){

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

            }
            console.log(tabla);
            res.send({message: ast.getConsola()});
            console.log(ast.getConsola());

            /*console.log("la lista de errores es:",lista_errores.length);
            for(let it of lista_errores){
                console.log("-------------------------")
                console.log(it.getTipoError())
                console.log(it.getDesc())

                console.log("-------------------------")

            }*/

        }catch(error: any){
            res.json({message: "Error en el analisis"});
            console.log(error);
        }
    }
}

export const indexController = new controller();
