import prisma from "../services/prisma";
import { z } from 'zod';
import ItensPedidoRepository from "./itensPedido.repo";

const itens = new ItensPedidoRepository();

export const createPedidoSchema = z.object({
    valorTotal: z.number(),
    clienteId: z.number(),
    produtos: z.array(
        z.object({
            produtoId: z.number(),
            quantidade: z.number(),
            valor: z.number(),
        })
    ),
});

export type ItensPedido = z.infer<typeof createPedidoSchema>;

export default class PedidoRepository {
    async createPedido(data: ItensPedido) {
        try {
            const pedidoData = createPedidoSchema.parse(data);

            const pedido = await prisma.pedido.create({
                data: {
                    data: new Date(),
                    valorTotal: pedidoData.valorTotal,
                    clienteId: pedidoData.clienteId,
                }
            });

            // Create an array of promises for creating ItensPedido records
            const createItensPedidoPromises = pedidoData.produtos.map(async (produtoData) => {
                const itensPedidoData = {
                    pedidoId: pedido.id,
                    produtoId: produtoData.produtoId,
                    quantidade: produtoData.quantidade,
                    valorTotal: produtoData.valor,
                };
                return itens.createItensPedido(itensPedidoData);
            });

            // Execute all the promises concurrently
            await Promise.all(createItensPedidoPromises);

            return { pedido };
        } catch (e) {
            throw e;
        }
    }

    async getPedidoById(id: number) {
        try {
            return await prisma.pedido.findUnique({
                where: {
                    id
                },include:{
                    cliente: true,
                    itensPedido: true
                }
            });
        } catch (e) {
            throw e;
        }
    }
    async getPedido() {
        try {
            return await prisma.pedido.findMany({
                include:{
                    cliente: true,
                    itensPedido: true
                }
            });
        } catch (e) {
            throw e;
        }
    }

    async updatePedido(id: number, data: Partial<ItensPedido>){
        try {
            await prisma.pedido.update({
                where: {
                    id
                },
                data: {
                    ...data
                }
            });

            return await this.getPedidoById(id);
        } catch (e) {
            throw e;
        }
    }

    async deletePedido(id: number){
        try {
            await prisma.pedido.delete({
                where: {
                    id
                }
            });
        } catch (e) {
            throw e;
        }
    }
}
