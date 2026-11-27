import { adicionaItemCarrinho, atualizaItemCarrinho, mostraTotalCarrinho, removeItemCarrinho } from "./carrinho";
import { buscaClientePorId, cadastraCliente, deletaCliente, exibeClientes } from "./clientes";
import { initDatabase } from "./database";
import { exibePedidos, exibePedidosPorClienteId, finalizaPedido } from "./pedidos";
import { atualizaProduto, buscaProdutoPorId, buscaProdutosPorCategoria, buscaProdutosPorNome, cadastraProduto, exibeProdutos, removeProduto } from "./produtos";
import { exibeProdutosMaisVendidos, exibeResumoVendas } from "./relatorios";


async function main() {
    await initDatabase();

    console.log("Database iniciado!");

    
    const cliante1 = await cadastraCliente("João Pedro", "joaope@mail.com", "98265433100");
    if (cliante1) {
        console.log(`Cliente cadastrado: ${cliante1.nome} (ID: ${cliante1.id})`);
        
        await deletaCliente(cliante1.id);
        
        console.log(`Cliente deletado: ${cliante1.nome} (ID: ${cliante1.id})`);
    }

    await exibeClientes();
}

main().then(() => {
    console.log("\nExecução finalizada!");
    process.exit(0);
}).catch(console.error);