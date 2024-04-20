"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const indexController_1 = require("../controllers/indexController");
class router {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        this.router.get('/', indexController_1.indexController.prueba);
        this.router.post('/post', indexController_1.indexController.metodoPost);
        this.router.post('/analizar', indexController_1.indexController.interpretar);
        this.router.get('/reporteErrores', indexController_1.indexController.reporteErrores);
        this.router.get('/reporteAST', indexController_1.indexController.arbolAst);
    }
}
const indexRouter = new router();
exports.default = indexRouter.router;
