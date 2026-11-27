import { clientes } from "./dados";
import { pool } from "./database";
import { Cliente, DbCliente } from "./types";
import { sanitizar, validarEmail, verificarNome } from "./uteis";

const formataCliente = (dbCliente: DbCliente): Cliente => {
    return {
        id: dbCliente.id_cliente,
        nome: dbCliente.nome,
        email: dbCliente.email,
        cpf: dbCliente.cpf
    };
}

export const cadastraCliente = async (nome: string, email: string, cpf: string): Promise<Cliente | undefined> => {
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

    const result = await pool.query<DbCliente>(
        'INSERT INTO cliente (nome, email, cpf) VALUES ($1, $2, $3) RETURNING *',
        [nome, email, cpf]
    );

    if (result.rowCount === 0) {
        console.log(`[ERRO AO CADASTRAR]: Não foi possível cadastrar o cliente "${nome}".`);
        return;
    }

    return formataCliente(result.rows[0]);
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