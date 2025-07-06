
import { type SQLiteDatabase } from "expo-sqlite"

export async function InitializeDb(database: SQLiteDatabase) {
  await database.execAsync(`
        CREATE TABLE IF NOT EXISTS produtos (
          id INTEGER PRIMARY KEY AUTOINCREMENT,  
          nome TEXT NOT NULL,
          precoCusto FLOAT NOT NULL,
          prcoVenda FLOAT NOT NULL,
          quantidadeEstoque INTEGER NOT NULL
        );
        CREATE TABLE IF NOT EXISTS clientes (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          nome TEXT NOT NULL,
          email TEXT,
          telefone TEXT,
          dividas TEXT
        );
        CREATE TABLE IF NOT EXISTS venda (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          dataVenda TEXT NOT NULL,
          valorTOTAL REAL NOT NULL,
          tipoPagamento TEXT NOT NULL,
          clienteId INTEGER,
          FOREIGN KEY (clienteId) REFERENCES clientes(id)
        );
        CREATE TABLE IF NOT EXISTS itensVenda (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          vendaId INTEGER NOT NULL,
          produtoId INTEGER NOT NULL,
          uantidade INTEGER NOT NULL,
          precoUnitarioVenda REAL NOT NULL,
          FOREIGN KEY (vendaId) REFERENCES vendas(id),
          FOREIGN KEY (produtoId) REFERENCES produtos(id)
        );
        CREATE TABLE IF NOT EXISTS dividasPendencias (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          clienteId INTEGER NOT NULL,
          valor REAL NOT NULL,
          dataRegistro TEXT NOT NULL,
          dataPagamento TEXT,
          status INTEGER NOT NULL DEFAULT 0,
          descricao TEXT,
          vendaId INTEGER,
          FOREIGN KEY (clienteId) REFERENCES clientes(id),
          FOREIGN KEY (vendaId) REFERENCES vendas(id)
        );
    `)
}