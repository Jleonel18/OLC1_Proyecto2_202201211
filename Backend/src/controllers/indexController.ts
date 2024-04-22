import {Request, Response} from 'express'
import Arbol from './simbol/arbol';
import tablaSimbolo from './simbol/tablaSimbolos';
import Errores from './excep/errores';
import Metodo from './instruc/metodo';
import Declaracion from './instruc/declaracion';
import Execute from './instruc/execute';
import ContadorSingleton from './simbol/contadorSingleton';
import reporteSimbolo from './simbol/reporteSimbol';
import { tipoDato } from './simbol/tipo';

export let lista_errores: Array<Errores> = [];
export let simbolos_tabla: Array<reporteSimbolo> = [];

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
        Arbol.lista_simbolos = [];
        simbolos_tabla = [];

        try{

            dotAst = "";

            let parser = require('../../gramatica/gramatica')
            let ast = new Arbol(parser.parse(req.body.message));
            let tabla = new tablaSimbolo();
            tabla.setNombre("Global");
            Arbol.lista_simbolos.push(tabla);
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
            let cadena  = `digraph arbol{ splines="false" \n`;
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

            /*console.log("La tabla de simbolos es:")
            console.log(Arbol.lista_simbolos);*/

            for(let i of Arbol.lista_simbolos){
                let nombreAmbito = i.getNombre();
                let ident:any = [];
                let tipoD: any = [];
                let valor: any =  [];
                let fila: any =  [];
                let columna: [];
                i.getTabla().forEach((value, key) => {
                    ident.push(value.getId());
                    if(value.getTipo().getTipo() == tipoDato.BOOL){
                        tipoD.push("bool");
                    }else if(value.getTipo().getTipo() == tipoDato.DECIMAL){
                        tipoD.push("double");
                    }else if(value.getTipo().getTipo() == tipoDato.CADENA){
                        tipoD.push("std::string");
                    }else if(value.getTipo().getTipo() == tipoDato.ENTERO){
                        tipoD.push("int");
                    }

                    valor.push(value.getValor());
                        
                });

                for(let i =0; i<ident.length; i++){
                    simbolos_tabla.push(new reporteSimbolo(ident[i], "variable", tipoD[i], nombreAmbito, 0, 0));
                }
            }

            console.log("La tabla de simbolos es:")
            console.log(simbolos_tabla);

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

    public reporteSimbol(req: Request, res: Response){
        try{
            res.json({message: simbolos_tabla});
        }catch(error: any){
            console.log(error);
            res.json({message: "Error al obtener el reporte de simbolos"});
        }
    }
}

export const indexController = new controller();
