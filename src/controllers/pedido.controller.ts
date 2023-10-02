import { Request, Response } from 'express';
import PedidoRepository, { createPedidoSchema } from '../models/pedido.model';
import { ApiError } from '../helpers/erroHelper';

const pedidoRepo = new PedidoRepository();

export const createPedido = async (req: Request, res: Response) => {
    const data = req.body;

    try {
        const pedidoData = createPedidoSchema.parse(data)
        const response = await pedidoRepo.createPedido(pedidoData);
        res.status(201).json(response);
    } catch (error) {
        if (error instanceof ApiError) {
            res.status(error.statusCode).json({ message: error.message });
        } else {
            res.status(500).json({ message: error });
            console.log(error);
        }
    }
}

export const getPedidoById = async (req: Request, res: Response) => {
    const pedidoId = parseInt(req.params.pedidoId);
    try {
        const pedido = await pedidoRepo.getPedidoById(pedidoId);
        if (!pedido) {
            throw new ApiError('Pedido not found', 404);
        } else {
            res.status(200).json(pedido);
        }
    } catch (error) {
        if (error instanceof ApiError) {
            res.status(error.statusCode).json({ message: error.message });
        } else {
            res.status(500).json({ message: 'Internal server error' });
        }
    }
}
export const getPedido = async (req: Request, res: Response) => {
    const pedidoId = parseInt(req.params.pedidoId);
    try {
        const pedido = await pedidoRepo.getPedido();
        if (!pedido) {
            throw new ApiError('Pedido not found', 404);
        } else {
            res.status(200).json(pedido);
        }
    } catch (error) {
        if (error instanceof ApiError) {
            res.status(error.statusCode).json({ message: error.message });
        } else {
            res.status(500).json({ message: 'Internal server error' });
        }
    }
}

export const updatePedido = async (req: Request, res: Response) => {
    const pedidoId = parseInt(req.params.pedidoId);
    const data = req.body;
    try {
        const pedido = await pedidoRepo.updatePedido(pedidoId, data);
        if (!pedido) {
            throw new ApiError('Pedido not found', 404);
        } else {
            res.status(200).json(pedido);
        }
    } catch (error) {
        if (error instanceof ApiError) {
            res.status(error.statusCode).json({ message: error.message });
        } else {
            res.status(500).json({ message: 'Internal server error' });
        }
    }
}

export const deletePedido = async (req: Request, res: Response) => {
    const pedidoId = parseInt(req.params.pedidoId);
    try {
        await pedidoRepo.deletePedido(pedidoId);
        res.status(204).send();
    } catch (error) {
        if (error instanceof ApiError) {
            res.status(error.statusCode).json({ message: error.message });
        } else {
            res.status(500).json({ message: 'Internal server error' });
        }
    }
}
