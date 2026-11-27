import { calculaTotalCarrinho, limpaCarrinho, pegaCarrinhoPorClienteId } from "./carrinho";
import { buscaClientePorId } from "./clientes";
import { pool } from "./database";
import { buscaProdutoPorId, reduzEstoqueProduto } from "./produtos";
import { DbPedido, ItemCarrinho, ItemPedido, Pedido } from "./types";

const pedidos: Pedido[] = [];

const formataPedido = (dbPedido: DbPedido): Pedido => {
    const itens: ItemPedido[] = [];

    return {
        id: dbPedido.id_pedido,
        clienteId: dbPedido.id_cliente,
        enderecoId: dbPedido.id_endereco_entrega,
        itens: itens,
        total: 0,
        data: new Date()
    };
};

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

export const finalizaPedido = async (clienteId: number, enderecoId: number, itens: ItemPedido[]): Promise<void> => {
    // const carrinho = pegaCarrinhoPorClienteId(clienteId);

    // if (!carrinho) {
    //     console.log(`[ERRO AO FINALIZAR PEDIDO]: carrinho do cliente ${clienteId} não encontrado!`);
    //     return;
    // }

    if (itens.length === 0) {
        console.log(`[ERRO AO FINALIZAR PEDIDO]: carrinho do cliente ${clienteId} está vazio!`);
        return;
    }

    if (itens.length === 0) {
        console.log("[ERRO AO REGISTRAR PEDIDO]: não é possível registrar um pedido sem itens!");
        return;
    }

    // if (calculaTotalCarrinho(clienteId) <= 0) {
    //     console.log("[ERRO AO REGISTRAR PEDIDO]: total do pedido deve ser maior que 0!");
    //     return;
    // }

    if (clienteId <= 0) {
        console.log("[ERRO AO REGISTRAR PEDIDO]: clienteId deve ser maior que 0!");
        return;
    }

    if (!buscaClientePorId(clienteId)) {
        console.log(`[ERRO AO REGISTRAR PEDIDO]: cliente com id ${clienteId} não existe!`);
        return;
    }

    if (!verificaEstoque(itens)) {
        return;
    }

    // TODO: implementar
    // const itensPedido: ItemPedido[] = itens.map(item => ({
    //     produtoId: item.produtoId,
    //     quantidade: item.quantidade,
    //     precoUnitario: buscaProdutoPorId(item.produtoId)?.preco || 0
    // }));

    const conn = await pool.connect();
    try {
        await conn.query("BEGIN");
        const resposta = await conn.query<DbPedido>(
            'INSERT INTO pedido (id_cliente, id_endereco_entrega) VALUES ($1, $2) RETURNING *',
            [clienteId, enderecoId]
        );

        if (resposta.rowCount === 0) {
            console.log(`[ERRO AO REGISTRAR PEDIDO]: falha ao inserir pedido no banco de dados!`);
            return;
        }

        const pedido = formataPedido(resposta.rows[0]);
        
        console.log(`[INFO]: Pedido ${pedido.id} registrado com sucesso!`);

        for (const item of itens) {
            const produto = buscaProdutoPorId(item.produtoId);

            if (!produto) {
                throw new Error(`Produto de ID ${item.produtoId} não existe!`);
            }

            await conn.query(
                `INSERT INTO item_pedido (id_pedido, id_produto, quantidade, preco_unitario) VALUES ($1, $2, $3, $4)`,
                [pedido.id, item.produtoId, item.quantidade, item.precoUnitario]
            );
        }

        // TODO: implementar
        // for (const item of pedido.itens) {
        //     console.log(`[INFO]: Reduzindo estoque do produto ${item.produtoId} em ${item.quantidade}`);
        //     reduzEstoqueProduto(item.produtoId, item.quantidade);
        // }
        
        // limpaCarrinho(clienteId);

        console.log(`[INFO]: Pedido finalizado com sucesso!`);
        await conn.query("COMMIT");
    } catch (error) {
        console.error(`[ERRO AO REGISTRAR PEDIDO]:`, error);
        await conn.query("ROLLBACK");
    } finally {
        conn.release();
    }
    
    console.log(`[INFO]: Transação concluída com sucesso!`);
}

export const listaPedidos = (): Pedido[] => {
    return pedidos;
}

const exibePedido = (pedido: Pedido): void => {
    console.log(`
            ID: ${pedido.id}
            Cliente ID: ${pedido.clienteId}
            Itens: ${JSON.stringify(pedido.itens)}
            Total: ${pedido.total}
            Data: ${pedido.data.toISOString()}
        `);
    console.log("--------------------------------------------------")
}

export const exibePedidos = (): void => {
    console.log("Pedidos Registrados:");

    for (const pedido of pedidos) {
        exibePedido(pedido);
    }
}

export const exibePedidosPorClienteId = (clienteId: number): void => {
    console.log(`Pedidos do cliente ${clienteId}:`);

    const pedidosDoCliente = buscaPedidosPorClienteId(clienteId);

    if (pedidosDoCliente.length === 0) {
        console.log("[INFO]: Nenhum pedido encontrado!");
        return;
    }

    for (const pedido of pedidosDoCliente) {
        exibePedido(pedido);
    }
}

export const buscaPedidosPorClienteId = (clienteId: number): Pedido[] => {
    return pedidos.filter(pedido => pedido.clienteId === clienteId);
}