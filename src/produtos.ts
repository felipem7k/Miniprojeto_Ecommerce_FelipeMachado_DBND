import { produtos } from "./dados";
import { Categoria, Produto } from "./types";
import { sanitizar } from "./uteis";

const pegaIndexProduto = (produtoId: number): number | undefined => produtos.findIndex(produto => produto.id === produtoId);

const verificaNome = (nome: string): boolean => {
    const nomeSanitizado = sanitizar(nome);

    if (nomeSanitizado.length < 3) {
        return false;
    }

    return true;
};

export const cadastraProduto = (produto: Produto): boolean => {
    const index = pegaIndexProduto(produto.id);

    if (index !== -1) {
        console.log(`[ERRO AO CADASTRAR]: Produto com ID ${produto.id} já existe.`);
        return false;
    }

    if (!verificaNome(produto.nome)) {
        console.log(`[ERRO AO CADASTRAR]: Nome do produto "${produto.nome}" é inválido. Deve ter pelo menos 3 caracteres.`);
        return false;
    }

    if (buscaProdutosPorNome(produto.nome)) {
        console.log(`[ERRO AO CADASTRAR]: Produto com nome "${produto.nome}" já existe.`);
        return false;
    }

    if (produto.preco <= 0) {
        console.log(`[ERRO AO CADASTRAR]: Preço do produto "${produto.nome}" é inválido. Deve ser maior que 0.`);
        return false;
    }

    if (produto.estoque < 0) {
        console.log(`[ERRO AO CADASTRAR]: Estoque do produto "${produto.nome}" é inválido. Não pode ser negativo.`);
        return false;
    }

    if (!produto.categoria) {
        console.log(`[ERRO AO CADASTRAR]: Categoria do produto "${produto.nome}" é inválida. Deve ser informada.`);
        return false;
    }

    produtos.push(produto);
    return true;
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

    if (!index) {
        console.log(`[ERRO AO ATUALIZAR]: Produto com ID ${produto.id} não encontrado.`);
        return false;
    }

    produtos[index] = produto;
    return true;
}

export const removeProduto = (produtoId: number): boolean => {
    const index = pegaIndexProduto(produtoId);

    if (!index) {
        console.log(`[ERRO AO REMOVER]: Produto com ID ${produtoId} não encontrado.`);
        return false;
    }

    produtos.splice(index, 1);

    return true;
}