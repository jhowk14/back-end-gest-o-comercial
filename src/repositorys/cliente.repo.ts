import prisma from "../services/prisma";
import { z } from 'zod'
import { ApiError } from "../helpers/erroHelper";

export const createClienteSchema = z.object({
    nome: z.string().nonempty('O nome e obrigatorio'),
    email: z.string().nonempty('O email é obrigatório').email("email invalido"),
    endereco: z.string().nonempty('O endereco e obrigatório'),
})
export const updateClienteSchema = z.object({
    nome: z.string().optional(),
    email: z.string().email("email invalido").optional(),
    endereco: z.string().optional(),
})
export type CreateClienteType = z.infer<typeof createClienteSchema>;
export default class ClienteRepository {
async createClienteRepo(data: CreateClienteType){
    try {
        const ClienteData = createClienteSchema.parse(data);
        const ClienteExist = await prisma.cliente.findUnique({
            where: {
                email: ClienteData.email,
            },
        });
        if(ClienteExist){
            throw new ApiError("Cliente email already exists", 401)
        }
        const Cliente = await prisma.cliente.create({
            data: {
                ...ClienteData
            }
            
        });
        return Cliente;
    } catch (e) {
        throw e;
    }
}
async getClienteById(ClienteId: number){
    try {
        const Cliente = await prisma.cliente.findUnique({
            where: {
                id: ClienteId
            }
        });

        return Cliente;
    } catch (e) {
        throw e; 
    }
}
async getAllCliente(){
    try {
        const Cliente = await prisma.cliente.findMany();

        return Cliente;
    } catch (e) {
        throw e; 
    }
}
async updateClienteById(ClienteId: number, data: Partial<CreateClienteType>){
    try {
        const ClienteData = updateClienteSchema.parse(data);
        const Cliente = await prisma.cliente.update({
            where: {
                id: ClienteId
            },
            data: {
                ...ClienteData,
            }
        });

        return Cliente;
    } catch (e) {
        throw e; 
    }
}
async deleteClienteById(ClienteId: number){
    try {
        const Cliente = await prisma.cliente.delete({
            where: {
                id: ClienteId
            }
        });

        return Cliente;
    } catch (e) {
        throw e;
    }
}
}