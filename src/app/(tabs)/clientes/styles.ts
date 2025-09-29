import { StyleSheet } from 'react-native';
import { colors } from '@/theme/colors'; // Supondo que você tenha um arquivo de cores

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.white, // Cor de fundo da tela
        padding: 24,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: colors.black,
        marginBottom: 16,
    },
    searchInput: {
        marginBottom: 24,
    },
    listContainer: {
        paddingBottom: 24,
    },
});
