import { useSQLiteContext } from "expo-sqlite"

export type ProductsDataBase = {
    id: number,
    nome: string,
    precoCusto: number,
    precoVenda: number,
    quantidadeEstoque: number
}

// A coluna se chama `quantidadeEstoque`, não `quantidadeEstoque`.

export function UseProductDataBase() {
    const database = useSQLiteContext()


    async function create(data: Omit<ProductsDataBase, "id">) {

        const statement = await database.prepareAsync(
            "INSERT INTO produtos (nome, precoCusto, precoVenda, quantidadeEstoque) VALUES ($nome, $precoCusto, $precoVenda, $quantidadeEstoque)"
        )
        try {

            const result = await statement.executeAsync({
                $nome: data.nome,
                $precoCusto: data.precoCusto,
                $precoVenda: data.precoVenda,
                $quantidadeEstoque: data.quantidadeEstoque
            })

            const insertdRowId = result.lastInsertRowId.toString()

            return { insertdRowId }

        } catch (error) {
            throw error
        } finally {
            // É uma boa prática finalizar o statement após o uso.
            await statement.finalizeAsync();
        }
    }

    async function searchByName(name: String) {
        try {
            const query = "SELECT * FROM produtos WHERE nome LIKE ?"
            const response = await database.getAllAsync<ProductsDataBase>(query, `%${name}%`)
            return response
        } catch (error) {
            throw error
        }

    }

    async function update(data: ProductsDataBase) {

        const statement = await database.prepareAsync(
            "UPDATE produtos SET nome = $nome, precoCusto = $precoCusto, precoVenda = $precoVenda, quantidadeEstoque = $quantidadeEstoque WHERE id = $id"
        )
        try {

            await statement.executeAsync({
                $id: data.id,
                $nome: data.nome,
                $precoCusto: data.precoCusto,
                $precoVenda: data.precoVenda,
                $quantidadeEstoque: data.quantidadeEstoque
            })

        } catch (error) {
            throw error
        } finally {
            // É uma boa prática finalizar o statement após o uso.
            await statement.finalizeAsync();
        }
    }

    async function remove(id: number) {
        const statement = await database.prepareAsync(
            "DELETE FROM produtos WHERE id = $id"
        )
        try {
            await statement.executeAsync({ $id: id })

        } catch (error) {
            throw error
        } finally {
            await statement.finalizeAsync();
        }
    }
    return { create, searchByName, update, remove }
}