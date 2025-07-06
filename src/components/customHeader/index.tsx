import { StatusBar, View, Text, StyleSheet } from "react-native"
import { NativeStackHeaderProps } from "@react-navigation/native-stack"
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import { useHeaderOptions } from "@/contexts/contextCustomHeader";

import {styles} from "@/components/customHeader/style";
import FontAwesome from '@expo/vector-icons/FontAwesome';



const CustomHeader = (props: NativeStackHeaderProps) => {
    // Pega o título e as cores do nosso contexto
    const { title, gradientColors } = useHeaderOptions();

    const inset = useSafeAreaInsets()

    const canBack = props.navigation.canGoBack();

    const handleBack = () => {
        props.navigation.goBack();
    }

    return (
        <LinearGradient
            colors={gradientColors}
            start={{x: 0, y: 0}}
            end={{x: 1, y: 0}}
            style={[styles.container, { paddingTop: inset.top }]}>
            <StatusBar barStyle="light-content" />
            {canBack ?  (
                <FontAwesome 
                    name="backward"
                    size={28}
                    color={"#fff"}
                    onPress={handleBack}/>
            ) : null}
            <Text style={styles.title}>{title}</Text>
        </LinearGradient>
    );
};



export default CustomHeader;