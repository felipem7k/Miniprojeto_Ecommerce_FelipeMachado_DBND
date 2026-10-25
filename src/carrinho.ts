import { buscaProdutoPorId } from "./produtos";
import { Carrinho, ItemCarrinho } from "./types"

const carrinhos: Carrinho[] = [];

const pegaIndexDoItem = (carrinho: Carrinho, produtoId: number): number => carrinho.itens.findIndex(item => item.produtoId === produtoId);

export const buscaItemNoCarrinho = (carrinho: Carrinho, produtoId: number): ItemCarrinho | undefined => {
    return carrinho.itens.find(item => item.produtoId === produtoId);
}

export const pegaCarrinhoPorClienteId = (clienteId: number): Carrinho | undefined => {
    return carrinhos.find(carrinho => carrinho.clienteId === clienteId);
}

export const adicionaItemCarrinho = (clienteId: number, produtoId: number, quantidade: number): void => {
    if (quantidade <= 0) {
        console.log("[ERRO AO ADICIONAR CARRINHO]: quantidade deve ser maior que 0!");
        return;
    }

    if (produtoId <= 0) {
        console.log("[ERRO AO ADICIONAR CARRINHO]: produtoId deve ser maior que 0!");
        return;
    }

    if (buscaProdutoPorId(produtoId) === undefined) {
        console.log(`[ERRO AO ADICIONAR CARRINHO]: produtoId ${produtoId} não existe!`);
        return;
    }

    let carrinho = pegaCarrinhoPorClienteId(clienteId);

    if (!carrinho) {
        carrinho = {
            clienteId: clienteId,
            itens: []
        };
        carrinhos.push(carrinho);
        console.log(`[INFO]: Carrinho criado para o cliente ${clienteId}!`);
    }

    const item: ItemCarrinho = {
        produtoId,
        quantidade
    };

    const index = pegaIndexDoItem(carrinho, item.produtoId);

    const produto = buscaProdutoPorId(item.produtoId);

    if (!produto) {
        console.log(`[ERRO AO ADICIONAR CARRINHO]: produtoId ${item.produtoId} não existe!`);
        return;
    }

    const quantidadeNoCarrinho = index !== -1 ? carrinho.itens[index].quantidade : 0;

    if (produto.estoque < quantidadeNoCarrinho + item.quantidade) {
        console.log(`[ERRO AO ADICIONAR CARRINHO]: estoque insuficiente para o produto ${item.produtoId}! Estoque atual: ${produto.estoque}, quantidade no carrinho: ${quantidadeNoCarrinho}, quantidade solicitada: ${item.quantidade}`);
        return;
    }

    if (index !== -1) {
        carrinho.itens[index].quantidade += item.quantidade;
    } else {
        carrinho.itens.push(item);
    }

    console.log(`[INFO]: Item ${item.produtoId} adicionado ao carrinho!`);
}

export const removeItemCarrinho = (clienteId: number, produtoId: number, quantidade: number = 1): void => {
    if (quantidade <= 0) {
        console.log("[ERRO AO REMOVER CARRINHO]: quantidade deve ser maior que 0!");
        return;
    }

    if (produtoId <= 0) {
        console.log("[ERRO AO REMOVER CARRINHO]: produtoId deve ser maior que 0!");
        return;
    }

    const carrinho = pegaCarrinhoPorClienteId(clienteId);

    if (!carrinho) {
        console.log(`[ERRO AO REMOVER CARRINHO]: carrinho do cliente ${clienteId} não encontrado!`);
        return;
    }

    const index = pegaIndexDoItem(carrinho, produtoId);

    if (index !== -1) {
        if (carrinho.itens[index].quantidade > quantidade) {
            carrinho.itens[index].quantidade -= quantidade;
            console.log(`[INFO]: Quantidade do item ${produtoId} reduzida em ${quantidade}!`);
        } else {
            carrinho.itens.splice(index, 1);
            console.log(`[INFO]: Item ${produtoId} removido do carrinho!`);
        }
    } else {
        console.log(`[ERRO AO REMOVER CARRINHO]: item ${produtoId} não encontrado no carrinho!`);
    }
}

