import { View, Text, StyleSheet, Button, Pressable, TouchableOpacity } from "react-native";
import { useFocusEffect } from "expo-router";
import { useHeaderOptions } from "@/contexts/contextCustomHeader";
import { useRouter } from "expo-router";
import React from "react";

import { colors, gradientes } from "@/utils/colors";

export default function Vendas() {
    const { setHeaderOptions } = useHeaderOptions();
    const router = useRouter();

    useFocusEffect(
        React.useCallback(() => {
            // Define as opções do header para a tela de "Adicionar Produto"
            setHeaderOptions({
                title: "Novo Produto",
                subTitleConfirm: false,
                gradientColors: gradientes.g3,
                nextPage: false,
            });
        }, [])
    );

    return (
        <View style={styles.container}>
            <TouchableOpacity>
                <Text>Tela de Produto</Text>
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