import { StatusBar, View, Text, StyleSheet, Pressable, TouchableOpacity } from "react-native"
import { NativeStackHeaderProps } from "@react-navigation/native-stack"
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import { useHeaderOptions } from "@/contexts/contextCustomHeader";

import { styles } from "@/components/customHeader/style";
import FontAwesome from '@expo/vector-icons/FontAwesome';
import Feather from '@expo/vector-icons/Feather';


const CustomHeader = (props: NativeStackHeaderProps) => {
    // Pega o título e as cores do nosso contexto
    const { title, gradientColors } = useHeaderOptions();

    const inset = useSafeAreaInsets()

    const canBack = props.navigation.canGoBack();



    const handleBack = () => {
        props.navigation.goBack();
    }

    const rowBack = () => {
        return (
            <TouchableOpacity onPress={handleBack} style={{alignItems:"center", justifyContent:"center"}}>
                <View style={styles.rowBackContainer}></View>
                <Feather
                    name="arrow-left"
                    size={28}
                    color={"#fff"}
                />
            </TouchableOpacity>
        )
    }

    return (
        <LinearGradient

            colors={gradientColors}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={[styles.container, { paddingTop: inset.top }]}>
            <StatusBar barStyle="light-content" />
            <View style={styles.sideContainer}>
                {canBack ? (
                    rowBack()
                ) : null}
            </View>
            <View style={styles.center}>
                <Text style={styles.title}>{title}</Text>
            </View>

            <View style={styles.sideContainer}>

            </View>


        </LinearGradient>
    );
};



export default CustomHeader;