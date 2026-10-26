import { listaPedidos } from "./pedidos";
import { buscaProdutoPorId } from "./produtos";
import { ProdutoVendido, ResumoVendas } from "./types";

export const calculaResumoVendas = (): ResumoVendas => {
    const pedidos = listaPedidos();

    return {
        quantidadePedidos: pedidos.length,
        totalFaturado: pedidos.reduce((total, pedido) => total + pedido.total, 0)
    };
}

export const calculaProdutosMaisVendidos = (): ProdutoVendido[] => {
    const vendidos: ProdutoVendido[] = [];

    for (const pedido of listaPedidos()) {
        for (const item of pedido.itens) {
            const vendido = vendidos.find(produtoVendido => produtoVendido.produtoId === item.produtoId);

            if (vendido) {
                vendido.quantidade += item.quantidade;
                vendido.receita += item.quantidade * item.precoUnitario;
            } else {
                vendidos.push({
                    produtoId: item.produtoId,
                    quantidade: item.quantidade,
                    receita: item.quantidade * item.precoUnitario
                });
            }
        }
    }

    return vendidos.sort((a, b) => b.quantidade - a.quantidade);
}

export const exibeResumoVendas = (): void => {
    const resumo = calculaResumoVendas();

    console.log("RELATÓRIO: RESUMO DE VENDAS");
    console.log("--------------------------------------------------");
    console.log(`Pedidos realizados: ${resumo.quantidadePedidos}`);
    console.log(`Total faturado: R$ ${resumo.totalFaturado.toFixed(2)}`);
    console.log("--------------------------------------------------");
}

export const exibeProdutosMaisVendidos = (): void => {
    const vendidos = calculaProdutosMaisVendidos();

    console.log("RELATÓRIO: PRODUTOS MAIS VENDIDOS");
    console.log("--------------------------------------------------");

    if (vendidos.length === 0) {
        console.log("[INFO]: Nenhuma venda registrada!");
        console.log("--------------------------------------------------");
        return;
    }

    for (const vendido of vendidos) {
        const nome = buscaProdutoPorId(vendido.produtoId)?.nome || "Produto removido";
        console.log(`${nome} (ID: ${vendido.produtoId}) - Quantidade vendida: ${vendido.quantidade} - Receita: R$ ${vendido.receita.toFixed(2)}`);
    }

    console.log("--------------------------------------------------");
}
