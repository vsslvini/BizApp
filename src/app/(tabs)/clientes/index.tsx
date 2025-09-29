import { View, Text, FlatList, StatusBar } from "react-native";
import { useFocusEffect, useRouter } from "expo-router";
import React, { useState, useCallback } from "react";

import { useHeaderOptions } from "@/contexts/contextCustomHeader";
import { useClienteDataBase } from "@/storage/useClienteDataBase";
import type { ClienteDataBase } from "@/storage/types";
import { gradientes } from "@/utils/colors";

import { Cliente } from "@/components/cardCliente";
import CustomImput from "@/components/customInput";
import { styles } from "./styles";

export default function Clientes() {
    const clientDatabase = useClienteDataBase();
    const { setHeaderOptions } = useHeaderOptions();
    const router = useRouter();

    const [search, setSearch] = useState("");
    const [clientes, setClientes] = useState<ClienteDataBase[]>([]);

    const listClients = useCallback(async () => {
        try {
            const response = search.trim().length > 0
                ? await clientDatabase.searchByName(search)
                : await clientDatabase.all();

            if (response.length === 0 && search.trim().length === 0) {
                router.push('clientes/adicionar');
            } else {
                setClientes(response);
            }
        } catch (error) {
            console.log(error);
        }
    }, [search]);

    useFocusEffect(
        useCallback(() => {
            setHeaderOptions({
                title: "Clientes",
                subTitleConfirm: false,
                nameIcon: "plus",
                gradientColors: gradientes.g4,
                nextPage: true,
                routerHeaderOptions: handleNextPage
            });
            listClients();
        }, [listClients])
    );

    const handleNextPage = () => {
        router.push('clientes/adicionar');
    }

    // AQUI ESTÁ A LÓGICA CORRETA PARA EDITAR
    // Passa todos os dados do cliente para a próxima tela
    const handleEdit = (item: ClienteDataBase) => {
        router.push({
            pathname: `clientes/${item.id}`, // Navega para a rota dinâmica
            params: { ...item } // Envia todos os dados do item como parâmetros
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
                // O onPress agora chama handleEdit, passando o item completo
                renderItem={({ item }) => <Cliente data={item} onPress={() => handleEdit(item)} />}
                contentContainerStyle={styles.listContainer}
                ItemSeparatorComponent={() => <View style={{ height: 16 }} />}
            />
        </View>
    )
}

