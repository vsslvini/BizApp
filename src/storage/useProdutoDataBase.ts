import { useSQLiteContext } from "expo-sqlite";
import type { ProdutoDataBase } from "./types";

// --- HOOK PARA PRODUTOS ---

export function useProdutoDataBase() {
    const database = useSQLiteContext();

    async function create(data: Omit<ProdutoDataBase, "id">) {
        const statement = await database.prepareAsync(
            "INSERT INTO produtos (nome, precoCusto, precoVenda, quantidadeEstoque) VALUES ($nome, $precoCusto, $precoVenda, $quantidadeEstoque)"
        );
        try {
            const result = await statement.executeAsync({
                $nome: data.nome,
                $precoCusto: data.precoCusto,
                $precoVenda: data.precoVenda,
                $quantidadeEstoque: data.quantidadeEstoque
            });
            return result.lastInsertRowId;
        } finally {
            await statement.finalizeAsync();
        }
    }

    async function update(data: ProdutoDataBase) {
        const statement = await database.prepareAsync(
            "UPDATE produtos SET nome = $nome, precoCusto = $precoCusto, precoVenda = $precoVenda, quantidadeEstoque = $quantidadeEstoque WHERE id = $id"
        );
        try {
            await statement.executeAsync({
                $id: data.id,
                $nome: data.nome,
                $precoCusto: data.precoCusto,
                $precoVenda: data.precoVenda,
                $quantidadeEstoque: data.quantidadeEstoque
            });
        } finally {
            await statement.finalizeAsync();
        }
    }

    async function remove(id: number) {
        const statement = await database.prepareAsync("DELETE FROM produtos WHERE id = $id");
        try {
            await statement.executeAsync({ $id: id });
        } finally {
            await statement.finalizeAsync();
        }
    }

    async function searchByName(name: string) {
        const query = "SELECT * FROM produtos WHERE nome LIKE ?";
        return await database.getAllAsync<ProdutoDataBase>(query, `%${name}%`);
    }

    async function all() {
        return await database.getAllAsync<ProdutoDataBase>("SELECT * FROM produtos ORDER BY nome ASC");
    }

    return { create, update, remove, searchByName, all };
}
