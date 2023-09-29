import { Application } from 'express';
import { createCliente, getAllClientes, updateCliente, deleteCliente, getCliente } from '../controllers/cliente.controller';

const clienteRoute = (app: Application) => {
    app.post('/cliente', createCliente); // Rota para criar um novo cliente
    app.get('/cliente',  getAllClientes); // Rota para listar todos os clientes
    app.get('/cliente/:clienteId',  getCliente); // Rota para buscar um cliente pelo ID
    app.put('/cliente/:clienteId', updateCliente); // Rota para atualizar um cliente pelo ID
    app.delete('/cliente/:clienteId',  deleteCliente); // Rota para excluir um cliente pelo ID
}

export default clienteRoute;
