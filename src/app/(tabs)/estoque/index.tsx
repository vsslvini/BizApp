import { View, Text, StyleSheet, FlatList } from "react-native";
import { useFocusEffect } from "expo-router";
import { useHeaderOptions } from "@/contexts/contextCustomHeader";
import { useRouter } from "expo-router";
import React, { useState } from "react";

import { colors, gradientes } from "@/utils/colors";
import { ProductsDataBase, UseProductDataBase } from "@/storage/useProductDataBase";

import { Produto } from "@/components/cardProduto";
import CustomImput from "@/components/customInput";

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
        }, [search]) // "search" é adicionado como dependência para atualizar a lista quando mudar
    );

    const handleNextPage = () => {
        router.push('produtos/adicionar')
    }

    const handleEdit = (item: ProductsDataBase) => {
        //router.push(`produtos/${item.id}`);
        // Expo Router converte todos os parâmetros para string, então é bom garantir que sejam passados assim.
        router.push({
            pathname: 'produtos/[id]',
            params: {
                id: item.id,
                nome: item.nome,
                precoCusto: item.precoCusto,
                precoVenda: item.precoVenda,
                quantidadeEstoque: item.quantidadeEstoque,
            }
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
            {/* <Text style={{ fontFamily: 'Roboto_700Bold', marginBottom: 12 }}>Tela principal "Home"</Text> */}
            <CustomImput placeholder="Pesquisar" onChangeText={setSearch} />
            <FlatList
                data={products}
                keyExtractor={(item) => String(item.id)}
                renderItem={({ item }) => <Produto data={item} onPress={() => handleEdit(item)} />}
                contentContainerStyle={{ gap: 16 }}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        maxHeight: "92%"
    }
})