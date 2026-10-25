import { adicionaItemCarrinho, mostraTotalCarrinho, removeItemCarrinho } from "./carrinho";
import { cadastraCliente, exibeClientes } from "./clientes";
import { exibePedidos, finalizaPedido } from "./pedidos";
import { cadastraProduto, exibeProdutos, removeProduto } from "./produtos";

exibeProdutos();

cadastraProduto("Relógio", "Eletrônicos", 500, 8);

cadastraProduto("Jaqueta", "Roupas", -1, 12);

exibeProdutos();

removeProduto(2);

exibeProdutos();

exibeProdutos();

cadastraCliente("Luiz Fernando", "luiz.fernando@example.com");

exibeClientes();

adicionaItemCarrinho(5, 1, 2);

adicionaItemCarrinho(5, 2, 1);

removeItemCarrinho(5, 1, 1);

adicionaItemCarrinho(5, 3, 3);

mostraTotalCarrinho(5);

finalizaPedido(5);

exibeProdutos();

exibePedidos();