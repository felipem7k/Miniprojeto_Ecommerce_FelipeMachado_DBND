import { produtos } from "./dados";
import { Categoria, Produto } from "./types";
import { sanitizar } from "./uteis";

const pegaIndexProduto = (produtoId: number): number => produtos.findIndex(produto => produto.id === produtoId);

const pegaUltimoIdProduto = (): number => produtos.length > 0 ? produtos[produtos.length - 1].id : 0;

const verificaNome = (nome: string): boolean => {
    const nomeSanitizado = sanitizar(nome);

    if (nomeSanitizado.length < 3) {
        return false;
    }

    return true;
};

export const cadastraProduto = (nome: string, categoria: Categoria, preco: number, estoque: number = 1): Produto | undefined => {
    const id = pegaUltimoIdProduto() + 1;

    const index = pegaIndexProduto(id);

    if (index !== -1) {
        console.log(`[ERRO AO CADASTRAR]: Produto com ID ${id} já existe.`);
        return;
    }

    if (!verificaNome(nome)) {
        console.log(`[ERRO AO CADASTRAR]: Nome do produto "${nome}" é inválido. Deve ter pelo menos 3 caracteres.`);
        return;
    }

    if (buscaProdutosPorNome(nome)) {
        console.log(`[ERRO AO CADASTRAR]: Produto com nome "${nome}" já existe.`);
        return;
    }

    if (preco <= 0) {
        console.log(`[ERRO AO CADASTRAR]: Preço do produto "${nome}" é inválido. Deve ser maior que 0.`);
        return;
    }

    if (estoque < 0) {
        console.log(`[ERRO AO CADASTRAR]: Estoque do produto "${nome}" é inválido. Não pode ser negativo.`);
        return;
    }

    if (!categoria) {
        console.log(`[ERRO AO CADASTRAR]: Categoria do produto "${nome}" é inválida. Deve ser informada.`);
        return;
    }

    const produto: Produto = {
        id,
        nome,
        categoria,
        preco,
        estoque
    }

    produtos.push(produto);

    return produto;
}

export const listaProdutos = (): Produto[] => {
    return produtos;
}

export const exibeProdutos = (): void => {
    for (const produto of produtos) {
        console.log(`
            ID: ${produto.id}
            Nome: ${produto.nome}
            Categoria: ${produto.categoria}
            Preço: R$ ${produto.preco}
            Estoque: ${produto.estoque}           
        `);

        console.log("--------------------------------------------------")
    }
}

export const buscaProdutoPorId = (id: number): Produto | undefined => {
    return produtos.find(produto => produto.id === id);
}

export const buscaProdutosPorNome = (nome: string): Produto | undefined => {
    return produtos.find(produto => sanitizar(produto.nome) === sanitizar(nome));
}

export const buscarProdutosPorCategoria = (categoria: Categoria): Produto[] => {
    return produtos.filter(produto => sanitizar(produto.categoria) === sanitizar(categoria));
}

export const atualizaProduto = (produto: Produto): boolean => {
    const index = pegaIndexProduto(produto.id);

    if (index === -1) {
        console.log(`[ERRO AO ATUALIZAR]: Produto com ID ${produto.id} não encontrado.`);
        return false;
    }

    produtos[index] = produto;
    return true;
}

export const removeProduto = (produtoId: number): boolean => {
    const index = pegaIndexProduto(produtoId);

    if (index === -1) {
        console.log(`[ERRO AO REMOVER]: Produto com ID ${produtoId} não encontrado.`);
        return false;
    }

    produtos.splice(index, 1);

    return true;
}

export const reduzEstoqueProduto = (produtoId: number, quantidade: number): boolean => {
    const index = pegaIndexProduto(produtoId);

    if (index === -1) {
        console.log(`[ERRO AO ATUALIZAR ESTOQUE]: Produto com ID ${produtoId} não encontrado.`);
        return false;
    }

    if (quantidade < 0) {
        console.log(`[ERRO AO ATUALIZAR ESTOQUE]: Quantidade inválida. Não pode ser negativa.`);
        return false;
    }

    if (produtos[index].estoque < quantidade) {
        console.log(`[ERRO AO ATUALIZAR ESTOQUE]: Produto com ID ${produtoId} não possui estoque suficiente.`);
        return false;
    }

    produtos[index].estoque -= quantidade;
    return true;
}