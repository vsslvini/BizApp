import { View, Text, StyleSheet, Button } from "react-native";
import { useRouter, useFocusEffect } from "expo-router";
import { useHeaderOptions } from "@/contexts/contextCustomHeader";
import React, { useEffect, useState } from "react";


import { colors, gradientes } from "@/utils/colors";

export default function Index() {
    const router = useRouter();
    const { setHeaderOptions } = useHeaderOptions();

    // useFocusEffect é ideal para isso. Ele roda toda vez que a tela ganha foco.
    useFocusEffect(
        React.useCallback(() => {
            // Define as opções do header para ESTA tela
            setHeaderOptions({
                title: "BizApp",
                gradientColors: gradientes.g1 , 
                nameIcon: "plus",
                nextPage: true,
                routerHeaderOptions: handleTeste
            });
        }, [])
    );

    const handleTeste = () => {
        router.push('/teste')
    }

    const handleNextPage = () => {
        // Ao navegar, a próxima tela vai definir suas próprias opções de header.
        router.push('/produtosAdicionar/')
    }


    return (
        <View style={styles.container}>
            <Text style={{ fontFamily: 'Roboto_700Bold' }}>Tela principal "Home"</Text>
            <Button title="Ir para Adicionar Produto" onPress={handleNextPage} />
            <Button title="Ir para Teste" onPress={handleTeste} />
        </View>

    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        gap: 16,
    }
})