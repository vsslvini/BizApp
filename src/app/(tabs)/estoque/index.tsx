import { View, Text, StyleSheet, FlatList, StatusBar } from "react-native";
import { useFocusEffect } from "expo-router";
import { useHeaderOptions } from "@/contexts/contextCustomHeader";
import { useRouter } from "expo-router";
import React, { useState } from "react";

import { colors, gradientes } from "@/utils/colors";
import { useProdutoDataBase } from "@/storage/useProdutoDataBase";
import type { ProdutoDataBase } from "@/storage/types";

import { Produto } from "@/components/cardProduto";
import CustomImput from "@/components/customInput";
import { styles } from "./styles"; // Importando do arquivo de estilos da tela

export default function Estoque() {
    const productDatabase = useProdutoDataBase();
    const { setHeaderOptions } = useHeaderOptions();
    const router = useRouter();

    const [search, setSearch] = useState("");
    const [products, setProducts] = useState<ProdutoDataBase[]>([]);

    useFocusEffect(
        React.useCallback(() => {
            setHeaderOptions({
                title: "Estoque",
                subTitleConfirm: false,
                nameIcon: "plus",
                gradientColors: gradientes.g2,
                nextPage: true,
                routerHeaderOptions: handleNextPage
            });
            list();
        }, [search])
    );

    const handleNextPage = () => {
        router.push('produtos/adicionar')
    }

    const handleEdit = (item: ProdutoDataBase) => {
        router.push({
            pathname: 'produtos/[id]',
            params: { ...item }
        });
    }

    async function list() {
        try {
            const response = await productDatabase.searchByName(search);
            setProducts(response);
        }
        catch (error) {
            console.log(error);
        }
    }

    return (
        <View style={styles.container}>
            <StatusBar barStyle="dark-content" />
            <Text style={styles.title}>Meus Produtos</Text>
            <CustomImput
                placeholder="Pesquisar..."
                onChangeText={setSearch}
                style={styles.searchInput} // Usando um estilo do arquivo
            />
            <FlatList
                data={products}
                keyExtractor={(item) => String(item.id)}
                renderItem={({ item }) => <Produto data={item} onPress={() => handleEdit(item)} />}
                contentContainerStyle={styles.listContainer}
                ItemSeparatorComponent={() => <View style={{ height: 16 }} />}
            />
        </View>
    )
}