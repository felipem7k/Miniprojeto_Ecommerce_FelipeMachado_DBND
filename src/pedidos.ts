import { buscaClientePorId } from "./clientes";
import { buscaProdutoPorId, reduzEstoqueProduto } from "./produtos";
import { Pedido } from "./types";

const pedidos: Pedido[] = [];

const verificaEstoque = (pedido: Pedido): boolean => {
    for (const item of pedido.itens) {
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

export const finalizaPedido = (pedido: Pedido): void => {
    if (pedido.itens.length === 0) {
        console.log("[ERRO AO REGISTRAR PEDIDO]: não é possível registrar um pedido sem itens!");
        return;
    }

    if (pedido.total <= 0) {
        console.log("[ERRO AO REGISTRAR PEDIDO]: total do pedido deve ser maior que 0!");
        return;
    }

    if (pedido.clienteId <= 0) {
        console.log("[ERRO AO REGISTRAR PEDIDO]: clienteId deve ser maior que 0!");
        return;
    }

    if (pedido.id <= 0) {
        console.log("[ERRO AO REGISTRAR PEDIDO]: id do pedido deve ser maior que 0!");
        return;
    }

    if (pedido.data > new Date()) {
        console.log("[ERRO AO REGISTRAR PEDIDO]: data do pedido não pode ser no futuro!");
        return;
    }

    if (!buscaClientePorId(pedido.clienteId)) {
        console.log(`[ERRO AO REGISTRAR PEDIDO]: cliente com id ${pedido.clienteId} não existe!`);
        return;
    }

    if (!verificaEstoque(pedido)) {
        return;
    }

    for (const item of pedido.itens) {
        console.log(`[INFO]: Reduzindo estoque do produto ${item.produtoId} em ${item.quantidade}`);
        reduzEstoqueProduto(item.produtoId, item.quantidade);
    }

    pedidos.push(pedido);

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