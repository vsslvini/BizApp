import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        // Mantendo sua estrutura original que já funciona para evitar o bug da Tab Bar
        flex: 1,
        padding: 16,
        maxHeight: "92%",
        // Adicionando o estilo do Figma
        backgroundColor: '#F2F2F7',
    },
    title: {
        fontSize: 32,
        fontWeight: 'bold',
        color: '#1C1C1E',
        marginBottom: 16,
    },
    searchInput: {
        marginBottom: 16, // Adiciona um espaço fixo abaixo da busca
    },
    listContainer: {
        paddingBottom: 16, // Adiciona um respiro no final da lista
    },
});