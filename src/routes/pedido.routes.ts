import { Application } from 'express';
import { createPedido, updatePedido, deletePedido, getPedido, getPedidoById } from '../controllers/pedido.controller';

const pedidoRoute = (app: Application) => {
    app.post('/pedido',  createPedido); // Rota para criar um novo pedido
    app.put('/pedido/:pedidoId',  updatePedido); // Rota para atualizar um pedido pelo ID
    app.delete('/pedido/:pedidoId',  deletePedido); // Rota para excluir um pedido pelo ID
    app.get('/pedido/:pedidoId',  getPedidoById);
    app.get('/pedido/',  getPedido); // Rota para obter um pedido pelo ID
     // Rota para obter um pedido pelo ID
}

export default pedidoRoute;
