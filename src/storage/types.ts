// --- TIPOS (TYPESCRIPT) ---
// Centralizamos os tipos aqui para facilitar a importação em múltiplos hooks.

export type ProdutoDataBase = {
    id: number;
    nome: string;
    precoCusto: number;
    precoVenda: number;
    quantidadeEstoque: number;
};

export type ClienteDataBase = {
    id: number;
    nome: string;
    email: string | null;
    telefone: string | null;
};

// Tipo para os dados que a função de criar venda espera.
export type VendaPayload = {
    valorTotal: number;
    tipoPagamento: 'À Vista' | 'Fiado';
    clienteId: number | null;
    itens: Array<{
        produtoId: number;
        quantidade: number;
        precoUnitarioVenda: number;
    }>;
};

export type DividaDataBase = {
    id: number;
    clienteId: number;
    vendaId: number | null;
    valor: number;
    dataRegistro: string;
    dataPagamento: string | null;
    status: 0 | 1; // 0 = pendente, 1 = quitada
    descricao: string | null;
    // Campo extra que virá do JOIN na consulta
    nomeCliente?: string;
};
