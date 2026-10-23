import { buscaProdutoPorId } from "./produtos";
import { ItemCarrinho } from "./types"

const carrinho: ItemCarrinho[] = [];

const pegaIndexDoItem = (produtoId: number): number => carrinho.findIndex(item => item.produtoId === produtoId);

export const buscaItemNoCarrinho = (produtoId: number): ItemCarrinho | undefined => {
    return carrinho.find(item => item.produtoId === produtoId);
}

export const adicionaItemCarrinho = (item: ItemCarrinho): void => {
    if (item.quantidade < 0) {
        console.log("[ERRO AO ADICIONAR CARRINHO]: quantidade deve ser 0 ou maior!");
        return;
    }

    if (item.produtoId < 0) {
        console.log("[ERRO AO ADICIONAR CARRINHO]: produtoId deve ser maior que 0!");
        return;
    }

    if (buscaProdutoPorId(item.produtoId) === undefined) {
        console.log(`[ERRO AO ADICIONAR CARRINHO]: produtoId ${item.produtoId} não existe!`);
        return;
    }

    const index = pegaIndexDoItem(item.produtoId);

    if (index !== -1) {
        carrinho[index].quantidade += item.quantidade;
    } else {
        carrinho.push(item);
    }

    console.log(`[INFO]: Item ${item.produtoId} adicionado ao carrinho!`);
}

export const removeItemCarrinho = (produtoId: number, quantidade: number = 1): void => {
    if (produtoId < 0) {
        console.log("[ERRO AO REMOVER CARRINHO]: produtoId deve ser maior que 0!");
        return;
    }

    const index = pegaIndexDoItem(produtoId);

    if (index !== -1) {
        if (carrinho[index].quantidade > quantidade) {
            carrinho[index].quantidade -= quantidade;
            console.log(`[INFO]: Quantidade do item ${produtoId} reduzida em ${quantidade}!`);
        } else {
            carrinho.splice(index, 1);
            console.log(`[INFO]: Item ${produtoId} removido do carrinho!`);
        }
    } else {
        console.log(`[ERRO AO REMOVER CARRINHO]: item ${produtoId} não encontrado no carrinho!`);
    }
}

export const atualizaItemCarrinho = (item: ItemCarrinho): void => {
    if (item.quantidade < 0) {
        console.log("[ERRO AO ATUALIZAR CARRINHO]: quantidade deve ser 0 ou maior!");
        return;
    }

    if (item.produtoId < 0) {
        console.log("[ERRO AO ATUALIZAR CARRINHO]: produtoId deve ser maior que 0!");
        return;
    }

    const index = pegaIndexDoItem(item.produtoId);

    if (index !== -1) {
        carrinho[index].quantidade = item.quantidade;
        console.log(`[INFO]: Item ${item.produtoId} atualizado no carrinho!`);
    } else {
        console.log(`[ERRO AO ATUALIZAR CARRINHO]: item ${item.produtoId} não encontrado no carrinho!`);
    }
}

const calculaSubtotalItem = (item: ItemCarrinho): number => {
    return item.quantidade * (buscaProdutoPorId(item.produtoId)?.preco || 0);
}

export const mostraTotalCarrinho = (): void => {
    if (carrinho.length === 0) {
        console.log("[INFO]: Carrinho vazio!");
        return;
    }

    let total = 0;
    console.log("Subtotal do Carrinho:");

    console.log("--------------------------------------------------");
    for (const item of carrinho) {
        const produto = buscaProdutoPorId(item.produtoId);
        if (!produto) {
            console.log(`[ERRO]: Produto com ID ${item.produtoId} não encontrado!`);
            continue;
        }
        const subtotal = calculaSubtotalItem(item);
        total += subtotal;
        console.log(`ITEM: ${produto.nome} (ID: ${item.produtoId}) X ${item.quantidade}: R$ ${subtotal.toFixed(2)}`);
    }
    console.log("--------------------------------------------------");

    console.log(`TOTAL: R$ ${total.toFixed(2)}`);
}