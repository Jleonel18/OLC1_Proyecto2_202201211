import { Router } from 'express'
import { indexController } from '../controllers/indexController'

class router {
    public router: Router = Router();
    constructor() {
        this.config();
    }

    config(): void {
        this.router.get('/', indexController.prueba);
        this.router.post('/post', indexController.metodoPost);
        this.router.post('/analizar', indexController.interpretar);
        this.router.get('/reporteErrores', indexController.reporteErrores);
        this.router.get('/reporteAST', indexController.arbolAst);
    }
}

const indexRouter = new router();
export default indexRouter.router; 
