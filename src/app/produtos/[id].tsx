import { View, StyleSheet, Button, Alert } from "react-native";
import { useRouter, useFocusEffect, useLocalSearchParams } from "expo-router";
import { useHeaderOptions } from "@/contexts/contextCustomHeader";
import React, { useEffect, useState } from "react";


import { gradientes } from "@/utils/colors";
import CustomImput from "@/components/customInput";

export default function EditarProduto() {
    const router = useRouter();
    const { setHeaderOptions } = useHeaderOptions();
    const params = useLocalSearchParams();

    // Estados para controlar os valores dos inputs
    const [nomeProduto, setNomeProduto] = useState("");
    const [custoProduto, setCustoProduto] = useState("");
    const [precoVenda, setPrecoVenda] = useState("");
    const [quantidadeEstoque, setQuantidadeEstoque] = useState("");

    // useFocusEffect é ideal para isso. Ele roda toda vez que a tela ganha foco.
    useFocusEffect(
        React.useCallback(() => {
            // Define as opções do header para ESTA tela
            setHeaderOptions({
                title: "Editar Produto",
                gradientColors: gradientes.g3,
            });
            console.log("Params recebidos:", params);
        }, [])
    );

    // Popula os estados com os dados do produto quando a tela é carregada
    useEffect(() => {
        // O `useLocalSearchParams` retorna valores que podem ser string, string[] ou undefined.
        // Garantimos que estamos trabalhando com strings.
        setNomeProduto(String(params.nome ?? ""));
        setCustoProduto(String(params.precoCusto ?? ""));
        setPrecoVenda(String(params.precoVenda ?? ""));
        setQuantidadeEstoque(String(params.quantidadeEstoque ?? ""));
    }, []);

    function handleSaveChanges() {
        // Aqui você implementaria a lógica para salvar as alterações,
        // por exemplo, chamando uma função do seu banco de dados.
        console.log("Salvando alterações:", { id: params.id, nomeProduto, custoProduto, precoVenda, quantidadeEstoque });
        Alert.alert("Sucesso", "Produto atualizado!");
        // Opcional: voltar para a tela anterior após salvar.
        // router.back();
    }

    return (
        <View style={styles.container}>
            <CustomImput placeholder="Nome do Produto" value={nomeProduto} onChangeText={setNomeProduto} />
            <CustomImput placeholder="Custo do Produto" value={custoProduto} onChangeText={setCustoProduto} keyboardType="numeric" />
            <CustomImput placeholder="Preço da venda" value={precoVenda} onChangeText={setPrecoVenda} keyboardType="numeric" />
            <CustomImput placeholder="Quantidade em estoque" value={quantidadeEstoque} onChangeText={setQuantidadeEstoque} keyboardType="numeric" />
            <Button title="Salvar Alterações" onPress={handleSaveChanges} />
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