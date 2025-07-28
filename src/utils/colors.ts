import { blue } from "react-native-reanimated/lib/typescript/Colors";

import { LinearGradient, LinearGradientProps } from "expo-linear-gradient";


const colors = {
    azul: '#2575fc',
    lilas: '#6a11cb',
    purpura: '#9533E6',
    salmao: '#BE185E',
}

const gradientes = {
    g1: ['#2563EB', '#4338CA'],
    g2: ['#9533E6', '#BE185E'],
    g3: ['#5046E5', '#7E23CF'],
    g4: ['#fc7250ff', '#f8aa6eff']
} as const


export {colors, gradientes}