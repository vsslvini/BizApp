import { View, Text, StyleSheet, Button, Pressable, TouchableOpacity } from "react-native";
import { useFocusEffect } from "expo-router";
import { useHeaderOptions } from "@/contexts/contextCustomHeader";
import { useRouter } from "expo-router";
import React from "react";

export default function Estoque() {
    const { setHeaderOptions } = useHeaderOptions();
    const router = useRouter();

    useFocusEffect(
        React.useCallback(() => {
            // Define as opções do header para a tela de "Adicionar Produto"
            setHeaderOptions({
                title: "Novo Produto",
                subTitleConfirm: false,
                nameIcon: "plus",
                gradientColors: ['#5046E5', '#7E23CF'],
                nextPage: true,
            });
        }, [])
    );

    return (
        <View style={styles.container}>
            <TouchableOpacity>
                <Text>Estoques dos produtos</Text>
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