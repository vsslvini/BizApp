import { StyleSheet } from "react-native";

const PRIMARY_COLOR = "white";
const SECUNDARY_COLOR = "#b8b4f7ff";

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        flexDirection: 'row',
        backgroundColor: PRIMARY_COLOR,
        width: "90%",
        alignSelf: 'center',
        bottom: 20,
        borderRadius: 40,
        paddingHorizontal: 12,
        paddingVertical: 15,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 0.3,
        shadowRadius: 5,
    },

    tabItem: {
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        height: 36,
        paddingHorizontal: 20,
        borderRadius: 30,
        overflow: 'hidden', // Garante que o gradiente seja cortado pelas bordas
    },

    text: {
        color: PRIMARY_COLOR,
        marginLeft: 8,
        fontWeight: "500"
    },
});

export { styles, PRIMARY_COLOR, SECUNDARY_COLOR };