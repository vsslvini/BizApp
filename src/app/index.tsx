import { View, Text, StyleSheet, Button } from "react-native";
import { useRouter } from "expo-router";

export default function Index() {
    const router = useRouter();
    const handleNextPage = () => {
        router.replace('/produtosAdicionar/')
    }
    return (
        <View style={styles.container}>
            <Text>Tudo funcionando com o Expo Router</Text>
            <Button title="Proxima pagina" onPress={handleNextPage} />
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