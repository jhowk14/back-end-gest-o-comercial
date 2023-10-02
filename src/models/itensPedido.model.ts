import prisma from "../services/prisma";
import { z } from 'zod'

export const createItensPedidoSchema = z.object({
    pedidoId: z.number(),
    produtoId: z.number(),
    quantidade: z.number(),
    valorTotal: z.number(),
});

export type ItensPedidoData = z.infer<typeof createItensPedidoSchema>;

export default class ItensPedidoRepository {
    async createItensPedido(data: ItensPedidoData){
        try {
            const itensPedidoData = createItensPedidoSchema.parse(data);

            const itensPedido = await prisma.itensPedido.create({
                data: {
                    pedidoId: itensPedidoData.pedidoId,
                    produtoId: itensPedidoData.produtoId,
                    quantidade: itensPedidoData.quantidade,
                    valorTotal: itensPedidoData.valorTotal,
                }
            });

            return { itensPedido };
        } catch (e) {
            throw e;
        }
    }

    async getItensPedidoById(id: number) {
        try {
            return await prisma.itensPedido.findUnique({
                where: {
                    id
                },
                include: {
                    pedido: true,
                    produto: true
                }
            });
        } catch (e) {
            throw e;
        }
    }

    async updateItensPedido(id: number, data: Partial<ItensPedidoData>){
        try {
            await prisma.itensPedido.update({
                where: {
                    id
                },
                data: {
                    ...data
                }
            });

            return await this.getItensPedidoById(id);
        } catch (e) {
            throw e;
        }
    }

    async deleteItensPedido(id: number){
        try {
            await prisma.itensPedido.delete({
                where: {
                    id
                }
            });
        } catch (e) {
            throw e;
        }
    }
}