export const atualizaItemCarrinho = (clienteId: number, item: ItemCarrinho): void => {
    if (item.quantidade <= 0) {
        console.log("[ERRO AO ATUALIZAR CARRINHO]: quantidade deve ser maior que 0!");
        return;
    }

    if (item.produtoId <= 0) {
        console.log("[ERRO AO ATUALIZAR CARRINHO]: produtoId deve ser maior que 0!");
        return;
    }

    const carrinho = pegaCarrinhoPorClienteId(clienteId);

    if (!carrinho) {
        console.log(`[ERRO AO ATUALIZAR CARRINHO]: carrinho do cliente ${clienteId} não encontrado!`);
        return;
    }

    const index = pegaIndexDoItem(carrinho, item.produtoId);
    if (index !== -1) {
        const produto = buscaProdutoPorId(item.produtoId);

        if (!produto) {
            console.log(`[ERRO AO ATUALIZAR CARRINHO]: produtoId ${item.produtoId} não existe!`);
            return;
        }

        if (produto.estoque < item.quantidade) {
            console.log(`[ERRO AO ATUALIZAR CARRINHO]: estoque insuficiente para o produto ${item.produtoId}! Estoque atual: ${produto.estoque}, quantidade solicitada: ${item.quantidade}`);
            return;
        }

        carrinho.itens[index].quantidade = item.quantidade;
        console.log(`[INFO]: Item ${item.produtoId} atualizado no carrinho!`);
    } else {
        console.log(`[ERRO AO ATUALIZAR CARRINHO]: item ${item.produtoId} não encontrado no carrinho!`);
    }
}

export const limpaCarrinho = (clienteId: number): boolean => {
    const carrinho = pegaCarrinhoPorClienteId(clienteId);

    if (!carrinho) {
        console.log(`[ERRO AO LIMPAR CARRINHO]: carrinho do cliente ${clienteId} não encontrado!`);
        return false;
    }

    carrinho.itens = [];
    console.log(`[INFO]: Carrinho do cliente ${clienteId} limpo!`);
    return true;
}

const calculaSubtotalItem = (item: ItemCarrinho): number => {
    return item.quantidade * (buscaProdutoPorId(item.produtoId)?.preco || 0);
}

export const calculaTotalCarrinho = (clienteId: number): number => {
    const carrinho = pegaCarrinhoPorClienteId(clienteId);
    if (!carrinho) {
        return 0;
    }
    let total = 0;
    for (const item of carrinho.itens) {
        total += calculaSubtotalItem(item);
    }
    return total;
}

export const mostraTotalCarrinho = (clienteId: number): void => {
    const carrinho = pegaCarrinhoPorClienteId(clienteId);

    if (!carrinho) {
        console.log(`[ERRO]: Carrinho do cliente ${clienteId} não encontrado!`);
        return;
    }

    if (carrinho.itens.length === 0) {
        console.log("[INFO]: Carrinho vazio!");
        return;
    }

    console.log(`Subtotal do Carrinho do Cliente ${clienteId}:`);

    console.log("--------------------------------------------------");
    for (const item of carrinho.itens) {
        const produto = buscaProdutoPorId(item.produtoId);
        if (!produto) {
            console.log(`[ERRO]: Produto com ID ${item.produtoId} não encontrado!`);
            continue;
        }
        const subtotal = calculaSubtotalItem(item);
        console.log(`ITEM: ${produto.nome} (ID: ${item.produtoId}) X ${item.quantidade}: R$ ${subtotal.toFixed(2)}`);
    }
    console.log("--------------------------------------------------");

    const total = calculaTotalCarrinho(clienteId);
    console.log(`TOTAL: R$ ${total.toFixed(2)}`);
}