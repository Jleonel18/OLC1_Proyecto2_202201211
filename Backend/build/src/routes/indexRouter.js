"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const indexController_1 = require("../controllers/indexController");
class router {
    constructor() {
        this.router = (0, express_1.Router)();
    }
    constrctor() {
        this.config();
    }
    config() {
        this.router.get('/', indexController_1.indexController.prueba);
        this.router.post('/post', indexController_1.indexController.metodoPost);
    }
}
const indexRouter = new router();
exports.default = indexRouter.router;
