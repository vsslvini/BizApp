import { View, Text, StyleSheet, FlatList } from "react-native";
import { useFocusEffect } from "expo-router";
import { useHeaderOptions } from "@/contexts/contextCustomHeader";
import { useRouter } from "expo-router";
import React, { useState } from "react";

import { colors, gradientes } from "@/utils/colors";
import { ProductsDataBase, UseProductDataBase } from "@/storage/useProductDataBase";

import { Produto } from "@/components/produto";

export default function Estoque() {
    const productDatabase = UseProductDataBase();
    const { setHeaderOptions } = useHeaderOptions();
    const router = useRouter();

    const [search, setSearch] = useState("");
    const [products, setProducts] = useState<ProductsDataBase[]>([]);

    useFocusEffect(
        React.useCallback(() => {
            // Define as opções do header para a tela de "Adicionar Produto"
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
            {/* <Text style={{ fontFamily: 'Roboto_700Bold', marginBottom: 12 }}>Tela principal "Home"</Text> */}
            <FlatList
                data={products}
                keyExtractor={(item) => String(item.id)}
                renderItem={({ item }) => <Produto data={item} />}
                contentContainerStyle={{gap: 16}}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    }
})