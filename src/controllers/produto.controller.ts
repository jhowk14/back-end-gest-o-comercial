import { Request, Response } from 'express';
import ProdutoRepository from '../models/produto.model';
import { ApiError } from '../helpers/erroHelper';

const produtoRepo = new ProdutoRepository();

export const createProduto = async (req: Request, res: Response) => {
    const data = req.body;
    try {
        const produto = await produtoRepo.createProdutoRepo(data);
        res.status(201).json(produto);
    } catch (error) {
        if (error instanceof ApiError) {
            res.status(error.statusCode).json({ message: error.message });
        } else {
            res.status(500).json({ message: 'Internal server error' });
        }
    }
}

export const getProduto = async (req: Request, res: Response) => {
    const produtoId = parseInt(req.params.produtoId);
    try {
        const produto = await produtoRepo.getProdutosID(produtoId);
        if (!produto || produto.length === 0) {
            throw new ApiError('Produto not found', 404);
        } else {
            res.status(200).json(produto[0]);
        }
    } catch (error) {
        if (error instanceof ApiError) {
            res.status(error.statusCode).json({ message: error.message });
        } else {
            res.status(500).json({ message: 'Internal server error' });
        }
    }
}

export const getAllProdutos = async (req: Request, res: Response) => {
    try {
        const produtos = await produtoRepo.getProdutos();
        res.status(200).json(produtos);
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
}

export const updateProduto = async (req: Request, res: Response) => {
    const produtoId = parseInt(req.params.produtoId);
    const data = req.body;
    try {
        const produto = await produtoRepo.updateProdutoById(produtoId, data);
        if (!produto) {
            throw new ApiError('Produto not found', 404);
        } else {
            res.status(200).json(produto);
        }
    } catch (error) {
        if (error instanceof ApiError) {
            res.status(error.statusCode).json({ message: error.message });
        } else {
            res.status(500).json({ message: 'Internal server error' });
        }
    }
}

export const deleteProduto = async (req: Request, res: Response) => {
    const produtoId = parseInt(req.params.produtoId);
    try {
        await produtoRepo.deleteProdutoById(produtoId);
        res.status(204).send();
    } catch (error) {
        if (error instanceof ApiError) {
            res.status(error.statusCode).json({ message: error.message });
        } else {
            res.status(500).json({ message: error });
        }
    }
}
