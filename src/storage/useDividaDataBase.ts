import { useSQLiteContext } from "expo-sqlite";
import type { DividaDataBase } from "./types";

// --- HOOK PARA DÍVIDAS ---

export function useDividaDataBase() {
    const database = useSQLiteContext();

    async function allPendentes() {
        const query = `
            SELECT d.*, c.nome as nomeCliente FROM dividasPendencias d 
            JOIN clientes c ON d.clienteId = c.id 
            WHERE d.status = 0 ORDER BY d.dataRegistro DESC;
        `;
        return await database.getAllAsync<DividaDataBase>(query);
    }

    async function findByCliente(clienteId: number) {
        return await database.getAllAsync<DividaDataBase>(
            "SELECT * FROM dividasPendencias WHERE clienteId = ? AND status = 0",
            [clienteId]
        );
    }

    async function quitar(dividaId: number) {
        const dataPagamento = new Date().toISOString();
        const statement = await database.prepareAsync(
            "UPDATE dividasPendencias SET status = 1, dataPagamento = $dataPagamento WHERE id = $id"
        );
        try {
            await statement.executeAsync({ $id: dividaId, $dataPagamento: dataPagamento });
        } finally {
            await statement.finalizeAsync();
        }
    }

    return { allPendentes, findByCliente, quitar };
}
