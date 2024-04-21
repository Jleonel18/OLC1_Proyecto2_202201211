import {Request, Response} from 'express'
import Arbol from './simbol/arbol';
import tablaSimbolo from './simbol/tablaSimbolos';
import Errores from './excep/errores';
import Metodo from './instruc/metodo';
import Declaracion from './instruc/declaracion';
import Execute from './instruc/execute';
import ContadorSingleton from './simbol/contadorSingleton';

export let lista_errores: Array<Errores> = [];

var dotAst: string = "";

class controller{
    public prueba(req: Request, res: Response){
        res.json({message: 'Hola mundo'});
    }

    public metodoPost(req: Request, res: Response){
        //console.log(req.body);
        res.json({message: 'Metodo post'});
    }

    public reporteErrores(req: Request, res: Response){
        try{

            res.send({message: lista_errores});

        }catch(error: any){
            console.log(error);
            res.json({message: "Error al crear el reporte de errores"});
        }
    }

    public interpretar(req: Request, res: Response){

        lista_errores = new Array<Errores>

        try{

            dotAst = "";

            let parser = require('../../gramatica/gramatica')
            let ast = new Arbol(parser.parse(req.body.message));
            let tabla = new tablaSimbolo();
            tabla.setNombre("Global");
            ast.setTablaGlobal(tabla);
            ast.setConsola("");

            for(let err of lista_errores){
                ast.Print("Error "+err.getTipoError()+ ". "+err.getDesc()+" linea: "+err.getFila()+" columna: "+(err.getCol()+1));
            }

            let recorrido1 = null;
            for(let i of ast.getInstrucciones()){

                if(i instanceof Metodo){
                    //console.log("guardo un metodo")
                    i.id = i.id.toLocaleLowerCase();
                    ast.agregarFunciones(i);
                }

                if(i instanceof Declaracion){
                    //console.log("guardo una declaracion")
                    i.interpretar(ast, tabla);
                    
                }

                if(i instanceof Errores){
                    lista_errores.push(i);
                }

                if(i instanceof Execute){
                    //console.log("guardo un execute")
                    recorrido1 = i;
                }

            }

            if(recorrido1 != null){

                let res = recorrido1.interpretar(ast, tabla);

                if(res instanceof Errores){
                    lista_errores.push(res);
                }
                
            }

            let contador = ContadorSingleton.getInstance();
            let cadena  = "digraph arbol{\n";
            cadena += `nInicio[label = "inicio"];\n`;
            cadena += `nInstrucciones[label = "instrucciones"];\n`;
            cadena += `nInicio -> nInstrucciones;\n`;

            for(let i of ast.getInstrucciones()){
                if(i instanceof Errores) continue;
                let nodo = `n${contador.getContador()}`;
                cadena += `${nodo}[label="instruccion"]\n`;
                cadena += `nInstrucciones -> ${nodo};\n`;
                cadena += i.obtenerAST(nodo);
            }

            cadena += "\n}"
            dotAst = cadena;


            console.log(tabla);
            res.send({message: ast.getConsola()});
            console.log(ast.getConsola());

            console.log("el tamaño de la lista de errores es:",lista_errores.length);
            for(let it of lista_errores){
                console.log("-------------------------")
                console.log(it.getTipoError())
                console.log(it.getDesc())

                console.log("-------------------------")

            }
            /*console.log("las funciones son:")
            console.log(ast.getFunciones());*/

        }catch(error: any){
            res.json({message: "Error en el analisis"});
            console.log(error);
        }
    }

    public arbolAst(req: Request, res: Response){
        try{
            res.json({message: dotAst});
        }catch(error: any){
            console.log(error);
            res.json({message: "Error al obtener el arbol AST"});
        }
    }
}

export const indexController = new controller();
