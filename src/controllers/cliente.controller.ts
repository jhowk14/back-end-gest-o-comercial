import { Request, Response } from 'express';
import ClienteRepository, { CreateClienteType, updateClienteSchema } from '../repositorys/cliente.repo';
import { ApiError } from '../helpers/erroHelper';

const clienteRepo = new ClienteRepository();

export const createCliente = async (req: Request, res: Response) => {
    const data = req.body;
    try {
        const cliente = await clienteRepo.createClienteRepo(data);
        res.status(201).json(cliente);
    } catch (error) {
        if (error instanceof ApiError) {
            res.status(error.statusCode).json({ message: error.message });
        } else {
            res.status(500).json({ message: 'Internal server error' });
        }
    }
}

export const getCliente = async (req: Request, res: Response) => {
    const clienteId = parseInt(req.params.clienteId);
    try {
        const cliente = await clienteRepo.getClienteById(clienteId);
        if (!cliente) {
            throw new ApiError('Cliente not found', 404);
        } else {
            res.status(200).json(cliente);
        }
    } catch (error) {
        if (error instanceof ApiError) {
            res.status(error.statusCode).json({ message: error.message });
        } else {
            res.status(500).json({ message: 'Internal server error' });
        }
    }
}

export const getAllClientes = async (req: Request, res: Response) => {
    try {
        const clientes = await clienteRepo.getAllCliente();
        res.status(200).json(clientes);
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
}

export const updateCliente = async (req: Request, res: Response) => {
    const clienteId = parseInt(req.params.clienteId);
    const data = req.body;
    try {
        const cliente = await clienteRepo.updateClienteById(clienteId, data);
        if (!cliente) {
            throw new ApiError('Cliente not found', 404);
        } else {
            res.status(200).json(cliente);
        }
    } catch (error) {
        if (error instanceof ApiError) {
            res.status(error.statusCode).json({ message: error.message });
        } else {
            res.status(500).json({ message: 'Internal server error' });
        }
    }
}

export const deleteCliente = async (req: Request, res: Response) => {
    const clienteId = parseInt(req.params.clienteId);
    try {
        await clienteRepo.deleteClienteById(clienteId);
        res.status(204).send();
    } catch (error) {
        if (error instanceof ApiError) {
            res.status(error.statusCode).json({ message: error.message });
        } else {
            res.status(500).json({ message: 'Internal server error' });
        }
    }
}
