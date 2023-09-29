import { Application} from 'express'; 
import produtoRoute from './produto.routes';
import clienteRoute from './cliente.routes';
import pedidoRoute from './pedido.routes';


const routes = (app: Application) => {
    produtoRoute(app)
    clienteRoute(app)
    pedidoRoute(app)
}

export default routes