// import { cadastraProduto, exibeProdutos, removeProduto } from "./produtos";

import { cadastraCliente, exibeClientes } from "./clientes";

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

cadastraCliente({
    id: 5,
    nome: "Luiz Fernando",
    email: "luiz.fernando@example.com"
});

exibeClientes();
