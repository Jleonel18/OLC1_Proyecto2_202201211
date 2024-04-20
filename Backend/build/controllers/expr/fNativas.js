"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Operadores = void 0;
const instruccion_1 = require("../abstracto/instruccion");
const errores_1 = __importDefault(require("../excep/errores"));
const contadorSingleton_1 = __importDefault(require("../simbol/contadorSingleton"));
const tipo_1 = __importStar(require("../simbol/tipo"));
class FNativas extends instruccion_1.Instruccion {
    constructor(operador, fila, columna, op1) {
        super(new tipo_1.default(tipo_1.tipoDato.ENTERO), fila, columna);
        this.operacion = operador;
        this.operandoUnico = op1;
    }
    interpretar(arbol, tabla) {
        let Unico = null;
        if (this.operandoUnico != null) {
            Unico = this.operandoUnico.interpretar(arbol, tabla);
            if (Unico instanceof errores_1.default)
                return Unico;
        }
        switch (this.operacion) {
            case Operadores.LENGTH:
                if (Array.isArray(Unico)) {
                    return this.longitudArreglo(Unico);
                }
                return this.longitud(Unico);
            case Operadores.TOUPPER:
                return this.toUpper(Unico);
            case Operadores.TOLOWER:
                return this.toLower(Unico);
            case Operadores.ROUND:
                return this.round(Unico);
            case Operadores.TYPEOF:
                return this.typeof(Unico);
            case Operadores.TOSTRING:
                return this.aString(Unico);
            case Operadores.C_STR:
                return this.aStr(Unico);
            default:
                arbol.Print("\n Error Semántico: Operador inexistente en la linea " + this.linea + " y columna " + (this.columna + 1));
                return new errores_1.default("Semantico", "Operador Logico Invalido", this.linea, this.columna);
        }
    }
    longitud(op1) {
        var _a;
        let tipo1 = (_a = this.operandoUnico) === null || _a === void 0 ? void 0 : _a.tipoDato.getTipo();
        switch (tipo1) {
            case tipo_1.tipoDato.CADENA:
                this.tipoDato = new tipo_1.default(tipo_1.tipoDato.ENTERO);
                return op1.length;
            default:
                return new errores_1.default("Semantico", "Solo es posible con Cadenas", this.linea, this.columna);
        }
    }
    toUpper(op1) {
        var _a;
        let tipo1 = (_a = this.operandoUnico) === null || _a === void 0 ? void 0 : _a.tipoDato.getTipo();
        switch (tipo1) {
            case tipo_1.tipoDato.CADENA:
                this.tipoDato = new tipo_1.default(tipo_1.tipoDato.CADENA);
                return op1.toUpperCase();
            default:
                return new errores_1.default("Semantico", "Solo es posible Cadenas", this.linea, this.columna);
        }
    }
    toLower(op1) {
        var _a;
        let tipo1 = (_a = this.operandoUnico) === null || _a === void 0 ? void 0 : _a.tipoDato.getTipo();
        switch (tipo1) {
            case tipo_1.tipoDato.CADENA:
                this.tipoDato = new tipo_1.default(tipo_1.tipoDato.CADENA);
                return op1.toLowerCase();
            default:
                return new errores_1.default("Semantico", "Solo es posible cadenas", this.linea, this.columna);
        }
    }
    round(op1) {
        var _a;
        let tipo1 = (_a = this.operandoUnico) === null || _a === void 0 ? void 0 : _a.tipoDato.getTipo();
        switch (tipo1) {
            case tipo_1.tipoDato.DECIMAL:
                this.tipoDato = new tipo_1.default(tipo_1.tipoDato.ENTERO);
                return Math.round(op1);
            case tipo_1.tipoDato.ENTERO:
                this.tipoDato = new tipo_1.default(tipo_1.tipoDato.ENTERO);
                return op1;
            default:
                return new errores_1.default("Semantico", "Solo se pueden redondear Decimales", this.linea, this.columna);
        }
    }
    typeof(op1) {
        var _a;
        let tipo1 = (_a = this.operandoUnico) === null || _a === void 0 ? void 0 : _a.tipoDato.getTipo();
        switch (tipo1) {
            case tipo_1.tipoDato.ENTERO:
                this.tipoDato = new tipo_1.default(tipo_1.tipoDato.CADENA);
                return "ENTERO";
            case tipo_1.tipoDato.DECIMAL:
                this.tipoDato = new tipo_1.default(tipo_1.tipoDato.CADENA);
                return "DECIMAL";
            case tipo_1.tipoDato.CADENA:
                this.tipoDato = new tipo_1.default(tipo_1.tipoDato.CADENA);
                return "CADENA";
            case tipo_1.tipoDato.BOOL:
                this.tipoDato = new tipo_1.default(tipo_1.tipoDato.CADENA);
                return "BOOL";
            case tipo_1.tipoDato.CARACTER:
                this.tipoDato = new tipo_1.default(tipo_1.tipoDato.CADENA);
                return "CARACTER";
            default:
                return new errores_1.default("Semantico", "No es posible convertir tipo de dato", this.linea, this.columna);
        }
    }
    aString(op1) {
        var _a;
        let tipo1 = (_a = this.operandoUnico) === null || _a === void 0 ? void 0 : _a.tipoDato.getTipo();
        switch (tipo1) {
            case tipo_1.tipoDato.ENTERO:
                this.tipoDato = new tipo_1.default(tipo_1.tipoDato.CADENA);
                return op1.toString();
            case tipo_1.tipoDato.DECIMAL:
                this.tipoDato = new tipo_1.default(tipo_1.tipoDato.CADENA);
                return op1.toString();
            case tipo_1.tipoDato.CARACTER:
                this.tipoDato = new tipo_1.default(tipo_1.tipoDato.CADENA);
                return op1.toString();
            case tipo_1.tipoDato.BOOL:
                this.tipoDato = new tipo_1.default(tipo_1.tipoDato.CADENA);
                return op1.toString();
            default:
                return new errores_1.default("Semantico", "No es posible convertir tipo de dato", this.linea, this.columna);
        }
    }
    aStr(op1) {
        var _a;
        let tipo1 = (_a = this.operandoUnico) === null || _a === void 0 ? void 0 : _a.tipoDato.getTipo();
        if (tipo1 == tipo_1.tipoDato.CADENA) {
            this.tipoDato = new tipo_1.default(tipo_1.tipoDato.CARACTER);
            //console.log("estoy en c_str");
            //console.log("est igual:",this.tipoDato.getTipo() == tipoDato.CARACTER);
            return op1.split('');
        }
        else {
            return new errores_1.default("Semantico", "No es posible convertir tipo de dato", this.linea, this.columna);
        }
    }
    longitudArreglo(op1) {
        this.tipoDato = new tipo_1.default(tipo_1.tipoDato.ENTERO);
        return op1.length;
    }
    obtenerAST(anterior) {
        var _a, _b, _c, _d, _e, _f, _g;
        let contador = contadorSingleton_1.default.getInstance();
        let result = "";
        if (this.operacion == Operadores.LENGTH) {
            let nativa = `n${contador.getContador()}`;
            let expr = `n${contador.getContador()}`;
            let punto = `n${contador.getContador()}`;
            let operUnico = `n${contador.getContador()}`;
            let par1 = `n${contador.getContador()}`;
            let par2 = `n${contador.getContador()}`;
            let puntocoma = `n${contador.getContador()}`;
            result += `${nativa}[label="Nativas"];\n`;
            result += `${expr}[label="Expresion"];\n`;
            result += `${punto}[label="."];\n`;
            result += `${operUnico}[label="length"];\n`;
            result += `${par1}[label="("];\n`;
            result += `${par2}[label=")"];\n`;
            result += `${puntocoma}[label=";"];\n`;
            result += `${anterior} -> ${nativa};\n`;
            result += `${nativa} -> ${expr}\n;`;
            result += `${nativa} -> ${punto}\n;`;
            result += `${nativa} -> ${operUnico};\n`;
            result += `${nativa} -> ${par1}\n;`;
            result += `${nativa} -> ${par2}\n;`;
            result += `${nativa} -> ${puntocoma};\n`;
            result += (_a = this.operandoUnico) === null || _a === void 0 ? void 0 : _a.obtenerAST(expr);
        }
        else if (this.operacion == Operadores.TOUPPER) {
            let nativa = `n${contador.getContador()}`;
            let operUnico = `n${contador.getContador()}`;
            let par1 = `n${contador.getContador()}`;
            let expr = `n${contador.getContador()}`;
            let par2 = `n${contador.getContador()}`;
            let puntocoma = `n${contador.getContador()}`;
            result += `${nativa}[label="Nativas"];\n`;
            result += `${operUnico}[label="toUpper"];\n`;
            result += `${par1}[label="("];\n`;
            result += `${expr}[label="Expresion"];\n`;
            result += `${par2}[label=")"];\n`;
            result += `${puntocoma}[label=";"];\n`;
            result += `${anterior} -> ${nativa};\n`;
            result += `${nativa} -> ${operUnico};\n`;
            result += `${nativa} -> ${par1};\n`;
            result += `${nativa} -> ${expr};\n`;
            result += `${nativa} -> ${par2};\n`;
            result += `${nativa} -> ${puntocoma};\n`;
            result += (_b = this.operandoUnico) === null || _b === void 0 ? void 0 : _b.obtenerAST(expr);
        }
        else if (this.operacion == Operadores.TOLOWER) {
            let nativa = `n${contador.getContador()}`;
            let operUnico = `n${contador.getContador()}`;
            let par1 = `n${contador.getContador()}`;
            let expr = `n${contador.getContador()}`;
            let par2 = `n${contador.getContador()}`;
            let puntocoma = `n${contador.getContador()}`;
            result += `${nativa}[label="Nativas"];\n`;
            result += `${operUnico}[label="toLower"];\n`;
            result += `${par1}[label="("];\n`;
            result += `${expr}[label="Expresion"];\n`;
            result += `${par2}[label=")"];\n`;
            result += `${puntocoma}[label=";"];\n`;
            result += `${anterior} -> ${nativa};\n`;
            result += `${nativa} -> ${operUnico};\n`;
            result += `${nativa} -> ${par1};\n`;
            result += `${nativa} -> ${expr};\n`;
            result += `${nativa} -> ${par2};\n`;
            result += `${nativa} -> ${puntocoma};\n`;
            result += (_c = this.operandoUnico) === null || _c === void 0 ? void 0 : _c.obtenerAST(expr);
        }
        else if (this.operacion == Operadores.ROUND) {
            let nativa = `n${contador.getContador()}`;
            let operUnico = `n${contador.getContador()}`;
            let par1 = `n${contador.getContador()}`;
            let expr = `n${contador.getContador()}`;
            let par2 = `n${contador.getContador()}`;
            let puntocoma = `n${contador.getContador()}`;
            result += `${nativa}[label="Nativas"];\n`;
            result += `${operUnico}[label="round"];\n`;
            result += `${par1}[label="("];\n`;
            result += `${expr}[label="Expresion"];\n`;
            result += `${par2}[label=")"];\n`;
            result += `${puntocoma}[label=";"];\n`;
            result += `${anterior} -> ${nativa};\n`;
            result += `${nativa} -> ${operUnico};\n`;
            result += `${nativa} -> ${par1};\n`;
            result += `${nativa} -> ${expr};\n`;
            result += `${nativa} -> ${par2};\n`;
            result += `${nativa} -> ${puntocoma};\n`;
            result += (_d = this.operandoUnico) === null || _d === void 0 ? void 0 : _d.obtenerAST(expr);
        }
        else if (this.operacion == Operadores.TYPEOF) {
            let nativa = `n${contador.getContador()}`;
            let operUnico = `n${contador.getContador()}`;
            let par1 = `n${contador.getContador()}`;
            let expr = `n${contador.getContador()}`;
            let par2 = `n${contador.getContador()}`;
            let puntocoma = `n${contador.getContador()}`;
            result += `${nativa}[label="Nativas"];\n`;
            result += `${operUnico}[label="typeof"];\n`;
            result += `${par1}[label="("];\n`;
            result += `${expr}[label="Expresion"];\n`;
            result += `${par2}[label=")"];\n`;
            result += `${puntocoma}[label=";"];\n`;
            result += `${anterior} -> ${nativa};\n`;
            result += `${nativa} -> ${operUnico};\n`;
            result += `${nativa} -> ${par1};\n`;
            result += `${nativa} -> ${expr};\n`;
            result += `${nativa} -> ${par2};\n`;
            result += `${nativa} -> ${puntocoma};\n`;
            result += (_e = this.operandoUnico) === null || _e === void 0 ? void 0 : _e.obtenerAST(expr);
        }
        else if (this.operacion == Operadores.TOSTRING) {
            let nativa = `n${contador.getContador()}`;
            let std = `n${contador.getContador()}`;
            let dosp1 = `n${contador.getContador()}`;
            let dosp2 = `n${contador.getContador()}`;
            let operUnico = `n${contador.getContador()}`;
            let par1 = `n${contador.getContador()}`;
            let expr = `n${contador.getContador()}`;
            let par2 = `n${contador.getContador()}`;
            let puntocoma = `n${contador.getContador()}`;
            result += `${nativa}[label="Nativas"];\n`;
            result += `${std}[label="std"];\n`;
            result += `${dosp1}[label=":"];\n`;
            result += `${dosp2}[label=":"];\n`;
            result += `${operUnico}[label="toString"];\n`;
            result += `${par1}[label="("];\n`;
            result += `${expr}[label="Expresion"];\n`;
            result += `${par2}[label=")"];\n`;
            result += `${puntocoma}[label=";"];\n`;
            result += `${anterior} -> ${nativa};\n`;
            result += `${nativa} -> ${std};\n`;
            result += `${nativa} -> ${dosp1};\n`;
            result += `${nativa} -> ${dosp2};\n`;
            result += `${nativa} -> ${operUnico};\n`;
            result += `${nativa} -> ${par1};\n`;
            result += `${nativa} -> ${expr};\n`;
            result += `${nativa} -> ${par2};\n`;
            result += `${nativa} -> ${puntocoma};\n`;
            result += (_f = this.operandoUnico) === null || _f === void 0 ? void 0 : _f.obtenerAST(expr);
        }
        else if (this.operacion == Operadores.C_STR) {
            let nativa = `n${contador.getContador()}`;
            let expr = `n${contador.getContador()}`;
            let punto = `n${contador.getContador()}`;
            let operUnico = `n${contador.getContador()}`;
            let par1 = `n${contador.getContador()}`;
            let par2 = `n${contador.getContador()}`;
            let puntocoma = `n${contador.getContador()}`;
            result += `${nativa}[label="Nativas"];\n`;
            result += `${expr}[label="Expresion"];\n`;
            result += `${punto}[label="."];\n`;
            result += `${operUnico}[label="c_str"];\n`;
            result += `${par1}[label="("];\n`;
            result += `${par2}[label=")"];\n`;
            result += `${puntocoma}[label=";"];\n`;
            result += `${anterior} -> ${nativa};\n`;
            result += `${nativa} -> ${expr}\n;`;
            result += `${nativa} -> ${punto}\n;`;
            result += `${nativa} -> ${operUnico};\n`;
            result += `${nativa} -> ${par1}\n;`;
            result += `${nativa} -> ${par2}\n;`;
            result += `${nativa} -> ${puntocoma};\n`;
            result += (_g = this.operandoUnico) === null || _g === void 0 ? void 0 : _g.obtenerAST(expr);
        }
        return result;
    }
}
exports.default = FNativas;
var Operadores;
(function (Operadores) {
    Operadores[Operadores["LENGTH"] = 0] = "LENGTH";
    Operadores[Operadores["TOUPPER"] = 1] = "TOUPPER";
    Operadores[Operadores["TOLOWER"] = 2] = "TOLOWER";
    Operadores[Operadores["ROUND"] = 3] = "ROUND";
    Operadores[Operadores["TYPEOF"] = 4] = "TYPEOF";
    Operadores[Operadores["TOSTRING"] = 5] = "TOSTRING";
    Operadores[Operadores["C_STR"] = 6] = "C_STR";
})(Operadores || (exports.Operadores = Operadores = {}));
