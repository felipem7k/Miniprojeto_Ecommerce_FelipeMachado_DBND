import { clientes } from "./dados";
import { Cliente } from "./types";
import { sanitizar } from "./uteis";

const pegaIndexCliente = (clienteId: number): number | undefined => clientes.findIndex(cliente => cliente.id === clienteId);

const verificaNome = (nome: string): boolean => {
    const nomeSanitizado = sanitizar(nome);

    if (nomeSanitizado.length < 3) {
        return false;
    }

    return true;
};

export const cadastraCliente = (cliente: Cliente): boolean => {
    const index = pegaIndexCliente(cliente.id);

    if (index !== -1) {
        console.log(`[ERRO AO CADASTRAR]: Cliente com ID ${cliente.id} já existe.`);
        return false;
    }

    if (!verificaNome(cliente.nome)) {
        console.log(`[ERRO AO CADASTRAR]: Nome do cliente "${cliente.nome}" é inválido. Deve ter pelo menos 3 caracteres.`);
        return false;
    }

    clientes.push(cliente);
    return true;
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

export const buscaClientesPorNome = (nome: string): Cliente | undefined => {
    return clientes.find(cliente => sanitizar(cliente.nome) === sanitizar(nome));
}