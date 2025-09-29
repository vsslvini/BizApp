import { View, Button, Alert, StyleSheet } from "react-native";
import { useFocusEffect, useRouter } from "expo-router";
import React, { useState, useCallback } from "react";

import { useHeaderOptions } from "@/contexts/contextCustomHeader";
import { useClienteDataBase } from "@/storage/useClienteDataBase";
import { gradientes } from "@/utils/colors";
import CustomImput from "@/components/customInput";

export default function AdicionarCliente() {
    const { setHeaderOptions } = useHeaderOptions();
    const router = useRouter();
    const clientDatabase = useClienteDataBase();

    const [nome, setNome] = useState("");
    const [email, setEmail] = useState("");
    const [telefone, setTelefone] = useState("");

    useFocusEffect(
        useCallback(() => {
            setHeaderOptions({
                title: "Adicionar Cliente",
                subTitleConfirm: false,
                gradientColors: gradientes.g3, // Pode ajustar a cor
                nextPage: false,
            });
        }, [])
    );

    async function handleCreate() {
        try {
            if (!nome.trim()) {
                return Alert.alert("Obrigatório", "O nome do cliente é obrigatório.");
            }

            await clientDatabase.create({
                nome: nome.trim(),
                email: email.trim(),
                telefone: telefone.trim()
            });

            Alert.alert("Sucesso!", "Cliente cadastrado com sucesso.");
            router.back(); // Volta para a tela anterior (lista de clientes)

        } catch (error) {
            console.log(error);
            Alert.alert("Erro", "Não foi possível cadastrar o cliente.");
        }
    }

    return (
        <View style={styles.container}>
            <CustomImput
                placeholder="Nome do Cliente *"
                onChangeText={setNome}
                value={nome}
            />
            <CustomImput
                placeholder="Email (opcional)"
                onChangeText={setEmail}
                value={email}
                keyboardType="email-address"
            />
            <CustomImput
                placeholder="Telefone (opcional)"
                onChangeText={setTelefone}
                value={telefone}
                keyboardType="phone-pad"
            />
            <Button title="Salvar Cliente" onPress={handleCreate} />
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
});
