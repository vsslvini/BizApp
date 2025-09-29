import { View, Text, StyleSheet, Button, Pressable, TouchableOpacity, Alert } from "react-native";
import { useFocusEffect } from "expo-router";
import { useHeaderOptions } from "@/contexts/contextCustomHeader";
import { useRouter } from "expo-router";
import React, { useState } from "react";

import { UseProductDataBase } from "@/storage/useProdutoDataBase";

import { colors, gradientes } from "@/utils/colors";
import CustomImput from "@/components/customInput";

export default function Vendas() {
    const { setHeaderOptions } = useHeaderOptions();
    const router = useRouter();

    const [id, setId] = useState("")
    const [nomeProduto, setNomeProduto] = useState("")
    const [custoProduto, setCustoProduto] = useState("")
    const [precoVenda, setPrecoVenda] = useState("")
    const [quantidadeEstoque, setQuantidadeEstoque] = useState("")
    const [qtdEstoqueMinimo, setQtdEstoqueMinimo] = useState("")
    const [produtos, setProdutos] = useState([])

    const productDatabase = UseProductDataBase();


    useFocusEffect(
        React.useCallback(() => {
            // Define as opções do header para a tela de "Adicionar Produto"
            setHeaderOptions({
                title: "Adicionar Produtos",
                subTitleConfirm: false,
                gradientColors: gradientes.g3,
                nextPage: false,
            });
        }, [])
    );


    async function create() {
        try {

            if (isNaN(Number(custoProduto)) || isNaN(Number(precoVenda)) || isNaN(Number(quantidadeEstoque))) {
                return Alert.alert("Formato inválido", "O Custo, Preço e Quantidade devem ser números")

            }


            const response = await productDatabase.create({ nome: nomeProduto, precoCusto: Number(custoProduto), precoVenda: Number(precoVenda), quantidadeEstoque: Number(quantidadeEstoque) })

            Alert.alert("Produto cadastrado com sucesso, ID" + response.insertdRowId)
            console
        }
        catch (error) {
            console.log(error)
        }
    }

    return (
        <View style={styles.container}>
            <CustomImput placeholder="Nome do Produto" onChangeText={setNomeProduto} value={nomeProduto} />
            <CustomImput placeholder="Custo do Produto" onChangeText={setCustoProduto} value={custoProduto} />
            <CustomImput placeholder="Preço da venda" onChangeText={setPrecoVenda} value={precoVenda} />
            <CustomImput placeholder="Quantidade em estoque" onChangeText={setQuantidadeEstoque} value={quantidadeEstoque} />
            <Button title="Salvar" onPress={create} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        padding: 36,
        gap: 16
    }
})