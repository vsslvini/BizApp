import { Text, View, StyleSheet } from "react-native";

export default function ProdutosAdicionar() {
    return (
        <View style={styles.container}>
            <Text>
                Tudo Funcionando com o router
            </Text>
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