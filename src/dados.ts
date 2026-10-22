import { Cliente, Produto } from "./types";

export const produtos: Produto[] = [
    {
        id: 1,
        nome: "Celular",
        categoria: "Eletrônicos",
        preco: 1500,
        estoque: 10
    },
    {
        id: 2,
        nome: "Notebook",
        categoria: "Eletrônicos",
        preco: 3000,
        estoque: 5
    },
    {
        id: 3,
        nome: "Camiseta",
        categoria: "Roupas",
        preco: 50,
        estoque: 20
    },
    {
        id: 4,
        nome: "Tênis",
        categoria: "Calçados",
        preco: 200,
        estoque: 15
    },
]

export const clientes: Cliente[] = [
    {
        id: 1,
        nome: "João Silva",
        email: "joao@mail.com"
    },
    {
        id: 2,
        nome: "Maria Souza",
        email: "maria@mail.com"
    },
    {
        id: 3,
        nome: "Pedro Santos",
        email: "pedro@mail.com"
    },
    {
        id: 4,
        nome: "Ana Oliveira",
        email: "ana@mail.com"
    },
]