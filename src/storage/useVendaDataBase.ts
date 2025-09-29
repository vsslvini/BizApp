import { useSQLiteContext } from "expo-sqlite";
import type { VendaPayload } from "./types";

// --- HOOK PARA VENDAS ---

export function useVendaDataBase() {
    const database = useSQLiteContext();

    /**
     * Registra uma nova venda usando uma transação para garantir a integridade dos dados.
     * Atualiza estoque e registra dívidas automaticamente.
     */
    async function create(data: VendaPayload) {
        const dataVenda = new Date().toISOString();

        await database.withTransactionAsync(async () => {
            // 1. Inserir na tabela 'vendas'
            const vendaResult = await database.runAsync(
                'INSERT INTO vendas (dataVenda, valorTotal, tipoPagamento, clienteId) VALUES (?, ?, ?, ?);',
                [dataVenda, data.valorTotal, data.tipoPagamento, data.clienteId]
            );
            const vendaId = vendaResult.lastInsertRowId;

            // 2. Inserir em 'itensVenda' e 3. Atualizar estoque (loop)
            for (const item of data.itens) {
                await database.runAsync(
                    'INSERT INTO itensVenda (vendaId, produtoId, quantidade, precoUnitarioVenda) VALUES (?, ?, ?, ?);',
                    [vendaId, item.produtoId, item.quantidade, item.precoUnitarioVenda]
                );
                await database.runAsync(
                    'UPDATE produtos SET quantidadeEstoque = quantidadeEstoque - ? WHERE id = ?;',
                    [item.quantidade, item.produtoId]
                );
            }

            // 4. Se for 'Fiado', registrar dívida
            if (data.tipoPagamento === 'Fiado' && data.clienteId) {
                await database.runAsync(
                    'INSERT INTO dividasPendencias (clienteId, vendaId, valor, dataRegistro, status, descricao) VALUES (?, ?, ?, ?, 0, ?);',
                    [data.clienteId, vendaId, data.valorTotal, dataVenda, `Dívida referente à venda #${vendaId}`]
                );
            }
        });
    }

    return { create };
}
