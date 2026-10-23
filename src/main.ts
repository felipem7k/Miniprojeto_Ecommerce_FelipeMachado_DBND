// import { cadastraProduto, exibeProdutos, removeProduto } from "./produtos";

import { adicionaItemCarrinho, calculaTotalCarrinho, mostraTotalCarrinho, pegaCarrinhoPorClienteId, removeItemCarrinho } from "./carrinho";
import { cadastraCliente, exibeClientes } from "./clientes";
import { exibePedidos, finalizaPedido } from "./pedidos";
import { exibeProdutos } from "./produtos";

// exibeProdutos();

// cadastraProduto({
//     id: 5,
//     nome: "Relógio",
//     categoria: "Eletrônicos",
//     preco: 500,
//     estoque: 8
// });

// cadastraProduto({
//     id: 6,
//     nome: "Jaqueta",
//     categoria: "Roupas",
//     preco: -1,
//     estoque: 12
// });

// exibeProdutos();

// removeProduto(2);

// exibeProdutos();

exibeProdutos();

cadastraCliente({
    id: 5,
    nome: "Luiz Fernando",
    email: "luiz.fernando@example.com"
});

exibeClientes();

adicionaItemCarrinho(5, {
    produtoId: 1,
    quantidade: 2
});

adicionaItemCarrinho(5, {
    produtoId: 2,
    quantidade: 1
});

removeItemCarrinho(5, 1, 1);

adicionaItemCarrinho(5, {
    produtoId: 3,
    quantidade: 3
});

mostraTotalCarrinho(5);

const carrinho = pegaCarrinhoPorClienteId(5);

if (carrinho) {
    finalizaPedido({
        id: 1,
        clienteId: 5,
        itens: carrinho.itens || [],
        total: calculaTotalCarrinho(carrinho) || 0,
        data: new Date()
    });
}

exibeProdutos();

exibePedidos();