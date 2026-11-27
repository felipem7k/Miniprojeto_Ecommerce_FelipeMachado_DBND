import { adicionaItemCarrinho, atualizaItemCarrinho, mostraTotalCarrinho, removeItemCarrinho } from "./carrinho";
import { buscaClientePorId, cadastraCliente, exibeClientes } from "./clientes";
import { initDatabase } from "./database";
import { exibePedidos, exibePedidosPorClienteId, finalizaPedido } from "./pedidos";
import { atualizaProduto, buscaProdutoPorId, buscaProdutosPorCategoria, buscaProdutosPorNome, cadastraProduto, exibeProdutos, removeProduto } from "./produtos";
import { exibeProdutosMaisVendidos, exibeResumoVendas } from "./relatorios";


async function main() {
    await initDatabase();

    console.log("Database iniciado!");

    const cliante1 = await cadastraCliente("João Pedro", "joaop@mail.com", "98765433100");
    if (cliante1) {
        console.log(`Cliente cadastrado: ${cliante1.nome} (ID: ${cliante1.id})`);
    }
}

main().then(() => {
    console.log("\n===== EXECUÇÃO FINALIZADA =====");
}).catch((error) => {
    console.error("Erro durante a execução:", error);
});