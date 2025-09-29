import { View, Text, FlatList, StatusBar } from "react-native";
import { useFocusEffect, useRouter } from "expo-router";
import React, { useState, useCallback } from "react";

import { useHeaderOptions } from "@/contexts/contextCustomHeader";
import { useClienteDataBase } from "@/storage/useClienteDataBase";
import type { ClienteDataBase } from "@/storage/types";
import { gradientes } from "@/utils/colors";

import { Cliente } from "@/components/cardCliente/index"; // Você precisará criar este componente, similar ao cardProduto
import CustomImput from "@/components/customInput";
import { styles } from "./styles";

export default function Clientes() {
    const clientDatabase = useClienteDataBase();
    const { setHeaderOptions } = useHeaderOptions();
    const router = useRouter();

    const [search, setSearch] = useState("");
    const [clientes, setClientes] = useState<ClienteDataBase[]>([]);

    // A função principal que carrega os clientes
    const listClients = useCallback(async () => {
        try {
            // Se houver texto na busca, pesquisa por nome, senão, busca todos
            const response = search.trim().length > 0
                ? await clientDatabase.searchByName(search)
                : await clientDatabase.all();

            // Lógica principal: se não houver clientes, navega para a tela de adicionar
            if (response.length === 0 && search.trim().length === 0) {
                router.push('clientes/adicionar');
            } else {
                setClientes(response);
            }
        } catch (error) {
            console.log(error);
        }
    }, [search]); // Recria a função se 'search' mudar

    useFocusEffect(
        useCallback(() => {
            setHeaderOptions({
                title: "Clientes",
                subTitleConfirm: false,
                nameIcon: "plus",
                gradientColors: gradientes.g2, // Pode ajustar a cor
                nextPage: true,
                routerHeaderOptions: handleNextPage
            });
            listClients(); // Executa a busca
        }, [listClients]) // Executa o efeito se listClients mudar
    );

    const handleNextPage = () => {
        router.push('clientes/adicionar');
    }

    const handleEdit = (item: ClienteDataBase) => {
        // Lógica para editar o cliente, similar à de produtos
        router.push({
            pathname: 'clientes/[id]', // Supondo que você criará uma tela de edição
            params: { ...item }
        });
    }

    return (
        <View style={styles.container}>
            <StatusBar barStyle="dark-content" />
            <Text style={styles.title}>Meus Clientes</Text>
            <CustomImput
                placeholder="Pesquisar cliente..."
                onChangeText={setSearch}
                value={search}
                style={styles.searchInput}
            />
            <FlatList
                data={clientes}
                keyExtractor={(item) => String(item.id)}
                // Você precisará de um componente <Cliente /> similar ao seu <Produto />
                renderItem={({ item }) => <Cliente data={item} onPress={() => handleEdit(item)} />}
                contentContainerStyle={styles.listContainer}
                ItemSeparatorComponent={() => <View style={{ height: 16 }} />}
            />
        </View>
    )
}
