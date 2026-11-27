export type Categoria = "Eletrônicos" | "Roupas" | "Calçados";

export type DbCliente = {
    id_cliente: number;
    nome: string;
    email: string;
    cpf: string;
    criado_em: Date;
}

export type Cliente = {
    id: number;
    nome: string;
    email: string;
    cpf: string;
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

export type ResumoVendas = {
    quantidadePedidos: number;
    totalFaturado: number;
}

export type ProdutoVendido = {
    produtoId: number;
    quantidade: number;
    receita: number;
}
