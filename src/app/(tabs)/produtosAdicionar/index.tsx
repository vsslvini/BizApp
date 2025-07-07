import { View, Text, StyleSheet, Button, Pressable, TouchableOpacity } from "react-native";
import { useFocusEffect } from "expo-router";
import { useHeaderOptions } from "@/contexts/contextCustomHeader";
import { useRouter } from "expo-router";
import React from "react";

export default function AdicionarProduto() {
    const { setHeaderOptions } = useHeaderOptions();
    const router = useRouter();

    useFocusEffect(
        React.useCallback(() => {
            // Define as opções do header para a tela de "Adicionar Produto"
            setHeaderOptions({
                title: "Novo Produto",
                gradientColors: ['#9533E6', '#BE185E'],
            });
        }, [])
    );

    return (
        <View style={styles.container}>
            <TouchableOpacity>
                <Text>Tela de Adicionar Produto</Text>
            </TouchableOpacity>


      
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