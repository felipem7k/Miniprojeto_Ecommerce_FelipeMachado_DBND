import { calculaTotalCarrinho, limpaCarrinho, pegaCarrinhoPorClienteId } from "./carrinho";
import { buscaClientePorId } from "./clientes";
import { buscaProdutoPorId, reduzEstoqueProduto } from "./produtos";
import { ItemCarrinho, ItemPedido, Pedido } from "./types";

const pedidos: Pedido[] = [];

const pegaUltimoIdPedido = (): number => pedidos.length > 0 ? pedidos[pedidos.length - 1].id : 0;

const verificaEstoque = (itens: ItemCarrinho[]): boolean => {
    for (const item of itens) {
        const produto = buscaProdutoPorId(item.produtoId);

        if (!produto) {
            console.log(`[ERRO AO REGISTRAR PEDIDO]: produto com id ${item.produtoId} não existe!`);
            return false;
        }
        if (item.quantidade > produto.estoque) {
            console.log(`[ERRO AO REGISTRAR PEDIDO]: produto ${produto.nome} não possui estoque suficiente!`);
            return false;
        }
    }
    return true;
}

export const finalizaPedido = (clienteId: number): void => {
    const carrinho = pegaCarrinhoPorClienteId(clienteId);

    if (!carrinho) {
        console.log(`[ERRO AO FINALIZAR PEDIDO]: carrinho do cliente ${clienteId} não encontrado!`);
        return;
    }

    const itens = carrinho.itens;

    if (itens.length === 0) {
        console.log(`[ERRO AO FINALIZAR PEDIDO]: carrinho do cliente ${clienteId} está vazio!`);
        return;
    }

    if (itens.length === 0) {
        console.log("[ERRO AO REGISTRAR PEDIDO]: não é possível registrar um pedido sem itens!");
        return;
    }

    if (calculaTotalCarrinho(clienteId) <= 0) {
        console.log("[ERRO AO REGISTRAR PEDIDO]: total do pedido deve ser maior que 0!");
        return;
    }

    if (clienteId <= 0) {
        console.log("[ERRO AO REGISTRAR PEDIDO]: clienteId deve ser maior que 0!");
        return;
    }

    const id = pegaUltimoIdPedido() + 1;

    if (id <= 0) {
        console.log("[ERRO AO REGISTRAR PEDIDO]: id do pedido deve ser maior que 0!");
        return;
    }

    if (!buscaClientePorId(clienteId)) {
        console.log(`[ERRO AO REGISTRAR PEDIDO]: cliente com id ${clienteId} não existe!`);
        return;
    }

    if (!verificaEstoque(itens)) {
        return;
    }

    const itensPedido: ItemPedido[] = itens.map(item => ({
        produtoId: item.produtoId,
        quantidade: item.quantidade,
        precoUnitario: buscaProdutoPorId(item.produtoId)?.preco || 0
    }));

    const pedido: Pedido = {
        id,
        clienteId,
        itens: itensPedido,
        total: calculaTotalCarrinho(clienteId),
        data: new Date()
    };

    for (const item of pedido.itens) {
        console.log(`[INFO]: Reduzindo estoque do produto ${item.produtoId} em ${item.quantidade}`);
        reduzEstoqueProduto(item.produtoId, item.quantidade);
    }

    pedidos.push(pedido);

    limpaCarrinho(clienteId);

    console.log(`[INFO]: Pedido ${pedido.id} finalizado com sucesso!`);
}

export const listaPedidos = (): Pedido[] => {
    return pedidos;
}

export const exibePedidos = (): void => {
    console.log("Pedidos Registrados:");

    for (const pedido of pedidos) {
        console.log(`
            ID: ${pedido.id}
            Cliente ID: ${pedido.clienteId}
            Itens: ${JSON.stringify(pedido.itens)}
            Total: ${pedido.total}
            Data: ${pedido.data.toISOString()}
        `);
        console.log("--------------------------------------------------")
    }
}

export const buscaPedidosPorClienteId = (clienteId: number): Pedido[] => {
    return pedidos.filter(pedido => pedido.clienteId === clienteId);
}