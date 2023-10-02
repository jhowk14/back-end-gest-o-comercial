import prisma from "../services/prisma";
import { z } from 'zod'

export const createProdutoSchema = z.object({
    nome: z.string().nonempty("Nome obrigatório"),
    precoUnitario: z.number(),
    descricao: z.string().nonempty("Descrição obrigatória"),
})

export type createProdutoType = z.infer<typeof createProdutoSchema>;

export default class ProdutoRepository {
async createProdutoRepo(data: createProdutoType){
    try {
        const ProdutoData = createProdutoSchema.parse(data);
        const Produto = await prisma.produto.create({
            data: ProdutoData
        });

        return Produto;
    } catch (e) {
        throw e; 
    }
}
async getProdutos(){
    try {
        const Produtos = await prisma.produto.findMany();
        return Produtos;
    } catch (e) {
        throw e; 
    }
}

async getProdutosID(id: number){
    try {
        const Produtos = await prisma.produto.findMany({
            where:{
                id: id
            }
        });

        return Produtos;
    } catch (e) {
        throw e; 
    }
}

async updateProdutoById(ProdutoId: number, data: Partial<createProdutoType>){
    try {
        const Produto = await prisma.produto.update({
            where: {
                id: ProdutoId
            },
            data: data
        });

        return Produto;
    } catch (e) {
        throw e;
    }
}

async deleteProdutoById(produtoId: number) {
    try {

        // Em seguida, exclua o produto
        const Produto = await prisma.produto.delete({
            where: {
                id: produtoId
            }
        });

        return Produto;
    } catch (e) {
        throw e;
    }
}
}