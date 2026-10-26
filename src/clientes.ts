import { clientes } from "./dados";
import { Cliente } from "./types";
import { sanitizar, validarEmail, verificarNome } from "./uteis";

const pegaUltimoIdCliente = (): number => clientes.length > 0 ? clientes[clientes.length - 1].id : 0;


export const cadastraCliente = (nome: string, email: string): Cliente | undefined => {
    const id = pegaUltimoIdCliente() + 1;

    if (!verificarNome(nome)) {
        console.log(`[ERRO AO CADASTRAR]: Nome do cliente "${nome}" é inválido. Deve ter pelo menos 3 caracteres.`);
        return;
    }

    if (!validarEmail(email)) {
        console.log(`[ERRO AO CADASTRAR]: Email do cliente "${email}" é inválido.`);
        return;
    }

    if (buscaClientePorEmail(email)) {
        console.log(`[ERRO AO CADASTRAR]: Cliente com email "${email}" já existe.`);
        return;
    }

    const cliente: Cliente = {
        id,
        nome,
        email
    };

    clientes.push(cliente);

    console.log(`[INFO]: Cliente "${cliente.nome}" cadastrado com sucesso!`);

    return cliente;
}

export const listaClientes = (): Cliente[] => {
    return clientes;
}

export const exibeClientes = (): void => {
    for (const cliente of clientes) {
        console.log(`
            ID: ${cliente.id}
            Nome: ${cliente.nome}
            Email: ${cliente.email}
        `);

        console.log("--------------------------------------------------")
    }
}

export const buscaClientePorId = (id: number): Cliente | undefined => {
    return clientes.find(cliente => cliente.id === id);
}


export const buscaClientesPorNome = (nome: string): Cliente[] => {
    return clientes.filter(cliente => sanitizar(cliente.nome) === sanitizar(nome));
}

export const buscaClientePorEmail = (email: string): Cliente | undefined => {
    return clientes.find(cliente => sanitizar(cliente.email) === sanitizar(email));
}