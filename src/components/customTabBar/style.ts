import { StyleSheet } from "react-native";

const PRIMARY_COLOR = "#130057";
const SECUNDARY_COLOR = "white";

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        flexDirection: 'row',
        backgroundColor: PRIMARY_COLOR,
        width: "80%",
        alignSelf: 'center',
        bottom: 40,
        borderRadius: 40,
        paddingHorizontal: 12,
        paddingVertical: 15,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: "#000",
        shadowOffset: {width: 0, height: 5},
        shadowOpacity: 0.3,
        shadowRadius: 5,

    },

    tabItem: {
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        height: 36,
        paddingHorizontal: 14,
        borderRadius: 30,
    },

    text: {
        color: PRIMARY_COLOR,
        marginLeft: 8,
        fontWeight: "500"
    },
});


export {styles, PRIMARY_COLOR, SECUNDARY_COLOR}