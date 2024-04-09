import {Request, Response} from 'express'

class controller{
    public prueba(req: Request, res: Response){
        //console.log("Aqui estoy")
        res.json({message: 'Hola mundo'});
    }

    public metodoPost(req: Request, res: Response){
        //console.log(req.body);
        res.json({message: 'Metodo post'});
    }

    public analizar(req: Request, res: Response){
        try{
            let parser = require('../../gramatica/gramatica.js')
            let contenido = req.body.message
            let resultado = parser.parse(contenido)
            res.json({message: contenido, "parseado": resultado});

        }catch(error: any){
            res.json({message: "Error en el analisis"});
            console.log(error);
        }
    }
}

export const indexController = new controller();
