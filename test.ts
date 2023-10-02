import prisma from "./src/services/prisma";

async function criarPedido() {
  

  await prisma.produto.create({
    data:{
      nome: 'desconhecido',
      descricao: 'desconhecido',
      precoUnitario: 0,
      id: 0

    }
  })
}

criarPedido()
// Exemplo de uso