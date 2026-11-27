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

    if (await buscaClientePorEmail(email)) {
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

export const deletaCliente = async (id: number): Promise<boolean> => {
    const result = await pool.query('DELETE FROM cliente WHERE id_cliente = $1', [id]);
    return (result.rowCount || 0) > 0;
}

export const listaClientes = async (): Promise<Cliente[]> => {
    const resultado = await pool.query<DbCliente>('SELECT * FROM cliente');

    return resultado.rows.map(formataCliente);
}

export const exibeClientes = async (): Promise<void> => {
    const clientes = await listaClientes();
    for (const cliente of clientes) {
        console.log(`
            ID: ${cliente.id}
            Nome: ${cliente.nome}
            Email: ${cliente.email}
        `);

        console.log("--------------------------------------------------")
    }
}

export const buscaClientePorId = async (id: number): Promise<Cliente | undefined> => {
    const lista = await pool.query(
        'SELECT * FROM cliente WHERE id_cliente = $1',
        [id]
    );

    if (lista.rowCount === 0) {
        return
    }

    return formataCliente(lista.rows[0]);
}


export const buscaClientesPorNome = async (nome: string): Promise<Cliente | undefined> => {
    const lista = await pool.query(
        'SELECT * FROM cliente WHERE nome = $1',
        [nome]
    );

    if (lista.rowCount === 0) {
        return
    }

    return formataCliente(lista.rows[0]);
}

export const buscaClientePorEmail = async (email: string): Promise<Cliente | undefined> => {
    const lista = await pool.query(
        'SELECT * FROM cliente WHERE email = $1',
        [email]
    );

    if (lista.rowCount === 0) {
        return
    }

    return formataCliente(lista.rows[0]);
}