import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        paddingBottom: 20,          // Espaçamento inferior para dar altura ao header.
        borderBottomRightRadius: 24,
        borderBottomLeftRadius: 24,
        flexDirection: "row",
        alignItems: "center",
        // justifyContent: "center",
        maxHeight: 110
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
        fontSize: 24,
        fontWeight: "bold",
        color: "#fff", // Cor do texto branca para contrastar com o gradiente
        fontFamily: 'Roboto_Bold'
        // textAlign: "center",
        // paddingHorizontal: 20
    },

    subTitle: {
        fontSize: 14,
        fontWeight: "ultralight",
        color: "#fff", // Cor do texto branca para contrastar com o gradiente
        fontFamily: 'Roboto_Regular'
    },

    IconContainer: {
        width: 30,
        height: 30,
        borderRadius: 15,
        backgroundColor: "#FFFFFF",
        opacity: 0.1,
        justifyContent: "center",
        alignItems: "center",
        position: "absolute"

    },
})