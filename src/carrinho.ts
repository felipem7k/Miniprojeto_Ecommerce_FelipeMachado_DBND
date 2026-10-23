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

export const removeItemCarrinho = (produtoId: number): void => {
    if (produtoId < 0) {
        console.log("[ERRO AO REMOVER CARRINHO]: produtoId deve ser maior que 0!");
        return;
    }

    const index = pegaIndexDoItem(produtoId);

    if (index !== -1) {
        carrinho.splice(index, 1);
        console.log(`[INFO]: Item ${produtoId} removido do carrinho!`);
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
