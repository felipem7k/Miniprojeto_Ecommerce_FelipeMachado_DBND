# Projeto E-commerce com Typescript

### Autor: Felipe Machado
### Turma: Desenvolvimento Back-end [Node] - T5M1

## Descrição e objetivo do projeto:

Sistema de Gerenciamento de E-commerce com TypeScript, capaz de administrar um catálogo de produtos, gerenciar compras e registrar pedidos, mantendo as informações consistentes durante a execução.

O projeto roda no terminal, sem páginas web, pagamento ou banco de dados. Os dados ficam em memória enquanto o programa executa.

## Funcionalidades implementadas:

**Produtos**
- Cadastrar, listar e exibir produtos.
- Buscar produto por ID.
- Buscar produtos pelo nome, aceitando parte do nome (ex.: `"cam"` encontra "Camiseta").
- Filtrar produtos por categoria.
- Atualizar e remover produtos.

**Clientes**
- Cadastrar, listar e exibir clientes.
- Buscar cliente por ID, por e-mail e por nome.

**Carrinho**
- Adicionar, remover e alterar a quantidade de itens.
- Exibir os itens com o subtotal de cada um e o total da compra.
- Limpar o carrinho.

**Pedidos**
- Finalizar a compra de um cliente, transformando o carrinho em pedido.
- Consultar todos os pedidos e os pedidos de um cliente.

**Relatórios**
- Resumo de vendas (quantidade de pedidos e total faturado).
- Produtos mais vendidos (quantidade e receita por produto).

## Tecnologias utilizadas:

- TypeScript;
- Node.js;

## Estrutura dos arquivos:

``` bash
├── src/ -- Código-fonte do projeto
│   carrinho.ts -- operações do carrinho e cálculos dos valores.
│   clientes.ts -- cadastro e consulta de clientes.
│   dados.ts -- dados da aplicação, incluindo produtos e clientes.
│   main.ts -- inicialização da aplicação e demonstração das funcionalidades.
│   pedidos.ts -- finalização e consulta de pedidos.
│   produtos.ts -- cadastro, consulta, atualização e remoção de produtos.
│   relatorios.ts -- funções de consolidação e apresentação dos resultados.
│   types.ts -- definição dos tipos utilizados pelo sistema.
│   uteis.ts -- funções utilitárias (geral).
└── dist/ -- Saída dos arquivos compilados
```

## Regras de negócio implementadas:

**Produtos**
- O ID é gerado automaticamente e nunca se repete.
- O nome deve ter pelo menos 3 caracteres e não pode repetir o nome de outro produto.
- O preço deve ser maior que 0.
- O estoque não pode ser negativo.
- A atualização de um produto passa pelas mesmas validações do cadastro.

**Clientes**
- O ID é gerado automaticamente e nunca se repete.
- O nome deve ter pelo menos 3 caracteres.
- O e-mail deve ter formato válido e não pode estar em uso por outro cliente.
- O sistema inicia com 4 clientes cadastrados.

**Carrinho**
- O cliente e o produto precisam existir.
- A quantidade deve ser maior que 0.
- Não é permitido ter no carrinho mais unidades do que o estoque disponível. Ao adicionar, a quantidade já presente no carrinho é somada à nova; ao alterar, a nova quantidade também é validada contra o estoque.
- Adicionar um produto que já está no carrinho soma a quantidade, sem criar uma linha duplicada.
- O subtotal é o preço unitário multiplicado pela quantidade, e o total é a soma dos subtotais.
- Remover uma quantidade igual ou maior que a existente retira o item do carrinho.

**Pedidos**
- O cliente precisa existir e o carrinho não pode estar vazio.
- O estoque de todos os itens é verificado antes de qualquer alteração. Se um item não tiver estoque suficiente, o pedido não é registrado e nenhum estoque é reduzido.
- O ID do pedido é gerado automaticamente e nunca se repete.
- Cada item do pedido guarda o preço unitário do momento da compra, então mudanças futuras no catálogo não alteram pedidos anteriores.
- Após o pedido ser registrado, o estoque é reduzido e o carrinho é esvaziado.

## Instruções de compilação e execução:

Tenha o [Node.js](https://nodejs.org) com npm instalado. Na pasta do projeto, execute:

```bash
npm ci
npm start
```

`npm ci` instala o TypeScript localmente na versão registrada no `package-lock.json`. `npm start` compila o projeto para `dist/` e executa `dist/main.js`.

Para apenas compilar, use `npm run build`.

## Exemplos das principais operações:

O arquivo `src/main.ts` executa todas as operações abaixo e mostra o resultado no terminal.

**Cadastro de um novo produto**
```ts
cadastraProduto("Relógio", "Eletrônicos", 500, 8);
// [INFO]: Produto "Relógio" cadastrado com sucesso!
```

**Atualização de um produto**
```ts
atualizaProduto({ ...relogio, preco: 450, estoque: 6 });
// [INFO]: Produto 5 atualizado com sucesso!
```

**Carrinho de compras**
```ts
adicionaItemCarrinho(1, 1, 2);
adicionaItemCarrinho(1, 3, 3);
atualizaItemCarrinho(1, { produtoId: 1, quantidade: 1 });
removeItemCarrinho(1, 3, 1);
mostraTotalCarrinho(1);
// ITEM: Celular (ID: 1) X 1: R$ 1500.00
// ITEM: Camiseta (ID: 3) X 2: R$ 100.00
// TOTAL: R$ 1600.00
```

**Registro de um novo pedido**
```ts
finalizaPedido(1);
// [INFO]: Pedido 1 finalizado com sucesso!
```

**Situação inválida (quantidade acima do estoque)**
```ts
adicionaItemCarrinho(2, 2, 100);
// [ERRO AO ADICIONAR CARRINHO]: estoque insuficiente para o produto 2! Estoque atual: 5, quantidade no carrinho: 0, quantidade solicitada: 100
```

**Relatórios**
```ts
exibeResumoVendas();
exibeProdutosMaisVendidos();
```

## Limitações conhecidas:

- Os dados ficam apenas em memória: ao encerrar o programa, tudo o que foi cadastrado é perdido.
- Não há autenticação, pagamento, frete, cupons de desconto ou cálculo de impostos.
- As categorias de produto são fixas: Eletrônicos, Roupas e Calçados.
- Remover um produto não verifica se ele está em algum carrinho. Pedidos já registrados mantêm o ID e o preço do produto, mas o nome deixa de aparecer nos relatórios ("Produto removido").
- Os IDs são gerados a partir do último ID da lista.
- As funções exibem mensagens com `console.log` em vez de lançar erros. Em caso de falha, a operação é cancelada e o motivo é impresso no terminal.
- Não há testes automatizados. A validação é feita pela demonstração do `main.ts`.
