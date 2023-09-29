import { Application } from 'express';
import { createProduto, updateProduto, deleteProduto, getProduto, getAllProdutos } from '../controllers/produto.controller';

const produtoRoute = (app: Application) => {
    app.post('/produto',  createProduto); // Rota para criar um novo produto
    app.put('/produto/:produtoId',  updateProduto); // Rota para atualizar um produto pelo ID
    app.delete('/produto/:produtoId',  deleteProduto); // Rota para excluir um produto pelo ID
    app.get('/produto/:produtoId',  getProduto)
    app.get('/produto/',  getAllProdutos); // Rota para obter um produto pelo ID
    ; // Rota para obter um produto pelo ID
}

export default produtoRoute;
