import { View, StyleSheet, Button, Alert } from "react-native";
import { useRouter, useFocusEffect, useLocalSearchParams } from "expo-router";
import React, { useEffect, useState, useCallback } from "react";

import { useHeaderOptions } from "@/contexts/contextCustomHeader";
import { useClienteDataBase } from "@/storage/useClienteDataBase";
import { gradientes } from "@/utils/colors";
import CustomImput from "@/components/customInput";

export default function EditarCliente() {
    const router = useRouter();
    const { setHeaderOptions } = useHeaderOptions();
    const params = useLocalSearchParams();
    const clientDatabase = useClienteDataBase();

    // Estados para controlar os valores dos inputs
    const [nome, setNome] = useState("");
    const [email, setEmail] = useState("");
    const [telefone, setTelefone] = useState("");

    // Configura o header da tela
    useFocusEffect(
        useCallback(() => {
            setHeaderOptions({
                title: "Editar Cliente",
                gradientColors: gradientes.g3, // Pode ajustar
            });
        }, [])
    );

    // Popula os estados com os dados do cliente recebidos via params
    useEffect(() => {
        if (params) {
            setNome(String(params.nome ?? ""));
            setEmail(String(params.email ?? ""));
            setTelefone(String(params.telefone ?? ""));
        }
    }, [params]);

    // Função para salvar as alterações
    async function handleUpdate() {
        try {
            if (!nome.trim()) {
                return Alert.alert("Obrigatório", "O nome do cliente não pode ficar em branco.");
            }

            await clientDatabase.update({
                id: Number(params.id),
                nome: nome.trim(),
                email: email.trim(),
                telefone: telefone.trim(),
            });

            Alert.alert("Sucesso", "Cliente atualizado!");
            router.back();

        } catch (error) {
            console.log(error);
            Alert.alert("Erro", "Não foi possível atualizar o cliente.");
        }
    }

    // Função para confirmar e excluir o cliente
    function handleDelete() {
        Alert.alert(
            "Confirmar Exclusão",
            `Tem certeza que deseja excluir o cliente "${nome}"? Esta ação não pode ser desfeita.`,
            [
                { text: "Cancelar", style: "cancel" },
                {
                    text: "Excluir",
                    style: "destructive",
                    onPress: async () => {
                        try {
                            await clientDatabase.remove(Number(params.id));
                            Alert.alert("Sucesso", "Cliente excluído!");
                            router.back();
                        } catch (error) {
                            console.log(error);
                            Alert.alert("Erro", "Não foi possível excluir o cliente.");
                        }
                    },
                },
            ]
        );
    }

    return (
        <View style={styles.container}>
            <CustomImput
                placeholder="Nome do Cliente"
                value={nome}
                onChangeText={setNome}
            />
            <CustomImput
                placeholder="Email (opcional)"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
            />
            <CustomImput
                placeholder="Telefone (opcional)"
                value={telefone}
                onChangeText={setTelefone}
                keyboardType="phone-pad"
            />
            <View style={styles.buttonContainer}>
                <Button title="Excluir Cliente" onPress={handleDelete} color="red" />
                <Button title="Salvar Alterações" onPress={handleUpdate} />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        padding: 36,
        gap: 16
    },
    buttonContainer: {
        marginTop: 24,
        flexDirection: 'row',
        justifyContent: 'space-around',
    }
});
