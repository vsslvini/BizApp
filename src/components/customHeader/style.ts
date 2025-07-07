import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        paddingBottom: 16,          // Espaçamento inferior para dar altura ao header.
        borderBottomRightRadius: 24,
        borderBottomLeftRadius: 24,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        maxHeight: 90
    },

    center: {
        flex: 1,
        alignItems: "center",
    },

    sideContainer: {
        width: 60,
        paddingHorizontal: 16,
        justifyContent: "center",
        alignItems: "center"
    },


    title: {
        fontSize: 20,
        fontWeight: "bold",
        color: "#fff", // Cor do texto branca para contrastar com o gradiente
        // textAlign: "center",
        // paddingHorizontal: 20
    },

    rowBackContainer: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: "#FFFFFF",
        opacity: 0.3,
        justifyContent: "center",
        alignItems: "center",
        position: "absolute"

    },
})