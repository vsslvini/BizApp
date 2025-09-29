import { useSQLiteContext } from "expo-sqlite";
import type { ClienteDataBase } from "./types";

// --- HOOK PARA CLIENTES ---

export function useClienteDataBase() {
    const database = useSQLiteContext();

    async function create(data: Omit<ClienteDataBase, "id">) {
        const statement = await database.prepareAsync(
            "INSERT INTO clientes (nome, email, telefone) VALUES ($nome, $email, $telefone)"
        );
        try {
            const result = await statement.executeAsync({
                $nome: data.nome,
                $email: data.email ?? null,
                $telefone: data.telefone ?? null,
            });
            return result.lastInsertRowId;
        } finally {
            await statement.finalizeAsync();
        }
    }

    async function update(data: ClienteDataBase) {
        const statement = await database.prepareAsync(
            "UPDATE clientes SET nome = $nome, email = $email, telefone = $telefone WHERE id = $id"
        );
        try {
            await statement.executeAsync({
                $id: data.id,
                $nome: data.nome,
                $email: data.email ?? null,
                $telefone: data.telefone ?? null,
            });
        } finally {
            await statement.finalizeAsync();
        }
    }

    async function remove(id: number) {
        const statement = await database.prepareAsync("DELETE FROM clientes WHERE id = $id");
        try {
            await statement.executeAsync({ $id: id });
        } finally {
            await statement.finalizeAsync();
        }
    }

    async function all() {
        return await database.getAllAsync<ClienteDataBase>("SELECT * FROM clientes ORDER BY nome ASC");
    }

    // FUNÇÃO QUE ESTAVA FALTANDO
    async function searchByName(name: string) {
        const query = "SELECT * FROM clientes WHERE nome LIKE ?";
        return await database.getAllAsync<ClienteDataBase>(query, `%${name}%`);
    }

    return { create, update, remove, all, searchByName }; // Adicionado searchByName ao retorno
}

