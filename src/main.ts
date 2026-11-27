import { buscaClientePorEmail, buscaClientePorId, buscaClientesPorNome, cadastraCliente, deletaCliente, exibeClientes } from "./clientes";
import { initDatabase } from "./database";
import { finalizaPedido } from "./pedidos";


async function main() {
    await initDatabase();

    console.log("Database iniciado!");

    await finalizaPedido(1, 1, [
        {
            produtoId: 1,
            quantidade: 2,
            precoUnitario: 100
        },
        {
            produtoId: 2,
            quantidade: 1,
            precoUnitario: 200
        }
    ]);
}

main().then(() => {
    console.log("\nExecução finalizada!");
    process.exit(0);
}).catch(console.error);