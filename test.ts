import prisma from "./src/services/prisma";

type ItensPedidoCreateInput = {
  pedido: { connect: { id: number } };
  produto: { connect: { id: number } };
  quantidade: number;
  subtotal: number; // Adicione a propriedade subtotal aqui
};

async function criarPedido(clienteId: number, data: Date, produtos: { produtoId: number; quantidade: number }[]) {
  let valorTotal = 0;
  let pedido;

  // Calcular o valor total com base nos produtos
  for (const { produtoId, quantidade } of produtos) {
    const produto = await prisma.produto.findUnique({
      where: { id: produtoId },
    });

    if (!produto) {
      throw new Error(`Produto com ID ${produtoId} não encontrado.`);
    }

    const subtotal = produto.precoUnitario * quantidade;
    valorTotal += subtotal;

    // Inserir o item no pedido
    const itemPedido: ItensPedidoCreateInput = {
      pedido: { connect: { id: pedido.id } }, // Usar pedido aqui
      produto: { connect: { id: produtoId } },
      quantidade,
      subtotal,
    };

    // Verificar se o pedido ainda não foi atribuído
    if (!pedido) {
      pedido = await prisma.pedido.create({
        data: {
          cliente: { connect: { id: clienteId } },
          data,
          valorTotal,
        },
      });
    }

    // Inserir o item do pedido após a criação do pedido
    await prisma.itensPedido.create({
      data: itemPedido,
    });
  }

  return pedido;
}

// Exemplo de uso
async function main() {
  try {
    const pedido = await criarPedido(1, new Date(), [
      { produtoId: 1, quantidade: 2 },
      { produtoId: 2, quantidade: 3 },
    ]);

    console.log('Pedido criado:', pedido);
  } catch (error) {
    console.error('Erro ao criar pedido:', error);
}
}
main();