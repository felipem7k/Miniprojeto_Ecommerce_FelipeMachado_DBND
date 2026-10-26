import { adicionaItemCarrinho, atualizaItemCarrinho, mostraTotalCarrinho, removeItemCarrinho } from "./carrinho";
import { buscaClientePorId, cadastraCliente, exibeClientes } from "./clientes";
import { buscaPedidosPorClienteId, exibePedidos, finalizaPedido } from "./pedidos";
import { atualizaProduto, buscaProdutoPorId, buscaProdutosPorCategoria, buscaProdutosPorNome, cadastraProduto, exibeProdutos, removeProduto } from "./produtos";
import { exibeProdutosMaisVendidos, exibeResumoVendas } from "./relatorios";

console.log("\n===== PRODUTOS =====");

exibeProdutos();

console.log("Busca por ID (1):");
console.log(buscaProdutoPorId(1));

console.log("Busca por nome (\"cam\"):");
console.log(buscaProdutosPorNome("cam"));

console.log("Busca por categoria (Eletrônicos):");
console.log(buscaProdutosPorCategoria("Eletrônicos"));

const relogio = cadastraProduto("Relógio", "Eletrônicos", 500, 8);

if (relogio) {
    atualizaProduto({
        ...relogio,
        preco: 450,
        estoque: 6 
    });

    atualizaProduto({
        ...relogio,
        preco: 0
    });

    removeProduto(relogio.id);
}

exibeProdutos();

console.log("\n===== CLIENTES =====");

cadastraCliente("Luiz Fernando", "luiz.fernando@example.com");

exibeClientes();

console.log("Busca por ID (1):");
console.log(buscaClientePorId(1));

console.log("\n===== CARRINHO =====");

adicionaItemCarrinho(1, 1, 2);

adicionaItemCarrinho(1, 3, 3);

atualizaItemCarrinho(1, {
    produtoId: 1,
    quantidade: 1
});

removeItemCarrinho(1, 3, 1);

mostraTotalCarrinho(1);

console.log("\n===== SITUAÇÕES INVÁLIDAS =====");

cadastraProduto("Jaqueta", "Roupas", -1, 12);

adicionaItemCarrinho(2, 2, 100);

cadastraCliente("Outro Joao", "joao@mail.com");

adicionaItemCarrinho(2, 1, 1);

removeItemCarrinho(2, 1, 1);

finalizaPedido(2);

console.log("\n===== PEDIDOS =====");

finalizaPedido(1);

adicionaItemCarrinho(4, 4, 2);

adicionaItemCarrinho(4, 3, 5);

finalizaPedido(4);

exibeProdutos();

exibePedidos();

console.log("Pedidos do cliente 1:");
console.log(buscaPedidosPorClienteId(1));

console.log("\n===== RELATÓRIOS =====");

exibeResumoVendas();

exibeProdutosMaisVendidos();
