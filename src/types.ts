type Cliente = {
    id: number;
    nome: string;
    email: string;
}

type Produto = {
    id: number;
    nome: string;
    categoria: string;
    preco: number;
    estoque: number;
}

type ItemCarrinho = {
    produtoId: number;
    quantidade: number;
}

type Pedido = {
    id: number;
    clienteId: number;
    itens: ItemCarrinho[];
    total: number;
    data: Date;
}
