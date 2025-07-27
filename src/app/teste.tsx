import { StyleSheet, Text, View } from "react-native";
import { useHeaderOptions } from "@/contexts/contextCustomHeader";
import { useFocusEffect } from "expo-router";
import React from "react";


export default function () {

    const { setHeaderOptions } = useHeaderOptions();

    useFocusEffect(React.useCallback(() => {
        setHeaderOptions({
            title: "Teste geral",
            subTitleConfirm: false,
            gradientColors: ['#2563EB', '#4338CA'],
            nextPage: true,
        })
    }, []
    ))

    return (
        <View>
            <Text style={style.container}>Teste do a seta de voltar</Text>
        </View>
    )
}



const style = StyleSheet.create({
    container:{
        display: "flex",
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    }
})