import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    cardContainer: {
        backgroundColor: '#FFFFFF',
        borderRadius: 12,
        padding: 16,
        flexDirection: 'row',
        alignItems: 'center',
        // Sombra para iOS
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        // Sombra para Android
        elevation: 3,
    },
    productImage: {
        width: 80,
        height: 80,
        borderRadius: 8,
        marginRight: 16,
        backgroundColor: '#E5E5EA', // Cor de fundo caso a imagem não carregue
    },
    textContainer: {
        flex: 1,
    },
    productName: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#1C1C1E',
        marginBottom: 4,
    },
    productPrice: {
        fontSize: 16,
        fontWeight: '600',
        color: '#007AFF', // Um azul para dar destaque
        marginBottom: 4,
    },
    productStock: {
        fontSize: 14,
        color: '#8A8A8E',
    },
});