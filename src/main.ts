import { buscaClientePorEmail, buscaClientePorId, buscaClientesPorNome, cadastraCliente, deletaCliente, exibeClientes } from "./clientes";
import { initDatabase } from "./database";


async function main() {
    await initDatabase();

    console.log("Database iniciado!");

    
    const cliente1 = await cadastraCliente("João Pedro", "joaoped@mail.com", "96565433100");
    if (cliente1) {
        console.log(`Cliente cadastrado: ${cliente1.nome} (ID: ${cliente1.id})`);
        
        // await deletaCliente(cliente1.id);
        // console.log(`Cliente deletado: ${cliente1.nome} (ID: ${cliente1.id})`);
    }

    const buscaPorId = await buscaClientePorId(1);
    if (buscaPorId) {
        console.log(`Cliente encontrado por ID: ${buscaPorId.nome} (ID: ${buscaPorId.id})`);
    } else {
        console.log("Cliente não encontrado por ID.");
    }

    const buscaPorNome = await buscaClientesPorNome("João Pedro");
    if (buscaPorNome) {
        console.log(`Cliente encontrado por nome: ${buscaPorNome.nome} (ID: ${buscaPorNome.id})`);
    } else {
        console.log("Cliente não encontrado por nome.");
    }

    const buscaPorEmail = await buscaClientePorEmail("joaope@mail.com");
    if (buscaPorEmail) {
        console.log(`Cliente encontrado por email: ${buscaPorEmail.nome} (ID: ${buscaPorEmail.id})`);
    } else {
        console.log("Cliente não encontrado por email.");
    }

    await exibeClientes();
    if (cliente1) {
        await deletaCliente(cliente1.id);
        console.log(`Cliente deletado: ${cliente1.nome} (ID: ${cliente1.id})`);
    }
}

main().then(() => {
    console.log("\nExecução finalizada!");
    process.exit(0);
}).catch(console.error);