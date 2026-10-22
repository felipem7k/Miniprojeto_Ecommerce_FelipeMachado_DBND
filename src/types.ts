export type Categoria = "Eletrônicos" | "Roupas" | "Calçados";

export type Cliente = {
    id: number;
    nome: string;
    email: string;
}

export type Produto = {
    id: number;
    nome: string;
    categoria: Categoria;
    preco: number;
    estoque: number;
}

export type ItemCarrinho = {
    produtoId: number;
    quantidade: number;
}

export type Pedido = {
    id: number;
    clienteId: number;
    itens: ItemCarrinho[];
    total: number;
    data: Date;
}