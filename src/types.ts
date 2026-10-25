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

export type Carrinho = {
    clienteId: number;
    itens: ItemCarrinho[];
}

export type ItemCarrinho = {
    produtoId: number;
    quantidade: number;
}

export type ItemPedido = {
    produtoId: number;
    quantidade: number;
    precoUnitario: number;
}

export type Pedido = {
    id: number;
    clienteId: number;
    itens: ItemPedido[];
    total: number;
    data: Date;
}